"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Wallet, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"

const DEX_URL = process.env.NEXT_PUBLIC_DEX_URL || "http://localhost:3000"
const DASHBOARD_URL = "https://domex-seven.vercel.app/"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { address, isConnected, isConnecting, connect, disconnect, formatAddress, error } = useWallet()

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <nav className="flex items-center justify-between bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full px-6 py-3 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">DOMEX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
          >
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#features" className="relative text-zinc-400 hover:text-white transition-colors text-sm group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/marketplace" className="relative text-zinc-400 hover:text-white transition-colors text-sm group">
            Marketplace
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <a
            href={DEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
          >
            DEX
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-zinc-400 hover:text-white transition-colors text-sm group"
          >
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* Desktop CTA - Removed Launch App, styled Connect Wallet as primary */}
        <div className="hidden md:flex items-center gap-3">
          {isConnected && address ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-zinc-300 text-sm font-mono">{formatAddress(address)}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-full"
                onClick={disconnect}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              onClick={connect}
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Error Toast */}
      {error && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-4">
          <div className="flex flex-col gap-3">
            <Link
              href="#how-it-works"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="#features"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/marketplace"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <a
              href={DEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              DEX
            </a>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <hr className="border-zinc-800" />
            {isConnected && address ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-zinc-300 text-sm font-mono">{formatAddress(address)}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={disconnect}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                className="bg-white text-black hover:bg-zinc-200 rounded-full"
                onClick={connect}
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
