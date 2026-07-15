# AvaxBurner - Developer Guide

This guide is for developers who want to contribute to AvaxBurner, integrate it with other applications, or understand the codebase architecture.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Tech Stack](#tech-stack)
3. [Setup & Installation](#setup--installation)
4. [API Documentation](#api-documentation)
5. [Frontend Architecture](#frontend-architecture)
6. [Smart Contract Architecture](#smart-contract-architecture)
7. [Environment Variables](#environment-variables)
8. [Contributing](#contributing)

## Project Structure

```
avaxburner/
├── app/
│   ├── api/
│   │   ├── burn/route.ts              # Burn transaction preparation
│   │   ├── scan-assets/route.ts       # Asset scanning with GoPlus
│   │   ├── stats/route.ts             # User statistics
│   │   └── claim-rebate/route.ts      # Rebate claiming
│   ├── dashboard/
│   │   ├── page.tsx                   # Main dashboard
│   │   └── loading.tsx                # Loading state
│   ├── docs/page.tsx                  # Documentation page
│   ├── history/page.tsx               # Transaction history
│   ├── page.tsx                       # Landing page
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles
├── components/
│   ├── ui/                            # shadcn/ui components
│   ├── wallet-connect-modal.tsx       # Wallet connection
│   ├── asset-card.tsx                 # Asset display
│   ├── burn-modal.tsx                 # Burn confirmation
│   └── theme-provider.tsx             # Theme setup
├── hooks/
│   └── use-wallet.tsx                 # Wallet state management
├── lib/
│   ├── contract.ts                    # Contract ABI & utilities
│   └── utils.ts                       # Helper functions
├── contracts/
│   ├── AvaxBurner.sol                 # Main smart contract
│   └── package.json                   # Contract dependencies
├── scripts/
│   └── deploy-contract.ts             # Contract deployment
├── docs/                              # Documentation files
└── public/                            # Static assets
```

## Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **UI Components**: shadcn/ui (React 19)
- **State Management**: Zustand
- **Web3**: ethers.js v6
- **Data Fetching**: Native Fetch API

### Backend

- **Runtime**: Node.js
- **API**: Next.js Route Handlers
- **Database**: None (Stateless)

### Smart Contracts

- **Language**: Solidity 0.8.19+
- **Framework**: Hardhat
- **Network**: Avalanche C-Chain
- **Libraries**: OpenZeppelin Contracts

### Development

- **Package Manager**: npm / yarn
- **Version Control**: Git
- **Deployment**: Vercel

## Setup & Installation

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git
- MetaMask (for testing)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/avaxburner.git
cd avaxburner
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create `.env.local`:

```env
# Contract addresses
NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS=0x...

# API Keys
GOPLUS_API_KEY=your_goplus_api_key

# RPC Endpoints
NEXT_PUBLIC_AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc
NEXT_PUBLIC_AVALANCHE_TESTNET_RPC=https://api.avax-test.network/ext/bc/C/rpc
```

### 4. Run Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

## API Documentation

### POST /api/scan-assets

Scan wallet for tokens and NFTs with risk assessment.

**Request:**
```json
{
  "walletAddress": "0x...",
  "network": "mainnet"
}
```

**Response:**
```json
{
  "success": true,
  "tokens": [
    {
      "id": "0x...",
      "symbol": "TOKEN",
      "balance": "1000.5",
      "decimals": 18,
      "riskLevel": "high",
      "type": "token"
    }
  ],
  "nfts": [
    {
      "id": "0x...",
      "tokenId": "1",
      "name": "NFT Name",
      "riskLevel": "medium",
      "type": "nft"
    }
  ]
}
```

### POST /api/burn

Prepare and execute burn transaction.

**Request:**
```json
{
  "walletAddress": "0x...",
  "assets": [
    {
      "address": "0x...",
      "type": "token",
      "balance": "1000",
      "symbol": "TOKEN"
    }
  ],
  "action": "prepare"
}
```

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "to": "0x...",
      "data": "0x...",
      "value": "0",
      "description": "Burn 1 token(s)"
    }
  ],
  "contractAddress": "0x..."
}
```

### POST /api/stats

Get user burn statistics.

**Request:**
```json
{
  "walletAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "burnCount": 5,
  "pendingRebate": "0.125",
  "totalGasSaved": "0.5"
}
```

### POST /api/claim-rebate

Claim accumulated rebate.

**Request:**
```json
{
  "walletAddress": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "amount": "0.125",
  "txHash": "0x..."
}
```

## Frontend Architecture

### State Management

Using Zustand for wallet state:

```typescript
// hooks/use-wallet.tsx
interface WalletStore {
  isConnected: boolean
  address: string | null
  network: 'mainnet' | 'fuji'
  connect: (address: string) => void
  disconnect: () => void
  setNetwork: (network: 'mainnet' | 'fuji') => void
}

export const useWallet = create<WalletStore>((set) => ({...}))
```

### Component Hierarchy

```
RootLayout
├── LandingPage (/)
│   └── WalletConnectModal
├── Dashboard (/dashboard)
│   ├── Sidebar
│   ├── AssetGrid
│   │   └── AssetCard (with BurnModal)
│   └── ActionBar
├── History (/history)
│   └── TransactionList
└── Docs (/docs)
    └── DocContent
```

### Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Fetch API Route
    ↓
Backend Logic (contract interaction)
    ↓
Response to Frontend
    ↓
State Update (Zustand)
    ↓
Re-render Component
```

## Smart Contract Architecture

### Contract Hierarchy

```
AvaxBurner
├── ReentrancyGuard (OpenZeppelin)
├── Ownable (OpenZeppelin)
└── SafeERC20 (OpenZeppelin)
```

### Core Functions

1. **batchBurnTokens()** - ERC-20 token burning
2. **batchBurnNFTs()** - NFT burning
3. **getUserStats()** - User statistics query
4. **claimRebate()** - Rebate withdrawal

### Safety Measures

- ✅ Reentrancy protection
- ✅ Input validation
- ✅ Safe token transfers
- ✅ Overflow protection (Solidity 0.8+)

## Environment Variables

### Required

```env
NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS=0x...  # Contract address
```

### Optional

```env
GOPLUS_API_KEY=...                          # For enhanced risk scanning
NEXT_PUBLIC_AVALANCHE_RPC=...              # Custom RPC endpoint
```

## Contributing

### Code Style

- Use TypeScript for type safety
- Follow Prettier formatting
- Use ESLint for code quality
- Comment complex logic

### Testing

```bash
# Run tests
npm run test

# Run linter
npm run lint

# Format code
npm run format
```

### Git Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/my-feature`
4. Open Pull Request on GitHub

### PR Requirements

- ✅ All tests passing
- ✅ Code linting passes
- ✅ Documentation updated
- ✅ TypeScript no errors
- ✅ Meaningful commit messages

## Common Tasks

### Add New API Endpoint

1. Create file in `app/api/[endpoint]/route.ts`
2. Implement POST/GET handler
3. Add request/response types
4. Test with curl or Postman
5. Document in API section

### Modify Smart Contract

1. Update `contracts/AvaxBurner.sol`
2. Update ABI in `lib/contract.ts`
3. Redeploy to testnet
4. Update `NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS`
5. Test API integration

### Add Frontend Page

1. Create directory in `app/[page-name]/`
2. Add `page.tsx` file
3. Create components as needed
4. Add styles using Tailwind
5. Update navigation links

## Debugging

### Enable Debug Logging

All debug logs use the pattern:
```javascript
console.log("[v0] Your message here", variables)
```

### Common Issues

| Issue | Solution |
|-------|----------|
| MetaMask not connecting | Ensure MetaMask installed, refresh page |
| Contract call failing | Check contract address and ABI |
| Assets not loading | Verify GoPlus API key |
| Transaction reverted | Check gas estimation and wallet balance |

## Resources

- [Avalanche Docs](https://docs.avax.network/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## Support

- **GitHub Issues**: Report bugs and request features
- **Discord**: Community support and discussions
- **Email**: support@avaxburner.com

---

Happy coding! 🔥
