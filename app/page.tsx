"use client"

import { useState } from "react"
import { Flame, Shield, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LandingPage() {
  const [showConnectModal, setShowConnectModal] = useState(false)
  const { isConnected, address, connect } = useWallet()
  const router = useRouter()

  const handleConnect = (addr: string) => {
    connect(addr)
    router.push("/dashboard")
  }

  const handleScanNow = () => {
    if (isConnected) {
      router.push("/dashboard")
    } else {
      setShowConnectModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-avax-dark">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-balance">AvaxBurner</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Docs
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              GitHub
            </Button>
            {isConnected ? (
              <Button
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0"
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setShowConnectModal(true)}
                className="bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-avax-primary/10 border border-avax-primary/20 mb-6">
            <Shield className="w-4 h-4 text-avax-primary" />
            <span className="text-sm font-medium text-avax-primary">Risk Scanner Powered by GoPlus</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Clean Your Avalanche Wallet
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
            Burn spam tokens & rugs in one click. Get rebates for cleaning your wallet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleScanNow}
              className="bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0 text-lg px-8"
            >
              Scan Now
              <Zap className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white/20 hover:bg-white/5 bg-transparent"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-white/5 backdrop-blur border-white/10 hover:border-avax-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-avax-primary/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-avax-primary" />
              </div>
              <h3 className="text-3xl font-bold text-balance">888K+</h3>
            </div>
            <p className="text-muted-foreground">Total Burns</p>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur border-white/10 hover:border-avax-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-avax-secondary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-avax-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-balance">5.2 AVAX</h3>
            </div>
            <p className="text-muted-foreground">Total Rebated</p>
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur border-white/10 hover:border-avax-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-avax-success/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-avax-success" />
              </div>
              <h3 className="text-3xl font-bold text-balance">12K</h3>
            </div>
            <p className="text-muted-foreground">Wallets Cleaned</p>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why AvaxBurner?</h2>
            <p className="text-muted-foreground text-lg text-balance">The safest way to clean your Avalanche wallet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-balance">Risk Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically scan and identify honeypots, rugs, and spam tokens using GoPlus security API.
              </p>
            </Card>

            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-avax-secondary to-avax-warning flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-balance">Batch Burning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Select multiple tokens and NFTs to burn in a single transaction. Save time and gas fees.
              </p>
            </Card>

            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-avax-success to-avax-primary flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-balance">Earn Rebates</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get 25% of gas fees back when you burn tokens. The more you clean, the more you earn.
              </p>
            </Card>

            <Card className="p-8 bg-white/5 backdrop-blur border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-avax-warning to-avax-primary flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-balance">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instant scanning and burning on Avalanche C-Chain. Works on both mainnet and Fuji testnet.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-32">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-avax-primary/10 via-avax-secondary/10 to-transparent backdrop-blur border-avax-primary/20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Ready to Clean Your Wallet?</h2>
          <p className="text-muted-foreground text-lg mb-8 text-balance max-w-2xl mx-auto">
            Connect your wallet and start burning spam tokens in seconds.
          </p>
          <Button
            size="lg"
            onClick={handleScanNow}
            className="bg-gradient-to-r from-avax-primary to-avax-secondary hover:from-avax-primary/90 hover:to-avax-secondary/90 text-white border-0 text-lg px-8"
          >
            Get Started Now
            <Flame className="ml-2 w-5 h-5" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">AvaxBurner</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground transition-colors">
                Docs
              </Link>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Connection Modal */}
      <WalletConnectModal open={showConnectModal} onOpenChange={setShowConnectModal} onConnect={handleConnect} />
    </div>
  )
}
