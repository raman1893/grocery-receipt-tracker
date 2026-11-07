import os
import re
import json
import sqlite3
import datetime as dt
from pathlib import Path

os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")

import pandas as pd
import gradio as gr
import plotly.express as px
import plotly.graph_objects as go
from PIL import Image, ImageOps

from receipt_parser import rule_category, find_store, CATEGORIES, DEPARTMENTS

# ---------------- Config ----------------
# GROCERY_DB lets the Colab notebook point this at Google Drive.
DB_PATH = os.environ.get("GROCERY_DB") or (
    "/data/grocery.db" if os.path.isdir("/data") else "grocery.db")
# Free vision-language model on Hugging Face: looks at the photo and returns the receipt as JSON.
# If the 4B model gives garbled output on Colab, change this to "Qwen/Qwen3-VL-2B-Instruct".
MODEL_ID = os.environ.get("VLM_ID", "Qwen/Qwen3-VL-4B-Instruct")
MAX_SIDE = 1792          # photo is shrunk to this many pixels on its longest side (keeps memory in check)
COLUMNS = ["receipt_id", "receipt_date", "store", "item", "qty", "unit",
           "unit_price", "amount", "department", "category", "created_at"]

# ---------------- Design tokens ----------------
INK, MUTED, LINE, BG, ACCENT = "#1E2421", "#66706B", "#E2E6E3", "#F6F7F5", "#2F6B4F"
FONT = "Instrument Sans, system-ui, sans-serif"
# Each category gets the colour of the food itself, used the same way in every chart.
CAT_COLORS = {
    "Produce": "#5E9E4A", "Meat & Seafood": "#C2453D", "Dairy & Eggs": "#8FB3D9",
    "Bakery": "#D4A055", "Pantry": "#A8794A", "Frozen": "#6CC3D5", "Snacks": "#9B5DA8",
    "Beverages": "#2E8C8C", "Household": "#7D8A99", "Personal Care": "#D98BB0",
    "Other": "#B8BDB9", "Tax": "#DADFDB",
}

# ---------------- Model (loaded once, on first use) ----------------
_model = _processor = None
_device = "cpu"


def get_model():
    global _model, _processor, _device
    if _model is None:
        import torch
        from transformers import AutoProcessor, AutoModelForImageTextToText
        _device = "cuda" if torch.cuda.is_available() else "cpu"
        if _device == "cpu":
            print("WARNING: no GPU found. This model is very slow on a CPU; run it on Colab's GPU instead.")
        _processor = AutoProcessor.from_pretrained(MODEL_ID)
        _model = AutoModelForImageTextToText.from_pretrained(
            MODEL_ID, dtype=torch.float16 if _device == "cuda" else torch.float32).to(_device).eval()
    return _model, _processor


PROMPT = f"""You are reading a photo of a grocery store receipt.
Return ONLY a JSON object, with no other text, in exactly this structure:
{{"store": "store name", "date": "YYYY-MM-DD",
 "items": [{{"name": "item name as printed", "qty": 1, "unit": "ea", "unit_price": 0.00,
            "amount": 0.00, "department": "", "category": ""}}],
 "subtotal": 0.00, "tax": 0.00, "total": 0.00}}

Rules:
- Include EVERY purchased line under EVERY department header, including the first line right after each header.
- One entry per purchased line. "amount" is the line total printed on the right.
- Multi-buy lines like "2 @ $2.79  5.58": qty 2, unit "ea", unit_price 2.79, amount 5.58.
- Weighed items like "0.925 kg @ $1.52/kg  1.41": qty 0.925, unit "kg", unit_price 1.52, amount 1.41.
- "department" is the section header the item is printed under (e.g. "DAIRY"), or "" if there is none.
- "category" must be one of: {", ".join(CATEGORIES)}.
- Skip lines whose amount is 0.00, and skip subtotal, tax, total, payment and card lines.
- Ignore faint mirrored text showing through from the back of the paper.
- "tax" is the total sales tax (HST/GST/PST). Write numbers without $ signs. Use null if something is not printed."""


