import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-44">
          <div className="text-center">
            <h1 className="opacity-0 animate-fade-in-up text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              The Future of
              <span className="block text-[var(--accent)] mt-2">Linehaul Logistics</span>
            </h1>
            <p className="opacity-0 animate-fade-in-up stagger-1 mx-auto mt-8 max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
              Connect shippers and carriers through a decentralized marketplace. 
              Smart contracts ensure trust, transparency, and instant settlements.
            </p>
            <div className="opacity-0 animate-fade-in-up stagger-2 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--accent)] text-[var(--background)] font-semibold text-lg hover:bg-[var(--accent-hover)] transition-all shadow-xl shadow-[var(--accent)]/30 animate-pulse-glow"
              >
                Browse Loads
              </Link>
              <Link
                href="/contracts"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[var(--card-border)] text-[var(--foreground)] font-semibold text-lg hover:bg-[var(--card-bg)] transition-all"
              >
                View Contracts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[var(--card-border)] bg-[var(--card-bg)]/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Active Loads", value: "2,847" },
              { label: "Verified Carriers", value: "1,234" },
              { label: "Total Volume", value: "$12.4M" },
              { label: "Avg. Settlement", value: "< 2 min" },
            ].map((stat, i) => (
              <div key={stat.label} className={`opacity-0 animate-fade-in-up stagger-${i + 1} text-center`}>
                <div className="text-3xl font-bold text-[var(--accent)]">{stat.value}</div>
                <div className="mt-1 text-sm text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Why Valmo Nexus?</h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
            Built for the modern logistics industry with cutting-edge technology
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "🔗",
              title: "Smart Contracts",
              description: "Automated escrow and instant settlements powered by blockchain technology.",
            },
            {
              icon: "📍",
              title: "Real-time Tracking",
              description: "GPS-verified pickups and deliveries with IoT integration for full visibility.",
            },
            {
              icon: "🛡️",
              title: "Trust & Safety",
              description: "Verified carriers, insurance integration, and dispute resolution built-in.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className={`opacity-0 animate-fade-in-up stagger-${i + 1} p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/50 transition-all group`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--accent)]/20 to-purple-500/20 border border-[var(--card-border)] p-12 text-center">
          <div className="absolute inset-0 bg-[var(--card-bg)]/80" />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Logistics?</h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto mb-8">
              Join thousands of shippers and carriers already using Valmo Nexus for seamless operations.
            </p>
            <button className="px-8 py-4 rounded-xl bg-[var(--accent)] text-[var(--background)] font-semibold text-lg hover:bg-[var(--accent-hover)] transition-all shadow-xl shadow-[var(--accent)]/30">
              Get Started Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
