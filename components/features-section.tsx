import { Shield, Bell, Network } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Guarded Swaps",
    description:
      "Every swap compares DEX pool price vs Flare FTSO oracle price. If deviation is too high, the trade reverts automatically.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Bell,
    title: "On-chain Price Alerts",
    description:
      "Set alerts like 'FLR below $0.20' directly on-chain. Alerts are triggered using FTSO data and surfaced through our app or bots.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Network,
    title: "Flare-native & FDC-ready",
    description:
      "Built around Flare's native data infrastructure. Today: FTSO-powered pricing. Tomorrow: FDC-powered cross-chain risk guards.",
    color: "from-indigo-500 to-cyan-500",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Your On-chain Trading Assistant</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            DOMEX protects your trades with real-time oracle price verification
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-zinc-900/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-400">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed transition-colors duration-300 group-hover:text-zinc-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
