"use client";

import { Badge } from "./ui";

type Props = {
  contract: any;
  onView: () => void;
  onAccept: () => void;
  onReject: () => void;
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

export default function ContractCard({ contract, onView, onAccept, onReject }: Props) {
  const isTrip = contract.contractType === "TRIP_BASED";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-500">Contract ID</div>
          <div className="text-sm font-semibold text-slate-800">{contract.contractId}</div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Badge kind={isTrip ? "trip" : "slab"}>{isTrip ? "Trip based" : "Slab based"}</Badge>
          <Badge kind={contract.billingType === "REGULAR" ? "billingRegular" : "billingAdhoc"}>
            {contract.billingType === "REGULAR" ? "Regular" : "Adhoc"}
          </Badge>
          <Badge kind="statusPending">Pending</Badge>
        </div>
      </div>

      {/* Primary fields */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <Field label="Vehicle size required" value={contract.vehicleType} />
        <Field label="No. of vehicles" value={String(contract.numberOfVehicles)} />

        <Field label="Start date" value={contract.startDate} />
        <Field label="End date" value={contract.endDate} />

        {isTrip ? (
          <div className="col-span-2">
            <div className="text-xs text-slate-500">Pricing</div>
            <div className="mt-0.5 text-sm text-slate-800 font-medium">
              ₹{fmtMoney(contract.ratePerTripPerVehicle)} <span className="font-normal text-slate-600">per trip</span>
            </div>
          </div>
        ) : (
          <div className="col-span-2">
            <div className="text-xs text-slate-500">Pricing</div>
            <div className="mt-0.5 text-sm text-slate-800">
              Slab-based rates apply (View details)
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm text-slate-800">{value}</div>
    </div>
  );
}