def read_receipt(image, hint=""):
    """Send the photo to the model and return its raw text answer."""
    image = ImageOps.exif_transpose(image).convert("RGB")      # fix phone photo rotation
    image.thumbnail((MAX_SIDE, MAX_SIDE))
    messages = [{"role": "user", "content": [{"type": "image", "image": image},
                                             {"type": "text", "text": PROMPT + hint}]}]
    model, processor = get_model()
    import torch
    inputs = processor.apply_chat_template(messages, tokenize=True, add_generation_prompt=True,
                                           return_dict=True, return_tensors="pt").to(_device)
    try:
        with torch.inference_mode():
            out = model.generate(**inputs, max_new_tokens=2000, do_sample=False)
        return processor.decode(out[0, inputs["input_ids"].shape[1]:], skip_special_tokens=True)
    finally:
        if _device == "cuda":
            torch.cuda.empty_cache()


def department_category(dept):
    """Category from a department header like DAIRY or PRODUCE; None if it doesn't say."""
    for key, cat in DEPARTMENTS:
        if key in dept:
            return cat          # None for broad headers like GROCERY
    return None


def items_gap(r):
    """How far the items are from the printed subtotal (None if there's no subtotal)."""
    if not r or r["subtotal"] is None:
        return None
    return round(r["subtotal"] - sum(i["amount"] for i in r["items"]), 2)


def read_with_check(image):
    """Read the receipt; if items don't add up to the subtotal, ask the model to look again."""
    text = read_receipt(image)
    r = to_receipt(text)
    gap = items_gap(r)
    if r and r["items"] and gap is not None and abs(gap) > 0.01:
        hint = (f"\n\nIMPORTANT: a previous reading listed items adding up to "
                f"{r['subtotal'] - gap:.2f}, but the printed subtotal is {r['subtotal']:.2f}. "
                f"A line worth about {abs(gap):.2f} is "
                f"{'missing' if gap > 0 else 'extra or misread'}. Look again carefully, "
                f"especially at the first line under each header, and return the complete JSON.")
        text2 = read_receipt(image, hint)
        r2 = to_receipt(text2)
        gap2 = items_gap(r2)
        if r2 and r2["items"] and gap2 is not None and abs(gap2) < abs(gap):
            return text2 + "\n\n(second reading, used because it matched the subtotal better)", r2
    return text, r


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
        cat = department_category(dept)                # the store's own header is most reliable
        if not cat:
            cat = str(it.get("category") or "").strip()
            if cat not in CATEGORIES:                  # model gave no/unknown category: use rules
                cat = rule_category(name, dept) or "Other"
        items.append({"item": name, "qty": _num(it.get("qty")) or 1,
                      "unit": str(it.get("unit") or "ea").lower(),
                      "unit_price": _num(it.get("unit_price")), "amount": amount,
                      "department": dept, "category": cat})

    try:
        receipt_date = dt.date.fromisoformat(str(data.get("date"))).isoformat()
    except ValueError:
        receipt_date = None
    raw_store = str(data.get("store") or "").strip()
    store = find_store(raw_store) or raw_store.title() or None
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


def receipt_choices():
    con = get_con()
    try:
        rows = con.execute("""SELECT receipt_id, receipt_date, store, ROUND(SUM(amount), 2)
                              FROM expenses GROUP BY receipt_id
                              ORDER BY receipt_date DESC, receipt_id DESC""").fetchall()
    finally:
        con.close()
    return [(f"{nice_date(d)}, {s}, ${t:,.2f}", rid) for rid, d, s, t in rows]


def delete_receipt(receipt_id):
    if not receipt_id:
        return ("Pick a receipt to delete first.", *refresh_all())
    con = get_con()
    try:
        n = con.execute("DELETE FROM expenses WHERE receipt_id = ?", (receipt_id,)).rowcount
        con.commit()
    finally:
        con.close()
    return (f"Deleted the receipt and its {n} lines.", *refresh_all())


