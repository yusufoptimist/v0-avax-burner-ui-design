import { ethers } from "ethers"

export const BURNER_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"

export const BURNER_ABI = [
  "function batchBurnTokens(address[] calldata tokenAddresses, uint256[] calldata amounts) external",
  "function batchBurnNFTs(address[] calldata nftAddresses, uint256[] calldata tokenIds) external",
  "function getUserStats(address user) external view returns (uint256 burnCount, uint256 pendingRebate)",
  "function claimRebate() external",
  "function totalBurns() external view returns (uint256)",
  "function totalRebatesPaid() external view returns (uint256)",
  "function userRebates(address) external view returns (uint256)",
  "event TokensBurned(address indexed user, address indexed token, uint256 amount, uint256 rebate)",
  "event NFTBurned(address indexed user, address indexed nft, uint256 tokenId, uint256 rebate)",
  "event RebateClaimed(address indexed user, uint256 amount)",
]

export function getBurnerContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(BURNER_CONTRACT_ADDRESS, BURNER_ABI, signerOrProvider)
}
