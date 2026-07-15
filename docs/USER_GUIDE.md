# AvaxBurner - User Guide

Welcome to AvaxBurner! This guide will walk you through every step of using the platform to clean your Avalanche wallet.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Connecting Your Wallet](#connecting-your-wallet)
3. [Scanning Assets](#scanning-assets)
4. [Understanding Risk Levels](#understanding-risk-levels)
5. [Burning Assets](#burning-assets)
6. [Claiming Rebates](#claiming-rebates)
7. [FAQ](#faq)

## Getting Started

### Prerequisites

- **MetaMask** wallet extension installed ([Download here](https://metamask.io))
- **AVAX** tokens for gas fees (minimum 0.1 AVAX recommended)
- Active internet connection

### Step 1: Visit AvaxBurner

Navigate to the AvaxBurner website and you'll see the landing page with information about our service.

## Connecting Your Wallet

### Step 1: Click "Connect Wallet"

On the landing page, click the **"Connect Wallet"** button in the top-right corner or the **"Scan Now"** button in the hero section.

### Step 2: Select Network

In the connection modal, choose your network:

- **Avalanche Mainnet** - For real transactions and actual tokens
- **Fuji Testnet** - For testing with testnet AVAX

### Step 3: Connect MetaMask

Click the **"MetaMask"** button. Your MetaMask wallet will pop up asking for permission.

- Review the requested permissions
- Click **"Connect"** to authorize

### Step 4: Confirm Network

MetaMask may ask to switch to the Avalanche network. Click **"Switch"** to proceed.

**You're now connected!** Your wallet address will appear in the top-right corner.

## Scanning Assets

### Step 1: Access Dashboard

After connecting, you'll be taken to the **Dashboard** automatically. This is where you can see all your tokens and NFTs.

### Step 2: Automatic Scanning

AvaxBurner automatically scans your wallet for:

- **Tokens** - ERC-20 tokens and fungible assets
- **NFTs** - Non-fungible tokens in your collection
- **Risk Assessment** - Security analysis using GoPlus API

### Step 3: Filter by Risk Level

Use the left sidebar to filter assets by risk level:

- **🔴 High Risk** - Honeypots, known scams, suspicious contracts
- **🟡 Medium Risk** - Unverified tokens, limited liquidity
- **🟢 Low Risk** - Verified tokens, active projects
- **❓ Unverified** - New tokens or insufficient data

### Step 4: Search Assets

Use the search bar to find specific tokens by symbol or contract address.

## Understanding Risk Levels

AvaxBurner uses GoPlus security scanning to classify risk levels:

### 🔴 High Risk

**Characteristics:**
- Honeypot contracts (can buy but not sell)
- Known rug pulls or scams
- Blacklisted addresses
- Suspicious transfer functions
- Excessive fee structures

**Action:** We recommend burning these immediately.

### 🟡 Medium Risk

**Characteristics:**
- Low trading volume
- No verified source code
- New projects (< 7 days old)
- Limited liquidity
- Unresponsive developer

**Action:** Consider burning if you don't recognize the project.

### 🟢 Low Risk

**Characteristics:**
- Verified contract source code
- Active trading volume
- Established project (> 30 days)
- Responsive development team
- Normal fee structure

**Action:** Generally safe to hold.

### ❓ Unverified

**Characteristics:**
- Insufficient data for analysis
- New tokens
- Tokens outside major networks

**Action:** Verify manually on Snowtrace before deciding.

## Burning Assets

### Step 1: Select Assets to Burn

In the dashboard, click on the checkbox next to each asset you want to burn. You can select:

- Individual tokens
- Individual NFTs
- Multiple assets at once (batch burning)

### Step 2: Review Selection

The bottom action bar shows:

- Number of selected assets
- Estimated gas fees in AVAX
- Estimated rebate (25% of gas fee)
- Net cost (gas fee - rebate)

### Step 3: Click "Burn Selected"

Once you've selected all assets, click the **"Burn Selected"** button at the bottom of the screen.

### Step 4: Confirm in Modal

A burn confirmation modal will appear showing:

- List of assets being burned
- Gas estimation
- Rebate amount
- Transaction details

Review carefully and click **"Review & Sign"**

### Step 5: Sign Transaction

MetaMask will pop up asking you to sign the transaction.

- Review the transaction details
- Click **"Sign"** to proceed

### Step 6: Watch the Progress

The modal will show progress:

1. **Signing** - Transaction being signed by your wallet
2. **Burning** - Transaction being processed on-chain
3. **Success** - Assets burned, transaction complete

You'll see:
- Transaction hash (clickable link to Snowtrace)
- Confetti animation celebrating your success!

## Claiming Rebates

### How Rebates Work

- **25% rebate** on all gas fees spent burning
- Rebates accumulate in your account
- Withdraw rebates anytime directly to your wallet

### Claiming Your Rebate

1. Go to your **Profile** (top-right corner)
2. Click **"View Rebates"**
3. See your total accumulated rebate
4. Click **"Claim Rebate"** to withdraw to your wallet

The rebate will be transferred as AVAX to your connected wallet.

## FAQ

### Q: Is it safe to burn tokens?

**A:** Yes! Burning tokens sends them to the zero address (0x0000...0000), permanently removing them from circulation. This is irreversible but safely removes unwanted tokens from your wallet.

### Q: What if I don't have enough AVAX for gas?

**A:** Each burn transaction costs approximately 0.001-0.01 AVAX in gas fees. Get AVAX from an exchange or bridge if needed.

### Q: Can I undo a burn?

**A:** No, burns are irreversible. Please double-check your selection before confirming.

### Q: How accurate is the risk assessment?

**A:** Our risk assessment uses GoPlus security API, which is 95%+ accurate. However, always do your own research before burning valuable assets.

### Q: Do you collect my private keys?

**A:** No. AvaxBurner never collects, stores, or has access to your private keys. You maintain full control of your wallet.

### Q: Can I use AvaxBurner on Fuji Testnet?

**A:** Yes! Select Fuji Testnet when connecting. All features work identically on testnet.

### Q: Where can I get testnet AVAX?

**A:** Visit the [Avalanche Faucet](https://faucet.avax.network/) and request testnet AVAX.

### Q: Why is my transaction taking long?

**A:** Avalanche C-Chain typically confirms transactions in 2-4 seconds. If longer, check [Snowtrace](https://snowtrace.io) for transaction status.

### Q: What if I burned the wrong token?

**A:** Burned tokens are permanently removed. We cannot recover them. Please verify your selection carefully before confirming.

---

Need more help? Visit our Discord community or check the smart contract documentation.
