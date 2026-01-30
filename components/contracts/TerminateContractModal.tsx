"use client";

import { useMemo, useState } from "react";

type Props = {
  open: boolean;
  contract: any | null;
  onClose: () => void;
  onConfirm: (payload: { reason: string; note?: string }) => void;
};

const TERMINATION_REASONS = [
  "Operations discontinued on this lane",
  "Rate revision required",
  "Compliance / documentation issue",
  "Service quality concerns",
  "Other",
];

export default function TerminateContractModal({ open, contract, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState(TERMINATION_REASONS[0]);
  const [note, setNote] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);

  const penalty = useMemo(() => {
    // mocked penalty logic
    if (!contract) return 0;
    return contract.contractType === "TRIP_BASED" ? 25000 : 40000;
  }, [contract]);

  if (!open || !contract) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl">
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="text-sm font-semibold text-slate-800">Terminate Contract</div>
          <div className="mt-1 text-xs text-slate-500">
            {contract.contractId} • Possible penalty (mocked):{" "}
            <span className="font-medium text-slate-800">₹{penalty}</span>
          </div>
        </div>

        <div className="px-5 py-4 space-y-3">
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Warning: Termination may impact future allocations and may carry penalties.
          </div>

          <div>
            <div className="text-xs text-slate-500">Termination reason</div>
            <select
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {TERMINATION_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-xs text-slate-500">Additional note (optional)</div>
            <textarea
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any context for audit trail…"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={confirmChecked}
              onChange={(e) => setConfirmChecked(e.target.checked)}
            />
            I understand this will terminate the contract and may apply penalties.
          </label>
        </div>

        <div className="px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
          <button
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-amber-600 px-3 py-2 text-sm text-white hover:bg-amber-700 disabled:bg-slate-300"
            disabled={!confirmChecked}
            onClick={() => {
              onConfirm({ reason, note: note.trim() || undefined });
              setConfirmChecked(false);
              setNote("");
              onClose();
            }}
          >
            Confirm Termination
          </button>
        </div>
      </div>
    </div>
  );
}
