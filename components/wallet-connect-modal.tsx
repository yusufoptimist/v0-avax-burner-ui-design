"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink, AlertCircle } from "lucide-react"

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: (address: string) => void
}

type WalletType = "metamask" | "coinbase" | "core" | "walletconnect" | "generic"

interface WalletProvider {
  name: string
  icon: string
  colors: string
  check: () => boolean
  key: WalletType
}

const AVALANCHE_MAINNET = {
  chainId: "0xa86a",
  chainName: "Avalanche C-Chain",
  nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io"],
}

const AVALANCHE_FUJI = {
  chainId: "0xa869",
  chainName: "Avalanche Fuji Testnet",
  nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io"],
}

const WALLET_PROVIDERS: WalletProvider[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    colors: "from-orange-500 to-orange-600",
    check: () => typeof window !== "undefined" && !!(window as any).ethereum?.isMetaMask,
    key: "metamask",
  },
  {
    name: "Coinbase Wallet",
    icon: "⚫",
    colors: "from-blue-600 to-blue-700",
    check: () => typeof window !== "undefined" && !!(window as any).ethereum?.isCoinbaseWallet,
    key: "coinbase",
  },
  {
    name: "Core Wallet",
    icon: "🔴",
    colors: "from-red-600 to-red-700",
    check: () => typeof window !== "undefined" && !!(window as any).ethereum?.isCore,
    key: "core",
  },
  {
    name: "Other EVM Wallet",
    icon: "🌐",
    colors: "from-purple-600 to-purple-700",
    check: () => typeof window !== "undefined" && !!(window as any).ethereum,
    key: "generic",
  },
]

export function WalletConnectModal({ open, onOpenChange, onConnect }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<"mainnet" | "fuji">("mainnet")
  const [connectedWallet, setConnectedWallet] = useState<WalletType | null>(null)

  const handleConnectWallet = async (walletType: WalletType) => {
    setConnecting(true)
    setError(null)
    setConnectedWallet(walletType)
    try {
      // Check if any EVM provider is available
      if (typeof window === "undefined" || !(window as any).ethereum) {
        setError(
          "No EVM wallet detected. Please install MetaMask, Coinbase Wallet, Core, or another Web3 wallet.",
        )
        setConnecting(false)
        return
      }

      const ethereum = (window as any).ethereum

      console.log(`[v0] Connecting to ${walletType} wallet...`)

      // Request account access
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        setError("No accounts found. Please unlock your wallet.")
        setConnecting(false)
        return
      }

      // Switch to selected network
      const networkConfig = selectedNetwork === "mainnet" ? AVALANCHE_MAINNET : AVALANCHE_FUJI

      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkConfig.chainId }],
        })
        console.log(`[v0] Switched to ${selectedNetwork} network`)
      } catch (switchError: any) {
        // Chain not added, try to add it
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networkConfig],
            })
            console.log(`[v0] Added Avalanche ${selectedNetwork} network`)
          } catch (addError) {
            setError(`Failed to add Avalanche network. Please add it manually in your wallet.`)
            setConnecting(false)
            return
          }
        } else if (switchError.code === 4001) {
          setError(null)
          console.log("[v0] User rejected network switch")
          setConnecting(false)
          return
        } else {
          setError("Failed to switch network. Please try manually switching in your wallet.")
          setConnecting(false)
          return
        }
      }

      // Connection successful
      console.log(`[v0] Successfully connected wallet: ${accounts[0]}`)
      onConnect(accounts[0])
      onOpenChange(false)
    } catch (error: any) {
      console.error(`[v0] ${walletType} connection error:`, error)
      if (error.code === 4001) {
        setError(null)
        console.log("[v0] User rejected wallet connection")
      } else if (error.message?.includes("Already processing")) {
        setError("Request already in progress. Please wait.")
      } else {
        setError(error.message || "Failed to connect wallet")
      }
    } finally {
      setConnecting(false)
      setConnectedWallet(null)
    }
  }

  const dismissError = () => {
    setError(null)
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
              {WALLET_PROVIDERS.map((wallet) => (
                <Button
                  key={wallet.key}
                  onClick={() => handleConnectWallet(wallet.key)}
                  disabled={connecting}
                  className="w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 text-foreground h-auto py-4 disabled:opacity-50"
                  variant="outline"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${wallet.colors} flex items-center justify-center text-lg`}>
                      {wallet.icon}
                    </div>
                    <span className="font-semibold">{wallet.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-400">
                Don't see your wallet? Any EVM-compatible wallet that supports Web3.js or ethers.js should work with the "Other EVM Wallet" option.
              </p>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-red-500 mb-2">{error}</div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={dismissError}
                  className="text-red-500 hover:text-red-400 h-auto p-0 text-xs"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}

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
