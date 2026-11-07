import os
import re
import json
import sqlite3
import datetime as dt

os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")

import pandas as pd
import gradio as gr
import plotly.express as px
import torch
from PIL import ImageOps
from transformers import AutoProcessor, AutoModelForImageTextToText

from receipt_parser import rule_category, CATEGORIES

# ---------------- Config ----------------
# On HF Spaces with persistent storage enabled, /data survives restarts.
# GROCERY_DB lets the Colab notebook point this at Google Drive.
DB_PATH = os.environ.get("GROCERY_DB") or (
    "/data/grocery.db" if os.path.isdir("/data") else "grocery.db")
# Free vision-language model on Hugging Face: looks at the photo and returns the receipt as JSON.
# If the 4B model gives garbled output on Colab, change this to "Qwen/Qwen3-VL-2B-Instruct".
MODEL_ID = os.environ.get("VLM_ID", "Qwen/Qwen3-VL-4B-Instruct")
MAX_SIDE = 1792          # photo is shrunk to this many pixels on its longest side (keeps memory in check)
COLUMNS = ["receipt_id", "receipt_date", "store", "item", "qty", "unit",
           "unit_price", "amount", "department", "category", "created_at"]

# ---------------- Model ----------------
device = "cuda" if torch.cuda.is_available() else "cpu"
if device == "cpu":
    print("WARNING: no GPU found. This model is very slow on a CPU; run it on Colab's GPU instead.")
processor = AutoProcessor.from_pretrained(MODEL_ID)
model = AutoModelForImageTextToText.from_pretrained(
    MODEL_ID, dtype=torch.float16 if device == "cuda" else torch.float32).to(device).eval()

PROMPT = f"""You are reading a photo of a grocery store receipt.
Return ONLY a JSON object, with no other text, in exactly this structure:
{{"store": "store name", "date": "YYYY-MM-DD",
 "items": [{{"name": "item name as printed", "qty": 1, "unit": "ea", "unit_price": 0.00,
            "amount": 0.00, "department": "", "category": ""}}],
 "subtotal": 0.00, "tax": 0.00, "total": 0.00}}

Rules:
- One entry per purchased line. "amount" is the line total printed on the right.
- Multi-buy lines like "2 @ $2.79  5.58": qty 2, unit "ea", unit_price 2.79, amount 5.58.
- Weighed items like "0.925 kg @ $1.52/kg  1.41": qty 0.925, unit "kg", unit_price 1.52, amount 1.41.
- "department" is the section header the item is printed under (e.g. "DAIRY"), or "" if there is none.
- "category" must be one of: {", ".join(CATEGORIES)}.
- Skip lines whose amount is 0.00, and skip subtotal, tax, total, payment and card lines.
- Ignore faint mirrored text showing through from the back of the paper.
- "tax" is the total sales tax (HST/GST/PST). Write numbers without $ signs. Use null if something is not printed."""


def read_receipt(image):
    """Send the photo to the model and return its raw text answer."""
    image = ImageOps.exif_transpose(image).convert("RGB")      # fix phone photo rotation
    image.thumbnail((MAX_SIDE, MAX_SIDE))
    messages = [{"role": "user", "content": [{"type": "image", "image": image},
                                             {"type": "text", "text": PROMPT}]}]
    inputs = processor.apply_chat_template(messages, tokenize=True, add_generation_prompt=True,
                                           return_dict=True, return_tensors="pt").to(device)
    try:
        with torch.inference_mode():
            out = model.generate(**inputs, max_new_tokens=2000, do_sample=False)
        return processor.decode(out[0, inputs["input_ids"].shape[1]:], skip_special_tokens=True)
    finally:
        if device == "cuda":
            torch.cuda.empty_cache()


def _num(value):
    if value is None:
        return None
    try:
        return round(float(str(value).replace("$", "").replace(",", "").strip()), 3)
    except ValueError:
        return None


def to_receipt(text):
    """Turn the model's JSON answer into the structure the rest of the app uses."""
    cleaned = re.sub(r"```(?:json)?", "", text)
    start, end = cleaned.find("{"), cleaned.rfind("}")
    if start == -1 or end == -1:
        return None
    try:
        data = json.loads(cleaned[start:end + 1])
    except json.JSONDecodeError:
        return None

    items = []
    for it in data.get("items") or []:
        if not isinstance(it, dict):
            continue
        name = str(it.get("name") or "").strip()
        amount = _num(it.get("amount"))
        if not name or not amount:                     # skip blanks and $0.00 lines
            continue
        dept = str(it.get("department") or "").strip().upper()
        cat = str(it.get("category") or "").strip()
        if cat not in CATEGORIES:                      # model gave no/unknown category: use rules
            cat = rule_category(name, dept) or "Other"
        items.append({"item": name, "qty": _num(it.get("qty")) or 1,
                      "unit": str(it.get("unit") or "ea").lower(),
                      "unit_price": _num(it.get("unit_price")), "amount": amount,
                      "department": dept, "category": cat})

    try:
        receipt_date = dt.date.fromisoformat(str(data.get("date"))).isoformat()
    except ValueError:
        receipt_date = None
    store = str(data.get("store") or "").strip() or None
    return {"store": store, "date": receipt_date, "items": items,
            "subtotal": _num(data.get("subtotal")), "tax": _num(data.get("tax")) or None,
            "total": _num(data.get("total"))}


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

    text = read_receipt(image)
    r = to_receipt(text)
    if not r or not r["items"]:
        return (pd.DataFrame(), "⚠️ Couldn't read items from this photo. Check the model output "
                "below, or retake the photo flat, well lit and close up.", text, *dashboard())

    df = pd.DataFrame(r["items"])
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
                with gr.Accordion("Model output", open=False):
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
