"""
iSeeWaves — AI Chatbot Backend
Flask + Groq API (free tier, OpenAI-compatible)

Run:
    pip install -r requirements.txt --break-system-packages
    cp .env.example .env        (then paste your real API key inside)
    python chatbot_app.py

Runs on: http://localhost:5008
Frontend should call: POST http://localhost:5008/api/chat
"""

import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()   # Reads .env file and loads GROQ_API_KEY into environment
print("GROQ KEY LOADED:", os.getenv("GROQ_API_KEY")[:10] if os.getenv("GROQ_API_KEY") else "NOT FOUND")

app = Flask(__name__)
CORS(app)   # Allow React frontend (localhost:3000) to call this API

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL   = "llama-3.3-70b-versatile"   # Free tier, strong general-purpose model
GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions"

# ── System prompt — tells the model how to behave as iSeeWaves' assistant ───
SYSTEM_PROMPT = """You are the official AI assistant for iSeeWaves, a Pakistani cybersecurity
company (Pvt Ltd, established 2025) based in Abbottabad. You assist visitors on the iSeeWaves
website (a React-based SARS — Security Analysis and Reporting System — web application).

IMPORTANT — Actual site structure (use this exact info when explaining navigation):
- There is NO login or account required to use any tool. All tools are publicly accessible.
- All security tools are accessed through the "Services" dropdown menu in the top navigation bar.
- The Services dropdown contains four tool categories:
  1. Reconnaissance — WHOIS lookup, DNS enumeration, subdomain enumeration, port scanning,
     banner grabbing, and technology detection. Has Passive Recon and Active Recon tabs.
  2. Scanning — malicious file scanning, file/hash integrity check, IP scanning, MAC scanning.
  3. IP Tracker — enter any IP address or domain to see geolocation, ISP, ASN, and threat
     intelligence (proxy/VPN/Tor detection) on an interactive map.
  4. Password Tools — password strength checker and a configurable password generator.
- To use any tool: click "Services" in the navbar, select the desired tool category, then on
  that tool's page type the target (domain, IP, or password) into the search/input bar and
  click the "Run Scan" (or equivalent) button. Results appear inline on the same page within
  seconds, with an option to download a report afterward.
- There is no separate "dashboard" or "SARS tab" — each tool has its own dedicated page,
  reached directly from the Services dropdown.

Answer user questions about cybersecurity concepts, how to use these specific tools, and
general security awareness in a clear, friendly, professional tone. Keep answers concise
(2-5 sentences unless the user asks for detail). If you don't know a specific detail about
the site, say so honestly rather than inventing steps. If asked something completely
unrelated to cybersecurity or the company, answer briefly and politely redirect toward how
you can help with security topics. Never provide instructions for actually attacking systems
without authorization — only educational, defensive, and ethical guidance."""


@app.route("/api/chat", methods=["POST"])
def chat():
    if not GROQ_API_KEY or GROQ_API_KEY == "your_api_key_here":
        return jsonify({
            "error": "Groq API key not configured. Add GROQ_API_KEY to your .env file."
        }), 500

    body = request.get_json(silent=True) or {}
    user_message = (body.get("message") or "").strip()
    history      = body.get("history", [])   # [{role: "user"|"model", text: "..."}]

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # ── Build OpenAI-style "messages" payload (Groq is OpenAI-compatible) ────
    # Groq expects: [{role: "system"|"user"|"assistant", content: "..."}, ...]
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    for turn in history[-20:]:   # keep last 20 turns max (context window safety)
        # Frontend sends role "model" for bot turns — map to OpenAI's "assistant"
        role = "assistant" if turn.get("role") == "model" else "user"
        text = (turn.get("text") or "").strip()
        if text:
            messages.append({"role": role, "content": text})

    messages.append({"role": "user", "content": user_message})

    payload = {
        "model": GROQ_MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500,
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        resp = requests.post(GROQ_URL, json=payload, headers=headers, timeout=20)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Could not reach Groq API: {e}"}), 502

    if resp.status_code == 429:
        return jsonify({
            "error": "Rate limit reached. Please wait a moment and try again."
        }), 429

    if resp.status_code != 200:
        print("=" * 60)
        print(f"GROQ ERROR — Status: {resp.status_code}")
        print(f"Response: {resp.text[:500]}")
        print("=" * 60)
        return jsonify({
            "error": f"Groq API error ({resp.status_code})",
            "detail": resp.text[:300],
        }), 502

    data = resp.json()

    try:
        reply_text = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        reply_text = "Sorry, I couldn't generate a response for that. Please rephrase your question."

    return jsonify({"reply": reply_text.strip()})


@app.route("/")
def index():
    return {"status": "iSeeWaves Chatbot API running", "model": GROQ_MODEL}


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5008)