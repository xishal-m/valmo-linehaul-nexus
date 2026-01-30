"use client";

import { Badge } from "./ui";

type Props = {
  contract: any;
  onView: () => void;
  onAccept: () => void;
  onReject: () => void;
};

export default function ContractCard({ contract, onView, onAccept, onReject }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-500">Contract ID</div>
          <div className="text-sm font-semibold text-slate-800">{contract.contractId}</div>
        </div>

        <div className="flex items-center gap-2">
          <Badge kind={contract.contractType === "TRIP_BASED" ? "trip" : "nonTrip"}>
            {contract.contractType === "TRIP_BASED" ? "Trip-based" : "Non-trip"}
          </Badge>
          <Badge kind="statusPending">Pending</Badge>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs text-slate-500">Vehicle</div>
          <div className="text-slate-800">{contract.vehicleType}</div>
        </div>

        <div>
          <div className="text-xs text-slate-500">Period</div>
          <div className="text-slate-800">
            {contract.startDate} → {contract.endDate}
          </div>
        </div>

        <div className="col-span-2">
          <div className="text-xs text-slate-500">Pricing summary</div>
          <div className="text-slate-800">{contract.__pricingSummary}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          onClick={onView}
        >
          View Details
        </button>
        <button
          className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          onClick={onAccept}
        >
          Accept
        </button>
        <button
          className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 hover:bg-rose-100"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
