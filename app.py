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
from icons import ICONS

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
- Small fees are purchases too: include reusable bags (e.g. "REUBL SHRT PC" under OTHER SERVICES), deposits and eco fees.
- Skip lines whose amount is 0.00, and skip subtotal, tax, total, payment and card lines.
- "date": take it from the printed 4-digit-year date such as 2026/10/18, not from the 2-digit "DateTime" line.
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
                f"especially at the first line under each header and at small fees such as a reusable bag, "
                f"and return the complete JSON.")
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
    con.execute("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)")
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


def receipt_lines(receipt_ids):
    if not receipt_ids:
        return 0
    con = get_con()
    try:
        marks = ",".join("?" * len(receipt_ids))
        return con.execute(f"SELECT COUNT(*) FROM expenses WHERE receipt_id IN ({marks})",
                           list(receipt_ids)).fetchone()[0]
    finally:
        con.close()


def ask_delete(receipt_ids):
    """First click: show a confirmation instead of deleting straight away."""
    if not receipt_ids:
        return gr.update(visible=False), "", "Tick at least one receipt first."
    n = len(receipt_ids)
    text = (f"**Delete {n} receipt{'s' if n > 1 else ''} and {receipt_lines(receipt_ids)} lines?** "
            "This can't be undone.")
    return gr.update(visible=True), text, ""


def delete_receipts(receipt_ids, period=None, store=None, category=None):
    filters = [v for v in (period, store, category) if v is not None]
    if not receipt_ids:
        return ("Tick at least one receipt first.", gr.update(visible=False), False, *refresh_all(*filters))
    con = get_con()
    try:
        marks = ",".join("?" * len(receipt_ids))
        lines = con.execute(f"DELETE FROM expenses WHERE receipt_id IN ({marks})", list(receipt_ids)).rowcount
        con.commit()
    finally:
        con.close()
    n = len(receipt_ids)
    return (f"Deleted {n} receipt{'s' if n > 1 else ''} ({lines} lines).", gr.update(visible=False), False,
            *refresh_all(*filters))


def toggle_all(checked):
    return gr.update(value=[rid for _, rid in receipt_choices()] if checked else [])


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


# ---------------- Settings (monthly budget) ----------------
def get_setting(key, default=None):
    con = get_con()
    try:
        row = con.execute("SELECT value FROM settings WHERE key = ?", (key,)).fetchone()
    finally:
        con.close()
    return row[0] if row else default


def set_setting(key, value):
    con = get_con()
    try:
        con.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (key, str(value)))
        con.commit()
    finally:
        con.close()


def get_budget():
    try:
        return float(get_setting("monthly_budget", 0) or 0)
    except ValueError:
        return 0.0


# ---------------- Filters ----------------
PERIODS = ["All time", "This month", "Last month", "Last 3 months", "This year"]
ALL_STORES, ALL_CATS = "All stores", "All categories"


def prepared():
    df = load_all()
    if not df.empty:
        df["receipt_date"] = pd.to_datetime(df["receipt_date"], errors="coerce")
    return df


def filter_df(df, period=PERIODS[0], store=ALL_STORES, category=ALL_CATS):
    if df.empty:
        return df
    today = pd.Timestamp(dt.date.today())
    month_start = today.replace(day=1)
    start = end = None
    if period == "This month":
        start = month_start
    elif period == "Last month":
        start, end = month_start - pd.DateOffset(months=1), month_start
    elif period == "Last 3 months":
        start = month_start - pd.DateOffset(months=2)
    elif period == "This year":
        start = today.replace(month=1, day=1)
    if start is not None:
        df = df[df["receipt_date"] >= start]
    if end is not None:
        df = df[df["receipt_date"] < end]
    if store and store != ALL_STORES:
        df = df[df["store"] == store]
    if category and category != ALL_CATS:
        df = df[df["category"] == category]
    return df


def store_choices():
    df = load_all()
    return [ALL_STORES] + (sorted(df["store"].dropna().unique()) if not df.empty else [])


# ---------------- Spending page ----------------
EMPTY = ('<div class="empty"><strong>Nothing here yet.</strong><br>'
         'Scan a receipt, or change the filters in the sidebar.</div>')


