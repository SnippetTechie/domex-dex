import { NextResponse } from "next/server"

// FTSO Price Reader Contract on Flare Mainnet
const FTSO_PRICE_READER = "0x305154ff8BaAeb3bB58Fac757B0f0a9575416233"
const FLARE_RPC = "https://flare-api.flare.network/ext/C/rpc"

// Correct function selectors (keccak256 hash first 4 bytes)
// getBtcUsdPrice() = 0x2b3297f9
// getEthUsdPrice() = 0x56cf56e5
// getXrpUsdPrice() = 0x0a8d2be3
const SELECTORS: Record<string, string> = {
  BTC: "0x2b3297f9",
  ETH: "0x56cf56e5",
  XRP: "0x0a8d2be3",
}

// CoinGecko API IDs
const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  XRP: "ripple",
}

async function fetchFromFTSO(asset: string): Promise<{ price: number; timestamp: number; source: string } | null> {
  try {
    const selector = SELECTORS[asset]
    if (!selector) return null

    console.log(`[v0] Attempting FTSO fetch for ${asset} with selector ${selector}`)

    const response = await fetch(FLARE_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{ to: FTSO_PRICE_READER, data: selector }, "latest"],
        id: 1,
      }),
    })

    const result = await response.json()
    console.log(`[v0] FTSO RPC result for ${asset}:`, JSON.stringify(result).substring(0, 200))

    if (result.error || !result.result || result.result === "0x" || result.result.length < 66) {
      console.log(`[v0] FTSO returned empty/error for ${asset}`)
      return null
    }

    const data = result.result.slice(2)

    // Parse uint256 value (first 64 hex chars)
    const rawValue = BigInt("0x" + data.slice(0, 64))

    // Parse int8 decimals (next 64 hex chars, but int8 is in last byte)
    const decimalsHex = data.slice(64, 128)
    let decimals = Number.parseInt(decimalsHex.slice(-2), 16)
    if (decimals > 127) decimals = decimals - 256

    // Parse uint64 timestamp
    const timestampHex = data.slice(128, 192)
    const timestamp = Number(BigInt("0x" + timestampHex)) * 1000

    const price = Number(rawValue) / Math.pow(10, Math.abs(decimals))

    console.log(`[v0] FTSO parsed: ${asset} = $${price}, decimals=${decimals}, ts=${new Date(timestamp).toISOString()}`)

    if (price > 0 && price < 1000000) {
      return { price, timestamp, source: "FTSO" }
    }
    return null
  } catch (error) {
    console.error(`[v0] FTSO error for ${asset}:`, error)
    return null
  }
}

async function fetchFromCoinGecko(asset: string): Promise<{ price: number; timestamp: number; source: string } | null> {
  try {
    const coinId = COINGECKO_IDS[asset]
    if (!coinId) return null

    console.log(`[v0] Fetching from CoinGecko for ${asset}`)

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 10 },
      },
    )

    if (!response.ok) {
      console.log(`[v0] CoinGecko response not ok: ${response.status}`)
      return null
    }

    const data = await response.json()
    console.log(`[v0] CoinGecko data for ${asset}:`, data)

    const price = data[coinId]?.usd
    if (price && price > 0) {
      return { price, timestamp: Date.now(), source: "CoinGecko" }
    }
    return null
  } catch (error) {
    console.error(`[v0] CoinGecko error for ${asset}:`, error)
    return null
  }
}

// Backup prices in case both APIs fail (last known good prices)
const FALLBACK_PRICES: Record<string, number> = {
  BTC: 104000,
  ETH: 3900,
  XRP: 2.35,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const asset = searchParams.get("asset")?.toUpperCase() || "BTC"

  console.log(`[v0] Price request for ${asset}`)

  // Try FTSO first (primary source for Flare ecosystem)
  let priceData = await fetchFromFTSO(asset)

  // If FTSO fails, use CoinGecko as backup for real market data
  if (!priceData) {
    console.log(`[v0] FTSO failed for ${asset}, trying CoinGecko`)
    priceData = await fetchFromCoinGecko(asset)
  }

  // Final fallback to hardcoded recent prices
  if (!priceData) {
    console.log(`[v0] All sources failed for ${asset}, using fallback`)
    priceData = {
      price: FALLBACK_PRICES[asset] || 0,
      timestamp: Date.now(),
      source: "Fallback",
    }
  }

  return NextResponse.json({
    asset,
    price: priceData.price,
    timestamp: priceData.timestamp,
    source: priceData.source,
    symbol: `${asset}/USD`,
  })
}
