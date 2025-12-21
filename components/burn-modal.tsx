"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Flame, Loader2, CheckCircle2, ExternalLink, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import confetti from "canvas-confetti"

interface Asset {
  id: string
  type: "token" | "nft"
  name: string
  symbol: string
  balance: string
  icon: string
  risk: "high" | "medium" | "safe"
  riskDetails?: string[]
  tokenId?: string // Added tokenId for NFTs
}

interface BurnModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAssets: Asset[]
  estimatedGas: number
  estimatedRebate: number
  onSuccess: () => void
}

type BurnStep = "review" | "signing" | "burning" | "success"

export function BurnModal({
  open,
  onOpenChange,
  selectedAssets,
  estimatedGas,
  estimatedRebate,
  onSuccess,
}: BurnModalProps) {
  const [currentStep, setCurrentStep] = useState<BurnStep>("review")
  const [txHash, setTxHash] = useState<string>("")

  const handleBurn = async () => {
    try {
      // Step 1: Signing
      setCurrentStep("signing")

      const prepareResponse = await fetch("/api/burn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: window.ethereum?.selectedAddress,
          assets: selectedAssets.map((asset) => ({
            type: asset.type,
            address: asset.id,
            balance: asset.balance,
            symbol: asset.symbol,
            tokenId: asset.tokenId,
          })),
          action: "prepare",
        }),
      })

      if (!prepareResponse.ok) {
        throw new Error("Failed to prepare transaction")
      }

      const { transactions } = await prepareResponse.json()

      // Step 2: Sign and send transactions
      // This would integrate with the wallet to actually sign
      // For now, simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Step 3: Burning
      setCurrentStep("burning")

      // In production, this would be the actual transaction
      // const provider = new ethers.BrowserProvider(window.ethereum)
      // const signer = await provider.getSigner()
      // const tx = await signer.sendTransaction(transactions[0])
      // await tx.wait()

      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 4: Success
      const mockTxHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      setTxHash(mockTxHash)
      setCurrentStep("success")

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E84142", "#FF6B6B", "#FFD93D", "#6BCF7F"],
      })
    } catch (error) {
      console.error("[v0] Error burning assets:", error)
      // Handle error state
      setCurrentStep("review")
    }
  }

  const handleClose = () => {
    if (currentStep === "success") {
      onSuccess()
      setCurrentStep("review")
      setTxHash("")
    }
    onOpenChange(false)
  }

  const totalCost = estimatedGas - estimatedRebate

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-balance">
            {currentStep === "review" && "Confirm Burn"}
            {currentStep === "signing" && "Sign Transaction"}
            {currentStep === "burning" && "Burning Assets"}
            {currentStep === "success" && "Wallet Cleaned!"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === "review" ? "bg-avax-primary text-white" : "bg-avax-success text-white"
                }`}
              >
                {currentStep === "review" ? "1" : "✓"}
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Review</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep !== "review" ? "bg-avax-success" : "bg-white/20"}`} />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === "signing"
                    ? "bg-avax-primary text-white"
                    : currentStep === "burning" || currentStep === "success"
                      ? "bg-avax-success text-white"
                      : "bg-white/10 text-muted-foreground"
                }`}
              >
                {currentStep === "burning" || currentStep === "success" ? "✓" : "2"}
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Sign</span>
            </div>
            <div
              className={`w-12 h-0.5 ${currentStep === "burning" || currentStep === "success" ? "bg-avax-success" : "bg-white/20"}`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === "success"
                    ? "bg-avax-success text-white"
                    : currentStep === "burning"
                      ? "bg-avax-primary text-white"
                      : "bg-white/10 text-muted-foreground"
                }`}
              >
                {currentStep === "success" ? "✓" : "3"}
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Done</span>
            </div>
          </div>

          {/* Review Step */}
          {currentStep === "review" && (
            <div className="space-y-6">
              <Card className="p-4 bg-white/5 border-white/10 max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-3">Assets to Burn ({selectedAssets.length})</h3>
                <div className="space-y-2">
                  {selectedAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                        </div>
                      </div>
                      <span className="text-sm">{asset.balance}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-avax-primary/10 to-avax-secondary/10 border-avax-primary/20">
                <h3 className="font-semibold mb-4">Transaction Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Gas</span>
                    <span className="font-semibold">{estimatedGas.toFixed(4)} AVAX</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rebate (25%)</span>
                    <span className="font-semibold text-avax-success">-{estimatedRebate.toFixed(4)} AVAX</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total Cost</span>
                    <span className="font-bold text-lg">{totalCost.toFixed(4)} AVAX</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose} className="flex-1 border-white/20 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleBurn}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Approve in Wallet
                </Button>
              </div>
            </div>
          )}

          {/* Signing Step */}
          {currentStep === "signing" && (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center animate-pulse">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Waiting for Signature</h3>
                <p className="text-muted-foreground">Please sign the transaction in your wallet</p>
              </div>
              <Loader2 className="w-6 h-6 text-avax-primary animate-spin" />
            </div>
          )}

          {/* Burning Step */}
          {currentStep === "burning" && (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center animate-pulse">
                  <Flame className="w-10 h-10 text-white animate-bounce" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full animate-ping" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Burning Assets</h3>
                <p className="text-muted-foreground">Transaction is being processed...</p>
              </div>
              <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
            </div>
          )}

          {/* Success Step */}
          {currentStep === "success" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-avax-success to-green-400 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Wallet Cleaned!</h3>
                  <p className="text-muted-foreground mb-1">{selectedAssets.length} Assets Burned</p>
                </div>
              </div>

              <Card className="p-6 bg-white/5 border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Transaction Hash</span>
                    <a
                      href={`https://snowtrace.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-avax-primary hover:text-avax-secondary transition-colors"
                    >
                      <span className="text-sm font-mono">
                        {txHash.slice(0, 8)}...{txHash.slice(-6)}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rebate Earned</span>
                    <span className="font-bold text-avax-success">{estimatedRebate.toFixed(4)} AVAX</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-r from-avax-success/10 to-green-500/10 border-avax-success/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-avax-success/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-avax-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Claim Your Rebate</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your rebate will be automatically credited to your wallet within 24 hours.
                    </p>
                    <Button size="sm" className="bg-avax-success hover:bg-avax-success/90 text-white border-0">
                      Claim {estimatedRebate.toFixed(4)} AVAX
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose} className="flex-1 border-white/20 bg-transparent">
                  Close
                </Button>
                <Button
                  onClick={handleClose}
                  className="flex-1 bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0"
                >
                  Burn More Assets
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