def kpi_cards(period, store):
    df = filter_df(prepared(), PERIODS[0], store)
    today = dt.date.today()
    this_m = pd.Timestamp(today).to_period("M")
    if df.empty:
        return EMPTY
    df["period"] = df["receipt_date"].dt.to_period("M")
    spent_now = df.loc[df["period"] == this_m, "amount"].sum()
    spent_last = df.loc[df["period"] == this_m - 1, "amount"].sum()
    budget = get_budget()

    if budget:
        pct = spent_now / budget
        tone = "good" if pct < 0.8 else ("warn" if pct <= 1 else "bad")
        sub1 = f'<span class="{tone}">{pct:.0%} of your ${budget:,.0f} budget</span>'
    elif spent_last:
        sub1 = f"vs ${spent_last:,.2f} last month"
    else:
        sub1 = "set a budget below"

    days_in_month = (pd.Timestamp(today) + pd.offsets.MonthEnd(0)).day
    if spent_now and today.day >= 3:
        projected = f"${spent_now / today.day * days_in_month:,.0f}"
        sub2 = "at your current pace"
    else:
        projected, sub2 = "—", "needs a few days of receipts"

    period_df = filter_df(df, period, store)
    trips = period_df["receipt_id"].nunique()
    avg_trip = period_df.groupby("receipt_id")["amount"].sum().mean() if trips else 0
    dates = sorted(period_df.drop_duplicates("receipt_id")["receipt_date"].dropna())
    if len(dates) >= 2:
        gap = (dates[-1] - dates[0]).days / (len(dates) - 1)
        sub3 = f"about every {gap:.0f} days"
    else:
        sub3 = "per receipt"

    cards = [(today.strftime("%B"), f"${spent_now:,.2f}", sub1),
             (f"Projected {today.strftime('%B')}", projected, sub2),
             ("Average trip", f"${avg_trip:,.2f}", sub3),
             ("Trips", f"{trips}", period.lower())]
    return '<div class="stats">' + "".join(
        f'<div><span class="label">{k}</span><span class="value">{v}</span><span class="sub">{s}</span></div>'
        for k, v, s in cards) + "</div>"


def category_bars(df):
    if df.empty:
        return EMPTY
    by = df.groupby("category")["amount"].sum().sort_values(ascending=False)
    total, top = by.sum(), by.max()
    rows = []
    for cat, amt in by.items():
        color = CAT_COLORS.get(cat, "#B8BDB9")
        rows.append(
            f'<div class="catrow"><span class="caticon" style="color:{color}">{ICONS.get(cat, ICONS["Other"])}</span>'
            f'<span class="catname">{cat}</span>'
            f'<span class="track"><span class="fill" style="width:{amt / top * 100:.1f}%;background:{color}"></span></span>'
            f'<span class="catamt">${amt:,.2f}</span><span class="catpct">{amt / total:.0%}</span></div>')
    return '<div class="cats"><h3>Where it goes</h3>' + "".join(rows) + "</div>"


def monthly_chart(df):
    if df.empty:
        return None
    df = df.assign(period=df["receipt_date"].dt.to_period("M"))
    monthly = df.groupby(["period", "category"], as_index=False)["amount"].sum().sort_values("period")
    monthly["month"] = monthly["period"].dt.strftime("%b %Y")
    fig = px.bar(monthly, x="month", y="amount", color="category",
                 color_discrete_map=CAT_COLORS, labels={"amount": "", "month": ""})
    fig.update_xaxes(type="category")
    fig.update_yaxes(tickprefix="$", gridcolor=LINE, showgrid=True)
    fig.update_layout(bargap=0.55)
    fig.update_traces(hovertemplate="%{x}<br>$%{y:,.2f}<extra></extra>")
    totals = monthly.groupby(["period", "month"], as_index=False)["amount"].sum().sort_values("period")
    fig.add_trace(go.Scatter(x=totals["month"], y=totals["amount"], mode="text", showlegend=False,
                             hoverinfo="skip", text=[f"${t:,.2f}" for t in totals["amount"]],
                             textposition="top center", textfont=dict(size=13, color=INK)))
    fig.update_yaxes(range=[0, totals["amount"].max() * 1.15])
    return style(fig, "Month by month", height=360)


