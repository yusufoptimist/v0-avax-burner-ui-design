import { type NextRequest, NextResponse } from "next/server"
import { ethers } from "ethers"

const BURNER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS || "0xBurnerContractAddressHere"

const BURNER_ABI = ["function claimRebate() external", "function userRebates(address) external view returns (uint256)"]

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 })
    }

    // Prepare transaction data for frontend to sign
    const iface = new ethers.Interface(BURNER_ABI)
    const data = iface.encodeFunctionData("claimRebate", [])

    return NextResponse.json({
      success: true,
      transaction: {
        to: BURNER_CONTRACT_ADDRESS,
        data,
        value: "0x0",
        description: "Claim rebate",
      },
      contractAddress: BURNER_CONTRACT_ADDRESS,
    })
  } catch (error) {
    console.error("[v0] Error preparing rebate claim:", error)
    return NextResponse.json({ error: "Failed to prepare rebate claim" }, { status: 500 })
  }
}
