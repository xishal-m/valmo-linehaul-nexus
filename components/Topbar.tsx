"use client";

import { Search, Youtube } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <header
      className="h-[64px] flex items-center justify-between px-6"
      style={{ background: "white", borderBottom: "1px solid rgba(15,23,42,0.10)" }}
    >
      <h1 className="text-[22px] font-medium text-slate-700">{title}</h1>

      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 text-[13px] text-slate-700 hover:text-slate-900"
          onClick={() => alert("How it works (prototype)")}
        >
          <Youtube size={18} color="#ef4444" />
          <span>How it works?</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} color="rgba(15,23,42,0.45)" />
          <input
            className="h-[36px] w-[340px] rounded-md border border-slate-300 bg-white pl-9 pr-3 text-[13px] text-slate-700 placeholder-slate-400 outline-none focus:border-slate-400"
            placeholder="Search by Trip ID"
          />
        </div>
      </div>
    </header>
  );
}