def top_items_chart(df):
    items = df[df["category"] != "Tax"] if not df.empty else df
    if items.empty:
        return None
    top = (items.groupby(["item", "category"], as_index=False)["amount"].sum()
                .nlargest(10, "amount").sort_values("amount"))
    fig = go.Figure(go.Bar(
        x=top["amount"], y=top["item"], orientation="h",
        marker_color=[CAT_COLORS.get(c, "#B8BDB9") for c in top["category"]],
        text=[f"${a:,.2f}" for a in top["amount"]], textposition="outside", cliponaxis=False,
        hovertemplate="%{y}<br>$%{x:,.2f}<extra></extra>"))
    fig.update_xaxes(visible=False)
    fig.update_yaxes(ticks="", showline=False)
    style(fig, "Most spent on")
    fig.update_layout(margin=dict(l=8, r=56, t=48, b=8))
    return fig


def spending_view(period, store, category):
    df = filter_df(prepared(), period, store, category)
    cats = sorted(df["category"].unique()) if not df.empty else []
    return (kpi_cards(period, store), category_bars(df), monthly_chart(df), top_items_chart(df),
            gr.update(choices=cats, value=None), gr.update(choices=[], value=None),
            gr.update(visible=False), gr.update(visible=False), gr.update(visible=False), "")


# ---------------- Drill-down: category → item → purchases ----------------
def drill_category(cat, period, store):
    df = filter_df(prepared(), period, store)
    df = df[df["category"] == cat] if cat and not df.empty else df.iloc[0:0]
    if df.empty:
        return gr.update(visible=False), gr.update(choices=[], value=None), gr.update(visible=False), \
               gr.update(visible=False), ""
    g = df.groupby("item").agg(times=("receipt_id", "nunique"), qty=("qty", "sum"),
                               spent=("amount", "sum"), avg_price=("unit_price", "mean")).reset_index()
    last = df.sort_values("receipt_date").groupby("item")["unit_price"].last()
    g["last_price"] = g["item"].map(last)
    g = g.sort_values("spent", ascending=False)
    table = pd.DataFrame({"Item": g["item"], "Times bought": g["times"], "Quantity": g["qty"].round(3),
                          "Spent": g["spent"].map(lambda v: f"${v:,.2f}"),
                          "Average price": g["avg_price"].map(lambda v: f"${v:,.2f}" if pd.notna(v) else ""),
                          "Last price": g["last_price"].map(lambda v: f"${v:,.2f}" if pd.notna(v) else "")})
    return (gr.update(value=table, visible=True), gr.update(choices=list(g["item"]), value=None),
            gr.update(visible=False), gr.update(visible=False), "")


def drill_item(item, period, store):
    df = filter_df(prepared(), period, store)
    df = df[df["item"] == item].sort_values("receipt_date") if item and not df.empty else df.iloc[0:0]
    if df.empty:
        return gr.update(visible=False), gr.update(visible=False), ""
    table = pd.DataFrame({"Date": df["receipt_date"].dt.strftime("%d %b %Y"), "Store": df["store"],
                          "Qty": df["qty"], "Unit": df["unit"],
                          "Unit price": df["unit_price"].map(lambda v: f"${v:,.2f}" if pd.notna(v) else ""),
                          "Paid": df["amount"].map(lambda v: f"${v:,.2f}")})
    fig = go.Figure(go.Scatter(x=df["receipt_date"], y=df["unit_price"], mode="lines+markers+text",
                               text=[f"${p:,.2f}" for p in df["unit_price"]], textposition="top center",
                               line=dict(color=ACCENT, width=2), marker=dict(size=8, color=ACCENT),
                               hovertemplate="%{x|%d %b %Y}<br>$%{y:,.2f}<extra></extra>"))
    fig.update_yaxes(tickprefix="$", gridcolor=LINE, rangemode="tozero")
    fig.update_xaxes(tickformat="%d %b")
    style(fig, f"Price of {item}", height=280)
    prices = df["unit_price"].dropna()
    if len(prices) >= 2 and prices.iloc[0]:
        change = prices.iloc[-1] / prices.iloc[0] - 1
        note = (f"Bought **{len(df)} times**. Price went from **${prices.iloc[0]:,.2f}** to "
                f"**${prices.iloc[-1]:,.2f}** ({change:+.0%}).")
    else:
        note = f"Bought **{len(df)} time{'s' if len(df) != 1 else ''}** so far."
    return gr.update(value=table, visible=True), gr.update(value=fig, visible=True), note


