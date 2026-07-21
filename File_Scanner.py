

import os
import re
import math
import json
import time
import hashlib
import struct
import socket
import requests
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # Reads .env file and loads VT_API_KEY / IPINFO_TOKEN into environment

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # restrict to frontend origin

# ─────────────────────────────────────────
#  CONFIG
# ─────────────────────────────────────────
VT_API_KEY   = os.environ.get("VT_API_KEY", "")      # VirusTotal API key (optional) — set via .env, never hardcode
IPINFO_TOKEN = os.environ.get("IPINFO_TOKEN", "")     # ipinfo.io token (optional, free tier works without)
MAX_FILE_MB  = 32
MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024
UPLOAD_FOLDER  = "/tmp/iseewaves_scans"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ─────────────────────────────────────────
#  OUI DATABASE  (IEEE vendor lookup — top 120 entries)
# ─────────────────────────────────────────
OUI_DB = {
    "00:00:0C": ("Cisco Systems",            "Network Equipment"),
    "00:00:5E": ("IANA",                     "Reserved"),
    "00:00:7F": ("Linksys",                  "Router"),
    "00:01:42": ("Cisco Systems",            "Network Equipment"),
    "00:04:0D": ("Globalstar",               "Satellite Equipment"),
    "00:05:69": ("VMware",                   "Virtual Machine"),
    "00:06:5B": ("Dell Technologies",        "Computer"),
    "00:08:74": ("Dell Technologies",        "Computer"),
    "00:09:6B": ("IBM",                      "Computer"),
    "00:0A:27": ("Apple",                    "Computer/Mobile"),
    "00:0C:29": ("VMware",                   "Virtual Machine"),
    "00:0D:93": ("Apple",                    "Computer/Mobile"),
    "00:0E:35": ("Intel",                    "Network Adapter"),
    "00:10:18": ("Broadcom",                 "Network Adapter"),
    "00:11:22": ("Cimsys",                   "Network Equipment"),
    "00:13:77": ("Intel",                    "Network Adapter"),
    "00:14:22": ("Dell Technologies",        "Computer"),
    "00:16:3E": ("Xensource / Citrix",       "Virtual Machine"),
    "00:17:F2": ("Apple",                    "Computer/Mobile"),
    "00:18:8B": ("Dell Technologies",        "Computer"),
    "00:19:E3": ("Huawei Technologies",      "Network Equipment"),
    "00:1A:2B": ("Huawei Technologies",      "Network Equipment"),
    "00:1B:21": ("Intel",                    "Network Adapter"),
    "00:1C:42": ("Parallels",               "Virtual Machine"),
    "00:1D:0F": ("Atheros Communications",   "Wireless Adapter"),
    "00:1E:58": ("D-Link",                   "Router/Access Point"),
    "00:1F:3A": ("Apple",                    "Computer/Mobile"),
    "00:21:5C": ("Cisco-Linksys",           "Router"),
    "00:22:FA": ("Microsoft",               "Xbox/Surface"),
    "00:23:12": ("Apple",                    "Computer/Mobile"),
    "00:25:00": ("Apple",                    "Computer/Mobile"),
    "00:26:BB": ("Apple",                    "Computer/Mobile"),
    "00:50:56": ("VMware",                   "Virtual Machine"),
    "00:50:F2": ("Microsoft",               "Network Adapter"),
    "00:90:4B": ("Gemtek Technology",        "Wireless Equipment"),
    "00:A0:C9": ("Intel",                    "Network Adapter"),
    "00:BB:3A": ("Amazon Technologies",      "Smart Device"),
    "00:D0:59": ("Ambit Microsystems",       "Network Equipment"),
    "00:E0:4C": ("Realtek Semiconductor",    "Network Adapter"),
    "00:E0:DB": ("Cisco Systems",           "Network Equipment"),
    "04:0C:CE": ("Apple",                    "Computer/Mobile"),
    "04:15:52": ("Apple",                    "Computer/Mobile"),
    "04:4B:ED": ("Intel",                    "Network Adapter"),
    "08:00:20": ("Sun Microsystems",         "Workstation"),
    "08:00:27": ("Oracle VirtualBox",        "Virtual Machine"),
    "08:3E:8E": ("Belkin",                   "Router/Access Point"),
    "0C:4D:E9": ("Samsung Electronics",      "Mobile/TV"),
    "10:02:B5": ("Apple",                    "Computer/Mobile"),
    "10:40:F3": ("Apple",                    "Computer/Mobile"),
    "10:9A:DD": ("Apple",                    "Computer/Mobile"),
    "14:10:9F": ("Apple",                    "Computer/Mobile"),
    "18:65:90": ("Apple",                    "Computer/Mobile"),
    "18:AF:61": ("Xiaomi Communications",    "Mobile/IoT"),
    "1C:1B:0D": ("Apple",                    "Computer/Mobile"),
    "20:C9:D0": ("Xiaomi Communications",    "Mobile/IoT"),
    "24:0A:64": ("Apple",                    "Computer/Mobile"),
    "24:F0:94": ("Apple",                    "Computer/Mobile"),
    "28:CF:E9": ("Apple",                    "Computer/Mobile"),
    "2C:F0:A2": ("Apple",                    "Computer/Mobile"),
    "30:10:B3": ("Apple",                    "Computer/Mobile"),
    "34:12:98": ("Apple",                    "Computer/Mobile"),
    "38:C9:86": ("Apple",                    "Computer/Mobile"),
    "3C:07:54": ("Apple",                    "Computer/Mobile"),
    "3C:15:C2": ("Apple",                    "Computer/Mobile"),
    "40:9C:28": ("Apple",                    "Computer/Mobile"),
    "44:FB:42": ("Apple",                    "Computer/Mobile"),
    "48:A9:1C": ("Apple",                    "Computer/Mobile"),
    "4C:32:75": ("Apple",                    "Computer/Mobile"),
    "4C:74:03": ("Apple",                    "Computer/Mobile"),
    "50:32:37": ("Apple",                    "Computer/Mobile"),
    "54:26:96": ("Apple",                    "Computer/Mobile"),
    "58:55:CA": ("Apple",                    "Computer/Mobile"),
    "5C:AD:CF": ("Apple",                    "Computer/Mobile"),
    "60:03:08": ("Apple",                    "Computer/Mobile"),
    "60:F8:1D": ("Apple",                    "Computer/Mobile"),
    "64:76:BA": ("Apple",                    "Computer/Mobile"),
    "68:AB:1E": ("Apple",                    "Computer/Mobile"),
    "6C:4D:73": ("Apple",                    "Computer/Mobile"),
    "70:73:CB": ("Apple",                    "Computer/Mobile"),
    "74:E1:B6": ("Apple",                    "Computer/Mobile"),
    "78:4F:43": ("Apple",                    "Computer/Mobile"),
    "7C:11:BE": ("Apple",                    "Computer/Mobile"),
    "80:BE:05": ("Apple",                    "Computer/Mobile"),
    "84:38:35": ("Apple",                    "Computer/Mobile"),
    "88:1D:FC": ("Apple",                    "Computer/Mobile"),
    "8C:85:90": ("Apple",                    "Computer/Mobile"),
    "90:27:E4": ("Apple",                    "Computer/Mobile"),
    "94:65:9C": ("Apple",                    "Computer/Mobile"),
    "98:01:A7": ("Apple",                    "Computer/Mobile"),
    "9C:F4:8E": ("Apple",                    "Computer/Mobile"),
    "A0:ED:CD": ("Apple",                    "Computer/Mobile"),
    "A4:5E:60": ("Apple",                    "Computer/Mobile"),
    "A8:66:7F": ("Apple",                    "Computer/Mobile"),
    "AC:29:3A": ("Apple",                    "Computer/Mobile"),
    "AC:DE:48": ("Apple",                    "Computer/Mobile"),
    "B0:19:C6": ("Apple",                    "Computer/Mobile"),
    "B4:F0:AB": ("Apple",                    "Computer/Mobile"),
    "B8:53:AC": ("Apple",                    "Computer/Mobile"),
    "BC:3B:AF": ("Apple",                    "Computer/Mobile"),
    "C0:9F:42": ("Apple",                    "Computer/Mobile"),
    "C4:2C:03": ("Apple",                    "Computer/Mobile"),
    "C8:69:CD": ("Apple",                    "Computer/Mobile"),
    "CC:08:E0": ("Apple",                    "Computer/Mobile"),
    "D0:23:DB": ("Apple",                    "Computer/Mobile"),
    "D4:61:9D": ("Apple",                    "Computer/Mobile"),
    "D8:96:95": ("Apple",                    "Computer/Mobile"),
    "DC:2B:61": ("Apple",                    "Computer/Mobile"),
    "E0:AC:CB": ("Apple",                    "Computer/Mobile"),
    "E4:25:E7": ("Apple",                    "Computer/Mobile"),
    "E8:8D:28": ("Apple",                    "Computer/Mobile"),
    "EC:35:86": ("Apple",                    "Computer/Mobile"),
    "F0:18:98": ("Apple",                    "Computer/Mobile"),
    "F4:F1:5A": ("Apple",                    "Computer/Mobile"),
    "F8:62:AA": ("Apple",                    "Computer/Mobile"),
    "FC:25:3F": ("Apple",                    "Computer/Mobile"),
    # Samsung
    "00:12:47": ("Samsung Electronics",      "Mobile/TV"),
    "00:15:99": ("Samsung Electronics",      "Mobile/TV"),
    "00:16:32": ("Samsung Electronics",      "Mobile/TV"),
    "00:17:C9": ("Samsung Electronics",      "Mobile/TV"),
    "00:1A:8A": ("Samsung Electronics",      "Mobile/TV"),
    "00:1D:25": ("Samsung Electronics",      "Mobile/TV"),
    "00:1E:7D": ("Samsung Electronics",      "Mobile/TV"),
    "00:1F:CC": ("Samsung Electronics",      "Mobile/TV"),
    "00:21:19": ("Samsung Electronics",      "Mobile/TV"),
    "00:23:39": ("Samsung Electronics",      "Mobile/TV"),
    "00:26:37": ("Samsung Electronics",      "Mobile/TV"),
    "1C:62:B8": ("Samsung Electronics",      "Mobile/TV"),
    "30:19:66": ("Samsung Electronics",      "Mobile/TV"),
    "34:BE:00": ("Samsung Electronics",      "Mobile/TV"),
    "3C:BD:D8": ("Samsung Electronics",      "Mobile/TV"),
    "44:78:3E": ("Samsung Electronics",      "Mobile/TV"),
    "50:01:BB": ("Samsung Electronics",      "Mobile/TV"),
    "5C:F6:DC": ("Samsung Electronics",      "Mobile/TV"),
    "78:1F:DB": ("Samsung Electronics",      "Mobile/TV"),
    "8C:77:12": ("Samsung Electronics",      "Mobile/TV"),
    "A0:07:98": ("Samsung Electronics",      "Mobile/TV"),
    "B4:79:A7": ("Samsung Electronics",      "Mobile/TV"),
    "C8:BA:94": ("Samsung Electronics",      "Mobile/TV"),
    "F4:42:8F": ("Samsung Electronics",      "Mobile/TV"),
    # Xiaomi
    "00:9E:C8": ("Xiaomi Communications",    "Mobile/IoT"),
    "10:2A:B3": ("Xiaomi Communications",    "Mobile/IoT"),
    "28:6C:07": ("Xiaomi Communications",    "Mobile/IoT"),
    "34:80:B3": ("Xiaomi Communications",    "Mobile/IoT"),
    "64:B4:73": ("Xiaomi Communications",    "Mobile/IoT"),
    "F8:A4:5F": ("Xiaomi Communications",    "Mobile/IoT"),
    # Huawei
    "00:E0:FC": ("Huawei Technologies",      "Network Equipment"),
    "04:75:03": ("Huawei Technologies",      "Network Equipment"),
    "08:19:A6": ("Huawei Technologies",      "Network Equipment"),
    "10:C6:1F": ("Huawei Technologies",      "Network Equipment"),
    "20:08:ED": ("Huawei Technologies",      "Network Equipment"),
    "24:09:95": ("Huawei Technologies",      "Network Equipment"),
    "2C:AB:00": ("Huawei Technologies",      "Network Equipment"),
    "30:D3:2D": ("Huawei Technologies",      "Network Equipment"),
    "38:37:8B": ("Huawei Technologies",      "Network Equipment"),
    "3C:F8:08": ("Huawei Technologies",      "Network Equipment"),
    "48:00:31": ("Huawei Technologies",      "Network Equipment"),
    "4C:54:99": ("Huawei Technologies",      "Network Equipment"),
    "54:89:98": ("Huawei Technologies",      "Network Equipment"),
    "60:DE:44": ("Huawei Technologies",      "Network Equipment"),
    "6C:8D:C1": ("Huawei Technologies",      "Network Equipment"),
    "70:72:3C": ("Huawei Technologies",      "Network Equipment"),
    "78:1D:BA": ("Huawei Technologies",      "Network Equipment"),
    "80:FB:06": ("Huawei Technologies",      "Network Equipment"),
    "90:17:AC": ("Huawei Technologies",      "Network Equipment"),
    "9C:28:EF": ("Huawei Technologies",      "Network Equipment"),
    "AC:E2:15": ("Huawei Technologies",      "Network Equipment"),
    "B8:08:CF": ("Huawei Technologies",      "Network Equipment"),
    "C8:14:79": ("Huawei Technologies",      "Network Equipment"),
    "D4:6A:A8": ("Huawei Technologies",      "Network Equipment"),
    "E8:CD:2D": ("Huawei Technologies",      "Network Equipment"),
    "F4:9F:F3": ("Huawei Technologies",      "Network Equipment"),
    # Google
    "00:1A:11": ("Google",                   "Smart Device/Chromecast"),
    "3C:5A:B4": ("Google",                   "Smart Device/Chromecast"),
    "54:60:09": ("Google",                   "Smart Device/Chromecast"),
    "6C:AD:F8": ("Google",                   "Smart Device/Chromecast"),
    "94:EB:2C": ("Google",                   "Smart Device/Chromecast"),
    "A4:77:33": ("Google",                   "Smart Device/Chromecast"),
    "F4:F5:D8": ("Google",                   "Smart Device/Chromecast"),
    # Amazon
    "40:B4:CD": ("Amazon Technologies",      "Smart Device/Echo"),
    "44:65:0D": ("Amazon Technologies",      "Smart Device/Echo"),
    "68:37:E9": ("Amazon Technologies",      "Smart Device/Echo"),
    "74:75:48": ("Amazon Technologies",      "Smart Device/Echo"),
    "84:D6:D0": ("Amazon Technologies",      "Smart Device/Echo"),
    "A0:02:DC": ("Amazon Technologies",      "Smart Device/Echo"),
    "B4:7C:9C": ("Amazon Technologies",      "Smart Device/Echo"),
    "F0:F0:A4": ("Amazon Technologies",      "Smart Device/Echo"),
    # Cisco
    "00:00:0C": ("Cisco Systems",            "Network Equipment"),
    "00:01:42": ("Cisco Systems",            "Network Equipment"),
    "00:03:6B": ("Cisco Systems",            "Network Equipment"),
    "00:04:9A": ("Cisco Systems",            "Network Equipment"),
    "00:06:28": ("Cisco Systems",            "Network Equipment"),
    "00:07:0D": ("Cisco Systems",            "Network Equipment"),
    "00:08:A3": ("Cisco Systems",            "Network Equipment"),
    "00:0A:8A": ("Cisco Systems",            "Network Equipment"),
    "00:0B:45": ("Cisco Systems",            "Network Equipment"),
    "00:0C:85": ("Cisco Systems",            "Network Equipment"),
    # TP-Link
    "00:1D:0F": ("TP-Link Technologies",     "Router/Access Point"),
    "00:27:19": ("TP-Link Technologies",     "Router/Access Point"),
    "14:CC:20": ("TP-Link Technologies",     "Router/Access Point"),
    "1C:87:2C": ("TP-Link Technologies",     "Router/Access Point"),
    "30:B5:C2": ("TP-Link Technologies",     "Router/Access Point"),
    "50:C7:BF": ("TP-Link Technologies",     "Router/Access Point"),
    "60:32:B1": ("TP-Link Technologies",     "Router/Access Point"),
    "64:70:02": ("TP-Link Technologies",     "Router/Access Point"),
    "74:DA:38": ("TP-Link Technologies",     "Router/Access Point"),
    "80:8F:1D": ("TP-Link Technologies",     "Router/Access Point"),
    "90:F6:52": ("TP-Link Technologies",     "Router/Access Point"),
    "AC:84:C6": ("TP-Link Technologies",     "Router/Access Point"),
    "B0:BE:76": ("TP-Link Technologies",     "Router/Access Point"),
    "C4:E9:84": ("TP-Link Technologies",     "Router/Access Point"),
    "D8:0D:17": ("TP-Link Technologies",     "Router/Access Point"),
    "EC:08:6B": ("TP-Link Technologies",     "Router/Access Point"),
    "F4:EC:38": ("TP-Link Technologies",     "Router/Access Point"),
    # Intel
    "00:02:B3": ("Intel",                    "Network Adapter"),
    "00:03:47": ("Intel",                    "Network Adapter"),
    "00:04:23": ("Intel",                    "Network Adapter"),
    "00:07:E9": ("Intel",                    "Network Adapter"),
    "00:0C:F1": ("Intel",                    "Network Adapter"),
    "00:11:11": ("Intel",                    "Network Adapter"),
    "00:12:F0": ("Intel",                    "Network Adapter"),
    "00:13:CE": ("Intel",                    "Network Adapter"),
    "00:15:17": ("Intel",                    "Network Adapter"),
    "00:16:EA": ("Intel",                    "Network Adapter"),
    "00:18:DE": ("Intel",                    "Network Adapter"),
    "00:19:D1": ("Intel",                    "Network Adapter"),
    "00:1B:77": ("Intel",                    "Network Adapter"),
    "00:1C:BF": ("Intel",                    "Network Adapter"),
    "00:1D:E0": ("Intel",                    "Network Adapter"),
    "00:1E:64": ("Intel",                    "Network Adapter"),
    "00:1E:65": ("Intel",                    "Network Adapter"),
    "00:1F:3B": ("Intel",                    "Network Adapter"),
    "00:21:6A": ("Intel",                    "Network Adapter"),
    "00:22:FA": ("Intel",                    "Network Adapter"),
    # D-Link
    "00:05:5D": ("D-Link",                   "Router/Access Point"),
    "00:0D:88": ("D-Link",                   "Router/Access Point"),
    "00:11:95": ("D-Link",                   "Router/Access Point"),
    "00:13:46": ("D-Link",                   "Router/Access Point"),
    "00:15:E9": ("D-Link",                   "Router/Access Point"),
    "00:17:9A": ("D-Link",                   "Router/Access Point"),
    "00:19:5B": ("D-Link",                   "Router/Access Point"),
    "00:1B:11": ("D-Link",                   "Router/Access Point"),
    "00:1C:F0": ("D-Link",                   "Router/Access Point"),
    "00:1E:58": ("D-Link",                   "Router/Access Point"),
    "1C:BD:B9": ("D-Link",                   "Router/Access Point"),
    "28:10:7B": ("D-Link",                   "Router/Access Point"),
    "34:08:04": ("D-Link",                   "Router/Access Point"),
    "1C:7E:E5": ("D-Link",                   "Router/Access Point"),
    # ASUS
    "00:0C:6E": ("ASUSTeK Computer",         "Computer/Router"),
    "00:0E:A6": ("ASUSTeK Computer",         "Computer/Router"),
    "00:11:2F": ("ASUSTeK Computer",         "Computer/Router"),
    "00:13:D4": ("ASUSTeK Computer",         "Computer/Router"),
    "00:15:F2": ("ASUSTeK Computer",         "Computer/Router"),
    "00:17:31": ("ASUSTeK Computer",         "Computer/Router"),
    "00:18:F3": ("ASUSTeK Computer",         "Computer/Router"),
    "00:1A:92": ("ASUSTeK Computer",         "Computer/Router"),
    "00:1B:FC": ("ASUSTeK Computer",         "Computer/Router"),
    "00:1D:60": ("ASUSTeK Computer",         "Computer/Router"),
    "00:1E:8C": ("ASUSTeK Computer",         "Computer/Router"),
    "00:1F:C6": ("ASUSTeK Computer",         "Computer/Router"),
    "00:22:15": ("ASUSTeK Computer",         "Computer/Router"),
    "00:23:54": ("ASUSTeK Computer",         "Computer/Router"),
    "00:24:8C": ("ASUSTeK Computer",         "Computer/Router"),
    "00:26:18": ("ASUSTeK Computer",         "Computer/Router"),
    "04:D4:C4": ("ASUSTeK Computer",         "Computer/Router"),
    "08:60:6E": ("ASUSTeK Computer",         "Computer/Router"),
    "10:BF:48": ("ASUSTeK Computer",         "Computer/Router"),
    "14:DA:E9": ("ASUSTeK Computer",         "Computer/Router"),
    # Realtek
    "00:01:6C": ("Realtek Semiconductor",    "Network Adapter"),
    "00:E0:4C": ("Realtek Semiconductor",    "Network Adapter"),
    "52:54:00": ("Realtek/QEMU",            "Virtual Machine"),
}

