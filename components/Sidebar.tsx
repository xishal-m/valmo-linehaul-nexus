"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Headphones,
  Home,
  Briefcase,
  FileText,
  Truck,
  CreditCard,
  LogOut,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const NAV: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Marketplace", href: "/marketplace", icon: Briefcase },
  { label: "Contract Management", href: "/contract-management", icon: FileText },
  { label: "Trips", href: "/trips", icon: Truck },
  { label: "Payments", href: "/payments", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[260px] h-screen sticky top-0 flex flex-col"
      style={{
        background: `linear-gradient(180deg, var(--sidebar-bg), var(--sidebar-bg-2))`,
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      <div className="px-4 py-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
          X
        </div>
        <div className="leading-tight">
          <div className="text-[14px] text-white font-medium">Xishal</div>
        </div>
      </div>

      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{
          borderTop: "1px solid var(--sidebar-border)",
          borderBottom: "1px solid var(--sidebar-border)",
        }}
      >
        <Headphones size={16} color="rgba(255,255,255,0.70)" />
        <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
          Valmo Support
        </span>
      </div>

      <nav className="flex-1 py-2">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-3 px-4 py-3 text-[13px] select-none"
              style={{
                color: active ? "white" : "var(--text-dim)",
                opacity: active ? 1 : 0.92,
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-0 h-full w-[4px] rounded-r"
                  style={{ background: "var(--active-bar)" }}
                />
              )}

              <span
                className="absolute left-0 right-0 top-0 bottom-0"
                style={{ background: active ? "var(--active-bg)" : "transparent" }}
              />

              <span className="relative z-10 flex items-center gap-3">
                <Icon
                  size={16}
                  color={active ? "#ffffff" : "rgba(255,255,255,0.65)"}
                />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: "1px solid var(--sidebar-border)" }} className="px-4 py-3">
        <button
          className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-[13px]"
          style={{ color: "var(--text-muted)" }}
          onClick={() => alert("Logout (prototype)")}
        >
          <LogOut size={16} color="rgba(255,255,255,0.70)" />
          Log Out
        </button>

        <div 
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <img 
            src="https://www.valmo.in/static-assets/valmo-web/valmo-logo-white.svg" 
            alt="Valmo" 
            className="h-5 opacity-50 grayscale"
          />
        </div>
      </div>
    </aside>
  );
}