def run_sql(query):
    """Run a read-only query against the receipts database."""
    q = (query or "").strip().rstrip(";")
    if not re.match(r"^(select|with)\b", q, re.I) or ";" in q:
        return pd.DataFrame(), "Only a single SELECT query can run here, so your data can't be changed."
    get_con().close()                                   # make sure the database file exists
    uri = Path(DB_PATH).resolve().as_uri() + "?mode=ro"  # read-only connection
    con = sqlite3.connect(uri, uri=True)
    try:
        df = pd.read_sql_query(q, con)
    except Exception as e:
        return pd.DataFrame(), f"The query didn't run: {e}"
    finally:
        con.close()
    shown = df.head(500)
    note = f"{len(df)} rows" + (" (showing the first 500)" if len(df) > 500 else "")
    return shown, note


# ---------------- Formatting ----------------
def nice_date(value):
    try:
        d = dt.date.fromisoformat(str(value)[:10])
        return f"{d.day} {d.strftime('%b %Y')}"
    except ValueError:
        return str(value)


def style(fig, title, height=340):
    fig.update_layout(
        title=dict(text=title, x=0, xanchor="left", font=dict(size=15, color=INK)),
        template="simple_white", height=height, font=dict(family=FONT, color=INK, size=12),
        margin=dict(l=8, r=8, t=48, b=8), paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)", hoverlabel=dict(font_family=FONT),
        legend=dict(title=None, orientation="h", y=-0.12, x=0, font=dict(size=11)))
    return fig


# ---------------- Analytics ----------------
def dashboard():
    df = load_all()
    if df.empty:
        empty = ('<div class="empty"><strong>No receipts yet.</strong><br>'
                 'Scan your first one on the Scan tab and your spending shows up here.</div>')
        return empty, None, None, None

    df["receipt_date"] = pd.to_datetime(df["receipt_date"], errors="coerce")
    df["period"] = df["receipt_date"].dt.to_period("M")
    total = df["amount"].sum()
    receipts = df["receipt_id"].nunique()
    latest = df["period"].max()
    latest_spend = df.loc[df["period"] == latest, "amount"].sum()
    stats = [("Total spent", f"${total:,.2f}"), ("Receipts", f"{receipts}"),
             ("Average receipt", f"${total / receipts:,.2f}"),
             (latest.strftime("%B %Y"), f"${latest_spend:,.2f}")]
    kpi = '<div class="stats">' + "".join(
        f'<div><span class="label">{k}</span><span class="value">{v}</span></div>'
        for k, v in stats) + "</div>"

    by_cat = df.groupby("category", as_index=False)["amount"].sum().sort_values("amount", ascending=False)
    pie = px.pie(by_cat, names="category", values="amount", hole=0.64,
                 color="category", color_discrete_map=CAT_COLORS)
    pie.update_traces(textinfo="percent", textposition="inside", sort=False,
                      hovertemplate="%{label}<br>$%{value:,.2f}<extra></extra>",
                      marker=dict(line=dict(color="#FFFFFF", width=2)))
    pie.add_annotation(text=f"${total:,.0f}", showarrow=False, font=dict(size=22, color=INK))
    style(pie, "Where it goes")

    monthly = df.groupby(["period", "category"], as_index=False)["amount"].sum().sort_values("period")
    monthly["month"] = monthly["period"].dt.strftime("%b %Y")
    trend = px.bar(monthly, x="month", y="amount", color="category",
                   color_discrete_map=CAT_COLORS, labels={"amount": "", "month": ""})
    trend.update_xaxes(type="category")
    trend.update_yaxes(tickprefix="$", gridcolor=LINE, showgrid=True)
    trend.update_layout(bargap=0.55)
    trend.update_traces(hovertemplate="%{x}<br>$%{y:,.2f}<extra></extra>")
    style(trend, "Month by month", height=360)

    items = df[df["category"] != "Tax"]
    top = (items.groupby(["item", "category"], as_index=False)["amount"].sum()
                .nlargest(10, "amount").sort_values("amount"))
    top_fig = go.Figure(go.Bar(
        x=top["amount"], y=top["item"], orientation="h",
        marker_color=[CAT_COLORS.get(c, "#B8BDB9") for c in top["category"]],
        text=[f"${a:,.2f}" for a in top["amount"]], textposition="outside", cliponaxis=False,
        hovertemplate="%{y}<br>$%{x:,.2f}<extra></extra>"))
    top_fig.update_xaxes(visible=False)
    top_fig.update_yaxes(ticks="", showline=False)
    style(top_fig, "Most spent on")
    top_fig.update_layout(margin=dict(l=8, r=48, t=48, b=8))
    return kpi, pie, trend, top_fig