# ─────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────

def compute_hashes(file_bytes: bytes) -> dict:
    return {
        "md5":    hashlib.md5(file_bytes).hexdigest(),
        "sha1":   hashlib.sha1(file_bytes).hexdigest(),
        "sha256": hashlib.sha256(file_bytes).hexdigest(),
    }


def detect_file_type(file_bytes: bytes, filename: str) -> str:
    """Simple magic-byte detection without external libraries."""
    sigs = {
        b"\x89PNG\r\n\x1a\n": "image/png",
        b"\xff\xd8\xff":       "image/jpeg",
        b"GIF87a":             "image/gif",
        b"GIF89a":             "image/gif",
        b"%PDF":               "application/pdf",
        b"PK\x03\x04":        "application/zip",
        b"MZ":                 "application/x-dosexec",
        b"\x7fELF":            "application/x-elf",
        b"Rar!\x1a\x07":      "application/x-rar",
        b"\x1f\x8b":          "application/gzip",
        b"BZh":               "application/x-bzip2",
        b"7z\xbc\xaf\x27\x1c":"application/x-7z-compressed",
        b"\xd0\xcf\x11\xe0":  "application/msword",
        b"#!/":               "text/x-shellscript",
        b"<?php":             "text/x-php",
    }
    for magic, mime in sigs.items():
        if file_bytes[:len(magic)] == magic:
            return mime

    # Fallback to extension
    ext = Path(filename).suffix.lower()
    ext_map = {
        ".txt":".txt→text/plain", ".py":"text/x-python", ".js":"application/javascript",
        ".html":"text/html", ".json":"application/json", ".xml":"application/xml",
        ".csv":"text/csv", ".doc":"application/msword", ".docx":"application/vnd.openxmlformats",
        ".xls":"application/vnd.ms-excel", ".xlsx":"application/vnd.openxmlformats-excel",
        ".ppt":"application/vnd.ms-powerpoint", ".exe":"application/x-dosexec",
        ".dll":"application/x-dosexec", ".sh":"text/x-shellscript",
        ".bat":"text/x-bat", ".ps1":"text/x-powershell",
    }
    return ext_map.get(ext, "application/octet-stream")


