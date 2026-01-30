"use client";

import { useMemo, useState } from "react";
import { Badge, SectionTitle } from "./ui";

type Mode = "pending" | "readonly";

type Props = {
  open: boolean;
  mode: Mode;
  contract: any | null;
  onClose: () => void;

  // pending-only actions (optional)
  onAccept?: (c: any) => void;
  onReject?: (c: any, payload: { reason: string; note?: string }) => void;
};

const REJECT_REASONS = [
  "Rate not acceptable",
  "Route / scope mismatch",
  "Vehicle / capacity constraints",
  "Payment terms not acceptable",
  "Other",
];

export default function ContractDetailsDrawer({
  open,
  mode,
  contract,
  onClose,
  onAccept,
  onReject,
}: Props) {
  const [ackChecked, setAckChecked] = useState(false);
  const [rejectReason, setRejectReason] = useState(REJECT_REASONS[0]);
  const [rejectNote, setRejectNote] = useState("");

  const isTripBased = contract?.contractType === "TRIP_BASED";

  const canAccept = useMemo(() => {
    if (mode !== "pending") return false;
    return !!ackChecked;
  }, [mode, ackChecked]);

  if (!open || !contract) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => {
          onClose();
          setAckChecked(false);
          setRejectNote("");
        }}
      />

      {/* drawer */}
      <div className="ml-auto h-full w-full max-w-[520px] bg-white shadow-xl relative flex flex-col">
        <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-slate-500">Contract</div>
            <div className="text-lg font-semibold text-slate-800">{contract.contractId}</div>

            <div className="mt-2 flex items-center gap-2">
              <Badge kind={isTripBased ? "trip" : "nonTrip"}>
                {isTripBased ? "Trip-based" : "Non-trip"}
              </Badge>
              <Badge
                kind={
                  contract.status === "PENDING"
                    ? "statusPending"
                    : contract.status === "ACTIVE"
                    ? "statusActive"
                    : "statusInactive"
                }
              >
                {contract.status}
              </Badge>
            </div>
          </div>

          <button
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => {
              onClose();
              setAckChecked(false);
              setRejectNote("");
            }}
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Basic Info */}
          <div className="rounded-lg border border-slate-200 p-4">
            <SectionTitle>Basic Info</SectionTitle>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Info label="Contract ID" value={contract.contractId} />
              <Info label="Vehicle Type" value={contract.vehicleType} />
              <Info label="Start Date" value={contract.startDate} />
              <Info label="End Date" value={contract.endDate} />
            </div>
          </div>

          {/* Billing Details (dynamic) */}
          <div className="rounded-lg border border-slate-200 p-4">
            <SectionTitle>Billing Details</SectionTitle>

            {isTripBased ? (
              <div className="mt-3 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <Info label="Billing Type" value={contract.billingType} />
                  <Info label="No. of Vehicles" value={String(contract.numberOfVehicles)} />
                </div>

                <div>
                  <div className="text-xs text-slate-500">Route</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {contract.route?.map((node: string, idx: number) => (
                      <span key={idx} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700">
                        {node}
                      </span>
                    ))}
                  </div>
                </div>

                <Info
                  label="Rate (per trip per vehicle)"
                  value={`₹${contract.ratePerTripPerVehicle}`}
                />
              </div>
            ) : (
              <div className="mt-3 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <Info label="State" value={contract.state} />
                  <Info label="Daily Duration" value={contract.dailyDuration} />
                </div>

                <div className="rounded-md border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    Rate slabs
                  </div>
                  <div className="px-3 py-2 text-sm text-slate-700 space-y-2">
                    {contract.rateSlabs?.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>{s.slab}</span>
                        <span className="font-medium">₹{s.rate}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span>Extra km rate</span>
                      <span className="font-medium">₹{contract.extraKmRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Extra hour rate</span>
                      <span className="font-medium">₹{contract.extraHourRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deviation Policy */}
          <div className="rounded-lg border border-slate-200 p-4">
            <SectionTitle>Deviation Policy</SectionTitle>
            <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">
              {contract.deviationPolicy}
            </div>
          </div>

          {/* Terms */}
          <div className="rounded-lg border border-slate-200 p-4">
            <SectionTitle>Terms & Conditions</SectionTitle>
            <div className="mt-2 max-h-44 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 whitespace-pre-wrap">
              {contract.termsAndConditions}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        {mode === "pending" ? (
          <div className="border-t border-slate-200 px-5 py-4 space-y-3">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={ackChecked}
                onChange={(e) => setAckChecked(e.target.checked)}
              />
              I have read and understood the deviation policy and T&amp;C
            </label>

            <div className="flex gap-2">
              <button
                className="flex-1 rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800 disabled:bg-slate-300"
                disabled={!canAccept}
                onClick={() => {
                  if (!onAccept) return;
                  onAccept(contract);
                  onClose();
                  setAckChecked(false);
                }}
              >
                Accept
              </button>

              <button
                className="flex-1 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 hover:bg-rose-100"
                onClick={() => {
                  // open reject inline section by focusing dropdown
                  const el = document.getElementById("reject_reason");
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                Reject
              </button>
            </div>

            {/* Reject panel */}
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="text-sm font-medium text-slate-800">Rejection reason</div>

              <div className="mt-2">
                <select
                  id="reject_reason"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                >
                  {REJECT_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <textarea
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                  rows={3}
                  placeholder="Optional note to Valmo team…"
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                />
              </div>

              <button
                className="mt-3 w-full rounded-md bg-rose-600 px-3 py-2 text-sm text-white hover:bg-rose-700"
                onClick={() => {
                  if (!onReject) return;
                  onReject(contract, { reason: rejectReason, note: rejectNote.trim() || undefined });
                  onClose();
                  setAckChecked(false);
                  setRejectNote("");
                }}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
            Read-only view
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm text-slate-800">{value}</div>
    </div>
  );
}
