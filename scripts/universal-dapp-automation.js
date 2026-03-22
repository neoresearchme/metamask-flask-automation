#!/usr/bin/env node

/**
 * Universal dApp Automation Script
 * 
 * Automates any dApp interaction with MetaMask Flask + Session Snap
 * Supports: Connect, Approve, Swap, Mint, Stake, Claim, etc.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const EXTENSION_PATH = path.join(__dirname, 'extensions/metamask-flask');
const TEST_SEED = 'speed emerge manual base peace tragic margin vote service leader radio fortune';

class UniversalDAppAutomation {
  constructor(options = {}) {
    this.browser = null;
    this.page = null;
    this.extensionId = null;
    this.dappUrl = options.dappUrl || 'https://app.uniswap.org/';
    this.testDappUrl = options.testDappUrl || 'http://localhost:3000';
  }

  async launch() {
    console.log('\n🚀 Launching MetaMask Flask...');
    
    this.browser = await chromium.launchPersistentContext('/tmp/chrome-flask-profile', {
      headless: false,
      args: [
        '--disable-extensions-except=' + EXTENSION_PATH,
        '--load-extension=' + EXTENSION_PATH,
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ],
      viewport: { width: 1920, height: 1080 },
    });

    const pages = this.browser.pages();
    this.page = pages.length > 0 ? pages[0] : await this.browser.newPage();
    
    console.log('✅ MetaMask Flask launched');
  }

  async getExtensionId() {
    if (this.extensionId) return this.extensionId;
    
    try {
      const page = await this.browser.newPage();
      await page.goto('chrome://extensions/');
      await page.waitForTimeout(2000);
      
      this.extensionId = await page.$eval('[data-extension-id]', el => 
        el.getAttribute('data-extension-id')
      );
      
      await page.close();
      console.log('Extension ID:', this.extensionId);
      return this.extensionId;
    } catch (err) {
      console.log('Using default extension ID');
      this.extensionId = 'ljfoeinjpaedjfecbmggjgodbgkmjkjk';
      return this.extensionId;
    }
  }

  async importWallet(seed = TEST_SEED, password = 'TestPassword123') {
    console.log('\n📥 Importing wallet...');
    
    try {
      const extensionId = await this.getExtensionId();
      const popupPage = await this.browser.newPage();
      await popupPage.goto(`chrome-extension://${extensionId}/popup.html`);
      await popupPage.waitForTimeout(3000);
      
      // Click Get Started
      const getStarted = await popupPage.$('button:has-text("Get started"), button:has-text("Import wallet")');
      if (getStarted) {
        await getStarted.click();
        await popupPage.waitForTimeout(1000);
      }
      
      // Click Import Wallet
      const importBtn = await popupPage.$('text=Import wallet');
      if (importBtn) {
        await importBtn.click();
        await popupPage.waitForTimeout(1000);
      }
      
      // Agree to terms
      const agreeBtn = await popupPage.$('text=I agree');
      if (agreeBtn) {
        await agreeBtn.click();
        await popupPage.waitForTimeout(1000);
      }
      
      // Enter seed phrase
      const words = seed.split(' ');
      for (let i = 0; i < Math.min(words.length, 12); i++) {
        const input = await popupPage.$(`input[aria-label*="Phrase ${i + 1}"], input[placeholder*="${i + 1}"]`);
        if (input) {
          await input.fill(words[i]);
        }
      }
      
      // Enter password
      const passwordInputs = await popupPage.$$('[type="password"]');
      for (const input of passwordInputs) {
        await input.fill(password);
      }
      
      // Click Import
      const importSubmit = await popupPage.$('button:has-text("Import"), button:has-text("Create")');
      if (importSubmit) {
        await importSubmit.click();
        await popupPage.waitForTimeout(5000);
      }
      
      await popupPage.close();
      console.log('✅ Wallet imported');
    } catch (err) {
      console.log('⚠️ Wallet import may have failed or wallet already exists');
    }
  }

  async connectToDApp() {
    console.log('\n🔗 Connecting to dApp...');
    
    await this.page.goto(this.dappUrl);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
    
    // Take screenshot
    await this.page.screenshot({ path: 'test-results/dapp-connected.png' });
    
    // Find and click connect button
    const connectBtn = await this.page.$('button:has-text("Connect"), button:has-text("Wallet"), button:has-text("Connect Wallet")');
    if (connectBtn) {
      await connectBtn.click();
      console.log('✅ Connect button clicked');
      
      // Wait for MetaMask popup
      await this.page.waitForTimeout(5000);
      
      // Approve connection (would need MetaMask popup handling)
      console.log('⚠️ Manual approval needed for first connection');
    } else {
      console.log('✅ Already connected or connect button not found');
    }
  }

  async createSession() {
    console.log('\n🔑 Creating session for auto-approve...');
    
    await this.page.goto(this.testDappUrl);
    await this.page.waitForLoadState('networkidle');
    
    // Click Create Session
    const createSessionBtn = await this.page.$('#createSessionBtn');
    if (createSessionBtn) {
      await createSessionBtn.click();
      console.log('✅ Session creation initiated');
      
      // Wait for MetaMask popup
      await this.page.waitForTimeout(5000);
      
      console.log('⚠️ Manual approval needed for session creation');
    } else {
      console.log('⚠️ Create Session button not found');
    }
  }

  async executeAction(actionType, options = {}) {
    console.log(`\n⚡ Executing action: ${actionType}`);
    
    switch (actionType) {
      case 'swap':
        await this.performSwap(options);
        break;
      case 'approve':
        await this.performApproval(options);
        break;
      case 'mint':
        await this.performMint(options);
        break;
      case 'stake':
        await this.performStake(options);
        break;
      case 'claim':
        await this.performClaim(options);
        break;
      default:
        console.log('Unknown action type');
    }
  }

  async performSwap(options = {}) {
    console.log('🔄 Performing swap...');
    
    // Generic swap flow
    const tokenInSelector = options.tokenInSelector || 'input[placeholder="0"]';
    const tokenOutSelector = options.tokenOutSelector || 'input[placeholder="0"]';
    const swapButtonSelector = options.swapButtonSelector || 'button:has-text("Swap")';
    
    // Enter amount
    if (options.amount) {
      const input = await this.page.$(tokenInSelector);
      if (input) {
        await input.fill(options.amount.toString());
      }
    }
    
    // Click swap
    const swapBtn = await this.page.$(swapButtonSelector);
    if (swapBtn) {
      await swapBtn.click();
      console.log('✅ Swap initiated');
      
      // With session snap, this should auto-approve!
      await this.page.waitForTimeout(5000);
    }
  }

  async performApproval(options = {}) {
    console.log('✓ Performing token approval...');
    
    const approveButtonSelector = options.approveButtonSelector || 'button:has-text("Approve")';
    
    const approveBtn = await this.page.$(approveButtonSelector);
    if (approveBtn) {
      await approveBtn.click();
      console.log('✅ Approval initiated');
      
      // With session snap, auto-approved!
      await this.page.waitForTimeout(5000);
    }
  }

  async performMint(options = {}) {
    console.log('🪙 Performing NFT mint...');
    
    const mintButtonSelector = options.mintButtonSelector || 'button:has-text("Mint")';
    
    const mintBtn = await this.page.$(mintButtonSelector);
    if (mintBtn) {
      await mintBtn.click();
      console.log('✅ Mint initiated');
      
      // With session snap, auto-approved!
      await this.page.waitForTimeout(5000);
    }
  }

  async performStake(options = {}) {
    console.log('💰 Performing stake...');
    
    const stakeButtonSelector = options.stakeButtonSelector || 'button:has-text("Stake")';
    
    const stakeBtn = await this.page.$(stakeButtonSelector);
    if (stakeBtn) {
      await stakeBtn.click();
      console.log('✅ Stake initiated');
      
      // With session snap, auto-approved!
      await this.page.waitForTimeout(5000);
    }
  }

  async performClaim(options = {}) {
    console.log('🎁 Performing claim...');
    
    const claimButtonSelector = options.claimButtonSelector || 'button:has-text("Claim")';
    
    const claimBtn = await this.page.$(claimButtonSelector);
    if (claimBtn) {
      await claimBtn.click();
      console.log('✅ Claim initiated');
      
      // With session snap, auto-approved!
      await this.page.waitForTimeout(5000);
    }
  }

  async takeScreenshot(name = 'screenshot') {
    const screenshotPath = `test-results/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log('\n✅ Browser closed');
    }
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const url = args[1];

  const automation = new UniversalDAppAutomation({
    dappUrl: url || 'https://app.uniswap.org/',
  });

  try {
    await automation.launch();

    switch (command) {
      case 'connect':
        await automation.importWallet();
        await automation.connectToDApp();
        break;

      case 'session':
        await automation.createSession();
        break;

      case 'swap':
        await automation.importWallet();
        await automation.connectToDApp();
        await automation.executeAction('swap', { amount: 0.1 });
        break;

      case 'mint':
        await automation.importWallet();
        await automation.connectToDApp();
        await automation.executeAction('mint');
        break;

      case 'test':
        await automation.importWallet();
        await automation.connectToDApp();
        await automation.takeScreenshot('test');
        break;

      default:
        console.log('\n🤖 Universal dApp Automation');
        console.log('\nUsage:');
        console.log('  node universal-dapp-automation.js connect [url]');
        console.log('  node universal-dapp-automation.js session');
        console.log('  node universal-dapp-automation.js swap [url]');
        console.log('  node universal-dapp-automation.js mint [url]');
        console.log('  node universal-dapp-automation.js test [url]');
        console.log('\nExamples:');
        console.log('  node universal-dapp-automation.js connect https://app.uniswap.org/');
        console.log('  node universal-dapp-automation.js swap https://app.uniswap.org/');
        console.log('  node universal-dapp-automation.js mint https://nft-project.com/');
    }

    // Keep browser open for manual interaction
    console.log('\n✅ Browser ready for interaction');
    console.log('Press Ctrl+C to close\n');
    
    // Don't close browser - let user interact
    // await automation.close();
  } catch (err) {
    console.error('Error:', err);
    await automation.close();
    process.exit(1);
  }
}

// Export for module use
module.exports = UniversalDAppAutomation;

// Run if called directly
if (require.main === module) {
  main();
}
