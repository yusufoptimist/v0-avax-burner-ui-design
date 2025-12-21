"use client"

import { Flame } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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

interface AssetCardProps {
  asset: Asset
  isSelected: boolean
  onToggleSelect: (id: string) => void
}

export function AssetCard({ asset, isSelected, onToggleSelect }: AssetCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "safe":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "safe":
        return "🟢"
      default:
        return "⚪"
    }
  }

  return (
    <Card
      className={`p-4 bg-white/5 backdrop-blur border-white/10 hover:border-avax-primary/30 transition-all cursor-pointer ${
        isSelected ? "border-avax-primary/50 bg-avax-primary/5" : ""
      }`}
      onClick={() => onToggleSelect(asset.id)}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelect(asset.id)} className="border-white/20" />

        {/* Asset Icon */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white/5">
          <Image src={asset.icon || "/placeholder.svg"} alt={asset.name} fill className="object-cover" />
        </div>

        {/* Asset Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg truncate">{asset.name}</h3>
            <Badge variant="outline" className="text-xs">
              {asset.type.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {asset.balance} {asset.symbol}
          </p>
          {asset.riskDetails && asset.riskDetails.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {asset.riskDetails.map((detail, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                  {detail}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Risk Badge */}
        <div className="flex flex-col items-end gap-2">
          <Badge className={`px-3 py-1 text-xs font-bold border ${getRiskColor(asset.risk)}`}>
            {getRiskIcon(asset.risk)} {asset.risk.toUpperCase()}
          </Badge>
          {asset.risk !== "safe" && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onToggleSelect(asset.id)
              }}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 h-8 px-3"
            >
              <Flame className="w-3 h-3 mr-1" />
              Burn
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
