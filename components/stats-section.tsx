const stats = [
  { value: "$123.4M", label: "Total Volume Guarded" },
  { value: "3,245", label: "Alerts Armed On-Chain" },
  { value: "12,894", label: "Swaps Protected This Week" },
  { value: "99.9%", label: "Uptime Reliability" },
]

export function StatsSection() {
  return (
    <section className="py-24 bg-black border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-default p-6 rounded-xl transition-all duration-300 hover:bg-zinc-900/50"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-sm transition-colors duration-300 group-hover:text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
