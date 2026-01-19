const contracts = [
  {
    id: "CTR-0x8a7b...3c2d",
    loadId: "LD-098",
    origin: "Miami, FL",
    destination: "Tampa, FL",
    carrier: "Swift Trucking LLC",
    carrierAddress: "0x742d...F1a9",
    shipper: "Florida Imports Co.",
    shipperAddress: "0x8a7b...3c2d",
    rate: "$1,450",
    escrowAmount: "$1,450",
    status: "in_transit",
    createdAt: "Jan 18, 2026",
    pickupConfirmed: "Jan 19, 2026 08:30 AM",
    estimatedDelivery: "Jan 19, 2026 02:00 PM",
    progress: 65,
  },
  {
    id: "CTR-0x3f2e...9a1b",
    loadId: "LD-097",
    origin: "New York, NY",
    destination: "Boston, MA",
    carrier: "Northeast Express",
    carrierAddress: "0x3f2e...9a1b",
    shipper: "Manhattan Wholesale",
    shipperAddress: "0x5c4d...7e8f",
    rate: "$1,890",
    escrowAmount: "$1,890",
    status: "completed",
    createdAt: "Jan 17, 2026",
    pickupConfirmed: "Jan 18, 2026 06:00 AM",
    deliveryConfirmed: "Jan 18, 2026 12:45 PM",
    progress: 100,
  },
  {
    id: "CTR-0x1a2b...4c5d",
    loadId: "LD-096",
    origin: "San Francisco, CA",
    destination: "Sacramento, CA",
    carrier: "Golden State Freight",
    carrierAddress: "0x1a2b...4c5d",
    shipper: "Bay Area Tech Supplies",
    shipperAddress: "0x9e8f...2a3b",
    rate: "$980",
    escrowAmount: "$980",
    status: "pending_pickup",
    createdAt: "Jan 19, 2026",
    scheduledPickup: "Jan 20, 2026 09:00 AM",
    progress: 10,
  },
  {
    id: "CTR-0x6d7e...8f9g",
    loadId: "LD-095",
    origin: "Detroit, MI",
    destination: "Cleveland, OH",
    carrier: "Great Lakes Transport",
    carrierAddress: "0x6d7e...8f9g",
    shipper: "Auto Parts Direct",
    shipperAddress: "0x4b5c...6d7e",
    rate: "$1,120",
    escrowAmount: "$1,120",
    status: "completed",
    createdAt: "Jan 15, 2026",
    pickupConfirmed: "Jan 16, 2026 07:00 AM",
    deliveryConfirmed: "Jan 16, 2026 11:30 AM",
    progress: 100,
  },
  {
    id: "CTR-0x2c3d...5e6f",
    loadId: "LD-094",
    origin: "Phoenix, AZ",
    destination: "Tucson, AZ",
    carrier: "Desert Haul Inc.",
    carrierAddress: "0x2c3d...5e6f",
    shipper: "Arizona Building Supply",
    shipperAddress: "0x7f8g...9h0i",
    rate: "$680",
    escrowAmount: "$680",
    status: "dispute",
    createdAt: "Jan 14, 2026",
    pickupConfirmed: "Jan 15, 2026 10:00 AM",
    disputeReason: "Delivery delay - weather conditions",
    progress: 80,
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending_pickup: {
    label: "Pending Pickup",
    color: "var(--warning)",
    bgColor: "rgba(245, 158, 11, 0.15)",
  },
  in_transit: {
    label: "In Transit",
    color: "var(--accent)",
    bgColor: "rgba(0, 212, 170, 0.15)",
  },
  completed: {
    label: "Completed",
    color: "var(--success)",
    bgColor: "rgba(16, 185, 129, 0.15)",
  },
  dispute: {
    label: "In Dispute",
    color: "var(--danger)",
    bgColor: "rgba(239, 68, 68, 0.15)",
  },
};

export default function ContractsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Smart Contracts</h1>
          <p className="mt-2 text-[var(--muted)]">
            Track your active contracts and transaction history
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Contracts", value: "3", color: "var(--accent)" },
            { label: "Total Escrowed", value: "$4,110", color: "var(--warning)" },
            { label: "Completed", value: "47", color: "var(--success)" },
            { label: "Disputes", value: "1", color: "var(--danger)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
            >
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 border-b border-[var(--card-border)] pb-4">
          {["All", "Active", "Completed", "Disputes"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === "All"
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {contracts.map((contract, index) => {
            const status = statusConfig[contract.status];
            return (
              <div
                key={contract.id}
                className={`opacity-0 animate-fade-in-up stagger-${Math.min(index + 1, 5)} rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden hover:border-[var(--accent)]/50 transition-all`}
              >
                {/* Contract Header */}
                <div className="p-6 border-b border-[var(--card-border)]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-[var(--muted)]">
                            {contract.id}
                          </span>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: status.bgColor, color: status.color }}
                          >
                            {status.label}
                          </span>
                        </div>
                        <div className="mt-1 text-lg font-semibold">
                          {contract.origin} → {contract.destination}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--accent)]">
                        {contract.rate}
                      </div>
                      <div className="text-sm text-[var(--muted)]">
                        Escrow: {contract.escrowAmount}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-3 bg-[var(--background)]/50">
                  <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-2">
                    <span>Contract Progress</span>
                    <span>{contract.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--card-border)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${contract.progress}%`,
                        backgroundColor: status.color,
                      }}
                    />
                  </div>
                </div>

                {/* Contract Details */}
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-[var(--muted)] mb-3">Parties</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--muted)]">Shipper:</span>
                        <span className="text-sm font-medium">{contract.shipper}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--muted)]">Address:</span>
                        <span className="text-sm font-mono text-[var(--accent)]">
                          {contract.shipperAddress}
                        </span>
                      </div>
                      <div className="flex justify-between mt-3">
                        <span className="text-sm text-[var(--muted)]">Carrier:</span>
                        <span className="text-sm font-medium">{contract.carrier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--muted)]">Address:</span>
                        <span className="text-sm font-mono text-[var(--accent)]">
                          {contract.carrierAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[var(--muted)] mb-3">Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--muted)]">Created:</span>
                        <span className="text-sm">{contract.createdAt}</span>
                      </div>
                      {contract.pickupConfirmed && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[var(--muted)]">Pickup:</span>
                          <span className="text-sm text-[var(--success)]">
                            ✓ {contract.pickupConfirmed}
                          </span>
                        </div>
                      )}
                      {contract.scheduledPickup && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[var(--muted)]">Scheduled:</span>
                          <span className="text-sm">{contract.scheduledPickup}</span>
                        </div>
                      )}
                      {contract.estimatedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[var(--muted)]">Est. Delivery:</span>
                          <span className="text-sm">{contract.estimatedDelivery}</span>
                        </div>
                      )}
                      {contract.deliveryConfirmed && (
                        <div className="flex justify-between">
                          <span className="text-sm text-[var(--muted)]">Delivered:</span>
                          <span className="text-sm text-[var(--success)]">
                            ✓ {contract.deliveryConfirmed}
                          </span>
                        </div>
                      )}
                      {contract.disputeReason && (
                        <div className="mt-2 p-2 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/20">
                          <span className="text-sm text-[var(--danger)]">
                            ⚠ {contract.disputeReason}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-[var(--card-border)] flex justify-end gap-3">
                  <button className="px-4 py-2 rounded-lg border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card-bg)] transition-all">
                    View on Chain
                  </button>
                  {contract.status === "in_transit" && (
                    <button className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--background)] text-sm font-medium hover:bg-[var(--accent-hover)] transition-all">
                      Confirm Delivery
                    </button>
                  )}
                  {contract.status === "dispute" && (
                    <button className="px-4 py-2 rounded-lg bg-[var(--warning)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-all">
                      Resolve Dispute
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

