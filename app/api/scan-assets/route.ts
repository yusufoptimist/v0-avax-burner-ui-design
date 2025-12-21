import { type NextRequest, NextResponse } from "next/server"
import { ethers } from "ethers"

const GOPLUS_API_BASE = "https://api.gopluslabs.io/api/v1"
const AVALANCHE_RPC = "https://api.avax.network/ext/bc/C/rpc"

interface TokenInfo {
  address: string
  name: string
  symbol: string
  decimals: number
  balance: string
}

interface TokenSecurity {
  is_honeypot?: string
  is_open_source?: string
  is_proxy?: string
  is_mintable?: string
  owner_percent?: string
  creator_percent?: string
  holder_count?: string
  lp_holder_count?: string
  lp_total_supply?: string
  is_true_token?: string
  is_airdrop_scam?: string
  trust_list?: string
}

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, network = "mainnet" } = await request.json()

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 })
    }

    const provider = new ethers.JsonRpcProvider(AVALANCHE_RPC)

    // Get AVAX balance
    const avaxBalance = await provider.getBalance(walletAddress)
    const avaxFormatted = ethers.formatEther(avaxBalance)

    // Fetch token balances using event logs (simplified approach)
    // In production, use a proper indexer service like The Graph
    const tokens = await fetchTokenBalances(walletAddress, provider)

    // Scan tokens with GoPlus API
    const scannedAssets = await Promise.all(
      tokens.map(async (token) => {
        const security = await scanTokenSecurity(token.address, "43114") // Avalanche C-Chain ID
        const risk = calculateRiskLevel(security)

        return {
          id: token.address,
          type: "token" as const,
          name: token.name,
          symbol: token.symbol,
          balance: token.balance,
          address: token.address,
          icon: `/placeholder.svg?height=100&width=100&query=${token.symbol}+coin`,
          risk,
          riskDetails: generateRiskDetails(security),
        }
      }),
    )

    // Add AVAX as a safe asset
    const allAssets = [
      {
        id: "native",
        type: "token" as const,
        name: "Avalanche",
        symbol: "AVAX",
        balance: Number.parseFloat(avaxFormatted).toFixed(4),
        address: "0x0000000000000000000000000000000000000000",
        icon: "/avalanche-logo-abstract.png",
        risk: "safe" as const,
        riskDetails: [],
      },
      ...scannedAssets,
    ]

    return NextResponse.json({
      success: true,
      walletAddress,
      avaxBalance: avaxFormatted,
      assets: allAssets,
      totalAssets: allAssets.length,
    })
  } catch (error) {
    console.error("[v0] Error scanning assets:", error)
    return NextResponse.json({ error: "Failed to scan assets" }, { status: 500 })
  }
}

async function fetchTokenBalances(walletAddress: string, provider: ethers.JsonRpcProvider): Promise<TokenInfo[]> {
  // This is a simplified implementation
  // In production, use The Graph, Moralis, or similar indexer

  const tokens: TokenInfo[] = []

  // Example: Query common spam token contracts
  const knownSpamTokens = [
    {
      address: "0x1234567890123456789012345678901234567890",
      name: "RugCoin",
      symbol: "RUG",
      decimals: 18,
    },
    {
      address: "0x2345678901234567890123456789012345678901",
      name: "SpamToken",
      symbol: "SPAM",
      decimals: 18,
    },
  ]

  for (const tokenInfo of knownSpamTokens) {
    try {
      const contract = new ethers.Contract(
        tokenInfo.address,
        ["function balanceOf(address) view returns (uint256)"],
        provider,
      )

      const balance = await contract.balanceOf(walletAddress)

      if (balance > 0n) {
        tokens.push({
          ...tokenInfo,
          balance: ethers.formatUnits(balance, tokenInfo.decimals),
        })
      }
    } catch (error) {
      console.error(`[v0] Error fetching balance for ${tokenInfo.symbol}:`, error)
    }
  }

  return tokens
}

async function scanTokenSecurity(tokenAddress: string, chainId: string): Promise<TokenSecurity> {
  try {
    const response = await fetch(`${GOPLUS_API_BASE}/token_security/${chainId}?contract_addresses=${tokenAddress}`)

    if (!response.ok) {
      throw new Error(`GoPlus API error: ${response.status}`)
    }

    const data = await response.json()
    return data.result?.[tokenAddress.toLowerCase()] || {}
  } catch (error) {
    console.error("[v0] Error fetching token security:", error)
    return {}
  }
}

function calculateRiskLevel(security: TokenSecurity): "high" | "medium" | "safe" {
  const risks: string[] = []

  if (security.is_honeypot === "1") risks.push("honeypot")
  if (security.is_open_source === "0") risks.push("closed_source")
  if (security.is_proxy === "1") risks.push("proxy")
  if (security.is_mintable === "1") risks.push("mintable")
  if (security.is_airdrop_scam === "1") risks.push("airdrop_scam")

  const ownerPercent = Number.parseFloat(security.owner_percent || "0")
  const creatorPercent = Number.parseFloat(security.creator_percent || "0")

  if (ownerPercent > 50 || creatorPercent > 50) risks.push("high_concentration")

  if (security.trust_list === "1") return "safe"
  if (risks.length >= 2) return "high"
  if (risks.length === 1) return "medium"

  return "safe"
}

function generateRiskDetails(security: TokenSecurity): string[] {
  const details: string[] = []

  if (security.is_honeypot === "1") {
    details.push("Honeypot detected - Cannot sell")
  }
  if (security.is_open_source === "0") {
    details.push("Unverified contract")
  }
  if (security.is_proxy === "1") {
    details.push("Proxy contract - Logic can change")
  }
  if (security.is_mintable === "1") {
    details.push("Unlimited minting possible")
  }
  if (security.is_airdrop_scam === "1") {
    details.push("Airdrop scam detected")
  }

  const ownerPercent = Number.parseFloat(security.owner_percent || "0")
  if (ownerPercent > 50) {
    details.push(`Owner holds ${ownerPercent.toFixed(0)}% of supply`)
  }

  const lpHolderCount = Number.parseInt(security.lp_holder_count || "0")
  if (lpHolderCount === 0) {
    details.push("No liquidity pool")
  } else if (lpHolderCount < 10) {
    details.push("Low LP holder count")
  }

  return details
}
