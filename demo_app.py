"""Try FreshAnalytics with sample receipts: no AI model, no GPU, no Colab.

Run:   py demo_app.py           then open http://127.0.0.1:7860      (Ctrl+C to stop)
       py demo_app.py --share   also gives a public link for your phone on any network

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

ip = app.lan_ip()
print("\n" + "=" * 55)
print("  DEMO: sample receipts, no model loaded")
print("  Open on this laptop:  http://127.0.0.1:7860")
if ip:
    print(f"  Open on your phone:   http://{ip}:7860  (same Wi-Fi), or scan:")
    app.print_qr(f"http://{ip}:7860")
print("=" * 55 + "\n")
# 0.0.0.0: reachable from the phone on the same Wi-Fi.
# py demo_app.py --share  also prints a public https link that works on any network (lasts 1 week).
import sys
SHARE = "--share" in sys.argv
if SHARE:
    print("  Public link: look for 'Running on public URL' below (takes ~10 seconds).\n")
app.demo.launch(server_name="0.0.0.0", share=SHARE, **app.launch_options())
