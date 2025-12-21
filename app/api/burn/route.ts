import { type NextRequest, NextResponse } from "next/server"
import { ethers } from "ethers"

const BURNER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS || "0xBurnerContractAddressHere"

const BURNER_ABI = [
  "function batchBurnTokens(address[] calldata tokenAddresses, uint256[] calldata amounts) external",
  "function batchBurnNFTs(address[] calldata nftAddresses, uint256[] calldata tokenIds) external",
  "function getUserStats(address user) external view returns (uint256 burnCount, uint256 pendingRebate)",
  "function claimRebate() external",
]

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, assets, action = "estimate" } = await request.json()

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 })
    }

    if (!assets || assets.length === 0) {
      return NextResponse.json({ error: "No assets provided" }, { status: 400 })
    }

    // Separate tokens and NFTs
    const tokens = assets.filter((a: any) => a.type === "token")
    const nfts = assets.filter((a: any) => a.type === "nft")

    if (action === "estimate") {
      // Estimate gas and rebate
      const estimatedGas = (tokens.length + nfts.length) * 0.001
      const estimatedRebate = estimatedGas * 0.25

      return NextResponse.json({
        success: true,
        estimatedGas,
        estimatedRebate,
        totalCost: estimatedGas - estimatedRebate,
        tokensCount: tokens.length,
        nftsCount: nfts.length,
      })
    }

    if (action === "prepare") {
      // Prepare transaction data for frontend to sign
      const tokenAddresses = tokens.map((t: any) => t.address)
      const tokenAmounts = tokens.map((t: any) => ethers.parseUnits(t.balance, t.decimals || 18))

      const nftAddresses = nfts.map((n: any) => n.address)
      const nftTokenIds = nfts.map((n: any) => n.tokenId)

      const transactions = []

      // Add token burn transaction if there are tokens
      if (tokens.length > 0) {
        const iface = new ethers.Interface(BURNER_ABI)
        const data = iface.encodeFunctionData("batchBurnTokens", [tokenAddresses, tokenAmounts])

        transactions.push({
          to: BURNER_CONTRACT_ADDRESS,
          data,
          value: "0x0",
          description: `Burn ${tokens.length} token(s)`,
        })
      }

      // Add NFT burn transaction if there are NFTs
      if (nfts.length > 0) {
        const iface = new ethers.Interface(BURNER_ABI)
        const data = iface.encodeFunctionData("batchBurnNFTs", [nftAddresses, nftTokenIds])

        transactions.push({
          to: BURNER_CONTRACT_ADDRESS,
          data,
          value: "0x0",
          description: `Burn ${nfts.length} NFT(s)`,
        })
      }

      return NextResponse.json({
        success: true,
        transactions,
        contractAddress: BURNER_CONTRACT_ADDRESS,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Error processing burn request:", error)
    return NextResponse.json({ error: "Failed to process burn request" }, { status: 500 })
  }
}
