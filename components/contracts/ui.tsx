"use client";

export function Badge({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind:
    | "trip"
    | "slab"
    | "billingRegular"
    | "billingAdhoc"
    | "statusPending"
    | "statusActive"
    | "statusInactive";
}) {
  const map: Record<string, string> = {
    trip: "border-indigo-200 bg-indigo-50 text-indigo-800",
    slab: "border-emerald-200 bg-emerald-50 text-emerald-800",

    billingRegular: "border-slate-200 bg-slate-50 text-slate-700",
    billingAdhoc: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800",

    statusPending: "border-amber-200 bg-amber-50 text-amber-800",
    statusActive: "border-sky-200 bg-sky-50 text-sky-800",
    statusInactive: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${map[kind]}`}>
      {children}
    </span>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-slate-800">{children}</div>;
}
