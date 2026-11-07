import os
import sqlite3
import datetime as dt

os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")

import pandas as pd
import gradio as gr
import plotly.express as px
import torch
from PIL import ImageOps
from transformers import AutoProcessor, AutoModelForImageTextToText, pipeline

from receipt_parser import parse_receipt, rule_category, CATEGORIES

# ---------------- Config ----------------
# On HF Spaces with persistent storage enabled, /data survives restarts.
# GROCERY_DB lets the Colab notebook point this at Google Drive.
DB_PATH = os.environ.get("GROCERY_DB") or (
    "/data/grocery.db" if os.path.isdir("/data") else "grocery.db")
OCR_ID = "stepfun-ai/GOT-OCR-2.0-hf"        # reads all text on the receipt
ZS_ID = "facebook/bart-large-mnli"          # fallback categorizer for unknown items
COLUMNS = ["receipt_id", "receipt_date", "store", "item", "qty", "unit",
           "unit_price", "amount", "department", "category", "created_at"]

# ---------------- Models ----------------
device = "cuda" if torch.cuda.is_available() else "cpu"
ocr_processor = AutoProcessor.from_pretrained(OCR_ID)
ocr_model = AutoModelForImageTextToText.from_pretrained(OCR_ID).to(device).eval()
# GPU: 16-bit halves memory use. CPU: needs 32-bit.
ocr_model = ocr_model.half() if device == "cuda" else ocr_model.float()
_classifier = None


def classifier():
    """Loaded only the first time an item can't be categorized by rules."""
    global _classifier
    if _classifier is None:
        _classifier = pipeline("zero-shot-classification", model=ZS_ID,
                               device=0 if device == "cuda" else -1)
    return _classifier


def _ocr_once(image, patches):
    if patches:   # read the receipt in sections plus an overview (sharper on long receipts)
        inputs = ocr_processor(image, return_tensors="pt", crop_to_patches=True, max_patches=patches)
    else:         # one pass over the whole image (lightest on memory)
        inputs = ocr_processor(image, return_tensors="pt")
    inputs = inputs.to(device, dtype=ocr_model.dtype)
    with torch.inference_mode():
        ids = ocr_model.generate(**inputs, do_sample=False, max_new_tokens=2048,
                                 tokenizer=ocr_processor.tokenizer, stop_strings="<|im_end|>")
    return ocr_processor.decode(ids[0, inputs["input_ids"].shape[1]:], skip_special_tokens=True)


def run_ocr(image):
    image = ImageOps.exif_transpose(image).convert("RGB")   # fix phone photo rotation
    try:
        return _ocr_once(image, patches=2)
    except torch.OutOfMemoryError:
        print("GPU memory full, retrying in single-pass mode")
        torch.cuda.empty_cache()
        return _ocr_once(image, patches=0)
    finally:
        if device == "cuda":
            torch.cuda.empty_cache()   # free memory for the next scan


def categorize(df):
    cats = [rule_category(n, d) for n, d in zip(df["item"], df["department"])]
    unknown = [i for i, c in enumerate(cats) if c is None]
    if unknown:
        results = classifier()([df["item"].iloc[i] for i in unknown],
                               candidate_labels=CATEGORIES,
                               hypothesis_template="This grocery store item is {}.")
        if isinstance(results, dict):
            results = [results]
        for i, r in zip(unknown, results):
            cats[i] = r["labels"][0] if r["scores"][0] >= 0.25 else "Other"
    return cats


# ---------------- Database ----------------
def get_con():
    con = sqlite3.connect(DB_PATH)
    con.execute("""CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, receipt_id TEXT, receipt_date TEXT,
        store TEXT, item TEXT, qty REAL, unit TEXT, unit_price REAL, amount REAL,
        department TEXT, category TEXT, created_at TEXT)""")
    existing = {row[1] for row in con.execute("PRAGMA table_info(expenses)")}
    for col in ("unit", "unit_price", "department"):            # upgrade older databases
        if col not in existing:
            con.execute(f"ALTER TABLE expenses ADD COLUMN {col} "
                        f"{'REAL' if col == 'unit_price' else 'TEXT'}")
    return con


def load_all():
    con = get_con()
    try:
        return pd.read_sql("SELECT * FROM expenses ORDER BY receipt_date", con)
    finally:
        con.close()


def is_duplicate(receipt_date, store, amount):
    con = get_con()
    try:
        rows = con.execute("""SELECT SUM(amount) FROM expenses
                              WHERE receipt_date = ? AND store = ? GROUP BY receipt_id""",
                           (receipt_date, store)).fetchall()
    finally:
        con.close()
    return any(abs((s or 0) - amount) < 0.01 for (s,) in rows)


def save_rows(df):
    con = get_con()
    try:
        df[COLUMNS].to_sql("expenses", con, if_exists="append", index=False)
        con.commit()
    finally:
        con.close()


# ---------------- Analytics ----------------
def dashboard():
    df = load_all()
    if df.empty:
        return "No records yet. Scan your first receipt.", None, None, None

    df["receipt_date"] = pd.to_datetime(df["receipt_date"], errors="coerce")
    df["month"] = df["receipt_date"].dt.to_period("M").astype(str)
    total = df["amount"].sum()
    receipts = df["receipt_id"].nunique()
    latest = df["month"].max()
    latest_spend = df.loc[df["month"] == latest, "amount"].sum()
    kpi = (f"**Total spend:** ${total:,.2f} &nbsp;·&nbsp; **Receipts:** {receipts} "
           f"&nbsp;·&nbsp; **Avg per receipt:** ${total / receipts:,.2f} "
           f"&nbsp;·&nbsp; **{latest}:** ${latest_spend:,.2f}")

    by_cat = df.groupby("category", as_index=False)["amount"].sum()
    pie = px.pie(by_cat, names="category", values="amount", hole=0.45, title="Spend by category")

    monthly = df.groupby(["month", "category"], as_index=False)["amount"].sum()
    trend = px.bar(monthly, x="month", y="amount", color="category",
                   title="Monthly spend by category", labels={"amount": "Spend ($)"})

    items = df[df["category"] != "Tax"]
    top = items.groupby("item", as_index=False)["amount"].sum().nlargest(10, "amount")
    top_fig = px.bar(top, x="amount", y="item", orientation="h",
                     title="Top 10 items by spend", labels={"amount": "Spend ($)"})
    top_fig.update_layout(yaxis={"categoryorder": "total ascending"})
    return kpi, pie, trend, top_fig


