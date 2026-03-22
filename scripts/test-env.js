#!/usr/bin/env node

/**
 * Test Environment Configuration
 * 
 * Verifies that .env file is properly configured
 */

require('dotenv').config();

console.log('\n🔍 Testing Environment Configuration\n');

// Check if .env is loaded
const hasEnv = Object.keys(process.env).length > 0;
console.log(`✅ Environment loaded: ${hasEnv}`);

// Check wallet configuration
const hasMnemonic = !!process.env.WALLET_MNEMONIC;
const hasPrivateKey = !!process.env.WALLET_PRIVATE_KEY;
const hasWalletFile = !!process.env.WALLET_FILE_PATH;

console.log('\n📋 Wallet Configuration:');
console.log(`   WALLET_MNEMONIC: ${hasMnemonic ? '✅ Set' : '❌ Not set'}`);
console.log(`   WALLET_PRIVATE_KEY: ${hasPrivateKey ? '✅ Set' : '❌ Not set'}`);
console.log(`   WALLET_FILE_PATH: ${hasWalletFile ? '✅ Set' : '❌ Not set'}`);

if (!hasMnemonic && !hasPrivateKey && !hasWalletFile) {
  console.log('\n⚠️  No wallet configured!');
  console.log('\n📝 To configure your wallet:');
  console.log('   1. Copy .env.example to .env');
  console.log('   2. Edit .env with your wallet:');
  console.log('      WALLET_MNEMONIC="your seed phrase"');
  console.log('      # OR');
  console.log('      WALLET_PRIVATE_KEY="0xYourPrivateKey"');
  console.log('   3. Run this test again\n');
  process.exit(1);
}

// Check password
const hasPassword = !!process.env.WALLET_PASSWORD;
console.log(`   WALLET_PASSWORD: ${hasPassword ? '✅ Set' : '⚠️  Not set (will use default)'}`);

// Network configuration
console.log('\n🌐 Network Configuration:');
console.log(`   RPC_URL: ${process.env.RPC_URL ? '✅ Set' : '⚠️  Not set (will use default)'}`);
console.log(`   CHAIN_ID: ${process.env.CHAIN_ID || '1 (default)'}`);

// Session configuration
console.log('\n⏱️  Session Configuration:');
console.log(`   SESSION_EXPIRY_MS: ${process.env.SESSION_EXPIRY_MS || '86400000 (default: 24h)'}`);
console.log(`   SESSION_MAX_VALUE_ETH: ${process.env.SESSION_MAX_VALUE_ETH || '0.5 (default)'}`);

console.log('\n✅ Environment configuration test passed!\n');

// Show which wallet will be used
if (hasMnemonic) {
  const words = process.env.WALLET_MNEMONIC.split(' ').length;
  console.log(`📝 Will use mnemonic seed phrase (${words} words)`);
} else if (hasPrivateKey) {
  const pkPreview = process.env.WALLET_PRIVATE_KEY.substring(0, 10) + '...';
  console.log(`🔑 Will use private key: ${pkPreview}`);
} else if (hasWalletFile) {
  console.log(`📄 Will use wallet file: ${process.env.WALLET_FILE_PATH}`);
}

console.log('\n');
