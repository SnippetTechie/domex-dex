// Uses ethers.js to call the FTSOPriceReader contract directly

const COSTON2_RPC = "https://coston2-api.flare.network/ext/C/rpc"
const FTSO_READER_ADDRESS = "0xa0A517b82088a23A099363841A7c79eaAF4Adac8"

// ABI for the deployed FTSOPriceReader contract
const READER_ABI = [
  "function getFlrUsd() view returns (uint256,int8,uint64)",
  "function getEthUsd() view returns (uint256,int8,uint64)",
  "function getBtcUsd() view returns (uint256,int8,uint64)",
]

export type SupportedAsset = "BTC" | "ETH" | "FLR"

export interface PriceData {
  price: number
  timestamp: number
  change24h: number
  changePercent24h: number
  feedStatus: "healthy" | "latency" | "unavailable"
  symbol: string
  decimals: number
  rawValue: string
  source: string
}

export interface PriceHistory {
  timestamp: number
  price: number
}

class FTSOService {
  private priceHistories: Map<SupportedAsset, PriceHistory[]> = new Map()
  private lastPrices: Map<SupportedAsset, number> = new Map()
  private lastUpdateTimes: Map<SupportedAsset, number> = new Map()

  constructor() {
    const assets: SupportedAsset[] = ["BTC", "ETH", "FLR"]
    for (const asset of assets) {
      this.priceHistories.set(asset, [])
      this.lastUpdateTimes.set(asset, 0)
    }
  }

  async getCurrentPrice(asset: SupportedAsset = "BTC"): Promise<PriceData> {
    const symbol = `${asset}/USD`

    try {
      // Dynamic import of ethers
      const { ethers } = await import("ethers")

      // Create provider and contract instance
      const provider = new ethers.JsonRpcProvider(COSTON2_RPC)
      const reader = new ethers.Contract(FTSO_READER_ADDRESS, READER_ABI, provider)

      // Call the appropriate function based on asset
      let result: [bigint, bigint, bigint]

      if (asset === "BTC") {
        result = await reader.getBtcUsd()
      } else if (asset === "ETH") {
        result = await reader.getEthUsd()
      } else {
        result = await reader.getFlrUsd()
      }

      // Parse the result: [value, decimals, timestamp]
      const rawValue = result[0]
      const decimals = Number(result[1])
      const timestamp = Number(result[2])

      // Calculate actual price: value / 10^decimals
      const price = Number(rawValue) / Math.pow(10, decimals)

      console.log(`[v0] FTSO ${asset} price fetched:`, {
        rawValue: rawValue.toString(),
        decimals,
        timestamp,
        price,
      })

      // Calculate change from previous price
      const previousPrice = this.lastPrices.get(asset) || price
      const change24h = price - previousPrice
      const changePercent24h = previousPrice > 0 ? (change24h / previousPrice) * 100 : 0

      this.lastPrices.set(asset, price)

      // Update history
      const history = this.priceHistories.get(asset) || []
      history.push({ timestamp: Date.now(), price })
      if (history.length > 60) history.shift()
      this.priceHistories.set(asset, history)

      this.lastUpdateTimes.set(asset, Date.now())

      return {
        price,
        timestamp: timestamp * 1000, // Convert to milliseconds
        change24h,
        changePercent24h,
        feedStatus: "healthy",
        symbol,
        decimals,
        rawValue: rawValue.toString(),
        source: "FTSO",
      }
    } catch (error) {
      console.error(`[v0] Failed to fetch ${asset} price from FTSO:`, error)

      const lastPrice = this.lastPrices.get(asset) || 0
      return {
        price: lastPrice,
        timestamp: Date.now(),
        change24h: 0,
        changePercent24h: 0,
        feedStatus: "unavailable",
        symbol,
        decimals: 7,
        rawValue: "0",
        source: "Error",
      }
    }
  }

  getPriceHistory(asset: SupportedAsset = "BTC"): PriceHistory[] {
    return [...(this.priceHistories.get(asset) || [])]
  }

  getLastUpdateTime(asset: SupportedAsset = "BTC"): number {
    return this.lastUpdateTimes.get(asset) || 0
  }
}

export const ftsoService = new FTSOService()