def records_table():
    df = load_all()
    if df.empty:
        return pd.DataFrame(columns=["Date", "Store", "Item", "Qty", "Unit", "Unit price", "Amount", "Category"])
    df = df.sort_values(["receipt_date", "receipt_id"], ascending=False)
    out = df[["receipt_date", "store", "item", "qty", "unit", "unit_price", "amount", "category"]]
    out.columns = ["Date", "Store", "Item", "Qty", "Unit", "Unit price", "Amount", "Category"]
    return out


def refresh_all():
    return (*dashboard(), records_table(), gr.update(choices=receipt_choices(), value=None))


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


# ---------------- Reading and saving one receipt ----------------
def process_receipt(image, date_override="", store_override=""):
    """Read one receipt photo and save it. Returns a dict describing what happened."""
    text, r = read_with_check(image)
    if not r or not r["items"]:
        return {"kind": "failed", "text": text, "view": pd.DataFrame(),
                "message": "**Couldn't read any items.** Retake the photo flat, in good light, "
                           "with the whole receipt in the frame."}

    df = pd.DataFrame(r["items"])
    df["department"] = df["department"].fillna("").str.title()
    if r["tax"]:
        df.loc[len(df)] = {"item": "Sales tax", "qty": 1, "unit": "ea", "unit_price": r["tax"],
                           "amount": r["tax"], "department": "", "category": "Tax"}
    try:
        receipt_date = dt.date.fromisoformat((date_override or "").strip()).isoformat()
    except ValueError:
        receipt_date = r["date"] or dt.date.today().isoformat()
    store = (store_override or "").strip() or r["store"] or "Unknown store"

    view = df[["item", "qty", "unit", "unit_price", "amount", "category"]].copy()
    view.columns = ["Item", "Qty", "Unit", "Unit price", "Amount", "Category"]
    paid = round(df["amount"].sum(), 2)
    n_items = len(r["items"])
    base = {"text": text, "view": view, "store": store, "date": receipt_date,
            "items": n_items, "paid": paid}

    if is_duplicate(receipt_date, store, paid):
        return {**base, "kind": "duplicate",
                "message": f"**Already saved.** A {store} receipt from {nice_date(receipt_date)} "
                           f"for ${paid:,.2f} is in your records, so nothing new was added."}

    df["receipt_id"] = dt.datetime.now().strftime("%Y%m%d%H%M%S%f")
    df["receipt_date"], df["store"] = receipt_date, store
    df["created_at"] = dt.datetime.now().isoformat(timespec="seconds")
    save_rows(df)

    gap = items_gap(r)
    message = (f"**Saved {n_items} items from {store}, {nice_date(receipt_date)}.** "
               f"You paid ${paid:,.2f}.")
    if gap is None:
        matched = None
    elif abs(gap) < 0.01:
        matched = True
        message += "  \nThe items match the subtotal on the receipt."
    else:
        matched = False
        message += (f"  \nThe items add up to ${r['subtotal'] - gap:,.2f}, but the receipt's "
                    f"subtotal is ${r['subtotal']:,.2f}. One line may have been missed.")
    return {**base, "kind": "saved", "matched": matched, "message": message}


def scan(image, date_override, store_override):
    if image is None:
        return (gr.update(),) * 9
    res = process_receipt(image, date_override, store_override)
    return (res["view"], res["message"], res["text"], *refresh_all())


