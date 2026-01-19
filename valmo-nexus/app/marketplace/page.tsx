const loads = [
  {
    id: "LD-001",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    distance: "372 mi",
    weight: "42,000 lbs",
    rate: "$2,850",
    ratePerMile: "$7.66",
    equipment: "Dry Van",
    pickupDate: "Jan 20, 2026",
    deliveryDate: "Jan 21, 2026",
    shipper: "Pacific Goods Inc.",
    shipperRating: 4.9,
    status: "open",
  },
  {
    id: "LD-002",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    distance: "239 mi",
    weight: "38,500 lbs",
    rate: "$1,680",
    ratePerMile: "$7.03",
    equipment: "Reefer",
    pickupDate: "Jan 20, 2026",
    deliveryDate: "Jan 20, 2026",
    shipper: "Texas Fresh Produce",
    shipperRating: 4.7,
    status: "open",
  },
  {
    id: "LD-003",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    distance: "175 mi",
    weight: "35,000 lbs",
    rate: "$1,225",
    ratePerMile: "$7.00",
    equipment: "Flatbed",
    pickupDate: "Jan 21, 2026",
    deliveryDate: "Jan 21, 2026",
    shipper: "Northwest Lumber Co.",
    shipperRating: 4.8,
    status: "open",
  },
  {
    id: "LD-004",
    origin: "Chicago, IL",
    destination: "Indianapolis, IN",
    distance: "183 mi",
    weight: "44,000 lbs",
    rate: "$1,464",
    ratePerMile: "$8.00",
    equipment: "Dry Van",
    pickupDate: "Jan 21, 2026",
    deliveryDate: "Jan 21, 2026",
    shipper: "Midwest Distribution",
    shipperRating: 5.0,
    status: "urgent",
  },
  {
    id: "LD-005",
    origin: "Atlanta, GA",
    destination: "Nashville, TN",
    distance: "250 mi",
    weight: "40,000 lbs",
    rate: "$2,000",
    ratePerMile: "$8.00",
    equipment: "Dry Van",
    pickupDate: "Jan 22, 2026",
    deliveryDate: "Jan 22, 2026",
    shipper: "Southern Logistics",
    shipperRating: 4.6,
    status: "open",
  },
  {
    id: "LD-006",
    origin: "Denver, CO",
    destination: "Salt Lake City, UT",
    distance: "525 mi",
    weight: "36,000 lbs",
    rate: "$4,200",
    ratePerMile: "$8.00",
    equipment: "Reefer",
    pickupDate: "Jan 22, 2026",
    deliveryDate: "Jan 23, 2026",
    shipper: "Rocky Mountain Foods",
    shipperRating: 4.9,
    status: "open",
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Load Marketplace</h1>
          <p className="mt-2 text-[var(--muted)]">
            Browse available loads and book instantly with smart contracts
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-[var(--muted)] mb-1">Origin</label>
              <input
                type="text"
                placeholder="City, State"
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm text-[var(--muted)] mb-1">Destination</label>
              <input
                type="text"
                placeholder="City, State"
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="w-[180px]">
              <label className="block text-sm text-[var(--muted)] mb-1">Equipment</label>
              <select className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]">
                <option value="">All Types</option>
                <option value="dry-van">Dry Van</option>
                <option value="reefer">Reefer</option>
                <option value="flatbed">Flatbed</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--background)] font-medium hover:bg-[var(--accent-hover)] transition-all">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-[var(--muted)]">
          Showing {loads.length} available loads
        </div>

        {/* Load Cards */}
        <div className="grid gap-4">
          {loads.map((load, index) => (
            <div
              key={load.id}
              className={`opacity-0 animate-fade-in-up stagger-${Math.min(index + 1, 5)} p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/50 transition-all group`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Route Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-[var(--muted)]">{load.id}</span>
                    {load.status === "urgent" && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--warning)]/20 text-[var(--warning)] text-xs font-medium">
                        ⚡ Urgent
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">
                      {load.equipment}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold text-lg">{load.origin}</div>
                      <div className="text-sm text-[var(--muted)]">{load.pickupDate}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                      <div className="w-8 h-px bg-[var(--card-border)]" />
                      <span className="text-xs whitespace-nowrap">{load.distance}</span>
                      <div className="w-8 h-px bg-[var(--card-border)]" />
                      <span>→</span>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{load.destination}</div>
                      <div className="text-sm text-[var(--muted)]">{load.deliveryDate}</div>
                    </div>
                  </div>
                </div>

                {/* Load Details */}
                <div className="flex items-center gap-8 text-sm">
                  <div>
                    <div className="text-[var(--muted)]">Weight</div>
                    <div className="font-medium">{load.weight}</div>
                  </div>
                  <div>
                    <div className="text-[var(--muted)]">Shipper</div>
                    <div className="font-medium flex items-center gap-1">
                      {load.shipper}
                      <span className="text-[var(--warning)]">★ {load.shipperRating}</span>
                    </div>
                  </div>
                </div>

                {/* Rate & Action */}
                <div className="flex items-center gap-4 lg:border-l lg:border-[var(--card-border)] lg:pl-8">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--accent)]">{load.rate}</div>
                    <div className="text-sm text-[var(--muted)]">{load.ratePerMile}/mi</div>
                  </div>
                  <button className="px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--background)] font-medium hover:bg-[var(--accent-hover)] transition-all whitespace-nowrap">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 rounded-xl border border-[var(--card-border)] text-[var(--foreground)] font-medium hover:bg-[var(--card-bg)] transition-all">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
}