def format_size(b: int) -> str:
    if b < 1024:        return f"{b} B"
    if b < 1_048_576:   return f"{b/1024:.1f} KB"
    return f"{b/1_048_576:.1f} MB"


# ─────────────────────────────────────────
#  VIRUSTOTAL  (real API if key present, else simulation)
# ─────────────────────────────────────────

def vt_hash_lookup(hash_str: str) -> dict | None:
    """Query VirusTotal v3 for a hash. Returns None if no API key."""
    if not VT_API_KEY:
        return None
    url     = f"https://www.virustotal.com/api/v3/files/{hash_str}"
    headers = {"x-apikey": VT_API_KEY}
    try:
        r = requests.get(url, headers=headers, timeout=15)
        if r.status_code == 200:
            return r.json()
        if r.status_code == 404:
            return {"not_found": True}
    except Exception:
        pass
    return None


def vt_file_upload(file_bytes: bytes, filename: str) -> dict | None:
    """Upload file to VirusTotal for scanning."""
    if not VT_API_KEY:
        return None
    url     = "https://www.virustotal.com/api/v3/files"
    headers = {"x-apikey": VT_API_KEY}
    try:
        files = {"file": (filename, file_bytes)}
        r = requests.post(url, headers=headers, files=files, timeout=30)
        if r.status_code in (200, 201):
            data    = r.json()
            scan_id = data.get("data", {}).get("id", "")
            if scan_id:
                # Poll for result (max 30s)
                for _ in range(6):
                    time.sleep(5)
                    rr = requests.get(f"https://www.virustotal.com/api/v3/analyses/{scan_id}", headers=headers, timeout=15)
                    if rr.status_code == 200:
                        rd = rr.json()
                        status = rd.get("data", {}).get("attributes", {}).get("status", "")
                        if status == "completed":
                            return rd
            return data
    except Exception:
        pass
    return None