def save_budget(value, period, store, category):
    set_setting("monthly_budget", max(float(value or 0), 0))
    return kpi_cards(period, store)


# ---------------- Overview page ----------------
PRODUCE = [("veg_carrot", "#FCE7D6", "#D9631E"), ("veg_apple", "#FBE3E1", "#C2453D"),
           ("veg_lemon", "#FBF3CF", "#B08A0A"), ("veg_salad", "#E3F1DD", "#4E8C3A"),
           ("veg_pepper", "#FBE3E1", "#C2453D"), ("veg_milk", "#E3EEF9", "#3E7CC2"),
           ("veg_egg", "#F7EBD6", "#A5752A"), ("veg_bread", "#F7EBD6", "#A5752A"),
           ("veg_mushroom", "#EDE7F6", "#7A55B5")]


def welcome_html():
    veg = "".join(f'<span style="background:{bg};color:{fg}">{ICONS[k]}</span>' for k, bg, fg in PRODUCE)
    return ('<div class="welcome"><div><h1>Overview</h1><p>Your grocery spending at a glance.</p></div>'
            f'<div class="produce" aria-hidden="true">{veg}</div></div>')


def recent_html(df):
    if df.empty:
        return EMPTY
    g = (df.groupby("receipt_id")
           .agg(date=("receipt_date", "first"), store=("store", "first"), total=("amount", "sum"),
                items=("category", lambda c: int((c != "Tax").sum())))
           .sort_values("date", ascending=False).head(5))
    rows = "".join(f"<tr><td>{d:%d %b %Y}</td><td>{s}</td><td class='r'>{n}</td><td class='r'>${t:,.2f}</td></tr>"
                   for d, s, n, t in zip(g["date"], g["store"], g["items"], g["total"]))
    return ('<div class="cats"><h3>Recent receipts</h3><table class="mini"><thead><tr><th>Date</th><th>Store</th>'
            f'<th class="r">Items</th><th class="r">Total</th></tr></thead><tbody>{rows}</tbody></table></div>')


def insights_html(df):
    if df.empty:
        return EMPTY
    out = []
    items = df[df["category"] != "Tax"].sort_values("receipt_date")
    best = None
    for name, g in items.groupby("item"):
        p = g["unit_price"].dropna()
        if len(p) >= 2 and p.iloc[0] and p.iloc[-1] > p.iloc[0]:
            ch = p.iloc[-1] / p.iloc[0] - 1
            if not best or ch > best[0]:
                best = (ch, name.title(), p.iloc[0], p.iloc[-1], g["receipt_date"].iloc[0])
    if best:
        out.append(("#B7791F", "up", f"{best[1]} up {best[0]:.0%}",
                    f"${best[2]:,.2f} → ${best[3]:,.2f} since {best[4]:%d %b}"))
    by = items.groupby("category")["amount"].sum().sort_values(ascending=False)
    if len(by):
        top = by.index[0]
        out.append((CAT_COLORS.get(top, "#7D8A99"), "crown", f"{top} leads",
                    f"{by.iloc[0] / by.sum():.0%} of everything you’ve bought"))
    bags = items[items["item"].str.contains("REUBL|BAG", case=False, na=False)]["amount"].sum()
    if bags:
        out.append(("#2F7A3B", "bag", f"Bags: ${bags:,.2f} so far", "Bring your own to skip the fee"))
    dates = sorted(df.drop_duplicates("receipt_id")["receipt_date"].dropna())
    if len(dates) >= 2:
        gap = (dates[-1] - dates[0]).days / (len(dates) - 1)
        out.append(("#3E7CC2", "calendar", f"You shop about every {gap:.0f} days", f"{len(dates)} trips recorded"))
    rows = "".join(f'<div class="ins"><span class="ic" style="background:{c}">{ICONS[i]}</span>'
                   f'<div><b>{t}</b><span>{s}</span></div></div>' for c, i, t, s in out[:4])
    return f'<div class="cats"><h3>Quick insights</h3>{rows}</div>'


def overview_view(period, store, category):
    df = filter_df(prepared(), period, store, category)
    return kpi_cards(period, store), category_bars(df), recent_html(df), insights_html(df)


