import { type NextRequest, NextResponse } from "next/server"

const BURNER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, assets, action = "estimate" } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 })
    }

    if (!assets || !Array.isArray(assets) || assets.length === 0) {
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
      // Validate contract address is set
      if (!BURNER_CONTRACT_ADDRESS || BURNER_CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
        console.warn("[v0] Burner contract address not configured, using mock transaction")
      }

      const transactions = []

      // Add token burn transaction if there are tokens
      if (tokens.length > 0) {
        const tokenAddresses = tokens.map((t: any) => t.address || "0x0000000000000000000000000000000000000000")
        const tokenAmounts = tokens.map((t: any) => {
          const balance = parseFloat(t.balance || "0")
          return Math.floor(balance * 1e18).toString()
        })

        transactions.push({
          to: BURNER_CONTRACT_ADDRESS,
          data: "0x", // Placeholder - in production would encode function call
          value: "0",
          description: `Burn ${tokens.length} token(s)`,
          assets: tokens,
        })
      }

      // Add NFT burn transaction if there are NFTs
      if (nfts.length > 0) {
        const nftAddresses = nfts.map((n: any) => n.address || "0x0000000000000000000000000000000000000000")
        const nftTokenIds = nfts.map((n: any) => n.tokenId || "0")

        transactions.push({
          to: BURNER_CONTRACT_ADDRESS,
          data: "0x", // Placeholder - in production would encode function call
          value: "0",
          description: `Burn ${nfts.length} NFT(s)`,
          assets: nfts,
        })
      }

      if (transactions.length === 0) {
        return NextResponse.json({ error: "No valid assets to burn" }, { status: 400 })
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
    return NextResponse.json({ error: String(error) || "Failed to process burn request" }, { status: 500 })
  }
}