def read_many(files, progress=gr.Progress()):
    if not files:
        return (pd.DataFrame(), "Add some receipt photos first.", *refresh_all())
    rows, saved, flagged = [], 0, 0
    for i, f in enumerate(files):
        path = f if isinstance(f, str) else f.name
        progress(i / len(files), desc=f"Reading receipt {i + 1} of {len(files)}")
        try:
            res = process_receipt(Image.open(path))
        except Exception as e:                      # one bad file shouldn't stop the batch
            res = {"kind": "failed", "message": str(e)}
        if res["kind"] == "saved":
            saved += 1
            result = "Saved" if res["matched"] is not False else "Saved, check items"
            flagged += res["matched"] is False
        elif res["kind"] == "duplicate":
            result = "Already saved"
        else:
            result = "Couldn't read"
        rows.append([Path(path).name, res.get("store", ""), nice_date(res.get("date", "")),
                     res.get("items", ""), f"${res['paid']:,.2f}" if "paid" in res else "", result])
    summary = pd.DataFrame(rows, columns=["Photo", "Store", "Date", "Items", "Paid", "Result"])
    note = f"**Saved {saved} of {len(files)} receipts.**"
    if flagged:
        note += f" {flagged} didn't match their subtotal; open the Records tab to check them."
    return (summary, note, *refresh_all())


# ---------------- Look and feel ----------------
THEME = gr.themes.Base(
    font=[gr.themes.GoogleFont("Instrument Sans"), "system-ui", "sans-serif"],
    radius_size="md",
).set(
    body_background_fill=BG, body_background_fill_dark=BG,
    body_text_color=INK, body_text_color_dark=INK,
    body_text_color_subdued=MUTED, body_text_color_subdued_dark=MUTED,
    block_background_fill="#FFFFFF", block_background_fill_dark="#FFFFFF",
    block_border_color=LINE, block_border_color_dark=LINE,
    border_color_primary=LINE, border_color_primary_dark=LINE,
    block_shadow="none", block_shadow_dark="none",
    block_label_text_color=MUTED, block_label_text_color_dark=MUTED,
    block_title_text_color=INK, block_title_text_color_dark=INK,
    input_background_fill="#FFFFFF", input_background_fill_dark="#FFFFFF",
    button_primary_background_fill=ACCENT, button_primary_background_fill_dark=ACCENT,
    button_primary_background_fill_hover="#24563F", button_primary_background_fill_hover_dark="#24563F",
    button_primary_text_color="#FFFFFF", button_primary_text_color_dark="#FFFFFF",
    button_secondary_background_fill="#FFFFFF", button_secondary_background_fill_dark="#FFFFFF",
    button_secondary_text_color=INK, button_secondary_text_color_dark=INK,
    color_accent=ACCENT, color_accent_soft="#E5EFE9", color_accent_soft_dark="#E5EFE9",
    background_fill_primary="#FFFFFF", background_fill_primary_dark="#FFFFFF",
    background_fill_secondary=BG, background_fill_secondary_dark=BG,
)

CSS = f"""
.gradio-container {{ max-width: 1040px !important; margin: 0 auto !important; }}
#header h1 {{ font-size: 30px; font-weight: 650; letter-spacing: -0.02em; margin: 12px 0 4px; color: {INK}; }}
#header p {{ color: {MUTED}; margin: 0 0 6px; font-size: 15px; }}
.stats {{ display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: #fff;
          border: 1px solid {LINE}; border-radius: 14px; }}
.stats > div {{ padding: 18px 20px; border-left: 1px solid {LINE}; }}
.stats > div:first-child {{ border-left: none; }}
.stats .label {{ display: block; color: {MUTED}; font-size: 13px; }}
.stats .value {{ display: block; margin-top: 4px; font-size: 26px; font-weight: 650;
                 letter-spacing: -0.01em; color: {INK}; font-variant-numeric: tabular-nums; }}
.empty {{ padding: 44px 24px; text-align: center; color: {MUTED}; background: #fff;
          border: 1px dashed #CDD3CF; border-radius: 14px; line-height: 1.6; }}
.empty strong {{ color: {INK}; }}
#status {{ min-height: 24px; }}
table td, table th {{ font-variant-numeric: tabular-nums; }}
.hint {{ color: {MUTED}; font-size: 14px; }}
@media (max-width: 640px) {{
  .stats {{ grid-template-columns: repeat(2, minmax(0, 1fr)); }}
  .stats > div:nth-child(3) {{ border-left: none; }}
  .stats > div:nth-child(n+3) {{ border-top: 1px solid {LINE}; }}
  .stats .value {{ font-size: 22px; }}
}}
"""

