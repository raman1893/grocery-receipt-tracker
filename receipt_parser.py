"""Turns raw OCR text from a grocery receipt into structured data.
Pure Python (no ML) so it can be tested on its own."""
import re
from datetime import date

CATEGORIES = [
    "Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery", "Pantry", "Frozen",
    "Snacks", "Beverages", "Household", "Personal Care", "Other",
]

# Store department header -> category. None = too broad, decide by keywords.
DEPARTMENTS = [
    ("PRODUCE", "Produce"), ("DAIRY", "Dairy & Eggs"), ("BAKERY", "Bakery"),
    ("DELI", "Meat & Seafood"), ("MEAT", "Meat & Seafood"), ("SEAFOOD", "Meat & Seafood"),
    ("FISH", "Meat & Seafood"), ("FROZEN", "Frozen"), ("HOME", "Household"),
    ("HOUSEHOLD", "Household"), ("HBC", "Personal Care"), ("HEALTH", "Personal Care"),
    ("BEAUTY", "Personal Care"), ("PHARM", "Personal Care"), ("BEVERAGE", "Beverages"),
    ("SNACK", "Snacks"), ("GROCERY", None),
]

# Checked in order (first match wins), so specific words go first.
KEYWORDS = {
    "Frozen": ["frozen", "frz", "ice cream", "pizza"],
    "Produce": ["banana", "apple", "onion", "tomato", "potato", "lettuce", "spinach",
                "carrot", "avocado", "lemon", "lime", "cilantro", "parsley", "ginger",
                "garlic", "cucumber", "eggplant", "plum", "berr", "grape", "orange",
                "mango", "veg", "fruit"],
    "Meat & Seafood": ["chicken", "chkn", "beef", "pork", "lamb", "goat", "fish", "salmon",
                       "shrimp", "turkey", "bacon", "sausage", "charcut"],
    "Dairy & Eggs": ["milk", "cheese", "yogurt", "yogourt", "butter", "cream", "egg",
                     "paneer", "ghee", "cott"],
    "Bakery": ["bread", "bagel", "bun", "naan", "roti", "cake", "muffin", "croissant",
               "tortilla"],
    "Snacks": ["chips", "popcorn", "cookie", "chocolate", "candy", "cracker", "nuts",
               "haribo", "gummi", "gummy", "goldbear"],
    "Beverages": ["juice", "coffee", "tea", "water", "pop", "soda", "coke", "pepsi"],
    "Household": ["detergent", "tissue", "towel", "foil", "garbage", "dish", "cleaner",
                  "bleach", "wrap", "battery"],
    "Personal Care": ["shampoo", "toothpaste", "soap", "lotion", "deodorant", "razor"],
    "Pantry": ["rice", "atta", "flour", "dal", "lentil", "pasta", "oil", "sugar", "salt",
               "spice", "masala", "sauce", "beans", "oats", "cereal", "honey", "jam"],
}

STORES = {
    "real canadian superstore": "Real Canadian Superstore", "no frills": "No Frills",
    "nofrills": "No Frills", "loblaws": "Loblaws", "freshco": "FreshCo",
    "food basics": "Food Basics", "metro": "Metro", "sobeys": "Sobeys",
    "walmart": "Walmart", "costco": "Costco", "t&t": "T&T Supermarket",
    "fortinos": "Fortinos", "farm boy": "Farm Boy", "longo": "Longo's",
    "shoppers drug mart": "Shoppers Drug Mart", "giant tiger": "Giant Tiger",
    "dollarama": "Dollarama", "adonis": "Adonis",
}

PRICE = r"-?\d{1,4}[.,]\d{2}"
DEPT_RE = re.compile(r"^\d{1,3}\s*[-–]\s*([A-Za-z][A-Za-z &/]{2,})$")
CODED_ITEM_RE = re.compile(r"^(?:\((\d+)\)\s*)?(\d{4,14})\s+(.*\S)$")
QTY_RE = re.compile(rf"^(\d+)\s*@\s*\$?\s*({PRICE})\s+({PRICE})$")
WEIGHT_RE = re.compile(
    rf"^(\d+(?:[.,]\d+)?)\s*(kg|lb)\s*@\s*\$?\s*({PRICE})\s*/\s*(?:kg|lb)\s+({PRICE})$", re.I)
