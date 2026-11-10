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


# ---------------- Database: Neon (PostgreSQL) when a connection string is set, otherwise SQLite ----------------
import ssl
from decimal import Decimal
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
from sqlalchemy import create_engine, text, inspect, bindparam


def _load_env_files():
    """Read .env.local / .env next to app.py (never committed to GitHub)."""
    here = Path(__file__).resolve().parent
    for name in (".env.local", ".env"):
        p = here / name
        if not p.exists():
            continue
        for line in p.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            k = k.strip().removeprefix("export ").strip()
            os.environ.setdefault(k, v.strip().strip('"').strip("'"))


_load_env_files()


def database_url():
    for key in ("DATABASE_URL", "POSTGRES_URL", "NEON_DATABASE_URL"):
        if os.environ.get(key, "").strip():
            return os.environ[key].strip()
    return None


_ENGINES = {}


def _postgres_engine(url):
    parts = urlsplit(url)
    q = dict(parse_qsl(parts.query))
    use_ssl = q.pop("sslmode", "require") != "disable"
    for k in ("channel_binding", "options", "sslrootcert", "sslcert", "sslkey"):
        q.pop(k, None)
    clean = urlunsplit(("postgresql+pg8000", parts.netloc, parts.path, urlencode(q), ""))
    args = {"ssl_context": ssl.create_default_context()} if use_ssl else {}
    return create_engine(clean, connect_args=args, pool_pre_ping=True, pool_recycle=300)


SCHEMA = {
    "sqlite": [
        """CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT, receipt_id TEXT, receipt_date TEXT, store TEXT,
            item TEXT, qty REAL, unit TEXT, unit_price REAL, amount REAL, department TEXT,
            category TEXT, created_at TEXT)""",
        "CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)",
        "CREATE TABLE IF NOT EXISTS receipt_info (receipt_id TEXT PRIMARY KEY, subtotal REAL, total REAL)",
    ],
    "postgres": [
        """CREATE TABLE IF NOT EXISTS expenses (
            id SERIAL PRIMARY KEY, receipt_id TEXT, receipt_date TEXT, store TEXT,
            item TEXT, qty NUMERIC(12,3), unit TEXT, unit_price NUMERIC(12,3), amount NUMERIC(12,2),
            department TEXT, category TEXT, created_at TEXT)""",
        "CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)",
        "CREATE TABLE IF NOT EXISTS receipt_info (receipt_id TEXT PRIMARY KEY, subtotal NUMERIC(12,2), total NUMERIC(12,2))",
    ],
}


def get_engine():
    """One engine per database; created on first use (demo_app can change DB_PATH before that)."""
    url = database_url()
    key = url or f"sqlite:{DB_PATH}"
    if key not in _ENGINES:
        if url:
            eng, kind = _postgres_engine(url), "postgres"
        else:
            eng, kind = create_engine(f"sqlite:///{DB_PATH}"), "sqlite"
        with eng.begin() as c:
            for ddl in SCHEMA[kind]:
                c.execute(text(ddl))
            have = {col["name"] for col in inspect(c).get_columns("expenses")}
            for col, typ in (("unit", "TEXT"), ("unit_price", "REAL"), ("department", "TEXT")):
                if col not in have:                       # upgrade older databases
                    c.execute(text(f"ALTER TABLE expenses ADD COLUMN {col} {typ}"))
        eng.kind = kind
        _ENGINES[key] = eng
    return _ENGINES[key]


def storage_kind():
    return get_engine().kind


def db_rows(sql, **params):
    q = text(sql)
    for k, v in params.items():
        if isinstance(v, (list, tuple)):
            q = q.bindparams(bindparam(k, expanding=True))
    with get_engine().connect() as c:
        return c.execute(q, params).fetchall()


def db_run(sql, **params):
    q = text(sql)
    for k, v in params.items():
        if isinstance(v, (list, tuple)):
            q = q.bindparams(bindparam(k, expanding=True))
    with get_engine().begin() as c:
        return c.execute(q, params).rowcount


def load_all():
    with get_engine().connect() as c:
        df = pd.read_sql(text("SELECT * FROM expenses ORDER BY receipt_date, id"), c)
    for col in ("qty", "unit_price", "amount"):
        df[col] = pd.to_numeric(df[col], errors="coerce")
    return df


def is_duplicate(receipt_date, store, amount):
    rows = db_rows("SELECT SUM(amount) FROM expenses WHERE receipt_date = :d AND store = :s GROUP BY receipt_id",
                   d=receipt_date, s=store)
    return any(abs(float(s or 0) - amount) < 0.01 for (s,) in rows)


def save_rows(df):
    with get_engine().begin() as c:
        df[COLUMNS].to_sql("expenses", c, if_exists="append", index=False)


def save_receipt_info(receipt_id, subtotal, total):
    db_run("""INSERT INTO receipt_info (receipt_id, subtotal, total) VALUES (:r, :s, :t)
              ON CONFLICT (receipt_id) DO UPDATE SET subtotal = excluded.subtotal, total = excluded.total""",
           r=receipt_id, s=subtotal, t=total)


