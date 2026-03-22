# Wallet Management Guide

This guide explains how to configure and manage wallets for MetaMask Flask Automation.

## Security Notice

**IMPORTANT:** Never commit wallet credentials to version control!

- ✅ Use `.env` file for configuration (gitignored by default)
- ✅ Use hardware wallets for production
- ✅ Use separate test wallets for development
- ❌ Never commit `.env` to git
- ❌ Never commit wallet JSON files to git
- ❌ Never share private keys or seed phrases

---

## Wallet Configuration Methods

### Method 1: Mnemonic Seed Phrase (Recommended for Testing)

**Use case:** Development and testing with multiple accounts

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your seed phrase:
   ```bash
   WALLET_MNEMONIC="your twelve word mnemonic seed phrase here"
   WALLET_PASSWORD="your-secure-password"
   ```

3. Run automation:
   ```bash
   node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"
   ```

**Pros:**
- Easy to manage multiple accounts
- Standard format (BIP39)
- Works with all wallets

**Cons:**
- Less secure than hardware wallets
- Single point of failure

---

### Method 2: Private Key

**Use case:** Single wallet automation

1. Edit `.env`:
   ```bash
   WALLET_PRIVATE_KEY="0xYourPrivateKeyHere"
   WALLET_PASSWORD="your-secure-password"
   ```

2. Run automation:
   ```bash
   node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"
   ```

**Pros:**
- Simple setup
- Direct access to specific wallet

**Cons:**
- Only one wallet
- Private key exposure risk

---

### Method 3: Wallet JSON File (Keystore)

**Use case:** Encrypted wallet storage

1. Create or obtain wallet JSON file (V3 keystore format)

2. Edit `.env`:
   ```bash
   WALLET_FILE_PATH="/absolute/path/to/your/wallet.json"
   WALLET_PASSWORD="your-keystore-password"
   ```

3. Run automation:
   ```bash
   node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"
   ```

**Pros:**
- Encrypted storage
- Standard format (EIP-2335)

**Cons:**
- Requires manual import in MetaMask
- Password required

---

### Method 4: Hardware Wallet (Most Secure)

**Use case:** Production with real funds

**Note:** Hardware wallet support requires manual interaction for security.

1. Connect your Ledger or Trezor

2. Install MetaMask Flask extension

3. Connect hardware wallet to MetaMask:
   - Open MetaMask Flask
   - Click account icon
   - Select "Connect Hardware Wallet"
   - Choose your device

4. Run automation (manual approval required):
   ```bash
   ./scripts/run-with-flask.sh "https://app.uniswap.org/"
   ```

**Pros:**
- Maximum security
- Private keys never leave device
- Required for production

**Cons:**
- Manual approval required
- Cannot fully automate
- Hardware cost

---

## Environment Variables Reference

### Wallet Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `WALLET_MNEMONIC` | 12-24 word seed phrase | `"word1 word2 ... word12"` |
| `WALLET_PRIVATE_KEY` | Private key (hex) | `"0x1234...abcd"` |
| `WALLET_FILE_PATH` | Path to keystore file | `"/path/to/wallet.json"` |
| `WALLET_PASSWORD` | Wallet/keystore password | `"MySecurePassword123"` |
| `WALLET_DERIVATION_PATH` | HD derivation path | `"m/44'/60'/0'/0/0"` |

### Network Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `RPC_URL` | Ethereum RPC endpoint | Infura mainnet |
| `CHAIN_ID` | Chain ID | `1` (Ethereum) |
| `GAS_PRICE` | Gas price in Gwei | Auto |
| `GAS_LIMIT` | Gas limit | Auto |

### Session Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `SESSION_EXPIRY_MS` | Session duration | `86400000` (24h) |
| `SESSION_MAX_VALUE_ETH` | Max tx value | `0.5` ETH |
| `SESSION_ALLOWED_CONTRACTS` | Contract whitelist | Empty |

---

## Best Practices

### Development

