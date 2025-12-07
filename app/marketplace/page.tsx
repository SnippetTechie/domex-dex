import { Navbar } from "@/components/navbar"
import { PriceChart } from "@/components/price-chart"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Real-time market data powered by Flare&apos;s FTSO v2 oracle network. Compare BTC, ETH, and XRP prices
            against FLR.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <PriceChart />
        </div>
      </section>

      {/* Additional Market Info Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* FTSO Info Card */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 group">
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                FTSO v2 Oracle
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Data Providers</span>
                  <span className="text-white font-medium">100+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Update Frequency</span>
                  <span className="text-white font-medium">~3 seconds</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Network</span>
                  <span className="text-white font-medium">Flare Mainnet</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Contract</span>
                  <span className="text-cyan-400 font-mono text-xs">0x3d89...f726</span>
                </div>
              </div>
            </div>

            {/* Guarded Swap Card */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 group">
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                Guarded Swap
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Protection Level</span>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Max Slippage</span>
                  <span className="text-white font-medium">0.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Oracle Verified</span>
                  <span className="text-cyan-400 font-medium">Yes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">MEV Protected</span>
                  <span className="text-green-400 font-medium">Yes</span>
                </div>
              </div>
            </div>

            {/* Feed IDs Card */}
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 group">
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                Supported Feeds
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
                      B
                    </span>
                    <span className="text-zinc-400">BTC/USD</span>
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">0x0142...00</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                      E
                    </span>
                    <span className="text-zinc-400">ETH/USD</span>
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">0x0145...00</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">
                      X
                    </span>
                    <span className="text-zinc-400">XRP/USD</span>
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">0x0158...00</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs font-bold">
                      F
                    </span>
                    <span className="text-zinc-400">FLR/USD</span>
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">0x0146...00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
