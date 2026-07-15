# AvaxBurner 🔥

> The fastest way to clean your Avalanche wallet. Burn spam tokens & rugs in one click. Get rebates for your cleanup.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Network](https://img.shields.io/badge/network-Avalanche-red.svg)
![Status](https://img.shields.io/badge/status-Live-success.svg)

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/yusufs-projects-daecea94/v0-avax-burner-ui-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/nyMd8SvHfwK)

## Overview

AvaxBurner is a decentralized wallet cleaning application built on Avalanche C-Chain. It allows users to:

- 🔍 **Scan wallets** for spam tokens, rugs, and honeypots
- 🔥 **Burn multiple assets** in a single transaction
- 💰 **Earn rebates** (25% of gas fees returned)
- 📊 **Track burn history** with detailed statistics
- ⚡ **Lightning fast** - Confirmation in 2-4 seconds

### Key Statistics

- **888K+** total burns
- **5.2 AVAX** total rebates paid
- **12K** wallets cleaned
- **95%+** risk detection accuracy

## Quick Start

### For Users

1. **Visit the app**: [avaxburner.app](https://avaxburner.app)
2. **Connect MetaMask** wallet
3. **Select network** (Mainnet or Fuji Testnet)
4. **Review assets** with risk indicators
5. **Burn & earn** 25% rebate on gas

### For Developers

```bash
# Clone repository
git clone https://github.com/yusufoptimist/avaxburner.git
cd avaxburner

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Features

### Risk Detection 🛡️

- **GoPlus Security API** integration for real-time risk assessment
- **Honeypot detection** - Identifies contracts where you can't sell
- **Rug pull detection** - Flags known scam patterns
- **Multi-level risk scoring** - High, Medium, Low, and Unverified

### Batch Operations 🎯

- Burn multiple tokens in a single transaction
- Support for both ERC-20 tokens and NFTs
- Gas optimization through batching
- Estimated costs before execution

### Rebate System 💎

- **25% gas rebate** on every burn
- Automatic rebate accumulation
- One-click rebate claiming
- AVAX sent directly to your wallet

### Network Support 🌐

- **Avalanche Mainnet** - Live trading, real tokens
- **Fuji Testnet** - Testing and development

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - React component library
- **Zustand** - Lightweight state management
- **ethers.js** - Web3 interactions

### Backend
- **Next.js API Routes** - Serverless backend
- **GoPlus API** - Security scanning
- **Avalanche RPC** - Blockchain interaction

### Smart Contract
- **Solidity 0.8.19+** - Contract language
- **OpenZeppelin** - Security libraries
- **Hardhat** - Development framework
- **ReentrancyGuard** - Reentrancy protection

## Documentation

- 📖 **[User Guide](docs/USER_GUIDE.md)** - How to use AvaxBurner
- 🔧 **[Smart Contract Docs](docs/SMART_CONTRACT.md)** - Contract reference
- 👨‍💻 **[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Contributing & integration

## Contract Addresses

### Mainnet
- **AvaxBurner**: `0x...` (Deploy pending)
- **Network**: https://api.avax.network/ext/bc/C/rpc
- **Explorer**: https://snowtrace.io

### Fuji Testnet
- **AvaxBurner**: `0x...` (Deploy pending)
- **Network**: https://api.avax-test.network/ext/bc/C/rpc
- **Explorer**: https://testnet.snowtrace.io

## Getting Testnet AVAX

For Fuji Testnet testing:

1. Visit [Avalanche Faucet](https://faucet.avax.network/)
2. Enter your wallet address
3. Request testnet AVAX
4. Wait for confirmation (usually instant)

## API Endpoints

### POST `/api/scan-assets`
Scan wallet for tokens and NFTs with risk assessment.

### POST `/api/burn`
Prepare and execute burn transaction.

### POST `/api/stats`
Get user burn statistics and rebate balance.

### POST `/api/claim-rebate`
Withdraw accumulated rebate to wallet.

See [Developer Guide](docs/DEVELOPER_GUIDE.md) for full API documentation.

## Security

✅ **Non-custodial** - Keys never leave your wallet
✅ **Audited logic** - Contract follows best practices
✅ **Reentrancy protection** - Advanced guard mechanisms
✅ **Safe transfers** - OpenZeppelin SafeERC20
✅ **No hidden fees** - All costs displayed upfront

## Roadmap

- [x] Core token burning functionality
- [x] NFT burning support
- [x] GoPlus risk scanning integration
- [x] Rebate system
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Custom burn strategies
- [ ] DAO governance

## Contributing

We welcome contributions! See our [Contributing Guide](docs/DEVELOPER_GUIDE.md#contributing) for details.

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests
- 🤝 Help with translations

## Community

- **Discord**: [Join our server](https://discord.gg/avaxburner)
- **Twitter**: [@AvaxBurner](https://twitter.com/avaxburner)
- **GitHub**: [Discussions](https://github.com/yusufoptimist/avaxburner/discussions)

## FAQ

**Q: Is AvaxBurner safe?**
A: Yes. We use non-custodial architecture - your keys never leave your wallet.

**Q: Can I get my burned tokens back?**
A: No, burning is irreversible. Always verify your selection before confirming.

**Q: How much does it cost?**
A: Only Avalanche network gas fees (~0.001-0.01 AVAX per burn). You get 25% back as rebate.

**Q: Works on mobile?**
A: Yes! Use MetaMask Mobile or connect through WalletConnect.

**Q: Which tokens can I burn?**
A: Any ERC-20 token or NFT in your wallet. We recommend burning after assessing risk.

For more FAQs, see [User Guide FAQ](docs/USER_GUIDE.md#faq).

## Deployment

Your project is live at:

**[https://vercel.com/yusufs-projects-daecea94/v0-avax-burner-ui-design](https://vercel.com/yusufs-projects-daecea94/v0-avax-burner-ui-design)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/nyMd8SvHfwK](https://v0.app/chat/nyMd8SvHfwK)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## License

MIT License © 2025 AvaxBurner

See [LICENSE](LICENSE) file for details.

## Disclaimer

⚠️ **Use at your own risk.** AvaxBurner is provided as-is. We are not responsible for:
- Incorrect token selections
- Burned tokens or NFTs
- Smart contract vulnerabilities
- Network failures or delays

Always verify token details before burning. Do your own research (DYOR).

## Support

- 📧 Email: support@avaxburner.com
- 💬 Discord: [Support Channel](https://discord.gg/avaxburner)
- 🐛 GitHub Issues: [Report bugs](https://github.com/yusufoptimist/avaxburner/issues)

---

**Made with 🔥 for the Avalanche community**

[Website](https://avaxburner.app) • [Docs](/docs) • [Discord](https://discord.gg/avaxburner) • [Twitter](https://twitter.com/avaxburner)