def receipt_info():
    return {rid: (float(s) if s is not None else None)
            for rid, s in db_rows("SELECT receipt_id, subtotal FROM receipt_info")}


def delete_receipt_ids(ids):
    lines = db_run("DELETE FROM expenses WHERE receipt_id IN :ids", ids=list(ids))
    db_run("DELETE FROM receipt_info WHERE receipt_id IN :ids", ids=list(ids))
    return lines


def receipt_choices():
    rows = db_rows("""SELECT receipt_id, receipt_date, store, SUM(amount) FROM expenses
                      GROUP BY receipt_id, receipt_date, store ORDER BY receipt_date DESC, receipt_id DESC""")
    return [(f"{nice_date(d)}, {s}, ${float(t):,.2f}", rid) for rid, d, s, t in rows]


def get_setting(key, default=None):
    rows = db_rows("SELECT value FROM settings WHERE key = :k", k=key)
    return rows[0][0] if rows else default


def set_setting(key, value):
    db_run("""INSERT INTO settings (key, value) VALUES (:k, :v)
              ON CONFLICT (key) DO UPDATE SET value = excluded.value""", k=key, v=str(value))


def get_budget():
    try:
        return float(get_setting("monthly_budget", 0) or 0)
    except ValueError:
        return 0.0


def run_sql(query):
    """Run one read-only query for the SQL box."""
    q = (query or "").strip().rstrip(";")
    if not re.match(r"^(select|with)\b", q, re.I) or ";" in q:
        return pd.DataFrame(), "Only a single SELECT query can run here, so your data can't be changed."
    eng = get_engine()
    try:
        if eng.kind == "postgres":
            with eng.connect() as c:
                with c.begin():
                    c.exec_driver_sql("SET TRANSACTION READ ONLY")
                    c.exec_driver_sql("SET LOCAL statement_timeout = 10000")
                    res = c.exec_driver_sql(q.replace("%", "%%"))
                    df = pd.DataFrame(res.fetchall(), columns=list(res.keys()))
        else:
            uri = Path(DB_PATH).resolve().as_uri() + "?mode=ro"
            con = sqlite3.connect(uri, uri=True)
            try:
                df = pd.read_sql_query(q, con)
            finally:
                con.close()
    except Exception as e:
        orig = getattr(e, "orig", e)
        msg = orig.args[0].get("M") if orig.args and isinstance(orig.args[0], dict) else str(orig).split("\n")[0]
        return pd.DataFrame(), f"The query didn't run: {str(msg)[:300]}"
    df = df.apply(lambda s: s.map(lambda v: float(v) if isinstance(v, Decimal) else v))
    shown = df.head(500)
    return shown, f"{len(df)} rows" + (" (showing the first 500)" if len(df) > 500 else "")


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
    save_receipt_info(df["receipt_id"].iloc[0], r["subtotal"], r["total"])   # for the Matched / Check chip

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
    return {**base, "kind": "saved", "matched": matched, "message": message,
            "receipt_id": df["receipt_id"].iloc[0]}


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


# ---------------- Functions the FreshAnalytics page calls ----------------
import base64
from urllib.parse import urlparse

DEFAULT_CAT_BUDGETS = {"Produce": 40, "Dairy & Eggs": 35, "Meat & Seafood": 35,
                       "Pantry": 25, "Bakery": 15, "Snacks": 15}


def _clean(v):
    """Turn pandas/numpy values into plain JSON values."""
    if v is None:
        return None
    if isinstance(v, Decimal):
        return float(v)
    try:
        if pd.isna(v):
            return None
    except (TypeError, ValueError):
        pass
    return v.item() if hasattr(v, "item") else v


def api_data():
    """Everything the page needs: receipts with their lines, and budgets."""
    df = load_all()
    info = receipt_info()
    receipts = []
    if not df.empty:
        for rid, g in df.groupby("receipt_id", sort=False):
            items = g[g["category"] != "Tax"]
            printed = info.get(rid)
            receipts.append({
                "id": str(rid),
                "date": str(g["receipt_date"].iloc[0])[:10],
                "store": g["store"].iloc[0] or "Unknown store",
                "subtotal": round(float(printed if printed is not None else items["amount"].sum()), 2),
                "printed": printed is not None,
                "tax": round(float(g.loc[g["category"] == "Tax", "amount"].sum()), 2),
                "items": [{"name": r.item, "qty": _clean(r.qty) or 1, "unit": r.unit or "ea",
                           "unit_price": _clean(r.unit_price), "amount": round(float(r.amount), 2),
                           "category": r.category or "Other"} for r in items.itertuples()],
            })
        receipts.sort(key=lambda r: (r["date"], r["id"]))
    try:
        cats = json.loads(get_setting("cat_budgets") or "null") or DEFAULT_CAT_BUDGETS
    except ValueError:
        cats = DEFAULT_CAT_BUDGETS
    return {"receipts": receipts, "budget": get_budget(), "cat_budgets": cats, "storage": storage_kind()}


