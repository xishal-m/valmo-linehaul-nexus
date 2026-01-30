"use client";

import { Badge } from "./ui";

type Props = {
  mode: "active" | "inactive";
  rows: any[];
  onView: (c: any) => void;
  onTerminate?: (c: any) => void; // only for active
};

export default function ContractTable({ mode, rows, onView, onTerminate }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="grid grid-cols-12 border-b bg-slate-50 px-4 py-3 text-xs font-medium text-slate-600">
        <div className="col-span-2">Contract ID</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Vehicle</div>
        <div className="col-span-3">Period</div>
        {mode === "active" ? (
          <div className="col-span-1">Status</div>
        ) : (
          <div className="col-span-2">Termination Reason</div>
        )}
        <div className="col-span-3 text-right">Action</div>
      </div>

      {rows.map((c) => (
        <div key={c.contractId} className="grid grid-cols-12 items-center px-4 py-3 border-b last:border-b-0">
          <div className="col-span-2 text-sm font-medium text-slate-800">{c.contractId}</div>

          <div className="col-span-2">
            <Badge kind={c.contractType === "TRIP_BASED" ? "trip" : "nonTrip"}>
              {c.contractType === "TRIP_BASED" ? "Trip-based" : "Non-trip"}
            </Badge>
          </div>

          <div className="col-span-2 text-sm text-slate-700">{c.vehicleType}</div>

          <div className="col-span-3 text-sm text-slate-700">
            {c.startDate} → {c.endDate}
          </div>

          {mode === "active" ? (
            <div className="col-span-1">
              <Badge kind="statusActive">Active</Badge>
            </div>
          ) : (
            <div className="col-span-2 text-sm text-slate-700 truncate">
              {c.terminationReason || "—"}
            </div>
          )}

          <div className="col-span-3 flex justify-end gap-2">
            <button
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => onView(c)}
            >
              View
            </button>

            {mode === "active" && onTerminate && (
              <button
                className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-800 hover:bg-amber-100"
                onClick={() => onTerminate(c)}
              >
                Terminate
              </button>
            )}
          </div>
        </div>
      ))}

      {rows.length === 0 && (
        <div className="p-6 text-sm text-slate-600">No contracts found.</div>
      )}
    </div>
  );
}
