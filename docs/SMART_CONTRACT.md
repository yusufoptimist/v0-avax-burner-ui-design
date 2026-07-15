# AvaxBurner Smart Contract Documentation

## Overview

AvaxBurner uses a sophisticated smart contract deployed on the Avalanche C-Chain to enable secure batch burning of tokens and NFTs with automatic rebate tracking.

## Contract Details

### Contract Address

- **Mainnet**: `0x...` (To be deployed)
- **Fuji Testnet**: `0x...` (To be deployed)

### Network

- **Chain**: Avalanche C-Chain (ChainID: 43114)
- **RPC**: https://api.avax.network/ext/bc/C/rpc
- **Explorer**: https://snowtrace.io

## Key Features

### 1. Batch Token Burning

```solidity
function batchBurnTokens(
    address[] calldata tokenAddresses,
    uint256[] calldata amounts
) external
```

**Description**: Burn multiple ERC-20 tokens in a single transaction.

**Parameters**:
- `tokenAddresses`: Array of token contract addresses
- `amounts`: Array of amounts to burn (in token decimals)

**Returns**: None

**Events**: `TokensBurned(address indexed user, uint256 tokenCount, uint256 totalGasSaved)`

### 2. Batch NFT Burning

```solidity
function batchBurnNFTs(
    address[] calldata nftAddresses,
    uint256[] calldata tokenIds
) external
```

**Description**: Burn multiple NFTs in a single transaction.

**Parameters**:
- `nftAddresses`: Array of NFT contract addresses
- `tokenIds`: Array of NFT token IDs

**Returns**: None

**Events**: `NFTsBurned(address indexed user, uint256 nftCount, uint256 totalGasSaved)`

### 3. Get User Statistics

```solidity
function getUserStats(address user)
    external
    view
    returns (
        uint256 burnCount,
        uint256 pendingRebate
    )
```

**Description**: Retrieve burn statistics and pending rebate for a user.

**Parameters**:
- `user`: User's wallet address

**Returns**:
- `burnCount`: Total number of burn transactions by user
- `pendingRebate`: AVAX rebate available to claim

### 4. Claim Rebate

```solidity
function claimRebate() external
```

**Description**: Withdraw accumulated rebate to user's wallet.

**Parameters**: None

**Returns**: None

**Events**: `RebateClaimed(address indexed user, uint256 amount)`

**Requirements**:
- User must have pending rebate > 0
- Contract must have sufficient AVAX balance

## Rebate System

### How It Works

1. **Gas Tracking**: Contract tracks gas spent on each burn transaction
2. **Rebate Calculation**: 25% of gas fee is allocated as rebate
3. **Accumulation**: Rebates accumulate in user's pending balance
4. **Withdrawal**: Users can claim rebates anytime

### Example Calculation

```
Transaction Gas Cost: 50,000 gas @ 25 gwei/gas = 0.00125 AVAX
Rebate Amount (25%): 0.0003125 AVAX
User Pending Balance: Previous + 0.0003125 AVAX
```

## Security Features

### 1. ReentrancyGuard

```solidity
using ReentrancyGuard for Contract;
```

Prevents reentrancy attacks on all external functions.

### 2. Access Control

- Only EOAs and authorized contracts can call functions
- Owner can pause/unpause contract
- Owner can adjust rebate percentage

### 3. Safe Transfer

```solidity
IERC20(tokenAddress).safeTransferFrom(
    msg.sender,
    BURN_ADDRESS,
    amount
);
```

Uses OpenZeppelin's SafeERC20 to prevent transfer vulnerabilities.

### 4. Checks-Effects-Interactions Pattern

All functions follow CEI pattern:
1. Check conditions
2. Update state
3. Interact with external contracts

## Events

### TokensBurned

```solidity
event TokensBurned(
    address indexed user,
    uint256 tokenCount,
    uint256 totalGasSaved
);
```

Emitted when tokens are successfully burned.

### NFTsBurned

```solidity
event NFTsBurned(
    address indexed user,
    uint256 nftCount,
    uint256 totalGasSaved
);
```

Emitted when NFTs are successfully burned.

### RebateClaimed

```solidity
event RebateClaimed(
    address indexed user,
    uint256 amount
);
```

Emitted when user claims rebate.

## Burn Address

All tokens and NFTs are sent to the zero address:

```
0x0000000000000000000000000000000000000000
```

This permanently removes them from circulation and makes them unrecoverable.

## Gas Optimization

The contract uses several gas optimization techniques:

1. **Batch Operations**: Single transaction for multiple burns = lower overhead
2. **Storage Packing**: Efficient use of storage slots
3. **Function Optimization**: Minimal state reads/writes
4. **Delegatecall Avoidance**: Direct calls only

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `EmptyArrays` | No tokens/NFTs provided | Select at least one asset |
| `ArrayLengthMismatch` | Mismatched array lengths | Ensure equal count |
| `InsufficientBalance` | Not enough tokens to burn | Check token balance |
| `TransferFailed` | Token transfer failed | Token may not be standard ERC-20 |
| `ReentrancyDetected` | Reentrancy attack | Wait and retry |

## Integration Guide

### For Frontend

```javascript
import { ethers } from 'ethers';
import BURNER_ABI from './AvaxBurner.json';

const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    BURNER_ABI,
    signer
);

// Burn tokens
const tx = await contract.batchBurnTokens(
    [token1, token2],
    [amount1, amount2]
);

await tx.wait();
```

### For Backend

```typescript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    BURNER_ABI,
    provider
);

// Get user stats
const stats = await contract.getUserStats(userAddress);
console.log('Burns:', stats.burnCount);
console.log('Pending Rebate:', ethers.formatEther(stats.pendingRebate));
```

## Deployment

### Prerequisites

- Hardhat
- Avalanche testnet AVAX
- Deployed contract bytecode

### Deploy to Fuji

```bash
npx hardhat run scripts/deploy-contract.ts --network fuji
```

### Deploy to Mainnet

```bash
npx hardhat run scripts/deploy-contract.ts --network avalanche
```

## Verification

### Verify on Snowtrace

```bash
npx hardhat verify --network avalanche CONTRACT_ADDRESS
```

## License

MIT License - See LICENSE file for details

## Support

For technical questions:
- GitHub Issues: [Open an issue](https://github.com/avaxburner)
- Discord: [Join our server](https://discord.gg/avaxburner)