def parse_vt_response(vt_data: dict) -> dict:
    """Parse VirusTotal API response into our format."""
    attrs = vt_data.get("data", {}).get("attributes", {})
    stats = attrs.get("last_analysis_stats", {})
    results_raw = attrs.get("last_analysis_results", {})

    malicious  = stats.get("malicious", 0)
    suspicious = stats.get("suspicious", 0)
    total      = sum(stats.values()) or 70
    detected   = malicious + suspicious

    engines = []
    for engine_name, eng_data in results_raw.items():
        cat = eng_data.get("category", "")
        if cat in ("malicious", "suspicious"):
            engines.append({
                "engine": engine_name,
                "result": eng_data.get("result", "Detected"),
            })

    return {
        "detections":    detected,
        "total_engines": total,
        "engines":       engines[:30],   # cap at 30 for UI
        "vt_link":       f"https://www.virustotal.com/gui/file/{attrs.get('sha256','')}"
    }


def simulate_scan_result(hashes: dict, filename: str, file_bytes: bytes) -> dict:
    """
    Offline simulation when no VT API key is set.
    Performs basic static analysis:
      - Dangerous extensions
      - Suspicious byte patterns (shellcode, PE with suspicious sections)
      - File entropy (packed/encrypted files)
    """
    detections = 0
    engines    = []
    ext        = Path(filename).suffix.lower()

    # High-risk extensions
    dangerous_exts = {".exe", ".dll", ".bat", ".cmd", ".ps1", ".vbs", ".scr",
                      ".com", ".pif", ".lnk", ".hta", ".jar", ".msi", ".reg"}
    # Medium-risk
    medium_exts    = {".js", ".vbe", ".wsf", ".wsh", ".sh", ".py", ".php", ".rb"}

    risk_ext = ext in dangerous_exts
    med_ext  = ext in medium_exts

    # Entropy calculation (high entropy = packed/encrypted = suspicious)
    if file_bytes:
        freq  = [0] * 256
        for b in file_bytes:
            freq[b] += 1
        ln    = len(file_bytes)
        ent   = -sum((c/ln) * math.log2(c/ln) for c in freq if c)
    else:
        ent = 0

    # Suspicious byte patterns
    suspicious_patterns = [
        b"cmd.exe", b"powershell", b"CreateRemoteThread",
        b"VirtualAlloc", b"ShellExecute", b"WScript.Shell",
        b"eval(base64", b"exec(", b"subprocess.call",
        b"/bin/sh", b"/bin/bash", b"net user", b"reg add",
        b"mimikatz", b"meterpreter",
    ]
    pattern_hits = sum(1 for p in suspicious_patterns if p.lower() in file_bytes.lower()
                       if file_bytes)

    # Scoring
    if risk_ext and ent > 7.0:
        detections = 12
        engines = [
            {"engine": "Windows Defender",  "result": "Trojan:Win32/Packed.Generic"},
            {"engine": "Kaspersky",          "result": "HEUR:Trojan.Win32.Generic"},
            {"engine": "Malwarebytes",       "result": "Malware.Packed.Generic"},
            {"engine": "Bitdefender",        "result": "Gen:Variant.Packed"},
            {"engine": "ESET-NOD32",         "result": "A Variant Of Win32/Packed"},
            {"engine": "Sophos",             "result": "Mal/Generic-S"},
            {"engine": "McAfee",             "result": "Packed-GBT"},
            {"engine": "Avast",              "result": "Win32:PUP-gen"},
            {"engine": "AVG",                "result": "Win32:PUP-gen"},
            {"engine": "TrendMicro",         "result": "TROJ_PACKED.GENERIC"},
            {"engine": "Symantec",           "result": "Trojan.Gen.2"},
            {"engine": "CrowdStrike Falcon", "result": "malicious_confidence_90"},
        ]
    elif risk_ext and pattern_hits > 2:
        detections = 7
        engines = [
            {"engine": "Windows Defender",  "result": "Suspicious:Win32/Behavior"},
            {"engine": "Kaspersky",          "result": "HEUR:Suspicious.Win32"},
            {"engine": "Malwarebytes",       "result": "Suspicious.Script"},
            {"engine": "ESET-NOD32",         "result": "Potentially Suspicious"},
            {"engine": "Sophos",             "result": "Suspicious/Generic"},
            {"engine": "McAfee",             "result": "GenericRXNS-MT!A"},
            {"engine": "Avast",              "result": "Win32:Suspicious"},
        ]
    elif risk_ext:
        detections = 2
        engines = [
            {"engine": "Windows Defender", "result": "PUA:Win32/Executable"},
            {"engine": "Malwarebytes",     "result": "PUP.Optional.Executable"},
        ]
    elif med_ext and pattern_hits > 0:
        detections = 3
        engines = [
            {"engine": "Windows Defender", "result": "Suspicious Script Behavior"},
            {"engine": "Kaspersky",         "result": "HEUR:Script.Generic"},
            {"engine": "ESET-NOD32",        "result": "Potentially Unwanted Script"},
        ]
    else:
        detections = 0
        engines    = []

    return {
        "detections":    detections,
        "total_engines": 70,
        "engines":       engines,
        "entropy":       round(ent, 2),
        "simulated":     True,
        "note":          "Offline simulation — set VT_API_KEY for real VirusTotal results",
    }


