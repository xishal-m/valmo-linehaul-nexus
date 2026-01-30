import Topbar from "@/components/Topbar";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)" }}>
      <Topbar title="Marketplace" />
      <div className="p-6">
        <div
          className="h-[calc(100vh-64px-48px)] rounded-sm"
          style={{
            background: "var(--canvas)",
            border: "1px solid var(--canvas-border)",
          }}
        />
      </div>
    </div>
  );
}