1. **Use testnets first**
   - Sepolia, Goerli, or local Hardhat
   - Never test with real funds

2. **Separate test wallet**
   - Create dedicated test wallet
   - Fund with minimal amount
   - Never reuse main wallet

3. **Use .env.local for overrides**
   ```bash
   cp .env.example .env.local
   # Edit .env.local (also gitignored)
   ```

### Production

1. **Hardware wallet required**
   - Ledger or Trezor
   - Manual approval for all transactions

2. **Multi-sig for large amounts**
   - Gnosis Safe
   - Multiple approvers

3. **Environment-specific configs**
   ```bash
   .env.development
   .env.staging
   .env.production
   ```

4. **Secrets management**
   - Use AWS Secrets Manager
   - Or HashiCorp Vault
   - Never store in plain text

---

## Wallet File Locations

### Recommended Structure

```
project/
├── .env                    # ✅ Gitignored
├── .env.example            # ✅ Template (committed)
├── .env.local              # ✅ Gitignored (overrides)
├── wallets/                # ✅ Gitignored directory
│   ├── test-wallet.json    # ✅ Test wallet (encrypted)
│   └── production.json     # ✅ Production wallet (encrypted)
└── scripts/
    └── universal-dapp-automation.js
```

### Absolute Paths (Alternative)

```
~/.wallets/my-wallet.json
/data/secure/wallets/prod.json
```

---

## Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Wallet JSON files not committed
- [ ] Using separate test wallet for development
- [ ] Test wallet has minimal funds
- [ ] Production uses hardware wallet
- [ ] Passwords are strong and unique
- [ ] Regular security audits
- [ ] Backup seed phrases stored securely (offline)

---

## Troubleshooting

### "No wallet configured" error

```bash
# Check .env file exists
ls -la .env

# Verify WALLET_MNEMONIC or WALLET_PRIVATE_KEY is set
cat .env | grep WALLET_

# Make sure .env is loaded
node -e "require('dotenv').config(); console.log(process.env.WALLET_MNEMONIC)"
```

### Wallet import fails

```bash
# Check seed phrase format (12 words, space-separated)
echo "word1 word2 ... word12" | wc -w

# Verify private key format (0x prefix, 64 hex chars)
echo "0x1234...abcd" | wc -c

# Check wallet file exists and is readable
cat /path/to/wallet.json
```

### Wrong wallet imported

```bash
# Clear MetaMask data
rm -rf /tmp/chrome-flask-profile

# Verify .env has correct wallet
cat .env | grep WALLET_

# Restart automation
./scripts/run-with-flask.sh
```

---

## Examples

### Example 1: Test Wallet Setup

```bash
# .env
WALLET_MNEMONIC="test test test test test test test test test test test junk"
WALLET_PASSWORD="TestPassword123"
RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
CHAIN_ID=11155111
```

### Example 2: Production Wallet

```bash
# .env.production
WALLET_FILE_PATH="/secure/wallets/prod.json"
WALLET_PASSWORD="${WALLET_PASSWORD_FROM_VAULT}"
RPC_URL="https://mainnet.infura.io/v3/YOUR_KEY"
CHAIN_ID=1
SESSION_MAX_VALUE_ETH=0.1
SESSION_ALLOWED_CONTRACTS="0xUniswap,0xAave"
```

### Example 3: Multi-Wallet Setup

```bash
# .env
WALLET_MNEMONIC="primary wallet seed phrase here..."
WALLET_DERIVATION_PATH="m/44'/60'/0'/0/0"

# Override for specific script
export WALLET_DERIVATION_PATH="m/44'/60'/0'/0/1"
node scripts/universal-dapp-automation.js connect "https://app.uniswap.org/"
```

---

## Resources

- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [EIP-2335 Keystore](https://eips.ethereum.org/EIPS/eip-2335)
- [MetaMask Security](https://metamask.io/security-first/)
- [Hardware Wallet Guide](https://www.ledger.com/academy)

---

**Last Updated:** 2026-03-22  
**Version:** 1.0.0