TRAILING_PRICE_RE = re.compile(rf"^(.*?)\s+\$?({PRICE})$")
FLAG_RE = re.compile(r"^[HMRJQGP]{1,4}$")          # tax/flag codes like MRJ, HMRJ, Q
SUBTOTAL_RE = re.compile(rf"^SUB\s*-?\s*TOTAL\b.*?({PRICE})$", re.I)
TOTAL_RE = re.compile(rf"^TOTAL\b.*?({PRICE})$", re.I)
TAX_RE = re.compile(rf"^(?:[A-Z]\s*=\s*)?(HST|GST|PST|QST|TAX)\b.*?({PRICE})$", re.I)
SKIP_RE = re.compile(r"\b(total|tax|change|cash|visa|debit|credit|mastercard|amex|"
                     r"balance|points|tender|amount|due|items|approved|cad)\b", re.I)


def _num(s):
    return float(s.replace(",", "."))


def _strip_flag(name):
    parts = name.split()
    if len(parts) > 1 and FLAG_RE.match(parts[-1]):
        parts = parts[:-1]
    return " ".join(parts)


def find_date(text):
    for m in re.finditer(r"\b(20\d{2})[/-](\d{1,2})[/-](\d{1,2})\b", text):
        try:
            return date(int(m[1]), int(m[2]), int(m[3])).isoformat()
        except ValueError:
            pass
    for m in re.finditer(r"\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b", text):
        a, b, y = int(m[1]), int(m[2]), int(m[3])
        for mo, d in ((a, b), (b, a)):            # try MM/DD then DD/MM
            try:
                return date(y, mo, d).isoformat()
            except ValueError:
                pass
    return None


def find_store(text):
    low = text.lower()
    for key, name in STORES.items():
        if re.search(rf"\b{re.escape(key)}\b", low):
            return name
    return None


def parse_receipt(text):
    dept, pending, done = None, None, False
    items, subtotal, total, tax = [], None, None, 0.0

    for raw in text.splitlines():
        line = raw.strip()
        if not line or done:
            continue

        if m := SUBTOTAL_RE.match(line):
            subtotal, pending = _num(m[1]), None
            continue
        if m := TOTAL_RE.match(line):
            total, done = _num(m[1]), True
            continue
        if m := TAX_RE.match(line):
            tax += _num(m[2])
            continue
        if m := DEPT_RE.match(line):
            dept, pending = m[1].strip().upper(), None
            continue

        # Second line of a multi-buy or weighed item
        if pending:
            if m := QTY_RE.match(line):
                pending.update(qty=int(m[1]), unit_price=_num(m[2]), amount=_num(m[3]))
                items.append(pending)
                pending = None
                continue
            if m := WEIGHT_RE.match(line):
                pending.update(qty=_num(m[1]) if "," in m[1] else float(m[1]),
                               unit=m[2].lower(), unit_price=_num(m[3]), amount=_num(m[4]))
                items.append(pending)
                pending = None
                continue

        # Item line starting with a UPC / PLU code
        if m := CODED_ITEM_RE.match(line):
            rest, amount = m[3], None
            if pm := TRAILING_PRICE_RE.match(rest):
                rest, amount = pm[1], _num(pm[2])
            item = {"item": _strip_flag(rest), "qty": int(m[1] or 1), "unit": "ea",
                    "unit_price": amount, "amount": amount, "department": dept}
            if amount is None:
                pending = item            # price is on the next line
            else:
                items.append(item)
                pending = None
            continue

        # Fallback for stores that print plain "NAME   4.99" lines
        if subtotal is None and (m := TRAILING_PRICE_RE.match(line)) \
                and re.search(r"[A-Za-z]{3,}", m[1]) and not SKIP_RE.search(line):
            items.append({"item": _strip_flag(m[1].strip()), "qty": 1, "unit": "ea",
                          "unit_price": _num(m[2]), "amount": _num(m[2]),
                          "department": dept})

    items = [i for i in items if i["amount"]]     # drop $0.00 lines (loyalty stamps etc.)
    return {
        "store": find_store(text), "date": find_date(text), "items": items,
        "subtotal": subtotal, "tax": round(tax, 2) or None, "total": total,
    }


def rule_category(name, department=None):
    """Category from the store's department, then keywords. None = ask the AI model."""
    dept = (department or "").upper()
    for key, cat in DEPARTMENTS:
        if key in dept:
            if cat:
                return cat
            break
    low = name.lower()
    for cat, words in KEYWORDS.items():
        if any(re.search(rf"\b{re.escape(w)}", low) for w in words):
            return cat
    if "GROCERY" in dept:
        return "Pantry"
    return None
