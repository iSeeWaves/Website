# iSeeWaves Chatbot Backend — Setup Guide

## 1. Install dependencies
```bash
pip install -r requirements.txt --break-system-packages
```

## 2. Get your free Groq API key
1. Go to https://console.groq..com
2. Sign in with any Google account
3. Click "Get API Key" → "Create API Key"
4. Copy the key (starts with `AIzaSy...`)

No credit card needed. Free tier: ~15 requests/minute, ~1500 requests/day on
the `groq 3.3` model — more than enough for FYP demo/testing.

## 3. Configure the key
```bash
cp .env.example .env
```
Open `.env` and paste your real key: