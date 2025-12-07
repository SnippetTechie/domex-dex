"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Shield, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

const PixelBlast = dynamic(() => import("@/components/pixel-blast"), {
  ssr: false,
})

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Pixel Blast Background */}
      <div className="absolute inset-0">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#ffffff"
          patternScale={3}
          patternDensity={0.8}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.3}
          edgeFade={0.15}
          transparent
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge - Enhanced hover effect */}
        <div className="inline-flex items-center gap-2 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-full px-4 py-2 mb-8 transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-900/80 cursor-default">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-zinc-300 text-sm">Built on Flare • Powered by FTSO</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          Price Protected
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Decentralized Exchange
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          DOMEX uses Flare&apos;s native FTSO oracle to stop unfair prices, block manipulation, and trigger on-chain
          alerts when markets move.
        </p>

        {/* CTA Buttons - Enhanced hover effects */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/25"
          >
            <Shield className="w-5 h-5 mr-2" />
            Launch App
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-cyan-500/50 rounded-full px-8 py-6 text-base font-medium bg-zinc-900/50 transition-all duration-300 hover:scale-105"
          >
            Learn More
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Trust Text */}
        <p className="text-zinc-600 text-sm mt-8">Guarded Swaps • On-chain Price Alerts • Flare-native DeFi</p>
      </div>
    </section>
  )
}