# ─────────────────────────────────────────
#  IP INTELLIGENCE
# ─────────────────────────────────────────
COUNTRY_FLAGS = {
    "US":"🇺🇸","GB":"🇬🇧","DE":"🇩🇪","FR":"🇫🇷","JP":"🇯🇵","CN":"🇨🇳",
    "IN":"🇮🇳","AU":"🇦🇺","CA":"🇨🇦","BR":"🇧🇷","RU":"🇷🇺","KR":"🇰🇷",
    "PK":"🇵🇰","BD":"🇧🇩","SA":"🇸🇦","AE":"🇦🇪","TR":"🇹🇷","NG":"🇳🇬",
    "ZA":"🇿🇦","EG":"🇪🇬","MX":"🇲🇽","AR":"🇦🇷","IT":"🇮🇹","ES":"🇪🇸",
    "NL":"🇳🇱","SE":"🇸🇪","NO":"🇳🇴","FI":"🇫🇮","PL":"🇵🇱","CH":"🇨🇭",
    "NZ":"🇳🇿","SG":"🇸🇬","MY":"🇲🇾","TH":"🇹🇭","ID":"🇮🇩","PH":"🇵🇭",
    "VN":"🇻🇳","UA":"🇺🇦","IL":"🇮🇱","IR":"🇮🇷","IQ":"🇮🇶","AF":"🇦🇫",
    "MM":"🇲🇲","ET":"🇪🇹","KE":"🇰🇪","TZ":"🇹🇿","GH":"🇬🇭","MA":"🇲🇦",
}

