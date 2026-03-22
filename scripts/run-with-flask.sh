#!/bin/bash

# Launch Chromium with MetaMask Flask extension
# Usage: ./run-with-flask.sh [URL]

EXTENSION_PATH="/root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask"
CHROME_PATH="/root/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome"

echo "🚀 Launching Chromium with MetaMask Flask..."
echo "   Extension: $EXTENSION_PATH"
echo "   Chrome: $CHROME_PATH"

# Use xvfb for headless display
xvfb-run --server-args="-screen 0 1920x1080x24" \
  $CHROME_PATH \
  --disable-extensions-except=$EXTENSION_PATH \
  --load-extension=$EXTENSION_PATH \
  --disable-gpu \
  --no-sandbox \
  --disable-dev-shm-usage \
  --disable-software-rasterizer \
  --user-data-dir=/tmp/chrome-flask-profile \
  ${1:-"https://app.uniswap.org/"} &

echo "✅ Chromium launched!"
echo "   MetaMask Flask should appear in extensions"
echo "   Press Ctrl+C to close"

wait
