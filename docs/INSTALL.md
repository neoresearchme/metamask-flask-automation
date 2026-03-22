# Installation Guide

This guide provides step-by-step instructions for installing and configuring MetaMask Flask Automation.

## Prerequisites

- Linux/Unix-based system (Windows requires WSL)
- Node.js v18 or higher
- npm or yarn package manager
- Git
- Xvfb (for headless browser testing)

## Step 1: Install System Dependencies

### Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install -y \
  nodejs \
  npm \
  git \
  xvfb \
  libnss3 \
  libnspr4 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2
```

### macOS

```bash
brew install node git
```

### Windows (WSL)

```bash
# Install WSL2 with Ubuntu
# Then follow Ubuntu/Debian instructions
```

## Step 2: Clone Repository

```bash
git clone https://github.com/neo-kripto/metamask-flask-automation.git
cd metamask-flask-automation
```

## Step 3: Install Node.js Dependencies

```bash
npm install
```

## Step 4: Install Playwright Browsers

```bash
npx playwright install chromium
```

## Step 5: Verify Installation

```bash
# Run quick test
node scripts/test-simple.js

# Expected output:
# All tests should pass
```

## Step 6: Download MetaMask Flask Extension

The MetaMask Flask extension is not included in the repository due to size. Download it:

```bash
mkdir -p extensions
cd extensions

# Download MetaMask Flask CRX
curl -L -o metamask-flask.crx \
  "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=120.0&acceptformat=crx2,crx3&x=id%3Dljfoeinjpaedjfecbmggjgodbgkmjkjk%26uc"

# Extract extension
unzip -o metamask-flask.crx -d metamask-flask
cd ..
```

## Step 7: Configure Test Wallet (Optional)

For testing purposes, you can use the default test wallet:

```javascript
// scripts/test-simple.js will use this automatically
const TEST_SEED = 'speed emerge manual base peace tragic margin vote service leader radio fortune';
```

**Warning:** This is a public test wallet. Do not use for real funds.

## Step 8: Test Installation

### Quick Test

```bash
node scripts/test-simple.js
```

### Browser Launch Test

```bash
./scripts/run-with-flask.sh "https://app.uniswap.org/"
```

### Full Test Suite

```bash
# Navigate to implementation directory
cd /path/to/implementation

# Run tests
npx playwright test tests/verify-setup.spec.js
npx playwright test tests/uniswap-test.spec.js
```

## Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```bash
# .env
TEST_SEED=your-test-seed-phrase
TEST_PASSWORD=your-test-password
DEFAULT_DAPP_URL=https://app.uniswap.org/
```

### Session Configuration

Edit `scripts/universal-dapp-automation.js` to customize:

```javascript
const DEFAULT_SESSION_CONFIG = {
  allowedContracts: ['0x...'],  // Your contract whitelist
  maxValuePerTx: '0.5 ETH',     // Value limit
  durationMs: 86400000,         // 24 hours
};
```

## Troubleshooting

### Issue: Xvfb Fails to Start

```bash
# Check if Xvfb is installed
which xvfb-run

# Install if missing
sudo apt-get install xvfb

# Try with explicit display
xvfb-run --server-args="-screen 0 1920x1080x24" ./scripts/run-with-flask.sh
```

### Issue: Playwright Browser Not Found

```bash
# Reinstall Playwright browsers
npx playwright install chromium --force
```

### Issue: Extension Not Loading

```bash
# Verify extension files exist
ls extensions/metamask-flask/manifest.json

# Re-download extension if needed
# See Step 6 above
```

### Issue: Permission Denied

```bash
# Make scripts executable
chmod +x scripts/*.sh
```

## Next Steps

After successful installation:

1. Read [SKILL.md](../SKILL.md) for usage documentation
2. Run `./scripts/run-with-flask.sh` to launch browser
3. Test with a dApp (e.g., Uniswap)
4. Configure session for auto-approve
5. Execute Web3 actions

## Support

For issues or questions:
- Check [docs/COMPLETE-SETUP.md](COMPLETE-SETUP.md)
- Review [docs/TEST-REPORT-FINAL.md](TEST-REPORT-FINAL.md)
- Open an issue on GitHub

## Verification Checklist

- [ ] Node.js v18+ installed
- [ ] npm/yarn installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed
- [ ] MetaMask Flask extension downloaded
- [ ] Quick test passes (`node scripts/test-simple.js`)
- [ ] Browser launches successfully

**Installation Complete!**