def get_ip_info(ip: str) -> dict:
    """Fetch IP geolocation from ipinfo.io (free, no key needed for basic)."""
    try:
        token_param = f"?token={IPINFO_TOKEN}" if IPINFO_TOKEN else ""
        r = requests.get(f"https://ipinfo.io/{ip}/json{token_param}", timeout=8)
        if r.status_code == 200:
            d = r.json()
            loc = d.get("loc", "0,0").split(",")
            cc  = d.get("country", "")
            return {
                "ip":           d.get("ip", ip),
                "city":         d.get("city", "N/A"),
                "region":       d.get("region", "N/A"),
                "country":      d.get("country", "N/A"),
                "country_code": cc,
                "flag":         COUNTRY_FLAGS.get(cc, "🌍"),
                "postal":       d.get("postal", "N/A"),
                "timezone":     d.get("timezone", "N/A"),
                "isp":          d.get("org", "N/A"),
                "org":          d.get("org", "N/A"),
                "asn":          d.get("org", "N/A").split()[0] if d.get("org") else "N/A",
                "latitude":     loc[0] if len(loc) > 0 else None,
                "longitude":    loc[1] if len(loc) > 1 else None,
            }
    except Exception:
        pass

    # Fallback — resolve hostname at least
    try:
        hostname = socket.gethostbyaddr(ip)[0]
    except Exception:
        hostname = ip

    return {
        "ip": ip, "city":"N/A", "region":"N/A",
        "country":"N/A", "country_code":"N/A", "flag":"🌍",
        "postal":"N/A", "timezone":"N/A",
        "isp": hostname, "org":"N/A", "asn":"N/A",
        "latitude":None, "longitude":None,
    }


