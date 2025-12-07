"use client"

import { useEffect, useState, useCallback } from "react"
import { ftsoService, type PriceData, type PriceHistory, type SupportedAsset } from "@/lib/ftso-service"
import { Clock, Info, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"

const ASSET_CONFIG: Record<
  SupportedAsset,
  { name: string; color: string; bgColor: string; borderColor: string; textColor: string }
> = {
  FLR: {
    name: "Flare",
    color: "rgb(236, 72, 153)",
    bgColor: "bg-pink-500/20",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-400",
  },
  BTC: {
    name: "Bitcoin",
    color: "rgb(249, 115, 22)",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-400",
  },
  ETH: {
    name: "Ethereum",
    color: "rgb(99, 102, 241)",
    bgColor: "bg-indigo-500/20",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-400",
  },
}

const FTSO_PRICE_READER_ADDRESS = "0xa0A517b82088a23A099363841A7c79eaAF4Adac8"

export function PriceChart() {
  const [selectedAsset, setSelectedAsset] = useState<SupportedAsset>("BTC")
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([])
  const [lastUpdated, setLastUpdated] = useState<number>(0)
  const [secondsAgo, setSecondsAgo] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [dataSource, setDataSource] = useState<string>("")

  const fetchPrice = useCallback(async () => {
    try {
      const data = await ftsoService.getCurrentPrice(selectedAsset)
      setPriceData(data)
      setPriceHistory(ftsoService.getPriceHistory(selectedAsset))
      setLastUpdated(Date.now())
      setDataSource(data.source || "Unknown")
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch price:", error)
      setIsLoading(false)
    }
  }, [selectedAsset])

  useEffect(() => {
    setIsLoading(true)
    setPriceHistory([])
    fetchPrice()
    const interval = setInterval(fetchPrice, 5000)
    return () => clearInterval(interval)
  }, [fetchPrice])

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdated) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [lastUpdated])

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)
    } else if (price >= 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(price)
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(price)
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const chartHeight = 280
  const assetConfig = ASSET_CONFIG[selectedAsset]

  const generatePath = () => {
    if (priceHistory.length < 2) return ""
    const prices = priceHistory.map((p) => p.price)
    const minPrice = Math.min(...prices) * 0.9999
    const maxPrice = Math.max(...prices) * 1.0001
    const priceRange = maxPrice - minPrice || 1

    const points = priceHistory.map((point, index) => {
      const x = (index / (priceHistory.length - 1)) * 100
      const y = 100 - ((point.price - minPrice) / priceRange) * 100
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  const generateAreaPath = () => {
    if (priceHistory.length < 2) return ""
    const prices = priceHistory.map((p) => p.price)
    const minPrice = Math.min(...prices) * 0.9999
    const maxPrice = Math.max(...prices) * 1.0001
    const priceRange = maxPrice - minPrice || 1

    const points = priceHistory.map((point, index) => {
      const x = (index / (priceHistory.length - 1)) * 100
      const y = 100 - ((point.price - minPrice) / priceRange) * 100
      return `${x},${y}`
    })

    return `M 0,100 L ${points.join(" L ")} L 100,100 Z`
  }

  const getYAxisLabels = () => {
    if (priceHistory.length < 2) return []
    const prices = priceHistory.map((p) => p.price)
    const minPrice = Math.min(...prices) * 0.9999
    const maxPrice = Math.max(...prices) * 1.0001
    const step = (maxPrice - minPrice) / 4

    return [0, 1, 2, 3, 4].map((i) => ({
      value: maxPrice - i * step,
      y: (i / 4) * 100,
    }))
  }

  const formatYLabel = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`
    if (value >= 1) return `$${value.toFixed(2)}`
    return `$${value.toFixed(4)}`
  }

  const getFeedStatusColor = () => {
    if (!priceData) return { bg: "bg-zinc-500", text: "text-zinc-400", label: "Loading..." }
    switch (priceData.feedStatus) {
      case "healthy":
        return { bg: "bg-green-500", text: "text-green-400", label: "Live from FTSO" }
      case "latency":
        return { bg: "bg-yellow-500", text: "text-yellow-400", label: "High Latency" }
      case "unavailable":
        return { bg: "bg-red-500", text: "text-red-400", label: "Feed Unavailable" }
    }
  }

  const getSourceBadge = () => {
    if (dataSource === "FTSO") {
      return { bg: "bg-green-500/20", border: "border-green-500/30", text: "text-green-400", label: "FTSO v2 Live" }
    } else if (dataSource === "Error") {
      return { bg: "bg-red-500/20", border: "border-red-500/30", text: "text-red-400", label: "Connection Error" }
    } else {
      return { bg: "bg-yellow-500/20", border: "border-yellow-500/30", text: "text-yellow-400", label: "Loading..." }
    }
  }

  const feedStatus = getFeedStatusColor()
  const sourceBadge = getSourceBadge()

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Live Crypto Prices</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
            Real-time prices from Flare FTSO v2 Oracle on Coston2 Testnet. Decentralized data from 100+ providers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 ${sourceBadge.bg} ${sourceBadge.text} text-sm font-medium rounded-full border ${sourceBadge.border}`}
          >
            {sourceBadge.label}
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-full border border-zinc-700">
            <div className={`w-2 h-2 rounded-full ${feedStatus.bg} animate-pulse`} />
            <span className={`text-xs ${feedStatus.text}`}>{feedStatus.label}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["BTC", "ETH", "FLR"] as SupportedAsset[]).map((asset) => {
          const config = ASSET_CONFIG[asset]
          const isSelected = selectedAsset === asset
          return (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? `${config.bgColor} ${config.borderColor} ${config.textColor}`
                  : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${config.bgColor} ${config.textColor}`}
              >
                {asset[0]}
              </div>
              <span className="font-medium">{asset}</span>
              <span className="text-xs opacity-70">/ USD</span>
            </button>
          )
        })}
      </div>

      {/* Chart Container */}
      <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700">
        {/* Gradient top border */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${assetConfig.color}50, ${assetConfig.color}, ${assetConfig.color}50)`,
          }}
        />

        {/* Live Price Row */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Asset Icon */}
              <div
                className={`w-12 h-12 rounded-full ${assetConfig.bgColor} flex items-center justify-center border ${assetConfig.borderColor}`}
              >
                <span className={`${assetConfig.textColor} font-bold text-lg`}>{selectedAsset[0]}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400 text-sm font-medium">{selectedAsset} / USD</span>
                  <span className="text-zinc-600 text-xs">Source: Flare FTSO v2</span>
                </div>
                <div className="flex items-baseline gap-3">
                  {isLoading && !priceData ? (
                    <span className="text-3xl md:text-4xl font-bold text-white animate-pulse">Loading...</span>
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {priceData && priceData.price > 0 ? formatPrice(priceData.price) : "Fetching..."}
                    </span>
                  )}
                  {priceData && priceData.price > 0 && (
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                        priceData.changePercent24h >= 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {priceData.changePercent24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="text-sm font-medium">
                        {priceData.changePercent24h >= 0 ? "+" : ""}
                        {priceData.changePercent24h.toFixed(4)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Refresh indicator */}
            <div className="flex items-center gap-2 text-zinc-500 text-sm group cursor-help">
              <Clock className="w-4 h-4" />
              <span>Refresh: every 5 seconds</span>
              <div className="relative">
                <Info className="w-4 h-4 text-zinc-600 hover:text-zinc-400 transition-colors" />
                <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-zinc-800 rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-700 shadow-xl z-10">
                  Prices are fetched directly from your deployed FTSOPriceReader contract on Flare Coston2 Testnet,
                  reading from FTSO v2 oracle feeds.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="p-6 pt-4">
          <div className="relative" style={{ height: chartHeight }}>
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-right pr-2">
              {getYAxisLabels().map((label, i) => (
                <span key={i} className="text-xs text-zinc-500">
                  {formatYLabel(label.value)}
                </span>
              ))}
            </div>

            {/* Chart SVG */}
            <div className="ml-16 h-full">
              {priceHistory.length < 2 ? (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    <p>Collecting price data from FTSO...</p>
                    <p className="text-xs text-zinc-600 mt-1">Chart will appear after 2 data points</p>
                  </div>
                </div>
              ) : (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                  style={{ height: chartHeight - 30 }}
                >
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgb(63 63 70 / 0.5)" strokeWidth="0.2" />
                  ))}

                  {/* Area fill */}
                  <defs>
                    <linearGradient id={`areaGradient-${selectedAsset}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={`${assetConfig.color}`} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={`${assetConfig.color}`} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={generateAreaPath()} fill={`url(#areaGradient-${selectedAsset})`} />

                  {/* Price line */}
                  <path
                    d={generatePath()}
                    fill="none"
                    stroke={assetConfig.color}
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-sm"
                  />

                  {/* Current price dot */}
                  {priceHistory.length > 0 && (
                    <circle
                      cx="100"
                      cy={(() => {
                        const prices = priceHistory.map((p) => p.price)
                        const minPrice = Math.min(...prices) * 0.9999
                        const maxPrice = Math.max(...prices) * 1.0001
                        const priceRange = maxPrice - minPrice || 1
                        const lastPrice = priceHistory[priceHistory.length - 1].price
                        return 100 - ((lastPrice - minPrice) / priceRange) * 100
                      })()}
                      r="1.5"
                      fill={assetConfig.color}
                      className="animate-pulse"
                    />
                  )}
                </svg>
              )}

              {/* X-Axis Labels */}
              {priceHistory.length >= 2 && (
                <div className="flex justify-between mt-2 text-xs text-zinc-500">
                  <span>{formatTime(priceHistory[0]?.timestamp || 0)}</span>
                  <span>{formatTime(priceHistory[Math.floor(priceHistory.length / 2)]?.timestamp || 0)}</span>
                  <span>{formatTime(priceHistory[priceHistory.length - 1]?.timestamp || 0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/30">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3 h-3" />
                Last updated: {secondsAgo}s ago
              </span>
              <span>
                Contract: {FTSO_PRICE_READER_ADDRESS.slice(0, 10)}...{FTSO_PRICE_READER_ADDRESS.slice(-6)}
              </span>
              <span>Network: Coston2 Testnet</span>
            </div>
            <div className="group relative cursor-help">
              <span className="flex items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors">
                <Info className="w-3 h-3" />
                About FTSO
              </span>
              <div className="absolute bottom-full right-0 mb-2 w-80 p-3 bg-zinc-800 rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-700 shadow-xl z-10">
                <p className="mb-2">
                  <strong>Flare Time Series Oracle (FTSO):</strong> Decentralized price feeds from 100+ independent data
                  providers.
                </p>
                <p>
                  Prices are aggregated on-chain every ~3 minutes, providing manipulation-resistant data for DeFi
                  applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
