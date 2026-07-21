"""
iSeeWaves — IP Tracker Backend
================================
File name : tracker_app.py
Jagah     : D:\FYP WEB\iseewaves-react\tracker_app.py
Run       : python tracker_app.py
Port      : http://localhost:5001

Install   : pip install flask flask-cors requests
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import re
import requests as req_lib

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])   # React (localhost:3000)

# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────

def error(msg: str, code: int = 400):
    return jsonify({"error": msg}), code

def resolve_ip(target: str) -> str:
    """Domain ko IP mein convert karo."""
    try:
        return socket.gethostbyname(target)
    except Exception:
        return "Unresolved"

def country_flag(cc: str) -> str:
    """2-letter country code se flag emoji banao."""
    if not cc or len(cc) != 2:
        return "🌍"
    try:
        return chr(ord(cc[0].upper()) + 127397) + chr(ord(cc[1].upper()) + 127397)
    except Exception:
        return "🌍"

def is_ip_address(target: str) -> bool:
    """Check karo ke target IP hai ya domain."""
    ipv4 = bool(re.match(r'^(\d{1,3}\.){3}\d{1,3}$', target))
    ipv6 = bool(re.match(r'^[0-9a-fA-F:]+$', target) and ':' in target)
    return ipv4 or ipv6

# ─────────────────────────────────────────────
# IP TRACKER ENDPOINT
# ─────────────────────────────────────────────

@app.route('/api/tracker', methods=['POST'])
def ip_tracker():
    data   = request.get_json(silent=True) or {}
    target = data.get('target', '').strip()

    if not target:
        return error("Target IP or domain required")

    # ── Domain hai toh IP resolve karo ──
    ip = target
    if not is_ip_address(target):
        ip = resolve_ip(target)
        if ip == "Unresolved":
            return error(f"Cannot resolve domain: {target}")

    # ── ip-api.com se real data fetch karo ──
    try:
        resp = req_lib.get(
            f"http://ip-api.com/json/{ip}",
            params={
                "fields": (
                    "status,message,country,countryCode,region,regionName,"
                    "city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,mobile,query"
                )
            },
            timeout=10,
            headers={"User-Agent": "iSeeWaves-Tracker/1.0"}
        )
        geo = resp.json()

    except Exception as e:
        return error(f"Geolocation lookup failed: {str(e)}")

    # ── Agar ip-api ne fail diya ──
    if geo.get("status") == "fail":
        msg = geo.get("message", "Unknown error")
        return error(f"IP lookup failed: {msg}")

    # ── Response build karo ──
    cc   = geo.get("countryCode", "")
    flag = country_flag(cc)

    result = {
        # Basic info
        "ip":           geo.get("query", ip),
        "flag":         flag,
        "country":      geo.get("country", "Unknown"),
        "country_code": cc,
        "region":       geo.get("regionName", "N/A"),
        "city":         geo.get("city", "N/A"),
        "postal":       geo.get("zip", "N/A"),
        "timezone":     geo.get("timezone", "N/A"),

        # Network info
        "isp":          geo.get("isp", "N/A"),
        "org":          geo.get("org", "N/A"),
        "asn":          geo.get("as", "N/A"),
        "latitude":     str(geo.get("lat", "")),
        "longitude":    str(geo.get("lon", "")),

        # Threat intelligence
        "proxy":        bool(geo.get("proxy", False)),
        "vpn":          bool(geo.get("proxy", False)),
        "tor":          False,
        "mobile":       bool(geo.get("mobile", False)),
        "hosting":      bool(geo.get("hosting", False)),

        # Abuse score — proxy/hosting ho toh zyada
        "abuse_score":  (
            75 if geo.get("proxy") and geo.get("hosting")
            else 50 if geo.get("proxy")
            else 25 if geo.get("hosting")
            else 5
        ),
    }

    return jsonify(result)

# ─────────────────────────────────────────────
# HEALTH CHECK
# ─────────────────────────────────────────────

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status":  "online",
        "service": "IP Tracker",
        "version": "1.0.0",
        "api":     "ip-api.com (free)"
    })

# ─────────────────────────────────────────────
# RUN
# ─────────────────────────────────────────────

if __name__ == '__main__':
    print("\n  iSeeWaves — IP Tracker API")
    print("  ───────────────────────────")
    print("  Running on http://localhost:5001")
    print("  Endpoint: POST /api/tracker")
    print("  Health  : GET  /api/health\n")
    app.run(debug=True, host='0.0.0.0', port=5001, threaded=True)