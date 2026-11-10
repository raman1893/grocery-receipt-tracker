"""Copy receipts you scanned before Neon into Neon.

Run from the project folder, with your connection string in .env.local:
    py migrate_to_neon.py grocery.db                    (a local database file)
    py migrate_to_neon.py grocery_expenses.xlsx         (an Excel file from "Download as Excel")
Receipts already in Neon are skipped, so running it twice is safe.
"""
import sys
import sqlite3
import pandas as pd
import app

if app.storage_kind() != "postgres":
    sys.exit("No Neon connection string found. Put DATABASE_URL=... in .env.local first.")
src = sys.argv[1] if len(sys.argv) > 1 else "grocery.db"

info = None
if src.lower().endswith((".xlsx", ".xls")):
    df = pd.read_excel(src, sheet_name="Items")
else:
    con = sqlite3.connect(src)
    try:
        df = pd.read_sql("SELECT * FROM expenses", con)
        try:
            info = pd.read_sql("SELECT * FROM receipt_info", con)
        except Exception:
            pass
    finally:
        con.close()

if df.empty:
    sys.exit(f"No receipts found in {src}.")
for col in app.COLUMNS:
    if col not in df.columns:
        df[col] = None
df["receipt_id"] = df["receipt_id"].astype(str)
df["receipt_date"] = df["receipt_date"].astype(str).str[:10]
existing = {r[0] for r in app.db_rows("SELECT DISTINCT receipt_id FROM expenses")}
new = df[~df["receipt_id"].isin(existing)]
if new.empty:
    print(f"Nothing to copy: all {df['receipt_id'].nunique()} receipts are already in Neon.")
    sys.exit(0)
app.save_rows(new)
if info is not None:
    for row in info[info["receipt_id"].astype(str).isin(new["receipt_id"])].itertuples():
        app.save_receipt_info(str(row.receipt_id), row.subtotal, row.total)
print(f"Copied {new['receipt_id'].nunique()} receipts ({len(new)} lines) into Neon. "
      f"Skipped {df['receipt_id'].nunique() - new['receipt_id'].nunique()} already there.")
