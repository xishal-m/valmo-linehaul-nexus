import Topbar from "@/components/Topbar";
export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)" }}>
      <Topbar title="Home" />
      <div className="p-6 text-slate-600">Placeholder</div>
    </div>
  );
}
