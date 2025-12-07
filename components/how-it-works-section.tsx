import { Wallet, ToggleRight, Zap, Bell } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "Connect & Choose Pair",
    description: "Connect your Flare wallet and pick tokens.",
  },
  {
    icon: ToggleRight,
    title: "Enable Guarded Swap",
    description: "Toggle Guarded Swap to enforce FTSO price checks.",
  },
  {
    icon: Zap,
    title: "Execute Trade",
    description:
      "If pool price stays within your chosen deviation threshold, the swap executes. Otherwise, it reverts.",
  },
  {
    icon: Bell,
    title: "Add Alerts",
    description: "Optionally, add an on-chain price alert so you're ready before the next move.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Get started with protected trading in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Continuous Connecting Line - positioned at center of icons */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-cyan-500/50 via-cyan-400 to-cyan-500/50" />

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group cursor-pointer">
                {/* Icon Circle with glow effect */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md group-hover:bg-cyan-500/40 transition-all duration-500" />
                  {/* Icon container */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                    <step.icon className="w-7 h-7 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300" />
                  </div>
                </div>

                {/* Title with hover effect */}
                <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-cyan-400">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed transition-colors duration-300 group-hover:text-zinc-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
