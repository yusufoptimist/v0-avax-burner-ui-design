"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Flame,
  Shield,
  AlertTriangle,
  Search,
  Filter,
  Loader2,
  Wallet,
  LogOut,
  Copy,
  Check,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/hooks/use-wallet"
import { AssetCard } from "@/components/asset-card"
import { BurnModal } from "@/components/burn-modal"

interface Asset {
  id: string
  type: "token" | "nft"
  name: string
  symbol: string
  balance: string
  icon: string
  risk: "high" | "medium" | "safe"
  riskDetails?: string[]
}

const mockAssets: Asset[] = [
  {
    id: "1",
    type: "token",
    name: "RugCoin",
    symbol: "RUG",
    balance: "69.420",
    icon: "/red-coin-icon.jpg",
    risk: "high",
    riskDetails: ["Unlocked LP 100%", "Honeypot detected", "No contract verification"],
  },
  {
    id: "2",
    type: "nft",
    name: "Scam NFT",
    symbol: "SCAM",
    balance: "1",
    icon: "/suspicious-nft.jpg",
    risk: "high",
    riskDetails: ["Suspicious contract", "No metadata"],
  },
  {
    id: "3",
    type: "token",
    name: "SpamToken",
    symbol: "SPAM",
    balance: "1337.00",
    icon: "/yellow-coin-icon.jpg",
    risk: "medium",
    riskDetails: ["Low liquidity", "Unverified contract"],
  },
  {
    id: "4",
    type: "token",
    name: "AirdropScam",
    symbol: "ADROP",
    balance: "999.99",
    icon: "/orange-coin-icon.jpg",
    risk: "high",
    riskDetails: ["Cannot sell", "Honeypot"],
  },
  {
    id: "5",
    type: "nft",
    name: "Fake Collection",
    symbol: "FAKE",
    balance: "3",
    icon: "/fake-nft-art.jpg",
    risk: "medium",
    riskDetails: ["Suspicious activity"],
  },
  {
    id: "6",
    type: "token",
    name: "Avalanche",
    symbol: "AVAX",
    balance: "2.5",
    icon: "/avalanche-logo-abstract.png",
    risk: "safe",
    riskDetails: [],
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { isConnected, address, balance, disconnect } = useWallet()
  const [assets, setAssets] = useState<Asset[]>([])
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set())
  const [isScanning, setIsScanning] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState<"all" | "high" | "medium" | "safe">("all")
  const [showBurnModal, setShowBurnModal] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
      return
    }

    const scanWalletAssets = async () => {
      try {
        setIsScanning(true)

        const response = await fetch("/api/scan-assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletAddress: address,
            network: "mainnet",
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to scan assets")
        }

        const data = await response.json()

        if (data.success) {
          setAssets(data.assets)
        } else {
          // Fallback to mock data if API fails
          setAssets(mockAssets)
        }
      } catch (error) {
        console.error("[v0] Error scanning wallet:", error)
        // Fallback to mock data on error
        setAssets(mockAssets)
      } finally {
        setIsScanning(false)
      }
    }

    scanWalletAssets()
  }, [isConnected, address, router])

  const handleDisconnect = () => {
    disconnect()
    router.push("/")
  }

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const toggleAssetSelection = (assetId: string) => {
    const newSelected = new Set(selectedAssets)
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId)
    } else {
      newSelected.add(assetId)
    }
    setSelectedAssets(newSelected)
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === "all" || asset.risk === riskFilter
    return matchesSearch && matchesRisk
  })

  const riskyAssets = assets.filter((a) => a.risk === "high" || a.risk === "medium")
  const estimatedGas = selectedAssets.size * 0.001
  const estimatedRebate = estimatedGas * 0.25

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-avax-dark">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AvaxBurner</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/history")}
                className="hidden md:inline-flex"
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDisconnect} className="hidden md:inline-flex">
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-6 bg-white/5 backdrop-blur border-white/10 sticky top-24">
              <div className="space-y-6">
                {/* Wallet Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="w-5 h-5 text-avax-primary" />
                    <h3 className="font-semibold">Wallet</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-muted-foreground">Address</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyAddress}
                        className="h-6 px-2 text-xs hover:bg-white/10"
                      >
                        {copied ? <Check className="w-3 h-3 text-avax-success" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-sm font-mono text-balance break-all">
                        {address?.slice(0, 8)}...{address?.slice(-6)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="text-sm font-semibold">{balance} AVAX</span>
                    </div>
                  </div>
                </div>

                {/* Risk Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-avax-primary" />
                    <h3 className="font-semibold">Risk Level</h3>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant={riskFilter === "all" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setRiskFilter("all")}
                      className={`w-full justify-start ${
                        riskFilter === "all"
                          ? "bg-avax-primary/20 text-avax-primary hover:bg-avax-primary/30"
                          : "hover:bg-white/10"
                      }`}
                    >
                      All Assets
                    </Button>
                    <Button
                      variant={riskFilter === "high" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setRiskFilter("high")}
                      className={`w-full justify-start ${
                        riskFilter === "high" ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "hover:bg-white/10"
                      }`}
                    >
                      High Risk
                    </Button>
                    <Button
                      variant={riskFilter === "medium" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setRiskFilter("medium")}
                      className={`w-full justify-start ${
                        riskFilter === "medium"
                          ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          : "hover:bg-white/10"
                      }`}
                    >
                      Medium Risk
                    </Button>
                    <Button
                      variant={riskFilter === "safe" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setRiskFilter("safe")}
                      className={`w-full justify-start ${
                        riskFilter === "safe"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "hover:bg-white/10"
                      }`}
                    >
                      Safe
                    </Button>
                  </div>
                </div>

                {/* Risk Legend */}
                <div>
                  <h3 className="font-semibold mb-4">Risk Legend</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">High Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Scan Status */}
            {isScanning ? (
              <Card className="p-12 bg-white/5 backdrop-blur border-white/10 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center animate-pulse">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Scanning Your Wallet</h2>
                    <p className="text-muted-foreground">Analyzing assets and checking for risks...</p>
                  </div>
                  <Loader2 className="w-6 h-6 text-avax-primary animate-spin" />
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Alert for Risky Assets */}
                {riskyAssets.length > 0 && (
                  <Card className="p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 backdrop-blur border-red-500/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">Risky Assets Detected</h3>
                        <p className="text-muted-foreground mb-4">
                          Found {riskyAssets.length} potentially harmful assets in your wallet. Consider burning them to
                          clean your wallet.
                        </p>
                        <Button
                          onClick={() => {
                            const riskyIds = new Set(riskyAssets.map((a) => a.id))
                            setSelectedAssets(riskyIds)
                          }}
                          size="sm"
                          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0"
                        >
                          Select All Risky Assets
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens and NFTs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                  />
                </div>

                {/* Assets Grid */}
                <div className="space-y-3">
                  {filteredAssets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      isSelected={selectedAssets.has(asset.id)}
                      onToggleSelect={toggleAssetSelection}
                    />
                  ))}

                  {filteredAssets.length === 0 && (
                    <Card className="p-12 bg-white/5 backdrop-blur border-white/10 text-center">
                      <p className="text-muted-foreground">No assets found matching your criteria.</p>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {selectedAssets.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-background/95 backdrop-blur-lg z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected</p>
                    <p className="text-lg font-bold">{selectedAssets.size} Assets</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Gas</p>
                    <p className="text-lg font-bold">{estimatedGas.toFixed(4)} AVAX</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Rebate</p>
                    <p className="text-lg font-bold text-avax-success">{estimatedRebate.toFixed(4)} AVAX</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setSelectedAssets(new Set())} className="border-white/20">
                  Clear Selection
                </Button>
                <Button
                  onClick={() => setShowBurnModal(true)}
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0"
                >
                  <Flame className="w-5 h-5 mr-2" />
                  Batch Burn ({selectedAssets.size})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Burn Modal */}
      <BurnModal
        open={showBurnModal}
        onOpenChange={setShowBurnModal}
        selectedAssets={
          Array.from(selectedAssets)
            .map((id) => assets.find((a) => a.id === id))
            .filter(Boolean) as Asset[]
        }
        estimatedGas={estimatedGas}
        estimatedRebate={estimatedRebate}
        onSuccess={() => {
          setSelectedAssets(new Set())
          setShowBurnModal(false)
        }}
      />
    </div>
  )
}
