import Topbar from "@/components/Topbar";

export default function ContractManagementPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)" }}>
      <Topbar title="Contract Management" />
      <div className="p-6">
        <div
          className="h-[calc(100vh-64px-48px)] rounded-sm"
          style={{
            background: "var(--canvas)",
            border: "1px solid rgba(15,23,42,0.18)",
          }}
        />
      </div>
    </div>
  );
}
