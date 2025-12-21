/**
 * Deployment script for AvaxBurner contract
 * Run with: npx hardhat run scripts/deploy-contract.ts --network avalanche
 */

import { ethers } from "hardhat"

async function main() {
  console.log("Deploying AvaxBurner contract...")

  const [deployer] = await ethers.getSigners()
  console.log("Deploying with account:", deployer.address)

  const balance = await ethers.provider.getBalance(deployer.address)
  console.log("Account balance:", ethers.formatEther(balance), "AVAX")

  // Deploy AvaxBurner contract
  const AvaxBurner = await ethers.getContractFactory("AvaxBurner")
  const burner = await AvaxBurner.deploy()

  await burner.waitForDeployment()

  const address = await burner.getAddress()
  console.log("AvaxBurner deployed to:", address)

  // Fund the contract with initial AVAX for rebates (1 AVAX)
  const fundAmount = ethers.parseEther("1.0")
  const fundTx = await deployer.sendTransaction({
    to: address,
    value: fundAmount,
  })
  await fundTx.wait()

  console.log("Contract funded with:", ethers.formatEther(fundAmount), "AVAX")
  console.log("\nDeployment complete!")
  console.log("Add this to your .env file:")
  console.log(`NEXT_PUBLIC_BURNER_CONTRACT_ADDRESS=${address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
