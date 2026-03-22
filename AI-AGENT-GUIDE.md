# AI Agent Installation and Usage Guide

This guide is for AI agents that need to install and use MetaMask Flask Automation.

## Quick Install (5 Commands)

```bash
# 1. Clone repository
git clone https://github.com/neo-kripto/metamask-flask-automation.git

# 2. Enter directory
cd metamask-flask-automation

# 3. Install dependencies
npm install

# 4. Install Playwright browser
npx playwright install chromium

# 5. Verify installation
node scripts/test-simple.js
```

## What This Skill Does

Automates Web3 dApp interactions:
- Connect wallet to any dApp (Uniswap, Aave, OpenSea, etc.)
- Auto-approve transactions (no popup after initial setup)
- Token swaps, approvals, minting, staking, claims
- Works with all EVM-compatible blockchains

## Key Files

- `scripts/run-with-flask.sh` - Launch browser with MetaMask Flask
- `scripts/universal-dapp-automation.js` - Universal automation script
- `scripts/test-simple.js` - Quick functionality test
- `SKILL.md` - Complete documentation
- `docs/INSTALL.md` - Detailed installation guide

## Usage Examples

### Launch Browser

```bash
./scripts/run-with-flask.sh "https://app.uniswap.org/"
```

### Connect to dApp

```bash
node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"
```

### Swap Tokens

```bash
node scripts/universal-dapp-automation.js swap "https://app.uniswap.org/"
```

### Mint NFT

```bash
node scripts/universal-dapp-automation.js mint "https://nft-project.com/"
```

## Test Wallet

Default test wallet (testing only, do not use for real funds):

```
Address: 0x4B54E9621B14a5c069Ef7520676C53B70377d17B
Seed: speed emerge manual base peace tragic margin vote service leader radio fortune
Network: Ethereum Mainnet + Testnets
```

## Auto-Approve Setup

1. Launch browser: `./scripts/run-with-flask.sh "http://localhost:3000"`
2. Click "Create Session Key"
3. Approve once in MetaMask
4. All future transactions: auto-approved (no popup)

## Common Issues

### Browser Won't Launch

```bash
# Install Xvfb
sudo apt-get install xvfb

# Try again
xvfb-run ./scripts/run-with-flask.sh
```

### Playwright Error

```bash
# Reinstall browsers
npx playwright install chromium --force
```

### Extension Not Found

```bash
# Download MetaMask Flask
mkdir -p extensions
cd extensions
curl -L -o metamask-flask.crx "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=120.0&acceptformat=crx2,crx3&x=id%3Dljfoeinjpaedjfecbmggjgodbgkmjkjk%26uc"
unzip metamask-flask.crx -d metamask-flask
cd ..
```

## Verification

Run these to verify installation:

```bash
# Test 1: Check scripts exist
ls -la scripts/

# Test 2: Run quick test
node scripts/test-simple.js

# Test 3: Launch browser
./scripts/run-with-flask.sh
```

All should complete successfully.

## Integration with Other AI Agents

This skill can be called from other AI agents:

```javascript
// Import the automation class
const UniversalDAppAutomation = require('./scripts/universal-dapp-automation');

// Create instance
const automation = new UniversalDAppAutomation({
  dappUrl: 'https://app.uniswap.org/',
});

// Use methods
await automation.launch();
await automation.importWallet();
await automation.connectToDApp();
await automation.executeAction('swap', { amount: 0.1 });
```

## Security Notes

- Test wallet seed is public - for testing only
- Never commit real wallet seeds to git
- Use environment variables for production
- Session keys have configurable limits and expiry

## Support

- Full documentation: `SKILL.md`
- Installation guide: `docs/INSTALL.md`
- Setup guide: `docs/COMPLETE-SETUP.md`
- Test results: `docs/TEST-REPORT-FINAL.md`

## Repository

- GitHub: https://github.com/neo-kripto/metamask-flask-automation
- License: MIT
- Version: 1.0.0
