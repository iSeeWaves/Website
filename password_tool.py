"""
password_tool.py  —  iSeeWaves Password Tool Backend
=====================================================
Run:
  pip install flask flask-cors
  python password_tool.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import string
import math
import re
import secrets

app = Flask(__name__)

CORS(app, origins="*", allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# ─────────────────────────────────────────
#  COMMON PASSWORDS BLACKLIST
# ─────────────────────────────────────────
COMMON_PASSWORDS = {
    "password", "password1", "password123", "123456", "123456789",
    "12345678", "1234567", "qwerty", "abc123", "monkey", "1234567890",
    "111111", "letmein", "dragon", "master", "sunshine", "princess",
    "welcome", "shadow", "superman", "michael", "football", "baseball",
    "iloveyou", "admin", "login", "starwars", "hello", "freedom",
    "whatever", "qazwsx", "trustno1", "batman", "zxcvbn", "passw0rd",
    "123qwe", "password2", "p@ssword", "pass123", "test123", "root",
}

COMMON_PATTERNS = ["password", "123456", "qwerty", "admin", "letmein", "welcome", "abc123"]


# ─────────────────────────────────────────
#  STRENGTH ANALYSIS
# ─────────────────────────────────────────
def analyze_strength(password: str) -> dict:
    if not password:
        return {
            "score": 0, "label": "Empty", "color": "#ff4d4d",
            "entropy": 0, "length": 0, "criteria": {}, "suggestions_hint": []
        }

    length = len(password)
    criteria = {
        "length8":   length >= 8,
        "length12":  length >= 12,
        "uppercase": bool(re.search(r"[A-Z]", password)),
        "lowercase": bool(re.search(r"[a-z]", password)),
        "numbers":   bool(re.search(r"[0-9]", password)),
        "symbols":   bool(re.search(r"[^A-Za-z0-9]", password)),
        "no_repeat": not bool(re.search(r"(.)\1{2,}", password)),
        "no_common": (
            password.lower() not in COMMON_PASSWORDS and
            not any(p in password.lower() for p in COMMON_PATTERNS)
        ),
    }

    charset_size = 0
    if criteria["lowercase"]: charset_size += 26
    if criteria["uppercase"]: charset_size += 26
    if criteria["numbers"]:   charset_size += 10
    if criteria["symbols"]:   charset_size += 32
    entropy = round(length * math.log2(charset_size), 1) if charset_size > 0 else 0

    passed = sum(criteria.values())

    if length < 4:
        score, label, color = 0, "Too Short",   "#ff4d4d"
    elif passed <= 3:
        score, label, color = 1, "Weak",        "#ff6b7a"
    elif passed <= 5:
        score, label, color = 2, "Fair",        "#f0a500"
    elif passed <= 6:
        score, label, color = 3, "Strong",      "#74C3BA"
    else:
        score, label, color = 4, "Very Strong", "#52c97a"

    hints = []
    if not criteria["length12"]:  hints.append("Make it at least 12 characters long")
    if not criteria["uppercase"]: hints.append("Add uppercase letters (A-Z)")
    if not criteria["lowercase"]: hints.append("Add lowercase letters (a-z)")
    if not criteria["numbers"]:   hints.append("Include at least one number (0-9)")
    if not criteria["symbols"]:   hints.append("Add special characters (!@#$%)")
    if not criteria["no_repeat"]: hints.append("Avoid repeating characters (aaa)")
    if not criteria["no_common"]: hints.append("Avoid common/dictionary words")

    return {
        "score": score, "label": label, "color": color,
        "entropy": entropy, "length": length,
        "criteria": criteria, "suggestions_hint": hints[:3],
    }


# ─────────────────────────────────────────
#  PASSWORD GENERATORS
# ─────────────────────────────────────────

def generate_random_secure(length: int = 16) -> str:
    """Fully random — uppercase + lowercase + digits + symbols."""
    symbols  = "!@#$%^&*()-_=+?"
    alphabet = string.ascii_letters + string.digits + symbols
    for _ in range(200):
        pw = (
            secrets.choice(string.ascii_uppercase) +
            secrets.choice(string.ascii_lowercase) +
            secrets.choice(string.digits) +
            secrets.choice(symbols) +
            ''.join(secrets.choice(alphabet) for _ in range(length - 4))
        )
        # shuffle so guaranteed chars aren't always at start
        pw_list = list(pw)
        secrets.SystemRandom().shuffle(pw_list)
        pw = ''.join(pw_list)
        if analyze_strength(pw)["score"] >= 4:
            return pw
    return pw


def generate_memorable() -> str:
    """
    Passphrase style: Word + symbol + 3digits + Word + Word
    e.g.  Tiger!847MarbleWave
    Always Very Strong.
    """
    words = [
        "Tiger", "Marble", "Wave", "Falcon", "Storm", "Pixel", "Cipher", "Nexus",
        "Vortex", "Blaze", "Orbit", "Ranger", "Prism", "Comet", "Delta", "Flint",
        "Hawk", "Zenith", "Pulse", "Vertex", "Forge", "Shield", "Nimbus", "Apex",
        "Cobalt", "Ember", "Glacier", "Harbor", "Inferno", "Jungle", "Kraken",
        "Lantern", "Meteor", "Nomad", "Onyx", "Phantom", "Quartz", "Radiant",
        "Sapphire", "Thunder", "Umbra", "Viking", "Whisper", "Xenon", "Zephyr",
        "Arctic", "Bronze", "Cosmos", "Dagger", "Eclipse", "Frostbite", "Granite",
    ]
    symbols = "!@#$%&*"
    w1  = secrets.choice(words)
    w2  = secrets.choice(words)
    w3  = secrets.choice(words)
    num = str(secrets.randbelow(900) + 100)
    sym = secrets.choice(symbols)
    return f"{w1}{sym}{num}{w2}{w3}"


def generate_alphanum(length: int = 16) -> str:
    """Letters + digits only — no symbols, good for strict systems."""
    alphabet = string.ascii_letters + string.digits
    for _ in range(200):
        pw = (
            secrets.choice(string.ascii_uppercase) +
            secrets.choice(string.ascii_lowercase) +
            secrets.choice(string.digits) +
            ''.join(secrets.choice(alphabet) for _ in range(length - 3))
        )
        pw_list = list(pw)
        secrets.SystemRandom().shuffle(pw_list)
        pw = ''.join(pw_list)
        if analyze_strength(pw)["score"] >= 3:
            return pw
    return pw


def generate_pattern() -> str:
    """
    CVC-CVC pattern — pronounceable + strong.
    e.g.  TakBiv!83MEPQZK
    """
    vowels     = "aeiouAEIOU"
    consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"
    symbols    = "!@#$%&*?"

    def cvc():
        return (
            secrets.choice(consonants) +
            secrets.choice(vowels) +
            secrets.choice(consonants)
        )

    b1  = cvc().capitalize()
    b2  = cvc()
    b3  = cvc().upper()
    num = str(secrets.randbelow(9000) + 1000)  # 4 digits
    sym = secrets.choice(symbols)
    return f"{b1}{b2}{sym}{num}{b3}"


def generate_pin_style(length: int = 16) -> str:
    """
    Groups of chars separated by dashes — easy to read aloud.
    e.g.  Kx7!-mPq9-#Rz2-Wb5@
    """
    symbols  = "!@#$%&*?"
    alphabet = string.ascii_letters + string.digits + symbols
    groups   = []
    group_size = 4
    num_groups = length // group_size

    for _ in range(num_groups):
        g = (
            secrets.choice(string.ascii_uppercase) +
            secrets.choice(string.ascii_lowercase) +
            secrets.choice(string.digits) +
            secrets.choice(symbols)
        )
        g_list = list(g)
        secrets.SystemRandom().shuffle(g_list)
        groups.append(''.join(g_list))

    return '-'.join(groups)


def generate_based_on_input(base: str) -> str:
    """
    Transforms user's password into a stronger variant using
    leet substitutions + padding + shuffle.
    """
    subs = {
        'a': '@', 'e': '3', 'i': '!', 'o': '0', 's': '$',
        't': '+', 'l': '1', 'b': '8', 'g': '9', 'z': '2',
        'A': '@', 'E': '3', 'I': '!', 'O': '0', 'S': '$',
        'T': '+', 'L': '1', 'B': '8', 'G': '9', 'Z': '2',
    }
    transformed = ''.join(subs.get(c, c) for c in base)
    extra = string.ascii_letters + string.digits + "!@#$%^&*"

    # Ensure uppercase, lowercase, digit, symbol present
    if not re.search(r'[A-Z]', transformed):
        transformed += secrets.choice(string.ascii_uppercase)
    if not re.search(r'[a-z]', transformed):
        transformed += secrets.choice(string.ascii_lowercase)
    if not re.search(r'[0-9]', transformed):
        transformed += secrets.choice(string.digits)
    if not re.search(r'[^A-Za-z0-9]', transformed):
        transformed += secrets.choice("!@#$%&*")

    # Pad to 14+ chars
    while len(transformed) < 14:
        transformed += secrets.choice(extra)

    # Add random suffix
    suffix = ''.join(secrets.choice(string.digits + "!@#$") for _ in range(4))
    result = transformed + suffix

    # Shuffle middle
    if len(result) > 6:
        middle = list(result[2:-2])
        secrets.SystemRandom().shuffle(middle)
        result = result[:2] + ''.join(middle) + result[-2:]

    return result


# ─────────────────────────────────────────
#  SUGGESTION ENGINE
# ─────────────────────────────────────────
def generate_suggestions(user_password: str, count: int = 6) -> list:
    suggestions = []
    seen        = set()

    # Style label, generator function, description
    generators = [
        ("Random Secure",   lambda: generate_random_secure(16),  "Fully random — max security"),
        ("Memorable",       generate_memorable,                   "Word-based — easy to remember"),
        ("Based on Yours",  lambda: generate_based_on_input(user_password), "Stronger version of your password"),
        ("Pattern Based",   generate_pattern,                     "Pronounceable pattern"),
        ("PIN Groups",      lambda: generate_pin_style(16),       "Grouped — easy to read"),
        ("Alphanumeric",    lambda: generate_alphanum(16),        "No symbols — universal"),
        ("Random Secure",   lambda: generate_random_secure(18),  "Fully random — extended"),
        ("Memorable",       generate_memorable,                   "Word-based — easy to remember"),
        ("Pattern Based",   generate_pattern,                     "Pronounceable pattern"),
        ("Random Secure",   lambda: generate_random_secure(20),  "Fully random — maximum length"),
    ]

    for style, gen_fn, desc in generators:
        if len(suggestions) >= count:
            break
        try:
            pw = gen_fn()
            if pw in seen:
                continue
            seen.add(pw)
            strength = analyze_strength(pw)
            suggestions.append({
                "password":    pw,
                "style":       style,
                "description": desc,
                "strength":    strength["label"],
                "score":       strength["score"],
                "entropy":     strength["entropy"],
                "length":      len(pw),
            })
        except Exception:
            continue

    return suggestions


# ─────────────────────────────────────────
#  FLASK ROUTES
# ─────────────────────────────────────────

@app.route("/api/password-suggest", methods=["POST", "OPTIONS"])
def password_suggest():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        return response, 200

    data    = request.get_json(silent=True) or {}
    user_pw = str(data.get("password", "")).strip()

    if not user_pw:
        return jsonify({"error": "Password field is required"}), 400

    strength    = analyze_strength(user_pw)
    suggestions = generate_suggestions(user_pw, count=6)

    return jsonify({
        "strength":    strength,
        "suggestions": suggestions,
    })


@app.route("/api/password-strength", methods=["POST", "OPTIONS"])
def password_strength():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        return response, 200

    data    = request.get_json(silent=True) or {}
    user_pw = str(data.get("password", "")).strip()

    if not user_pw:
        return jsonify({"error": "Password field is required"}), 400

    return jsonify(analyze_strength(user_pw))


@app.route("/api/password-generate", methods=["GET"])
def password_generate():
    style  = request.args.get("style", "random").lower()
    length = int(request.args.get("length", 16))
    length = max(8, min(length, 64))

    if style == "memorable":
        pw = generate_memorable()
    elif style == "pattern":
        pw = generate_pattern()
    elif style == "alphanum":
        pw = generate_alphanum(length)
    elif style == "pin":
        pw = generate_pin_style(length)
    else:
        pw = generate_random_secure(length)

    strength = analyze_strength(pw)
    return jsonify({
        "password": pw, "style": style,
        "strength": strength["label"],
        "entropy":  strength["entropy"],
        "length":   len(pw),
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok", "service": "iSeeWaves Password Tool", "port": 5003
    })


if __name__ == "__main__":
    print("=" * 50)
    print("  iSeeWaves — Password Tool Backend")
    print("  Running on  http://localhost:5003")
    print("=" * 50)
    app.run(debug=False, host="0.0.0.0", port=5003, threaded=True)