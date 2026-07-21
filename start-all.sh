#!/usr/bin/env bash
# Starts every part of the iSeeWaves website stack together:
# React frontend, Express contact-form server, chatbot backend,
# and the 4 security tools. Logs go to ./logs/*.log. Ctrl+C stops everything.

set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

PIDS=()

cleanup() {
    echo ""
    echo "Stopping all services..."
    for pid in "${PIDS[@]}"; do
        kill "$pid" 2>/dev/null || true
    done
    wait 2>/dev/null || true
    echo "All services stopped."
}
trap cleanup EXIT INT TERM

start_service() {
    local name="$1"
    shift
    echo "Starting $name..."
    ( "$@" > "$LOG_DIR/$name.log" 2>&1 ) &
    PIDS+=($!)
}

# --- Root-level Python venv (for File_Scanner, recon_app, tracker_app, password_tool) ---
if [ ! -d "$ROOT_DIR/venv" ]; then
    echo "Root venv not found. Run: python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# --- chatbot_backend venv ---
if [ ! -d "$ROOT_DIR/chatbot_backend/venv" ]; then
    echo "chatbot_backend venv not found. Run: cd chatbot_backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

start_service "file_scanner"  "$ROOT_DIR/venv/bin/python" "$ROOT_DIR/File_Scanner.py"
start_service "recon_app"     "$ROOT_DIR/venv/bin/python" "$ROOT_DIR/recon_app.py"
start_service "tracker_app"   "$ROOT_DIR/venv/bin/python" "$ROOT_DIR/tracker_app.py"
start_service "password_tool" "$ROOT_DIR/venv/bin/python" "$ROOT_DIR/password_tool.py"
start_service "chatbot"       "$ROOT_DIR/chatbot_backend/venv/bin/python" "$ROOT_DIR/chatbot_backend/chatbot_app.py"
start_service "contact_server" node "$ROOT_DIR/server.js"

echo ""
echo "All backends starting. Logs: $LOG_DIR/"
echo "  File_Scanner   -> http://127.0.0.1:5002  (logs/file_scanner.log)"
echo "  recon_app      -> http://127.0.0.1:5009  (logs/recon_app.log)"
echo "  tracker_app    -> http://127.0.0.1:5001  (logs/tracker_app.log)"
echo "  password_tool  -> http://127.0.0.1:5003  (logs/password_tool.log)"
echo "  chatbot        -> http://127.0.0.1:5008  (logs/chatbot.log)"
echo "  contact_server -> http://localhost:5000  (logs/contact_server.log)"
echo ""
echo "Starting React frontend (foreground)... Ctrl+C to stop everything."
echo ""

npm start
