# MetaMask Flask Automation Skill

Universal automation for MetaMask Flask with Session Snap auto-approve technology. Automate any Web3 dApp interaction including wallet connections, token approvals, swaps, NFT minting, staking, and custom smart contract calls.

## Overview

This skill provides:
- Universal dApp support (Uniswap, Aave, OpenSea, and all EVM-compatible dApps)
- Auto-approve transactions using Session Snap (no popup after initial approval)
- Token swaps, approvals, minting, staking, and claims
- Multi-chain support (Ethereum, Arbitrum, Tempo, etc.)
- Secure session management with contract whitelisting and value limits

## Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Playwright
- Xvfb (for headless browser testing)

### Quick Install

```bash
# Clone the repository
git clone <repository-url>
cd metamask-flask-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Verify installation
node scripts/test-simple.js
```

### Full Setup

For complete setup instructions, see [docs/COMPLETE-SETUP.md](docs/COMPLETE-SETUP.md)

## Usage

### Launch Browser with MetaMask Flask

```bash
# Basic usage
./scripts/run-with-flask.sh

# With specific dApp
./scripts/run-with-flask.sh "https://app.uniswap.org/"

# With any dApp
./scripts/run-with-flask.sh "https://your-dapp.com/"
```

### Universal Automation Script

```bash
# Connect to dApp
node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"

# Create auto-approve session
node scripts/universal-dapp-automation.js session

# Swap tokens
node scripts/universal-dapp-automation.js swap "https://app.uniswap.org/"

# Mint NFT
node scripts/universal-dapp-automation.js mint "https://nft-project.com/"

# Test dApp
node scripts/universal-dapp-automation.js test "https://app.uniswap.org/"
```

### Programmatic Usage

```javascript
const UniversalDAppAutomation = require('./scripts/universal-dapp-automation');

const automation = new UniversalDAppAutomation({
  dappUrl: 'https://app.uniswap.org/',
});

await automation.launch();
await automation.importWallet();
await automation.connectToDApp();
await automation.executeAction('swap', { amount: 0.1 });
```

## Project Structure

```
metamask-flask-automation/
├── SKILL.md                      # Main skill documentation
├── README.md                     # This file
├── scripts/                      # Automation scripts
│   ├── run-with-flask.sh         # Browser launcher
│   ├── universal-dapp-automation.js  # Universal automation
│   └── test-simple.js            # Quick tests
├── docs/                         # Documentation
│   ├── COMPLETE-SETUP.md         # Full setup guide
│   ├── TEST-REPORT-FINAL.md      # Test results
│   └── INSTALL-METAMASK-FLASK.md # Installation guide
└── tests/                        # Test files (in implementation repo)
```

## Testing

### Run Tests

```bash
# Quick functionality test
node scripts/test-simple.js

# Playwright tests (requires implementation repo)
cd /path/to/implementation
npx playwright test tests/verify-setup.spec.js
npx playwright test tests/uniswap-test.spec.js
```

### Test Coverage

- Simple Tests: 7/7 PASSED
- Unit Tests: 9/9 PASSED
- Verify Setup: 3/3 PASSED
- Uniswap Test: 2/2 PASSED
- **Total: 21/21 PASSED**

See [docs/TEST-REPORT-FINAL.md](docs/TEST-REPORT-FINAL.md) for detailed results.

## Features

### Auto-Approve Technology

Session Snap enables automatic transaction signing without MetaMask popups:

1. Create session (requires 1x approval)
2. All subsequent transactions: auto-signed
3. No popup interruptions
4. Configurable limits and expiry

### Security

- Contract whitelist (only approved contracts)
- Value limits per transaction (default: 0.5 ETH)
- Time-based expiry (default: 24 hours)
- User approval required for session creation
- Encrypted session state management

### Supported dApps

- Uniswap (swaps)
- Aave (lending)
- Compound (lending)
- OpenSea (NFTs)
- Sushiswap (swaps)
- Curve (swaps)
- Any EVM-compatible dApp

## Configuration

### Test Wallet

Default test wallet (for testing only):

```
Address: 0x4B54E9621B14a5c069Ef7520676C53B70377d17B
Seed: speed emerge manual base peace tragic margin vote service leader radio fortune
Path: m/44'/60'/0'/0/0
Network: Ethereum Mainnet + Testnets
```

**Warning:** This seed is stored in the repository for testing purposes only. Do not use for real funds.

### Session Configuration

```javascript
{
  allowedContracts: ['0x...'],  // Contract whitelist
  maxValuePerTx: '0.5 ETH',     // Value limit per transaction
  durationMs: 86400000,         // Session duration (24 hours)
  active: true
}
```

## Implementation

This skill repository contains documentation and scripts. The full implementation (Snap source code, tests, MetaMask Flask extension) is located in:

```
/root/.openclaw/workspace-neo-kripto/browser-automation/simple-session-snap/
```

### Implementation Files

- `src/index.ts` - Session Snap source code
- `dist/bundle.js` - Built snap (3.1KB)
- `public/index.html` - Test dApp UI
- `tests/` - Playwright test suite
- `extensions/metamask-flask/` - MetaMask Flask extension (29MB, not in git)

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
# See docs/INSTALL-METAMASK-FLASK.md
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

## Documentation

- [SKILL.md](SKILL.md) - Complete skill documentation
- [docs/COMPLETE-SETUP.md](docs/COMPLETE-SETUP.md) - Full setup guide
- [docs/TEST-REPORT-FINAL.md](docs/TEST-REPORT-FINAL.md) - Test results
- [docs/INSTALL-METAMASK-FLASK.md](docs/INSTALL-METAMASK-FLASK.md) - Installation guide

## License

MIT

## Version

1.0.0

## Last Updated

2026-03-22
