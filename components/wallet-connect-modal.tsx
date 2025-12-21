"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink } from "lucide-react"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: (address: string) => void
}

export function WalletConnectModal({ open, onOpenChange, onConnect }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<"mainnet" | "fuji">("mainnet")

  const handleConnect = async () => {
    setConnecting(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock wallet address
      const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      onConnect(mockAddress)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setConnecting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-balance">Connect Wallet</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Network Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block">Select Network</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedNetwork("mainnet")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedNetwork === "mainnet"
                    ? "border-avax-primary bg-avax-primary/10"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                }`}
              >
                <div className="font-semibold mb-1">Avalanche</div>
                <div className="text-xs text-muted-foreground">Mainnet</div>
              </button>
              <button
                onClick={() => setSelectedNetwork("fuji")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedNetwork === "fuji"
                    ? "border-avax-primary bg-avax-primary/10"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                }`}
              >
                <div className="font-semibold mb-1">Avalanche</div>
                <div className="text-xs text-muted-foreground">Fuji Testnet</div>
              </button>
            </div>
          </div>

          {/* Wallet Options */}
          <div>
            <label className="text-sm font-medium mb-3 block">Choose Wallet</label>
            <div className="space-y-3">
              <Button
                onClick={handleConnect}
                disabled={connecting}
                className="w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 text-foreground h-auto py-4"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">Core Wallet</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Button>

              <Button
                onClick={handleConnect}
                disabled={connecting}
                className="w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 text-foreground h-auto py-4"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">MetaMask</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Button>

              <Button
                onClick={handleConnect}
                disabled={connecting}
                className="w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 text-foreground h-auto py-4"
                variant="outline"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">WalletConnect</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {connecting && (
            <div className="text-center py-2">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-avax-primary border-t-transparent rounded-full animate-spin" />
                Connecting to wallet...
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