def get_ip_threat(ip: str) -> dict:
    """
    Basic threat checks:
      - AbuseIPDB (if key available)
      - Heuristic checks (private ranges, known hosting ASNs, etc.)
    """
    ABUSEIPDB_KEY = os.environ.get("ABUSEIPDB_KEY", "")
    abuse_score   = 0
    proxy = vpn = tor = hosting = mobile = False

    if ABUSEIPDB_KEY:
        try:
            r = requests.get(
                "https://api.abuseipdb.com/api/v2/check",
                headers={"Key": ABUSEIPDB_KEY, "Accept": "application/json"},
                params={"ipAddress": ip, "maxAgeInDays": 90},
                timeout=8,
            )
            if r.status_code == 200:
                d = r.json().get("data", {})
                abuse_score = d.get("abuseConfidenceScore", 0)
                proxy       = d.get("isPublic", True) and abuse_score > 50
        except Exception:
            pass

    # Heuristic VPN/Hosting detection based on common hosting ASNs
    hosting_keywords = ["amazon", "google", "microsoft", "cloudflare", "digitalocean",
                    "linode", "vultr", "ovh", "hetzner", "leaseweb", "fastly",
                    "akamai", "cloudfront", "amazonaws", "azure", "gcp", "github",
                    "flyservers", "bulletproof", "sharktech", "combahton",
                    "serverius", "frantech", "retn", "selectel", "vdsina"]

    return {
        "proxy":       proxy,
        "vpn":         vpn,
        "tor":         tor,
        "mobile":      mobile,
        "hosting":     hosting,
        "abuse_score": abuse_score,
        "hosting_keywords": hosting_keywords,   # used in post-processing
    }


# ─────────────────────────────────────────
#  MAC VENDOR LOOKUP
# ─────────────────────────────────────────

def normalize_mac(mac: str) -> str:
    """Normalize MAC to XX:XX:XX:XX:XX:XX uppercase."""
    cleaned = re.sub(r"[^0-9a-fA-F]", "", mac)
    if len(cleaned) < 6:
        raise ValueError("MAC address too short")
    # Take first 12 hex chars
    cleaned = cleaned[:12].upper()
    return ":".join(cleaned[i:i+2] for i in range(0, 12, 2))


def lookup_mac(mac_raw: str) -> dict:
    norm_mac = normalize_mac(mac_raw)
    parts    = norm_mac.split(":")
    oui24    = ":".join(parts[:3])   # XX:XX:XX

    # Check local OUI DB first
    vendor, device_type = OUI_DB.get(oui24, (None, None))

    # If not found locally, try macvendors.com API (free, no key needed)
    if not vendor:
        try:
            r = requests.get(
                f"https://api.macvendors.com/{norm_mac}",
                timeout=6,
                headers={"User-Agent": "iSeeWaves-Scanner/1.0"}
            )
            if r.status_code == 200:
                vendor      = r.text.strip()
                device_type = "Network Device"
        except Exception:
            pass

    if not vendor:
        vendor      = "Unknown Vendor"
        device_type = "Unknown"

    # Detect locally administered / multicast
    first_byte  = int(parts[0], 16)
    is_local    = bool(first_byte & 0x02)   # bit 1 = locally administered
    is_multicast= bool(first_byte & 0x01)   # bit 0 = multicast
    is_broadcast= norm_mac == "FF:FF:FF:FF:FF:FF"

    if is_broadcast:
        addr_type = "Broadcast"
    elif is_multicast:
        addr_type = "Multicast"
    elif is_local:
        addr_type = "Locally Administered (Random/Virtual)"
    else:
        addr_type = "Globally Unique (OUI Enforced)"

    return {
        "mac":          norm_mac,
        "oui":          oui24,
        "vendor":       vendor,
        "device_type":  device_type or "Network Device",
        "address_type": addr_type,
        "is_private":   is_local,
        "is_multicast": is_multicast,
        "country":      "N/A",
    }


# ─────────────────────────────────────────
#  FLASK ROUTES
# ─────────────────────────────────────────

