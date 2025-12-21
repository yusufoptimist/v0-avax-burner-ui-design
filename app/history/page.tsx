"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Flame, ArrowLeft, ExternalLink, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/hooks/use-wallet"

interface BurnHistory {
  id: string
  date: string
  assetsCount: number
  txHash: string
  gasSpent: string
  rebateEarned: string
  status: "completed" | "pending"
}

const mockHistory: BurnHistory[] = [
  {
    id: "1",
    date: "2024-01-15T10:30:00",
    assetsCount: 5,
    txHash: "0x1234...5678",
    gasSpent: "0.0023",
    rebateEarned: "0.0008",
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-14T15:45:00",
    assetsCount: 3,
    txHash: "0xabcd...efgh",
    gasSpent: "0.0015",
    rebateEarned: "0.0004",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-13T09:20:00",
    assetsCount: 8,
    txHash: "0x9876...4321",
    gasSpent: "0.0035",
    rebateEarned: "0.0012",
    status: "completed",
  },
]

export default function HistoryPage() {
  const router = useRouter()
  const { isConnected } = useWallet()

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  const totalAssets = mockHistory.reduce((sum, item) => sum + item.assetsCount, 0)
  const totalGas = mockHistory.reduce((sum, item) => sum + Number.parseFloat(item.gasSpent), 0)
  const totalRebate = mockHistory.reduce((sum, item) => sum + Number.parseFloat(item.rebateEarned), 0)

  if (!isConnected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-avax-dark">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-avax-primary to-avax-secondary flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Burn History</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/5 backdrop-blur border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-avax-primary/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-avax-primary" />
                </div>
                <h3 className="text-3xl font-bold">{totalAssets}</h3>
              </div>
              <p className="text-muted-foreground">Total Assets Burned</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-3xl font-bold">{totalGas.toFixed(4)}</h3>
              </div>
              <p className="text-muted-foreground">AVAX Spent on Gas</p>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-avax-success/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-avax-success" />
                </div>
                <h3 className="text-3xl font-bold text-avax-success">{totalRebate.toFixed(4)}</h3>
              </div>
              <p className="text-muted-foreground">AVAX Rebated</p>
            </Card>
          </div>

          {/* History List */}
          <Card className="p-6 bg-white/5 backdrop-blur border-white/10">
            <h2 className="text-2xl font-bold mb-6">Recent Burns</h2>
            <div className="space-y-4">
              {mockHistory.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 bg-white/5 border-white/10 hover:border-avax-primary/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Flame className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{item.assetsCount} Assets Burned</h3>
                          <Badge className="bg-avax-success/20 text-avax-success border-avax-success/50">
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Gas: {item.gasSpent} AVAX</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-avax-success">Rebate: +{item.rebateEarned} AVAX</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href={`https://snowtrace.io/tx/${item.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-avax-primary hover:text-avax-secondary transition-colors"
                    >
                      <span className="text-sm font-mono">{item.txHash}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