# ---------------- Records page ----------------
def records_table(period=PERIODS[0], store=ALL_STORES, category=ALL_CATS):
    df = filter_df(prepared(), period, store, category)
    cols = ["Date", "Store", "Item", "Qty", "Unit", "Unit price", "Amount", "Category"]
    if df.empty:
        return pd.DataFrame(columns=cols)
    df = df.sort_values(["receipt_date", "receipt_id"], ascending=False)
    out = df[["receipt_date", "store", "item", "qty", "unit", "unit_price", "amount", "category"]].copy()
    out["receipt_date"] = out["receipt_date"].dt.strftime("%Y-%m-%d")
    out.columns = cols
    return out


def refresh_all(period=PERIODS[0], store=ALL_STORES, category=ALL_CATS):
    stores = store_choices()
    store = store if store in stores else ALL_STORES
    return (*overview_view(period, store, category), *spending_view(period, store, category),
            records_table(period, store, category),
            gr.update(choices=receipt_choices(), value=[]), gr.update(choices=stores, value=store))


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
    date_note = ""
    if not (date_override or "").strip():
        days_off = (dt.date.today() - dt.date.fromisoformat(receipt_date)).days
        if days_off < -1 or days_off > 120:
            date_note = (f"  \nThe date read was {nice_date(receipt_date)}, which looks unlikely. If it's wrong, "
                         f"delete this receipt in Records and scan again with the date set under "
                         f"\"Date or store wrong?\".")
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
                    f"subtotal is ${r['subtotal']:,.2f}, so a line worth about ${abs(gap):,.2f} "
                    f"seems to be {'missing' if gap > 0 else 'extra or misread'}.")
    message += date_note
    return {**base, "kind": "saved", "matched": matched, "message": message}


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


def scan(image, date_override, store_override, period, store, category):
    if image is None:
        return (gr.update(),) * (3 + N_REFRESH)
    res = process_receipt(image, date_override, store_override)
    view = res["view"]
    return (gr.update(value=view, visible=not view.empty), res["message"], res["text"],
            *refresh_all(period, store, category))


def read_many(files, period, store, category, progress=gr.Progress()):
    if not files:
        return (gr.update(visible=False), "Add some receipt photos first.", *refresh_all(period, store, category))
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
        note += f" {flagged} didn't match their subtotal; check them in Records."
    return (gr.update(value=summary, visible=True), note, *refresh_all(period, store, category))


# ---------------- QR code for phones ----------------
def phone_link(request: gr.Request):
    """Work out the address a phone should open, from how this page was reached."""
    host = (request.headers.get("host") or "") if request else ""
    if not host:
        return None
    if host.startswith(("127.0.0.1", "localhost", "0.0.0.0")):
        ip = lan_ip()
        port = host.split(":")[1] if ":" in host else "7860"
        return f"http://{ip}:{port}" if ip else None
    proto = request.headers.get("x-forwarded-proto") or ("https" if "gradio.live" in host else "http")
    return f"{proto}://{host}"


def phone_qr(request: gr.Request):
    url = phone_link(request)
    if not url:
        return gr.update(visible=False), ""
    import io
    import qrcode
    buf = io.BytesIO()
    qrcode.make(url, border=2, box_size=8).save(buf, format="PNG")
    buf.seek(0)
    return gr.update(value=Image.open(buf), visible=True), f'<p class="qrurl">{url}</p>'


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
.gradio-container {{ max-width: 1120px !important; margin: 0 auto !important; }}
#shell {{ gap: 24px !important; align-items: flex-start !important; flex-wrap: wrap !important; }}
#side {{ background: #fff; border: 1px solid {LINE}; border-radius: 16px; padding: 16px 12px !important;
         position: sticky; top: 12px; }}
#content {{ min-width: 320px !important; }}
#brand {{ display: flex; align-items: center; gap: 10px; margin: 2px 4px 14px; }}
#brand .mark {{ width: 32px; height: 32px; border-radius: 9px; background: {ACCENT}; color: #fff;
                display: grid; place-items: center; }}
#brand .mark svg {{ width: 20px; height: 20px; }}
#brand span:last-child {{ font-size: 19px; font-weight: 700; letter-spacing: -0.01em; color: {INK}; }}
.nav button {{ justify-content: flex-start !important; text-align: left !important; border: none !important;
               box-shadow: none !important; font-weight: 500 !important; padding: 10px 12px !important; }}