def api_scan(path, date_override="", store_override=""):
    """Read one uploaded receipt photo and save it."""
    try:
        res = process_receipt(Image.open(path), date_override or "", store_override or "")
    except Exception as e:                       # includes demo mode's "scanning is switched off"
        return {"kind": "error", "message": str(e)}
    view = res.get("view")
    lines = [] if view is None or view.empty else [
        {"name": r["Item"], "qty": _clean(r["Qty"]), "unit": r["Unit"], "amount": _clean(r["Amount"]),
         "category": r["Category"]} for r in view.to_dict("records")]
    return {"kind": res.get("kind"), "message": res.get("message", ""), "store": res.get("store"),
            "date": res.get("date"), "paid": _clean(res.get("paid")), "matched": res.get("matched"),
            "items": _clean(res.get("items")), "lines": lines, "text": res.get("text", "")}


def api_delete(ids):
    ids = [str(i) for i in (ids or [])]
    if not ids:
        return {"deleted": 0, "lines": 0}
    lines = delete_receipt_ids(ids)
    return {"deleted": len(ids), "lines": lines}


def api_sql(query):
    df, note = run_sql(query)
    rows = [[_clean(v) for v in row] for row in df.itertuples(index=False)] if not df.empty else []
    return {"columns": [str(c) for c in df.columns], "rows": rows, "note": note}


def api_export():
    path = export_excel()
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    return {"name": "freshanalytics_receipts.xlsx", "b64": data}


def api_save_budgets(budget, cat_budgets):
    set_setting("monthly_budget", max(float(budget or 0), 0))
    clean = {str(k): max(float(v or 0), 0) for k, v in (cat_budgets or {}).items()}
    set_setting("cat_budgets", json.dumps(clean))
    return True


def api_phone_url(origin):
    """The address a phone should open: the public link, or this laptop's Wi-Fi address."""
    u = urlparse(origin or "")
    if u.hostname in ("localhost", "127.0.0.1", "0.0.0.0"):
        ip = lan_ip()
        return f"http://{ip}:{u.port or 7860}" if ip else origin
    return origin


# ---------------- FreshAnalytics page ----------------
# The look lives in web/page.html and web/page.js; Gradio supplies the login, the share link,
# and runs the Python functions above when the page calls them (server.api_data(), ...).
WEB = Path(__file__).resolve().parent / "web"
PAGE_HTML = (WEB / "page.html").read_text(encoding="utf-8")
PAGE_JS = (WEB / "page.js").read_text(encoding="utf-8")
HEAD = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">'
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>')

# Used for Gradio's own login screen
THEME = gr.themes.Base(
    font=[gr.themes.GoogleFont("Figtree"), "system-ui", "sans-serif"], radius_size="md",
).set(
    body_background_fill="#F3F5F2", body_background_fill_dark="#121614",
    button_primary_background_fill="#2F7A3B", button_primary_background_fill_dark="#4E9B58",
    button_primary_background_fill_hover="#28692F", button_primary_background_fill_hover_dark="#5BAA66",
    button_primary_text_color="#FFFFFF", button_primary_text_color_dark="#0E130F",
    color_accent="#2F7A3B",
)

# Hide Gradio's frame so the page fills the window edge to edge
CSS = """
.gradio-container { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
.gradio-container > .main, .gradio-container .wrap, .gradio-container .contain { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
.gradio-container .column, .gradio-container .block, .gradio-container .form { gap: 0 !important; border: none !important; box-shadow: none !important; background: transparent !important; }
#fa-page { padding: 0 !important; }
footer { display: none !important; }
"""

# Gradio hands each page call to Python as ONE value: nothing ([]), the single argument,
# or a list when the page passes several. These adapters unpack that for the functions above.
def _page_fn(name, call):
    call.__name__ = name                    # the page calls server.<name>(...)
    return call


PAGE_FUNCTIONS = [
    _page_fn("api_data", lambda _=None: api_data()),
    _page_fn("api_scan", lambda args: api_scan(*(list(args) + ["", ""])[:3])),
    _page_fn("api_delete", lambda ids: api_delete(ids)),
    _page_fn("api_sql", lambda query: api_sql(query)),
    _page_fn("api_export", lambda _=None: api_export()),
    _page_fn("api_save_budgets", lambda args: api_save_budgets(*args)),
    _page_fn("api_phone_url", lambda origin: api_phone_url(origin)),
]

with gr.Blocks(title="FreshAnalytics", fill_width=True) as demo:
    gr.HTML(PAGE_HTML, js_on_load=PAGE_JS, head=HEAD, elem_id="fa-page",
            container=False, padding=False, apply_default_css=False,
            server_functions=PAGE_FUNCTIONS)


def launch_options():
    """Shared by app.py and demo_app.py."""
    return dict(theme=THEME, css=CSS, footer_links=[])


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
                **launch_options())
