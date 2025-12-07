import Link from "next/link"
import { Github, MessageCircle, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Mission */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">DOMEX</span>
            </Link>
            <p className="text-zinc-500 text-sm text-center md:text-left">
              Price Protected DEX — Built on Flare, Powered by FTSO
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link href="#docs" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Docs
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
          <p className="text-zinc-600 text-xs">© 2025 DOMEX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