SQL_EXAMPLE = """SELECT category, ROUND(SUM(amount), 2) AS spent
FROM expenses
GROUP BY category
ORDER BY spent DESC"""

# ---------------- Layout ----------------
with gr.Blocks(title="Groceries") as demo:
    gr.HTML('<div id="header"><h1>Groceries</h1>'
            '<p>Snap a receipt and your spending updates itself.</p></div>')

    with gr.Tab("Scan"):
        with gr.Row(equal_height=False):
            with gr.Column(scale=5):
                image = gr.Image(type="pil", sources=["upload", "webcam"], height=440,
                                 label="Receipt photo")
                with gr.Accordion("Date or store wrong? Set them here", open=False):
                    date_in = gr.Textbox(label="Date", placeholder="YYYY-MM-DD, leave blank to read it")
                    store_in = gr.Textbox(label="Store", placeholder="Leave blank to read it")
            with gr.Column(scale=6):
                status = gr.Markdown("Take a photo or drop one in. The receipt is read and saved "
                                     "automatically.", elem_id="status")
                items = gr.Dataframe(label="Items", interactive=False, wrap=True)
                with gr.Accordion("What the model read", open=False):
                    raw_text = gr.Textbox(lines=14, show_label=False)

    with gr.Tab("Upload several"):
        gr.Markdown("Add up to a handful of receipt photos at once. Each one takes about "
                    "half a minute to read.", elem_classes="hint")
        files = gr.File(file_count="multiple", file_types=["image"], label="Receipt photos", height=200)
        read_btn = gr.Button("Read all receipts", variant="primary")
        batch_note = gr.Markdown()
        batch_table = gr.Dataframe(interactive=False, wrap=True, label="Results")

    with gr.Tab("Spending"):
        kpi = gr.HTML()
        with gr.Row():
            pie = gr.Plot(show_label=False)
            top = gr.Plot(show_label=False)
        trend = gr.Plot(show_label=False)

    with gr.Tab("Records"):
        records = gr.Dataframe(label="Every item you've scanned", interactive=False, wrap=True,
                               max_height=420, show_search="search")
        with gr.Row():
            export_btn = gr.Button("Download as Excel")
            file_out = gr.File(label="Excel file", height=80)
        with gr.Accordion("Delete a receipt", open=False):
            del_pick = gr.Dropdown(label="Receipt", choices=[])
            del_btn = gr.Button("Delete this receipt", variant="stop")
            del_note = gr.Markdown()
        with gr.Accordion("Query with SQL", open=False):
            gr.Markdown("Everything lives in one table called `expenses`, with columns receipt_id, "
                        "receipt_date, store, item, qty, unit, unit_price, amount, department, "
                        "category and created_at. Queries are read-only.", elem_classes="hint")
            sql_in = gr.Code(value=SQL_EXAMPLE, language="sql", label="Query", lines=5)
            sql_btn = gr.Button("Run query", variant="primary")
            sql_note = gr.Markdown()
            sql_out = gr.Dataframe(interactive=False, wrap=True, label="Result")

    refresh_outputs = [kpi, pie, trend, top, records, del_pick]
    image.change(scan, [image, date_in, store_in], [items, status, raw_text, *refresh_outputs])
    read_btn.click(read_many, files, [batch_table, batch_note, *refresh_outputs])
    del_btn.click(delete_receipt, del_pick, [del_note, *refresh_outputs])
    sql_btn.click(run_sql, sql_in, [sql_out, sql_note])
    export_btn.click(export_excel, None, file_out)
    demo.load(refresh_all, None, refresh_outputs)


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


if __name__ == "__main__":
    print("Loading the model (the first time also downloads it)...")
    get_model()

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
                auth=("receipts", PASSWORD) if PASSWORD else None,
                theme=THEME, css=CSS, footer_links=[])