.nav button.secondary {{ background: transparent !important; color: {MUTED} !important; }}
.nav button.secondary:hover {{ background: {BG} !important; color: {INK} !important; }}
.nav button.primary {{ background: {ACCENT} !important; color: #fff !important; }}
.welcome {{ display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap;
            background: #fff; border: 1px solid {LINE}; border-radius: 16px; padding: 18px 20px; }}
.welcome h1 {{ margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: {INK}; }}
.welcome p {{ margin: 4px 0 0; color: {MUTED}; }}
.produce {{ display: flex; gap: 8px; flex-wrap: wrap; }}
.produce span {{ width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; }}
.produce svg {{ width: 21px; height: 21px; }}
table.mini {{ width: 100%; border-collapse: collapse; font-size: 14px; }}
table.mini th {{ text-align: left; font-weight: 600; color: {ACCENT}; background: #E7F2E3; padding: 8px 10px; }}
table.mini td {{ padding: 9px 10px; border-bottom: 1px solid {LINE}; font-variant-numeric: tabular-nums; }}
table.mini .r {{ text-align: right; }}
.ins {{ display: flex; gap: 12px; align-items: flex-start; padding: 7px 0; }}
.ins .ic {{ width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: #fff; flex: none; }}
.ins .ic svg {{ width: 18px; height: 18px; }}
.ins b {{ display: block; font-weight: 600; color: {INK}; }}
.ins span {{ color: {MUTED}; font-size: 14px; }}
.side-label {{ color: {MUTED}; font-size: 13px; margin: 14px 0 2px; }}
.qrurl {{ font-size: 12px; color: {MUTED}; word-break: break-all; margin: 4px 0 0; }}
.page-title h1 {{ font-size: 28px; font-weight: 650; letter-spacing: -0.02em; margin: 6px 0 2px; color: {INK}; }}
.page-title p {{ color: {MUTED}; margin: 0 0 8px; font-size: 15px; }}
.stats {{ display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }}
.stats > div {{ background: #fff; border: 1px solid {LINE}; border-radius: 14px; padding: 14px 16px; }}
.stats .label {{ display: block; color: {MUTED}; font-size: 13px; }}
.stats .value {{ display: block; margin: 2px 0; font-size: 24px; font-weight: 650; letter-spacing: -0.01em;
                 color: {INK}; font-variant-numeric: tabular-nums; }}
.stats .sub {{ display: block; color: {MUTED}; font-size: 13px; }}
.good {{ color: {ACCENT}; }} .warn {{ color: #B7791F; }} .bad {{ color: #C2453D; }}
.cats {{ background: #fff; border: 1px solid {LINE}; border-radius: 14px; padding: 14px 16px; }}
.cats h3 {{ font-size: 15px; font-weight: 600; margin: 0 0 10px; color: {INK}; }}
.catrow {{ display: grid; grid-template-columns: 26px 130px minmax(0, 1fr) 76px 40px; align-items: center;
           gap: 8px; padding: 5px 0; font-size: 14px; color: {INK}; }}
.caticon svg {{ width: 20px; height: 20px; display: block; }}
.track {{ height: 9px; border-radius: 5px; background: {BG}; overflow: hidden; }}
.fill {{ display: block; height: 9px; border-radius: 5px; }}
.catamt {{ text-align: right; font-variant-numeric: tabular-nums; }}
.catpct {{ text-align: right; color: {MUTED}; font-size: 13px; font-variant-numeric: tabular-nums; }}
.empty {{ padding: 40px 24px; text-align: center; color: {MUTED}; background: #fff;
          border: 1px dashed #CDD3CF; border-radius: 14px; line-height: 1.6; }}
.empty strong {{ color: {INK}; }}
.hint {{ color: {MUTED}; font-size: 14px; }}
table td, table th {{ font-variant-numeric: tabular-nums; }}
@media (max-width: 720px) {{
  .stats {{ grid-template-columns: repeat(2, minmax(0, 1fr)); }}
  .stats .value {{ font-size: 20px; }}
  .catrow {{ grid-template-columns: 24px 96px minmax(0, 1fr) 68px; }}
  .catpct {{ display: none; }}
}}
"""

SQL_EXAMPLE = """SELECT category, ROUND(SUM(amount), 2) AS spent
FROM expenses
GROUP BY category
ORDER BY spent DESC"""

PAGES = [("Overview", ""),
         ("Scan", "Snap a receipt and your spending updates itself."),
         ("Upload several", "Add a handful of receipt photos at once. Each takes about half a minute."),
         ("Spend Analytics", "Where your grocery money goes, and how it changes."),
         ("Reports", "Every line from every receipt, plus export, delete and SQL.")]


def title_html(i):
    name, sub = PAGES[i]
    return "" if i == 0 else f'<div class="page-title"><h1>{name}</h1><p>{sub}</p></div>'


# ---------------- Layout ----------------
with gr.Blocks(title="Groceries") as demo:
    with gr.Row(equal_height=False, elem_id="shell"):
        # Left column: sits beside the pages, so it never covers them
        with gr.Column(scale=0, min_width=240, elem_id="side"):
            gr.HTML(f'<div id="brand"><span class="mark">{ICONS["_logo"]}</span><span>Groceries</span></div>')
            nav_btns = [gr.Button(name, variant="primary" if i == 0 else "secondary", size="md",
                                  elem_classes="nav") for i, (name, _) in enumerate(PAGES)]
            gr.HTML('<p class="side-label">Filters</p>')
            f_period = gr.Dropdown(PERIODS, value=PERIODS[0], label="Period")
            f_store = gr.Dropdown([ALL_STORES], value=ALL_STORES, label="Store")
            f_cat = gr.Dropdown([ALL_CATS] + CATEGORIES + ["Tax"], value=ALL_CATS, label="Category")
            gr.HTML('<p class="side-label">Open on your phone</p>')
            qr_img = gr.Image(show_label=False, interactive=False, height=170, visible=False,
                              buttons=[], container=False)
            qr_url = gr.HTML()

        with gr.Column(scale=1, elem_id="content"):
            page_title = gr.HTML(title_html(0))

            with gr.Column(visible=True) as page_home:
                gr.HTML(welcome_html())
                ov_kpi = gr.HTML()
                with gr.Row(equal_height=False):
                    with gr.Column(scale=1):
                        ov_bars = gr.HTML()
                    with gr.Column(scale=1):
                        ov_ins = gr.HTML()
                ov_recent = gr.HTML()

            with gr.Column(visible=False) as page_scan:
                with gr.Row(equal_height=False):
                    with gr.Column(scale=5):
                        image = gr.Image(type="pil", sources=["upload", "webcam"], height=440, label="Receipt photo")
                        with gr.Accordion("Date or store wrong? Set them here", open=False):
                            date_in = gr.Textbox(label="Date", placeholder="YYYY-MM-DD, leave blank to read it")
                            store_in = gr.Textbox(label="Store", placeholder="Leave blank to read it")
                    with gr.Column(scale=6):
                        status = gr.Markdown("Take a photo or drop one in. The receipt is read and saved automatically.")
                        items = gr.Dataframe(label="Items", interactive=False, wrap=True, visible=False)
                        with gr.Accordion("What the model read", open=False):
                            raw_text = gr.Textbox(lines=14, show_label=False)

            with gr.Column(visible=False) as page_bulk:
                files = gr.File(file_count="multiple", file_types=["image"], label="Receipt photos", height=200)
                read_btn = gr.Button("Read all receipts", variant="primary")
                batch_note = gr.Markdown()
                batch_table = gr.Dataframe(interactive=False, wrap=True, label="Results", visible=False)

            with gr.Column(visible=False) as page_spend:
                kpi = gr.HTML()
                with gr.Row(equal_height=False):
                    with gr.Column(scale=1):
                        bars = gr.HTML()
                    with gr.Column(scale=1):
                        top = gr.Plot(show_label=False)
                trend = gr.Plot(show_label=False)
                with gr.Accordion("Monthly budget", open=False):
                    with gr.Row():
                        budget_in = gr.Number(label="Budget per month ($)", value=get_budget, minimum=0)
                        budget_btn = gr.Button("Save budget", scale=0, min_width=140)
                gr.HTML('<div class="page-title"><h1 style="font-size:20px">Look closer</h1>'
                        '<p>Pick a category, then an item, to see every purchase and how its price changed.</p></div>')
                with gr.Row():
                    d_cat = gr.Dropdown(label="Category", choices=[], value=None)
                    d_item = gr.Dropdown(label="Item", choices=[], value=None)
                d_items = gr.Dataframe(label="Items in this category", interactive=False, wrap=True, visible=False)
                d_note = gr.Markdown()
                d_price = gr.Plot(show_label=False, visible=False)
                d_buys = gr.Dataframe(label="Every purchase", interactive=False, wrap=True, visible=False)

            with gr.Column(visible=False) as page_records:
                records = gr.Dataframe(label="Every item you've scanned (follows the filters)",
                                       interactive=False, wrap=True, max_height=420, show_search="search")
                with gr.Row():
                    export_btn = gr.Button("Download as Excel")
                    file_out = gr.File(label="Excel file", height=80)
                with gr.Accordion("Delete receipts", open=False):
                    sel_all = gr.Checkbox(label="Select all", value=False)
                    del_pick = gr.CheckboxGroup(label="Receipts", choices=[])
                    del_btn = gr.Button("Delete selected", variant="stop")
                    with gr.Row(visible=False) as confirm_row:
                        confirm_text = gr.Markdown()
                        yes_btn = gr.Button("Yes, delete", variant="stop", scale=0, min_width=120)
                        no_btn = gr.Button("Cancel", scale=0, min_width=100)
                    del_note = gr.Markdown()
                with gr.Accordion("Query with SQL", open=False):
                    gr.Markdown("Everything lives in one table called `expenses`, with columns receipt_id, "
                                "receipt_date, store, item, qty, unit, unit_price, amount, department, "
                                "category and created_at. Queries are read-only.", elem_classes="hint")
                    sql_in = gr.Code(value=SQL_EXAMPLE, language="sql", label="Query", lines=5)
                    sql_btn = gr.Button("Run query", variant="primary")
                    sql_note = gr.Markdown()
                    sql_out = gr.Dataframe(interactive=False, wrap=True, label="Result")

    # ----- wiring -----
    pages = [page_home, page_scan, page_bulk, page_spend, page_records]
    filters = [f_period, f_store, f_cat]
    refresh_outputs = [ov_kpi, ov_bars, ov_recent, ov_ins,
                       kpi, bars, trend, top, d_cat, d_item, d_items, d_price, d_buys, d_note,
                       records, del_pick, f_store]

    def go_to(i):
        return ([title_html(i)] + [gr.update(visible=j == i) for j in range(len(pages))]
                + [gr.update(variant="primary" if j == i else "secondary") for j in range(len(pages))])

    for i, b in enumerate(nav_btns):
        b.click(lambda i=i: go_to(i), None, [page_title, *pages, *nav_btns])

    for f in filters:
        f.change(refresh_all, filters, refresh_outputs)

    image.change(scan, [image, date_in, store_in, *filters], [items, status, raw_text, *refresh_outputs])
    read_btn.click(read_many, [files, *filters], [batch_table, batch_note, *refresh_outputs])
    budget_btn.click(save_budget, [budget_in, *filters], kpi)
    d_cat.change(drill_category, [d_cat, f_period, f_store], [d_items, d_item, d_price, d_buys, d_note])
    d_item.change(drill_item, [d_item, f_period, f_store], [d_buys, d_price, d_note])
    sel_all.input(toggle_all, sel_all, del_pick)
    del_btn.click(ask_delete, del_pick, [confirm_row, confirm_text, del_note])
    yes_btn.click(delete_receipts, [del_pick, *filters], [del_note, confirm_row, sel_all, *refresh_outputs])
    no_btn.click(lambda: gr.update(visible=False), None, confirm_row)
    sql_btn.click(run_sql, sql_in, [sql_out, sql_note])
    export_btn.click(export_excel, None, file_out)
    demo.load(refresh_all, filters, refresh_outputs)
    demo.load(phone_qr, None, [qr_img, qr_url])

N_REFRESH = len(refresh_outputs)


def print_qr(url):
    """Show a QR code in the terminal so a phone camera can open the app."""
    try:
        import qrcode
        qr = qrcode.QRCode(border=1)
        qr.add_data(url)
        qr.print_ascii(invert=True)
    except Exception:
        pass


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
            print(f"  Open on your phone:   http://{ip}:7860  (same Wi-Fi), or scan:")
            print_qr(f"http://{ip}:7860")
        print("=" * 55 + "\n")

    demo.launch(server_name="0.0.0.0", share=SHARE, show_error=True,
                auth=("receipts", PASSWORD) if PASSWORD else None,
                theme=THEME, css=CSS, footer_links=[])
