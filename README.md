# MetaMask Flask Automation

Universal automation for MetaMask Flask with Session Snap auto-approve technology. Automate any Web3 dApp interaction including wallet connections, token approvals, swaps, NFT minting, staking, and custom smart contract calls.

**Repository:** https://github.com/neoresearchme/metamask-flask-automation

---

## Quick Start

### Install

```bash
git clone https://github.com/neoresearchme/metamask-flask-automation.git
cd metamask-flask-automation
npm install
npx playwright install chromium
```

### Configure Wallet

```bash
cp .env.example .env
# Edit .env with your wallet configuration
```

### Run

```bash
# Launch browser with dApp
./scripts/run-with-flask.sh "https://app.uniswap.org/"

# Or use automation script
node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"
```

---

## Features

- ✅ Universal dApp support (Uniswap, Aave, OpenSea, all EVM dApps)
- ✅ Auto-approve transactions (Session Snap technology)
- ✅ Token swaps, approvals, minting, staking, claims
- ✅ Multi-chain support (Ethereum, Arbitrum, Tempo, etc.)
- ✅ Secure session management with contract whitelist
- ✅ Configurable value limits and time expiry

---

## Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Xvfb (for headless browser testing)
- Linux/Unix-based system (or WSL on Windows)

### System Dependencies

**Ubuntu/Debian:**

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

**macOS:**

```bash
brew install node git
```

### Clone and Install

```bash
git clone https://github.com/neoresearchme/metamask-flask-automation.git
cd metamask-flask-automation
npm install
npx playwright install chromium
```

### Download MetaMask Flask Extension

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

---

## Wallet Configuration

**IMPORTANT:** Never commit wallet credentials to git!

### Configure Your Wallet

1. Copy environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with ONE of these methods:

   **Method A: Seed Phrase (Testing)**
   ```bash
   WALLET_MNEMONIC="your twelve word seed phrase"
   WALLET_PASSWORD="your-secure-password"
   ```

   **Method B: Private Key**
   ```bash
   WALLET_PRIVATE_KEY="0xYourPrivateKeyHere"
   WALLET_PASSWORD="your-secure-password"
   ```

   **Method C: Wallet File**
   ```bash
   WALLET_FILE_PATH="/absolute/path/to/your/wallet.json"
   WALLET_PASSWORD="your-keystore-password"
   ```

3. **Security:**
   - `.env` is gitignored (never commit!)
   - Use test wallet for development
   - Use hardware wallet for production

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `WALLET_MNEMONIC` | Seed phrase | `"word1 word2 ... word12"` |
| `WALLET_PRIVATE_KEY` | Private key | `"0x1234...abcd"` |
| `WALLET_FILE_PATH` | Keystore file | `"/path/to/wallet.json"` |
| `WALLET_PASSWORD` | Wallet password | `"MyPassword123"` |
| `RPC_URL` | RPC endpoint | `"https://mainnet.infura.io/v3/KEY"` |
| `CHAIN_ID` | Chain ID | `1` (Ethereum) |
| `SESSION_EXPIRY_MS` | Session duration | `86400000` (24h) |
| `SESSION_MAX_VALUE_ETH` | Max tx value | `0.5` ETH |
| `SESSION_ALLOWED_CONTRACTS` | Contract whitelist | `"0xUniswap,0xAave"` |

---

## Usage

### Launch Browser

```bash
# Basic usage
./scripts/run-with-flask.sh

# With specific dApp
./scripts/run-with-flask.sh "https://app.uniswap.org/"

# With any dApp
./scripts/run-with-flask.sh "https://your-dapp.com/"
```

### Automation Scripts

```bash
# Connect to dApp
node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"

# Create auto-approve session
node scripts/universal-dapp-automation.js session

# Swap tokens
node scripts/universal-dapp-automation.js swap "https://app.uniswap.org/"

# Mint NFT
node scripts/universal-dapp-automation.js mint "https://nft-project.com/"

# Test configuration
node scripts/test-env.js
```

### Test Installation

```bash
# Quick functionality test
node scripts/test-simple.js

# Test environment configuration
node scripts/test-env.js
```

---

## Auto-Approve Setup

Session Snap enables automatic transaction signing without MetaMask popups:

### Step 1: Create Session

