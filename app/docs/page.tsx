"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Book, Code, Rocket, Shield, Terminal, Zap, Database, FileCode, GitBranch } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-avax-dark">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AvaxBurner</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0"
              >
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-avax-primary/10 border border-avax-primary/20 mb-4">
              <Book className="w-4 h-4 text-avax-primary" />
              <span className="text-sm font-medium text-avax-primary">Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">AvaxBurner Documentation</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Complete guide to understanding and using AvaxBurner
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="p-8 bg-white/5 backdrop-blur border-white/10 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Book className="w-6 h-6 text-avax-primary" />
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a href="#overview" className="text-muted-foreground hover:text-avax-primary transition-colors">
                1. Overview
              </a>
              <a href="#features" className="text-muted-foreground hover:text-avax-primary transition-colors">
                2. Features
              </a>
              <a href="#architecture" className="text-muted-foreground hover:text-avax-primary transition-colors">
                3. Architecture
              </a>
              <a href="#smart-contract" className="text-muted-foreground hover:text-avax-primary transition-colors">
                4. Smart Contract
              </a>
              <a href="#frontend" className="text-muted-foreground hover:text-avax-primary transition-colors">
                5. Frontend
              </a>
              <a href="#api" className="text-muted-foreground hover:text-avax-primary transition-colors">
                6. API Endpoints
              </a>
              <a href="#setup" className="text-muted-foreground hover:text-avax-primary transition-colors">
                7. Setup Guide
              </a>
              <a href="#usage" className="text-muted-foreground hover:text-avax-primary transition-colors">
                8. Usage Guide
              </a>
            </nav>
          </Card>

          {/* Overview Section */}
          <section id="overview" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="w-8 h-8 text-avax-primary" />
                Overview
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AvaxBurner is a decentralized application built on the Avalanche C-Chain that helps users clean their
                  wallets by burning unwanted spam tokens, rug pulls, and malicious NFTs.
                </p>
                <p>
                  The platform integrates with GoPlus Security API to provide real-time risk assessment of tokens and
                  NFTs, allowing users to make informed decisions about which assets to burn. Users earn 25% gas rebates
                  for every burn operation, incentivizing wallet hygiene.
                </p>
                <div className="bg-avax-primary/10 border border-avax-primary/20 rounded-lg p-4 mt-6">
                  <h3 className="font-bold mb-2 text-foreground">Key Benefits</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Automated risk detection for tokens and NFTs</li>
                    <li>Batch burning to save gas fees</li>
                    <li>25% gas rebate system</li>
                    <li>Support for both ERC20 tokens and ERC721 NFTs</li>
                    <li>Works on Avalanche Mainnet and Fuji Testnet</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Features Section */}
          <section id="features" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-8 h-8 text-avax-secondary" />
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-avax-success mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Risk Scanner</h3>
                      <p className="text-sm text-muted-foreground">
                        GoPlus API integration for real-time security analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Flame className="w-5 h-5 text-avax-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Batch Operations</h3>
                      <p className="text-sm text-muted-foreground">Burn multiple tokens/NFTs in one transaction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-avax-warning mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Gas Rebates</h3>
                      <p className="text-sm text-muted-foreground">Earn 25% of gas fees back on every burn</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-avax-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Multi-Wallet Support</h3>
                      <p className="text-sm text-muted-foreground">Core Wallet, MetaMask, WalletConnect</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GitBranch className="w-5 h-5 text-avax-success mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Network Flexibility</h3>
                      <p className="text-sm text-muted-foreground">Switch between Mainnet and Fuji Testnet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileCode className="w-5 h-5 text-avax-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Transaction History</h3>
                      <p className="text-sm text-muted-foreground">Track all burns and rebates claimed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Database className="w-8 h-8 text-avax-success" />
                Architecture
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>AvaxBurner follows a modern three-tier architecture:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="bg-avax-primary/10 border border-avax-primary/20 rounded-lg p-4">
                    <h3 className="font-bold mb-2 text-foreground">Frontend Layer</h3>
                    <ul className="text-sm space-y-1">
                      <li>Next.js 16 App Router</li>
                      <li>React 19 with TypeScript</li>
                      <li>Tailwind CSS v4</li>
                      <li>shadcn/ui Components</li>
                      <li>Ethers.js v6</li>
                    </ul>
                  </div>
                  <div className="bg-avax-secondary/10 border border-avax-secondary/20 rounded-lg p-4">
                    <h3 className="font-bold mb-2 text-foreground">API Layer</h3>
                    <ul className="text-sm space-y-1">
                      <li>Next.js API Routes</li>
                      <li>GoPlus Security API</li>
                      <li>Avalanche RPC</li>
                      <li>Asset Scanning</li>
                      <li>Transaction Handling</li>
                    </ul>
                  </div>
                  <div className="bg-avax-success/10 border border-avax-success/20 rounded-lg p-4">
                    <h3 className="font-bold mb-2 text-foreground">Smart Contract</h3>
                    <ul className="text-sm space-y-1">
                      <li>Solidity ^0.8.20</li>
                      <li>OpenZeppelin Contracts</li>
                      <li>ReentrancyGuard</li>
                      <li>Batch Operations</li>
                      <li>Rebate System</li>
                    </ul>
                  </div>
                </div>
                <p>
                  The frontend communicates with the blockchain via ethers.js, while API routes handle external data
                  fetching from GoPlus and the Avalanche network.
                </p>
              </div>
            </Card>
          </section>

          {/* Smart Contract Section */}
          <section id="smart-contract" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <FileCode className="w-8 h-8 text-avax-warning" />
                Smart Contract
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The AvaxBurner smart contract is the core of the application, handling all burn operations and rebate
                  distributions.
                </p>

                <div className="bg-background/50 border border-white/10 rounded-lg p-4 my-4">
                  <h3 className="font-bold mb-3 text-foreground">Contract Functions</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <code className="text-avax-primary">burnTokens(address tokenAddress, uint256 amount)</code>
                      <p className="mt-1">Burn a single ERC20 token</p>
                    </div>
                    <div>
                      <code className="text-avax-primary">
                        batchBurnTokens(address[] tokenAddresses, uint256[] amounts)
                      </code>
                      <p className="mt-1">Burn multiple ERC20 tokens in one transaction</p>
                    </div>
                    <div>
                      <code className="text-avax-primary">burnNFT(address nftAddress, uint256 tokenId)</code>
                      <p className="mt-1">Burn a single ERC721 NFT</p>
                    </div>
                    <div>
                      <code className="text-avax-primary">
                        batchBurnNFTs(address[] nftAddresses, uint256[] tokenIds)
                      </code>
                      <p className="mt-1">Burn multiple ERC721 NFTs in one transaction</p>
                    </div>
                    <div>
                      <code className="text-avax-primary">claimRebate()</code>
                      <p className="mt-1">Claim accumulated gas rebates</p>
                    </div>
                    <div>
                      <code className="text-avax-primary">getUserStats(address user)</code>
                      <p className="mt-1">Get burn count and pending rebates for a user</p>
                    </div>
                  </div>
                </div>

                <div className="bg-avax-warning/10 border border-avax-warning/20 rounded-lg p-4">
                  <h3 className="font-bold mb-2 text-foreground">Security Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>ReentrancyGuard protection on all state-changing functions</li>
                    <li>OpenZeppelin battle-tested contracts</li>
                    <li>Require statements for input validation</li>
                    <li>Safe transfer patterns for ETH and tokens</li>
                    <li>Ownable pattern for administrative functions</li>
                  </ul>
                </div>

                <div className="bg-background/50 border border-white/10 rounded-lg p-4 mt-4">
                  <h3 className="font-bold mb-2 text-foreground">Events</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="text-avax-secondary">
                        TokensBurned(address user, address token, uint256 amount, uint256 rebate)
                      </code>
                    </div>
                    <div>
                      <code className="text-avax-secondary">
                        NFTBurned(address user, address nft, uint256 tokenId, uint256 rebate)
                      </code>
                    </div>
                    <div>
                      <code className="text-avax-secondary">RebateClaimed(address user, uint256 amount)</code>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Frontend Section */}
          <section id="frontend" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-8 h-8 text-avax-primary" />
                Frontend
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>The frontend is built with Next.js 16 and features a modern, responsive design.</p>

                <div className="bg-background/50 border border-white/10 rounded-lg p-4 my-4">
                  <h3 className="font-bold mb-3 text-foreground">Key Pages</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>
                        <code className="text-avax-primary">/</code> - Landing page
                      </span>
                      <span className="text-xs bg-avax-primary/20 px-2 py-1 rounded">Public</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>
                        <code className="text-avax-primary">/dashboard</code> - Asset scanner and burn interface
                      </span>
                      <span className="text-xs bg-avax-warning/20 px-2 py-1 rounded">Auth Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>
                        <code className="text-avax-primary">/history</code> - Transaction history
                      </span>
                      <span className="text-xs bg-avax-warning/20 px-2 py-1 rounded">Auth Required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>
                        <code className="text-avax-primary">/docs</code> - Documentation
                      </span>
                      <span className="text-xs bg-avax-primary/20 px-2 py-1 rounded">Public</span>
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                  <h3 className="font-bold mb-3 text-foreground">Key Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <code className="text-avax-secondary">WalletConnectModal</code>
                      <p className="text-xs mt-1">Multi-wallet connection dialog</p>
                    </div>
                    <div>
                      <code className="text-avax-secondary">AssetCard</code>
                      <p className="text-xs mt-1">Displays token/NFT with risk badge</p>
                    </div>
                    <div>
                      <code className="text-avax-secondary">BurnModal</code>
                      <p className="text-xs mt-1">Multi-step burn confirmation UI</p>
                    </div>
                    <div>
                      <code className="text-avax-secondary">useWallet</code>
                      <p className="text-xs mt-1">Global wallet state management</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* API Section */}
          <section id="api" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Terminal className="w-8 h-8 text-avax-success" />
                API Endpoints
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>The application exposes several API routes for blockchain interactions and data fetching.</p>

                <div className="space-y-4 mt-4">
                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-avax-success/20 text-avax-success px-2 py-1 rounded font-mono">
                        POST
                      </span>
                      <code className="text-sm text-foreground">/api/scan-assets</code>
                    </div>
                    <p className="text-sm mb-2">Scan wallet for tokens and NFTs with risk analysis</p>
                    <div className="bg-background/50 rounded p-2 text-xs font-mono">
                      Body: {`{ "address": "0x...", "network": "mainnet" }`}
                    </div>
                  </div>

                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-avax-success/20 text-avax-success px-2 py-1 rounded font-mono">
                        POST
                      </span>
                      <code className="text-sm text-foreground">/api/burn</code>
                    </div>
                    <p className="text-sm mb-2">Prepare burn transaction with gas estimates</p>
                    <div className="bg-background/50 rounded p-2 text-xs font-mono">
                      Body: {`{ "tokens": [...], "nfts": [...] }`}
                    </div>
                  </div>

                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-avax-primary/20 text-avax-primary px-2 py-1 rounded font-mono">
                        GET
                      </span>
                      <code className="text-sm text-foreground">/api/stats</code>
                    </div>
                    <p className="text-sm mb-2">Get global platform statistics</p>
                    <div className="bg-background/50 rounded p-2 text-xs font-mono">
                      Returns: {`{ "totalBurns", "totalRebates", "activeUsers" }`}
                    </div>
                  </div>

                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-avax-success/20 text-avax-success px-2 py-1 rounded font-mono">
                        POST
                      </span>
                      <code className="text-sm text-foreground">/api/claim-rebate</code>
                    </div>
                    <p className="text-sm mb-2">Claim accumulated gas rebates</p>
                    <div className="bg-background/50 rounded p-2 text-xs font-mono">
                      Body: {`{ "address": "0x..." }`}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Setup Section */}
          <section id="setup" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="w-8 h-8 text-avax-secondary" />
                Setup Guide
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h3 className="text-xl font-bold text-foreground">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Node.js 18+ and npm/yarn</li>
                  <li>MetaMask or Core Wallet browser extension</li>
                  <li>AVAX for gas fees (on mainnet or Fuji testnet)</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-6">Environment Variables</h3>
                <div className="bg-background/50 border border-white/10 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-1">
                    <div>NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS=0x...</div>
                    <div>NEXT_PUBLIC_GOPLUS_API_KEY=your_api_key</div>
                    <div>NEXT_PUBLIC_AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc</div>
                    <div>NEXT_PUBLIC_FUJI_RPC=https://api.avax-test.network/ext/bc/C/rpc</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mt-6">Installation Steps</h3>
                <div className="space-y-3">
                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <p className="text-sm mb-2 text-foreground">1. Clone the repository</p>
                    <code className="text-xs bg-background/50 px-2 py-1 rounded block">
                      git clone https://github.com/yourusername/avaxburner.git
                    </code>
                  </div>
                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <p className="text-sm mb-2 text-foreground">2. Install dependencies</p>
                    <code className="text-xs bg-background/50 px-2 py-1 rounded block">
                      cd avaxburner && npm install
                    </code>
                  </div>
                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <p className="text-sm mb-2 text-foreground">3. Deploy smart contract</p>
                    <code className="text-xs bg-background/50 px-2 py-1 rounded block">
                      cd contracts && npm install && npx ts-node scripts/deploy-contract.ts
                    </code>
                  </div>
                  <div className="bg-background/50 border border-white/10 rounded-lg p-4">
                    <p className="text-sm mb-2 text-foreground">4. Start development server</p>
                    <code className="text-xs bg-background/50 px-2 py-1 rounded block">npm run dev</code>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Usage Section */}
          <section id="usage" className="mb-12">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-8 h-8 text-avax-warning" />
                Usage Guide
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h3 className="text-xl font-bold text-foreground">Step-by-Step</h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-avax-primary/20 flex items-center justify-center text-avax-primary font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Connect Your Wallet</h4>
                      <p className="text-sm">
                        Click "Connect Wallet" and select your preferred wallet provider (Core Wallet, MetaMask, or
                        WalletConnect). Choose between Mainnet or Fuji Testnet.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-avax-primary/20 flex items-center justify-center text-avax-primary font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Scan Your Assets</h4>
                      <p className="text-sm">
                        The dashboard automatically scans your wallet for all ERC20 tokens and ERC721 NFTs. Each asset
                        is analyzed for security risks using the GoPlus API.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-avax-primary/20 flex items-center justify-center text-avax-primary font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Select Assets to Burn</h4>
                      <p className="text-sm">
                        Use risk filters to quickly identify dangerous tokens. Click on assets to select them for
                        burning. You can select multiple assets for batch operations.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-avax-primary/20 flex items-center justify-center text-avax-primary font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Review and Burn</h4>
                      <p className="text-sm">
                        Click "Burn Selected" to review your transaction. Check gas estimates and expected rebates. Sign
                        the transaction in your wallet to complete the burn.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-avax-primary/20 flex items-center justify-center text-avax-primary font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Claim Your Rebates</h4>
                      <p className="text-sm">
                        After burning, your gas rebates accumulate in the smart contract. Visit your dashboard to claim
                        your 25% gas rebates at any time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-avax-success/10 border border-avax-success/20 rounded-lg p-4 mt-6">
                  <h3 className="font-bold mb-2 text-foreground">Tips for Best Results</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Use batch burning to minimize individual transaction costs</li>
                    <li>Focus on high-risk tokens first for safety</li>
                    <li>Let rebates accumulate before claiming to save on gas</li>
                    <li>Check transaction history to track your burns and rebates</li>
                    <li>Test on Fuji testnet before using mainnet</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-avax-primary/10 via-avax-secondary/10 to-transparent backdrop-blur border-avax-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Start Burning?</h2>
            <p className="text-muted-foreground mb-6">Connect your wallet and clean your Avalanche portfolio today.</p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0"
              >
                Launch App
                <Flame className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
