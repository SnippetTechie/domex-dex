import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ScrollDemoSection } from "@/components/scroll-demo-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <ScrollDemoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <Footer />
    </main>
  )
}
