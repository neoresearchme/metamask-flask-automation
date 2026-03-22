# GitHub Setup Guide

## Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `metamask-flask-automation`
3. Description: "Universal MetaMask Flask automation with Session Snap auto-approve"
4. Visibility: Public (recommended) or Private
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

## Add Remote and Push

```bash
cd /root/.agents/skills/metamask-flask-automation

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/metamask-flask-automation.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

## Using SSH (Recommended)

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add SSH key to GitHub
# Go to: https://github.com/settings/keys
# Click "New SSH key" and paste the content of ~/.ssh/id_ed25519.pub

# Add remote with SSH
git remote add origin git@github.com:YOUR_USERNAME/metamask-flask-automation.git

# Push
git push -u origin main
```

## Verify Push

```bash
# Check repository on GitHub
# Visit: https://github.com/YOUR_USERNAME/metamask-flask-automation

# All files should be visible:
# - README.md
# - SKILL.md
# - package.json
# - scripts/
# - docs/
```

## Make Repository Installable

After pushing, anyone can install with:

```bash
# Direct install from GitHub
npm install git+https://github.com/YOUR_USERNAME/metamask-flask-automation.git

# Or clone and install
git clone https://github.com/YOUR_USERNAME/metamask-flask-automation.git
cd metamask-flask-automation
npm install
```

## Update Repository

```bash
# Make changes
git add .
git commit -m "Your commit message"
git push origin main
```

## GitHub Actions (Optional)

Create `.github/workflows/test.yml` for automated testing:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Install Playwright
      run: npx playwright install chromium
    
    - name: Run tests
      run: npm test
```

## Repository Settings

Recommended settings:
- Enable Issues for bug tracking
- Enable Discussions for community help
- Add topics: `metamask`, `web3`, `automation`, `dapp`, `uniswap`, `defi`
- Add license: MIT (already in package.json)

## Security Notes

- The `.gitignore` file excludes sensitive files (wallets, seeds, credentials)
- Test wallet seed in code is for testing only - clearly marked in documentation
- Never commit real wallet seeds or private keys
- Use environment variables for production credentials
