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
git clone https://github.com/neoresearchme/metamask-flask-automation.git
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

## Step 7: Configure Wallet

**IMPORTANT:** Never use example wallets from documentation for real funds!

1. Copy environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your wallet configuration:
   ```bash
   # Option 1: Seed phrase (testing)
   WALLET_MNEMONIC="your twelve word seed phrase"
   
   # Option 2: Private key
   WALLET_PRIVATE_KEY="0xYourPrivateKey"
   
   # Option 3: Wallet file
   WALLET_FILE_PATH="/path/to/wallet.json"
   
   # Password
   WALLET_PASSWORD="your-secure-password"
   ```

3. **Security:**
   - `.env` is gitignored (never commit!)
   - Use separate test wallet for development
   - Use hardware wallet for production
   - See `docs/WALLET-MANAGEMENT.md` for complete guide

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
# Wallet
WALLET_MNEMONIC="your seed phrase"
WALLET_PASSWORD="your password"

# Network
RPC_URL="https://mainnet.infura.io/v3/YOUR_KEY"
CHAIN_ID=1

# Session
SESSION_EXPIRY_MS=86400000
SESSION_MAX_VALUE_ETH=0.5
```

See `.env.example` for all available options.

### Session Configuration

Edit session settings in `.env`:

```bash
# Session duration (24 hours)
SESSION_EXPIRY_MS=86400000

# Max value per transaction
SESSION_MAX_VALUE_ETH=0.5

# Contract whitelist
SESSION_ALLOWED_CONTRACTS="0xUniswap,0xAave"
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

### Issue: No Wallet Configured

```bash
# Check .env file exists
ls -la .env

# Verify wallet configuration
cat .env | grep WALLET_

# See docs/WALLET-MANAGEMENT.md for wallet setup
```

## Next Steps

After successful installation:

1. Read `SKILL.md` for usage documentation
2. Read `docs/WALLET-MANAGEMENT.md` for wallet security
3. Run `./scripts/run-with-flask.sh` to launch browser
4. Test with a dApp (e.g., Uniswap)
5. Configure session for auto-approve
6. Execute Web3 actions

## Support

For issues or questions:
- Check `docs/WALLET-MANAGEMENT.md` for wallet issues
- Check `docs/COMPLETE-SETUP.md` for setup help
- Check `docs/TEST-REPORT-FINAL.md` for test results
- Open an issue on GitHub

## Verification Checklist

- [ ] Node.js v18+ installed
- [ ] npm/yarn installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed
- [ ] MetaMask Flask extension downloaded
- [ ] Wallet configured in `.env`
- [ ] Quick test passes (`node scripts/test-simple.js`)
- [ ] Browser launches successfully

**Installation Complete!**