def export_excel():
    df = load_all()
    path = "grocery_expenses.xlsx"
    with pd.ExcelWriter(path) as writer:
        df.to_excel(writer, sheet_name="Items", index=False)
        if not df.empty:
            (df.pivot_table(index="category", values="amount", aggfunc="sum")
               .sort_values("amount", ascending=False)
               .to_excel(writer, sheet_name="By category"))
    return path


# ---------------- Main action ----------------
def scan(image, date_override, store_override):
    if image is None:
        return (gr.update(),) * 7

    text = run_ocr(image)
    r = parse_receipt(text)
    if not r["items"]:
        return (pd.DataFrame(), "⚠️ No items found. Check the raw text below, or retake "
                "the photo flat, well lit and close up.", text, *dashboard())

    df = pd.DataFrame(r["items"])
    df["category"] = categorize(df)
    df["department"] = df["department"].fillna("").str.title()
    if r["tax"]:
        df.loc[len(df)] = {"item": "Sales tax", "qty": 1, "unit": "ea", "unit_price": r["tax"],
                           "amount": r["tax"], "department": "", "category": "Tax"}

    try:
        receipt_date = dt.date.fromisoformat(date_override.strip()).isoformat()
    except (ValueError, AttributeError):
        receipt_date = r["date"] or dt.date.today().isoformat()
    store = (store_override or "").strip() or r["store"] or "Unknown"

    view = df[["item", "qty", "unit", "unit_price", "amount", "department", "category"]]
    paid = round(df["amount"].sum(), 2)
    if is_duplicate(receipt_date, store, paid):
        return (view, f"⚠️ A {store} receipt from {receipt_date} for ${paid:,.2f} is already "
                "saved, so this one was skipped.", text, *dashboard())

    df["receipt_id"] = dt.datetime.now().strftime("%Y%m%d%H%M%S")
    df["receipt_date"], df["store"] = receipt_date, store
    df["created_at"] = dt.datetime.now().isoformat(timespec="seconds")
    save_rows(df)

    items_sum = df.loc[df["category"] != "Tax", "amount"].sum()
    status = f"✅ **{store} · {receipt_date}** · saved {len(r['items'])} items · paid **${paid:,.2f}**"
    if r["subtotal"] is not None:
        if abs(items_sum - r["subtotal"]) < 0.01:
            status += "  \nItems match the receipt subtotal."
        else:
            status += (f"  \n⚠️ Items add up to ${items_sum:,.2f} but the subtotal is "
                       f"${r['subtotal']:,.2f}. A line may have been misread.")
    return (view, status, text, *dashboard())


# ---------------- UI ----------------
with gr.Blocks(title="Grocery Receipt Tracker") as demo:
    gr.Markdown("# 🧾 Grocery Receipt Tracker\n"
                "Upload or snap a receipt. Store, date, items and categories are read "
                "and saved automatically.")

    with gr.Tab("Scan"):
        with gr.Row():
            with gr.Column():
                image = gr.Image(type="pil", sources=["upload", "webcam"], label="Receipt photo")
                with gr.Accordion("Optional overrides", open=False):
                    date_in = gr.Textbox(label="Date (YYYY-MM-DD), blank = read from receipt")
                    store_in = gr.Textbox(label="Store, blank = read from receipt")
            with gr.Column():
                status = gr.Markdown()
                items = gr.Dataframe(label="Items from this receipt", interactive=False)
                with gr.Accordion("Raw OCR text", open=False):
                    raw_text = gr.Textbox(lines=15, show_label=False)

    with gr.Tab("Dashboard"):
        kpi = gr.Markdown()
        with gr.Row():
            pie = gr.Plot()
            top = gr.Plot()
        trend = gr.Plot()
        with gr.Row():
            export_btn = gr.Button("Download Excel")
            file_out = gr.File(label="Export")

    image.change(scan, [image, date_in, store_in],
                 [items, status, raw_text, kpi, pie, trend, top])
    demo.load(dashboard, None, [kpi, pie, trend, top])
    export_btn.click(export_excel, None, file_out)

def lan_ip():
    """Find this laptop's address on the Wi-Fi (no data is actually sent)."""
    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except OSError:
        return None
    finally:
        s.close()


# Colab notebook sets GRADIO_SHARE=1 to get a public link, plus a password.
SHARE = os.environ.get("GRADIO_SHARE") == "1"
PASSWORD = os.environ.get("APP_PASSWORD")

if SHARE:
    print("\nLook for 'Running on public URL' below and open that link on your phone.")
    print("Login: username 'receipts' and the password you chose.\n")
else:
    ip = lan_ip()
    print("\n" + "=" * 55)
    print("  Open on this laptop:  http://127.0.0.1:7860")
    if ip:
        print(f"  Open on your phone:   http://{ip}:7860  (same Wi-Fi)")
    print("=" * 55 + "\n")

demo.launch(server_name="0.0.0.0", share=SHARE, show_error=True,
            auth=("receipts", PASSWORD) if PASSWORD else None)
