# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

FreshAnalytics: a grocery receipt tracker. You photograph a receipt, a vision-language model (Qwen3-VL from Hugging Face) reads it into JSON, and the line items are saved and shown in spending dashboards. It's built with Gradio, but the UI is a custom HTML/JS single page rather than Gradio components.

## Commands

Windows dev machine: use `py`, not `python`. There are no tests, linter or build step.

- `py -m pip install -r requirements.txt`: install dependencies
- `py demo_app.py`: run the UI at http://127.0.0.1:7860 with sample receipts. No model or GPU needed. It uses its own `demo.db` and blanks the Neon env vars so it never touches real data. This is the way to check UI and dashboard changes locally.
- `py app.py`: the full app. Loads the model at startup (about 9 GB download, needs a GPU in practice) and prints LAN URLs and a QR code for phones.
- `py migrate_to_neon.py grocery.db` or `py migrate_to_neon.py grocery_expenses.xlsx`: copy older local or exported receipts into Neon. Receipts already there are skipped.
- `receipt_parser.py` is pure Python and can be imported and exercised on its own.

The real app normally runs on a Colab T4 GPU through `colab_app.ipynb`. That notebook `git clone`s / `git pull`s **this GitHub repo**, so code changes only reach Colab after they are pushed. It sets `DATABASE_URL` (or `GROCERY_DB=/content/grocery.db`), `GRADIO_SHARE=1` and `APP_PASSWORD` (login user `receipts`), runs `app.py` in the background with logs in `/content/app.log`, and its last cell waits for `STOP` and then releases the GPU.

## Architecture

`app.py` holds nearly everything, in this order:

1. **Scanning**: `read_receipt` sends the photo plus `PROMPT` to the model and gets text back. `to_receipt` pulls the JSON out of that text and normalises it. Categories come from the model; when it gives none, `receipt_parser.rule_category` assigns one from the department header and keywords. `fix_swapped_date` repairs YY/MM/DD-style misreads. `read_with_check` scans again with a corrective hint when the items don't add up to the printed subtotal. `process_receipt` adds a "Sales tax" line, rejects duplicates, and saves the receipt.
2. **Storage**: SQLAlchemy. It uses Neon Postgres (driver `pg8000`, SSL handled in `_postgres_engine`) when `DATABASE_URL`, `POSTGRES_URL` or `NEON_DATABASE_URL` is set. `.env.local` or `.env` next to `app.py` is loaded automatically. Otherwise it uses SQLite at `GROCERY_DB`, `/data/grocery.db` or `grocery.db`. The engine is created lazily, so callers such as `demo_app.py` can change `app.DB_PATH` first. The tables are `expenses` (one row per line item), `receipt_info` (subtotal, total, time) and `settings` (budgets). `SCHEMA` holds the DDL for both dialects, and `get_engine` adds missing columns with `ALTER TABLE` to upgrade older databases. **Every schema change has to work on both SQLite and Postgres and needs a matching upgrade step there.**
3. **Older Gradio-era view helpers** (`kpi_cards`, `*_chart`, `*_html`, and so on), which use Plotly.
4. **Page API** (`api_*` functions): JSON-friendly endpoints. Results go through `_clean` to convert Decimal and NaN values. Scans run in the background: `api_scan_start` starts a thread behind `_SCAN_LOCK` (one GPU scan at a time) and returns a job id, then `web/page.js` polls `api_scan_status` every 2 seconds.
5. **UI wiring**: `gr.HTML(PAGE_HTML, js_on_load=PAGE_JS, server_functions=PAGE_FUNCTIONS)`. The page calls Python as `server.<name>(...)` through `call()` in `web/page.js`. Gradio passes each call as **one** value (nothing, a single argument, or a list), so new endpoints need an adapter in `PAGE_FUNCTIONS` that unpacks it. To add an endpoint, write `api_x`, register it in `PAGE_FUNCTIONS`, and call it from `page.js`.

The front end is `web/page.html` (markup and CSS) plus `web/page.js` (hash-routed views, charts, upload, QR code). External resources are limited to Google Fonts (Figtree) and qrcodejs from cdnjs, set in `HEAD`. `icons.py` holds inline Tabler SVG icons keyed by category.

`receipt_parser.py` started as an OCR text parser. Today `app.py` only uses `CATEGORIES`, `DEPARTMENTS`, `rule_category` and `find_store` from it; `parse_receipt` is no longer in the scan path.

`demo_data.py` holds hand-typed receipt JSON. `demo_app.py` feeds it through `process_receipt` by temporarily replacing `app.read_receipt`, then swaps in a stub that rejects scans. If you change `process_receipt` or `read_receipt` signatures, keep this monkeypatching working.

## Conventions

- `.gitignore` excludes all `*.db`, `*.xlsx`, `*.csv`, images and `.env*` files. Local `grocery.db`, `demo.db` and `.env.local` (the Neon URL) hold real data and secrets: don't commit them or print their contents.
- User-facing messages (in `api_*` results and in `page.js`) are written in plain, friendly language for a non-technical user, often in Markdown that `mdToHtml` renders.
- Commit messages are short, plain summaries of what changed for the user (see `git log`).