@app.route("/api/scan/file", methods=["POST"])
def scan_file():
    """
    Multipart upload.
    Returns: file info + hashes + AV detection results.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    f = request.files["file"]
    if not f.filename:
        return jsonify({"error": "Empty filename"}), 400

    file_bytes = f.read()
    if len(file_bytes) > MAX_FILE_BYTES:
        return jsonify({"error": f"File too large (max {MAX_FILE_MB} MB)"}), 413

    filename  = f.filename
    hashes    = compute_hashes(file_bytes)
    file_type = detect_file_type(file_bytes, filename)
    ext       = Path(filename).suffix.lower()

    # Try VirusTotal real API first (hash lookup is faster than upload)
    vt_data = vt_hash_lookup(hashes["sha256"])
    if vt_data and not vt_data.get("not_found"):
        scan_info = parse_vt_response(vt_data)
    elif VT_API_KEY:
        # Not in VT DB → upload
        vt_upload = vt_file_upload(file_bytes, filename)
        scan_info = parse_vt_response(vt_upload) if vt_upload else simulate_scan_result(hashes, filename, file_bytes)
    else:
        scan_info = simulate_scan_result(hashes, filename, file_bytes)

    return jsonify({
        "file_name":  filename,
        "file_size":  format_size(len(file_bytes)),
        "file_type":  file_type,
        "extension":  ext or "none",
        "md5":        hashes["md5"],
        "sha1":       hashes["sha1"],
        "sha256":     hashes["sha256"],
        **scan_info,
    })


@app.route("/api/scan/hash", methods=["POST"])
def scan_hash():
    """
    JSON body: { "hash": "abc123..." }
    Accepts MD5 (32), SHA-1 (40), SHA-256 (64).
    """
    data = request.get_json(silent=True) or {}
    hash_str = str(data.get("hash", "")).strip().lower()

    if not hash_str:
        return jsonify({"error": "Hash is required"}), 400

    # Validate format
    if len(hash_str) not in (32, 40, 64) or not re.fullmatch(r"[0-9a-f]+", hash_str):
        return jsonify({"error": "Invalid hash format. Provide MD5 (32), SHA-1 (40), or SHA-256 (64) hex characters."}), 400

    hash_type = {32: "MD5", 40: "SHA-1", 64: "SHA-256"}[len(hash_str)]

    vt_data = vt_hash_lookup(hash_str)

    if vt_data is None:
        # No API key → return hash info only
        return jsonify({
            "hash":         hash_str,
            "hash_type":    hash_type,
            "md5":          hash_str if len(hash_str)==32 else "N/A",
            "sha1":         hash_str if len(hash_str)==40 else "N/A",
            "sha256":       hash_str if len(hash_str)==64 else "N/A",
            "detections":   0,
            "total_engines":0,
            "engines":      [],
            "file_name":    "N/A",
            "file_size":    "N/A",
            "file_type":    "N/A",
            "extension":    "N/A",
            "note":         "Set VT_API_KEY for real VirusTotal results",
            "simulated":    True,
        })

    if vt_data.get("not_found"):
        return jsonify({
            "hash":         hash_str,
            "hash_type":    hash_type,
            "md5":          hash_str if len(hash_str)==32 else "N/A",
            "sha256":       hash_str if len(hash_str)==64 else "N/A",
            "sha1":         hash_str if len(hash_str)==40 else "N/A",
            "detections":   0,
            "total_engines":70,
            "engines":      [],
            "file_name":    "Not in VT database",
            "file_size":    "N/A",
            "file_type":    "N/A",
            "extension":    "N/A",
        })

    scan_info = parse_vt_response(vt_data)
    attrs     = vt_data.get("data", {}).get("attributes", {})

    return jsonify({
        "hash":       hash_str,
        "hash_type":  hash_type,
        "md5":        attrs.get("md5", hash_str if len(hash_str)==32 else "N/A"),
        "sha1":       attrs.get("sha1", hash_str if len(hash_str)==40 else "N/A"),
        "sha256":     attrs.get("sha256", hash_str if len(hash_str)==64 else "N/A"),
        "file_name":  attrs.get("meaningful_name", "Unknown"),
        "file_size":  format_size(attrs.get("size", 0)),
        "file_type":  attrs.get("type_description", "N/A"),
        "extension":  attrs.get("type_extension", "N/A"),
        **scan_info,
    })


@app.route("/api/scan/ip", methods=["POST"])
def scan_ip():
    """
    JSON body: { "ip": "8.8.8.8" }
    Returns geolocation + threat data.
    """
    data = request.get_json(silent=True) or {}
    ip   = str(data.get("ip", "")).strip()

    if not ip:
        return jsonify({"error": "IP address is required"}), 400

    # Basic validation
    ip_pattern = r"^(\d{1,3}\.){3}\d{1,3}$|^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$"
    if not re.match(ip_pattern, ip):
        # Try resolving as domain
        try:
            ip = socket.gethostbyname(ip)
        except Exception:
            return jsonify({"error": "Invalid IP address or unresolvable domain"}), 400

    geo    = get_ip_info(ip)
    threat = get_ip_threat(ip)

    # Check hosting based on ISP name
    isp_lower = geo.get("isp", "").lower()
    hosting   = any(kw in isp_lower for kw in threat.pop("hosting_keywords", []))

    return jsonify({
        **geo,
        "proxy":       threat["proxy"],
        "vpn":         threat["vpn"],
        "tor":         threat["tor"],
        "mobile":      threat["mobile"],
        "hosting":     hosting,
        "abuse_score": threat["abuse_score"],
    })


@app.route("/api/scan/mac", methods=["POST"])
def scan_mac():
    """
    JSON body: { "mac": "00:1A:2B:3C:4D:5E" }
    Returns vendor, device type, OUI info.
    """
    data = request.get_json(silent=True) or {}
    mac  = str(data.get("mac", "")).strip()

    if not mac:
        return jsonify({"error": "MAC address is required"}), 400

    try:
        result = lookup_mac(mac)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    return jsonify(result)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status":   "ok",
        "service":  "iSeeWaves File & IP Scanner",
        "vt_key":   "configured" if VT_API_KEY else "not set (simulation mode)",
        "ipinfo":   "configured" if IPINFO_TOKEN else "free tier",
    })


# ─────────────────────────────────────────
#  RUN
# ─────────────────────────────────────────
if __name__ == "__main__":
    print("=" * 55)
    print("  iSeeWaves — File & IP Scanner Backend")
    print(f"  Running on  http://localhost:5002")
    print("  Routes:")
    print("    POST /api/scan/file   — File upload & analysis")
    print("    POST /api/scan/hash   — Hash lookup (MD5/SHA1/SHA256)")
    print("    POST /api/scan/ip     — IP geolocation & threat")
    print("    POST /api/scan/mac    — MAC vendor detection")
    print("    GET  /api/health      — Status check")
    print("  ─" * 27)
    print("  Optional env vars:")
    print("    VT_API_KEY    — VirusTotal API key (free at virustotal.com)")
    print("    IPINFO_TOKEN  — ipinfo.io token (optional)")
    print("    ABUSEIPDB_KEY — AbuseIPDB key (optional)")
    print("=" * 55)
    app.run(debug=True, host="127.0.0.1", port=5002)