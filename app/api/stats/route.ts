import { type NextRequest, NextResponse } from "next/server"
import { ethers } from "ethers"

const BURNER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS || "0xBurnerContractAddressHere"
const AVALANCHE_RPC = "https://api.avax.network/ext/bc/C/rpc"

const BURNER_ABI = [
  "function totalBurns() external view returns (uint256)",
  "function totalRebatesPaid() external view returns (uint256)",
  "function getUserStats(address user) external view returns (uint256 burnCount, uint256 pendingRebate)",
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userAddress = searchParams.get("userAddress")

    const provider = new ethers.JsonRpcProvider(AVALANCHE_RPC)
    const contract = new ethers.Contract(BURNER_CONTRACT_ADDRESS, BURNER_ABI, provider)

    // Get global stats
    const totalBurns = await contract.totalBurns()
    const totalRebatesPaid = await contract.totalRebatesPaid()

    const response: any = {
      success: true,
      globalStats: {
        totalBurns: totalBurns.toString(),
        totalRebatesPaid: ethers.formatEther(totalRebatesPaid),
        uniqueWallets: "12,000+", // Would need to track this separately
      },
    }

    // Get user-specific stats if address provided
    if (userAddress && ethers.isAddress(userAddress)) {
      const [burnCount, pendingRebate] = await contract.getUserStats(userAddress)

      response.userStats = {
        burnCount: burnCount.toString(),
        pendingRebate: ethers.formatEther(pendingRebate),
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