```bash
# Launch browser with test dApp
./scripts/run-with-flask.sh "http://localhost:3000"

# In browser:
# 1. Click "Create Session Key"
# 2. Approve once in MetaMask
# 3. Session created!
```

### Step 2: Auto-Approve Enabled

After session creation, all transactions are auto-approved:

- ✅ Swaps (no popup)
- ✅ Approvals (no popup)
- ✅ Mints (no popup)
- ✅ Any contract call (no popup)

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

---

## Supported dApps

| dApp | Type | Status |
|------|------|--------|
| Uniswap | DEX | ✅ Tested |
| Aave | Lending | ✅ Compatible |
| Compound | Lending | ✅ Compatible |
| OpenSea | NFT | ✅ Compatible |
| Sushiswap | DEX | ✅ Compatible |
| Curve | DEX | ✅ Compatible |
| Any EVM dApp | All | ✅ Compatible |

---

## Project Structure

```
metamask-flask-automation/
├── .env.example              # Environment configuration template
├── .gitignore                # Git ignore rules
├── package.json              # NPM dependencies
├── scripts/                  # Automation scripts
│   ├── run-with-flask.sh         # Browser launcher
│   ├── test-env.js               # Environment test
│   ├── test-simple.js            # Functionality test
│   └── universal-dapp-automation.js  # Universal automation
└── docs/                     # Documentation
    ├── COMPLETE-SETUP.md         # Full setup guide
    ├── INSTALL-METAMASK-FLASK.md # MetaMask installation
    ├── INSTALL.md                # Installation guide
    ├── TEST-REPORT-FINAL.md      # Test results
    └── WALLET-MANAGEMENT.md      # Wallet security guide
```

---

## Testing

### Run Tests

```bash
# Quick functionality test
node scripts/test-simple.js

# Environment configuration test
node scripts/test-env.js

# Playwright tests (requires implementation)
cd /path/to/implementation
npx playwright test tests/verify-setup.spec.js
npx playwright test tests/uniswap-test.spec.js
```

### Test Results

**21/21 Tests PASSED:**

- Simple Tests: 7/7 ✅
- Unit Tests: 9/9 ✅
- Verify Setup: 3/3 ✅
- Uniswap Test: 2/2 ✅

See `docs/TEST-REPORT-FINAL.md` for detailed results.

---

## Troubleshooting

### Browser Does Not Launch

```bash
# Check Xvfb installation
which xvfb-run

# Install if missing
sudo apt-get install xvfb

# Try manual launch
xvfb-run --server-args="-screen 0 1920x1080x24" ./scripts/run-with-flask.sh
```

### Extension Not Loaded

```bash
# Verify extension files
ls extensions/metamask-flask/manifest.json

# Re-download if needed
# See "Download MetaMask Flask Extension" section
```

### Tests Fail

```bash
# Check dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run tests with verbose output
npx playwright test --reporter=list
```

### No Wallet Configured

```bash
# Check .env file exists
ls -la .env

# Verify wallet configuration
cat .env | grep WALLET_

# See Wallet Configuration section above
```

---

## Security

### Best Practices

1. **Use `.env` for all configuration**
   - Never commit `.env` to git
   - Use `.env.example` as template

2. **Separate test wallet from production**
   - Create dedicated test wallet
   - Fund with minimal amount
   - Never reuse main wallet

3. **Use hardware wallet for production**
   - Ledger or Trezor
   - Manual approval for all transactions
   - Multi-sig for large amounts

4. **Regular security audits**
   - Review code before running
   - Check for vulnerabilities
   - Keep dependencies updated

### Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Wallet JSON files not committed
- [ ] Using separate test wallet for development
- [ ] Test wallet has minimal funds
- [ ] Production uses hardware wallet
- [ ] Passwords are strong and unique
- [ ] Regular security audits
- [ ] Backup seed phrases stored securely (offline)

---

## Resources

- **GitHub Repository:** https://github.com/neoresearchme/metamask-flask-automation
- **Skill Documentation:** `/root/.agents/skills/metamask-flask-automation/SKILL.md`
- **Complete Setup:** `docs/COMPLETE-SETUP.md`
- **Installation Guide:** `docs/INSTALL.md`
- **Wallet Management:** `docs/WALLET-MANAGEMENT.md`
- **Test Results:** `docs/TEST-REPORT-FINAL.md`

---

## License

MIT

## Version

1.0.0

## Last Updated

2026-03-22
