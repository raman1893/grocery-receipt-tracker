"""Sample receipts for demo mode (py app.py --demo): the real No Frills receipts, typed in by hand."""
import json


def _r(date, subtotal, tax, items, time=None):
    return json.dumps({
        "store": "No Frills", "date": date, "time": time, "subtotal": subtotal, "tax": tax,
        "total": round(subtotal + tax, 2),
        "items": [{"name": n, "qty": q, "unit": u, "unit_price": p, "amount": a,
                   "department": d, "category": c} for n, q, u, p, a, d, c in items]})


DEMO_RECEIPTS = [
    _r("2026-09-27", 17.14, 0.05, [
        ("DANONE OIKOS STR", 1, "ea", 4.00, 4.00, "DAIRY", "Dairy & Eggs"),
        ("GRD A LRG BRWN", 1, "ea", 5.99, 5.99, "DAIRY", "Dairy & Eggs"),
        ("THAI GRN 75G", 1, "ea", 4.00, 4.00, "PRODUCE", "Produce"),
        ("BANANA ORGANIC", 1.165, "kg", 2.40, 2.80, "PRODUCE", "Produce"),
        ("REUBL SHRT PC OP", 1, "ea", 0.35, 0.35, "OTHER SERVICES", "Other")], time="13:51"),
    _r("2026-10-13", 35.86, 0.05, [
        ("NN SOUP CUP SHR", 2, "ea", 1.00, 2.00, "GROCERY", "Pantry"),
        ("NN EV OLIVE OIL", 1, "ea", 9.00, 9.00, "GROCERY", "Pantry"),
        ("FBRN SRIRACHA", 1, "ea", 4.79, 4.79, "GROCERY", "Pantry"),
        ("COTTAGE CHEESE", 1, "ea", 5.74, 5.74, "DAIRY", "Dairy & Eggs"),
        ("FM MINI CUC", 1, "ea", 2.99, 2.99, "PRODUCE", "Produce"),
        ("TOMATO GRAPE 283", 1, "ea", 2.99, 2.99, "PRODUCE", "Produce"),
        ("CH EVERYTHING BR", 1, "ea", 3.00, 3.00, "BAKERY COMMERCIAL", "Bakery"),
        ("MA PROSCIUTTO", 1, "ea", 5.00, 5.00, "DELI", "Meat & Seafood"),
        ("REUBL SHRT PC", 1, "ea", 0.35, 0.35, "OTHER SERVICES", "Other")], time="12:20"),
    _r("2026-10-18", 39.07, 1.15, [
        ("NSTL CRN MLK R M", 1, "ea", 3.29, 3.29, "GROCERY", "Pantry"),
        ("HARIBO GOLDBEAR", 2, "ea", 2.79, 5.58, "GROCERY", "Snacks"),
        ("LARGE EGGS", 1, "ea", 3.33, 3.33, "DAIRY", "Dairy & Eggs"),
        ("NORDICA COTT", 1, "ea", 5.49, 5.49, "DAIRY", "Dairy & Eggs"),
        ("TRUTASTE 1%", 1, "ea", 3.94, 3.94, "DAIRY", "Dairy & Eggs"),
        ("BANANA", 0.925, "kg", 1.52, 1.41, "PRODUCE", "Produce"),
        ("PLUM BLACK", 0.37, "kg", 8.80, 3.26, "PRODUCE", "Produce"),
        ("PARSLEY ITALIAN", 1, "ea", 2.49, 2.49, "PRODUCE", "Produce"),
        ("NN ANC GRN BREAD", 1, "ea", 3.29, 3.29, "BAKERY COMMERCIAL", "Bakery"),
        ("MA EURO CHARCUTE", 1, "ea", 6.99, 6.99, "DELI", "Meat & Seafood")], time="18:47"),
    _r("2026-10-28", 41.62, 0.24, [
        ("NN CHIPS", 1, "ea", 1.50, 1.50, "GROCERY", "Snacks"),
        ("PC 2% GRK PCH/MA", 1, "ea", 3.99, 3.99, "DAIRY", "Dairy & Eggs"),
        ("LARGE EGGS", 1, "ea", 3.33, 3.33, "DAIRY", "Dairy & Eggs"),
        ("BANANA", 1.095, "kg", 1.52, 1.66, "PRODUCE", "Produce"),
        ("PLUM BLACK", 0.41, "kg", 8.80, 3.61, "PRODUCE", "Produce"),
        ("ONION RED", 0.44, "kg", 5.49, 2.42, "PRODUCE", "Produce"),
        ("CILANTRO", 1, "ea", 1.29, 1.29, "PRODUCE", "Produce"),
        ("BLUEBERRIES", 1, "ea", 2.99, 2.99, "PRODUCE", "Produce"),
        ("ORIGINAL CHICKEN", 1, "ea", 8.49, 8.49, "MEATS", "Meat & Seafood"),
        ("ACE MULTI LOAF", 1, "ea", 5.00, 5.00, "BAKERY INSTORE", "Bakery"),
        ("MA PROSCIUTTO", 1, "ea", 6.99, 6.99, "DELI", "Meat & Seafood"),
        ("REUBL SHRT PC OP", 1, "ea", 0.35, 0.35, "OTHER SERVICES", "Other")], time="13:47"),
]
