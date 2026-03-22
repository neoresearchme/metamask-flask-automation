# Install MetaMask Flask - Quick Guide

## ✅ Extension Sudah Downloaded!

MetaMask Flask sudah ada di:
```
/root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask/
```

---

## 🚀 Cara 1: Launch Browser dengan Extension (RECOMMENDED)

Jalankan script ini:

```bash
cd /root/.openclaw/workspace-neo-kripto/browser-automation/simple-session-snap
./run-with-flask.sh
```

Ini akan membuka Chromium dengan MetaMask Flask terinstall, langsung buka test dApp di http://localhost:3000

---

## 🚀 Cara 2: Manual Launch dengan Chrome/Chromium

### Step 1: Buka Chrome/Chromium dengan flags

```bash
# Path ke Chromium Playwright
CHROME=/root/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome

# Path ke extension
EXT=/root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask

# Launch
$CHROME \
  --disable-extensions-except=$EXT \
  --load-extension=$EXT \
  --disable-gpu \
  --no-sandbox \
  --user-data-dir=/tmp/chrome-flask-profile \
  http://localhost:3000
```

### Step 2: Di dalam browser

1. **MetaMask Flask icon** akan muncul di toolbar (pojok kanan atas)
2. Klik icon MetaMask Flask
3. **Import wallet** dengan seed phrase:
   ```
   speed emerge manual base peace tragic margin vote service leader radio fortune
   ```
4. Set password: `TestPassword123`
5. Wallet imported!

### Step 3: Test Snap

1. Di browser, buka **http://localhost:3000**
2. Klik **"Connect to Session Snap"**
3. MetaMask popup muncul → klik **"Connect"**
4. Klik **"Create Session Key"**
5. MetaMask popup → klik **"Confirm"**
6. Klik **"Sign Test Transaction"**
7. ⚡ **NO POPUP!** Transaction signed otomatis!
8. Klik **"Revoke Session"** untuk cleanup

---

## 🧪 Verify Extension Loaded

Cek apakah extension terload:

```bash
# Check extension files exist
ls -la /root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask/manifest.json

# Should show manifest.json with MetaMask info
cat /root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask/manifest.json | head -20
```

---

## 📋 Test Checklist

- [ ] Chromium launches dengan MetaMask Flask
- [ ] MetaMask icon visible di toolbar
- [ ] Bisa import wallet dengan seed
- [ ] Test dApp loads di http://localhost:3000
- [ ] Connect button works
- [ ] Create Session works (1x popup)
- [ ] **Sign Transaction works (NO POPUP!)** ⚡
- [ ] Revoke works

---

## 🎯 Expected Behavior

| Action | Expected |
|--------|----------|
| Connect to Snap | MetaMask install dialog |
| Create Session | MetaMask confirmation (1x) |
| **Sign Transaction** | **NO POPUP - Auto-signed!** |
| Revoke | Session cleared |

---

## 🔧 Troubleshooting

### Extension tidak muncul
- Pastikan path extension benar
- Restart browser
- Check `chrome://extensions/` - MetaMask Flask harus ada

### Wallet import gagal
- Pastikan seed phrase benar (12 words)
- Gunakan network Tempo mainnet (Chain ID: 4217)

### Snap tidak connect
- Pastikan snap server running: `http://localhost:8080`
- Refresh halaman
- Re-connect snap

---

## 📞 Quick Commands

```bash
# Start servers
cd /root/.openclaw/workspace-neo-kripto/browser-automation/simple-session-snap
npm run serve &
npx http-server public -p 3000 &

# Launch browser with Flask
./run-with-flask.sh

# Or manual launch
/root/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome \
  --disable-extensions-except=/root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask \
  --load-extension=/root/.openclaw/workspace-neo-kripto/browser-automation/extensions/metamask-flask \
  --user-data-dir=/tmp/chrome-flask-profile \
  http://localhost:3000
```

---

**Status:** ✅ MetaMask Flask downloaded & ready  
**Next:** Launch browser dan test! 🚀
