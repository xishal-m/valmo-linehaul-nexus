import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valmo Nexus | Linehaul Marketplace",
  description: "Connect shippers and carriers for seamless linehaul operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--background)] font-bold text-lg">
                  V
                </div>
                <span className="text-xl font-semibold tracking-tight">
                  Valmo <span className="text-[var(--accent)]">Nexus</span>
                </span>
              </Link>
              
              <div className="flex items-center gap-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all"
                >
                  Home
                </Link>
                <Link
                  href="/marketplace"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all"
                >
                  Marketplace
                </Link>
                <Link
                  href="/contracts"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] transition-all"
                >
                  Contracts
                </Link>
              </div>

              <button className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--background)] text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--accent)]/20">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)] mt-20">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[var(--muted)]">
                © 2026 Valmo Nexus. Decentralized logistics for the modern era.
              </p>
              <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
                <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms</a>
                <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[var(--foreground)] transition-colors">Docs</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
