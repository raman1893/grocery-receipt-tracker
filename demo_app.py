"""Try FreshAnalytics with sample receipts: no AI model, no GPU, no Colab.

Run:   py demo_app.py      then open http://127.0.0.1:7860      (Ctrl+C to stop)

app.py is not changed. This file borrows its screens and logic, uses its own
database (demo.db) so real records are never touched, and switches scanning off.
"""
import os
for _key in ("DATABASE_URL", "POSTGRES_URL", "NEON_DATABASE_URL"):
    os.environ[_key] = ""          # the demo never touches your real (Neon) database

import gradio as gr
import app
from demo_data import DEMO_RECEIPTS

app.DB_PATH = "demo.db"                                   # separate database for the demo

if app.load_all().empty:                                  # load the samples once
    queue = list(DEMO_RECEIPTS)
    app.read_receipt = lambda image, hint="": queue.pop(0)
    for _ in DEMO_RECEIPTS:
        app.process_receipt(None)


def scanning_off(image, hint=""):
    raise gr.Error("Demo mode: scanning is switched off. Explore Spending and Records "
                   "with the sample receipts.")


app.read_receipt = scanning_off

print("\n" + "=" * 55)
print("  DEMO: sample receipts, no model loaded")
print("  Open on this laptop:  http://127.0.0.1:7860")
print("=" * 55 + "\n")
app.demo.launch(**app.launch_options())
