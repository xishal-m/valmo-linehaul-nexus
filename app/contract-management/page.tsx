"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import ContractCard from "@/components/contracts/ContractCard";
import ContractTable from "@/components/contracts/ContractTable";
import ContractDetailsDrawer from "@/components/contracts/ContractDetailsDrawer";
import TerminateContractModal from "@/components/contracts/TerminateContractModal";

type ContractType = "TRIP_BASED" | "NON_TRIP_BASED";
type Status = "PENDING" | "ACTIVE" | "INACTIVE";

type TripBased = {
  billingType: "REGULAR" | "ADHOC";
  route: string[];
  numberOfVehicles: number;
  ratePerTripPerVehicle: number;
};

type NonTripBased = {
  state: string;
  dailyDuration: "12_HOURS" | "24_HOURS";
  rateSlabs: { slab: string; rate: number }[];
  extraKmRate: number;
  extraHourRate: number;
};

type Contract = {
  contractId: string;
  contractType: ContractType;
  status: Status;
  startDate: string;
  endDate: string;
  vehicleType: string;
  deviationPolicy: string;
  termsAndConditions: string;

  // for inactive list
  terminationReason?: string;

  // dynamic fields
  billingType?: TripBased["billingType"];
  route?: TripBased["route"];
  numberOfVehicles?: TripBased["numberOfVehicles"];
  ratePerTripPerVehicle?: TripBased["ratePerTripPerVehicle"];

  state?: NonTripBased["state"];
  dailyDuration?: NonTripBased["dailyDuration"];
  rateSlabs?: NonTripBased["rateSlabs"];
  extraKmRate?: NonTripBased["extraKmRate"];
  extraHourRate?: NonTripBased["extraHourRate"];

  // UI helper
  __pricingSummary?: string;
};

type TabKey = "PENDING" | "ACTIVE" | "INACTIVE";

export default function ContractManagementPage() {
  // ✅ Mock data inline
  const [contracts, setContracts] = useState<Contract[]>([
    {
      contractId: "CT-TRIP-10421",
      contractType: "TRIP_BASED",
      status: "PENDING",
      startDate: "2026-01-20",
      endDate: "2026-03-31",
      vehicleType: "32ft",
      billingType: "REGULAR",
      route: ["BLR", "HYD", "VJA"],
      numberOfVehicles: 2,
      ratePerTripPerVehicle: 42000,
      deviationPolicy:
        "• Route deviation beyond 10% of planned distance will be treated as exception.\n• Extra detention beyond 2 hours requires hub manager approval.\n• Proof of delay must be captured in app within 30 mins.",
      termsAndConditions:
        "1. Payment cycle is weekly.\n2. GPS must remain ON during trip execution.\n3. Any billing dispute must be raised within 7 days.\n4. Valmo reserves right to audit trip proofs.\n5. Contract is non-transferable.",
      __pricingSummary: "REGULAR • 2 vehicles • ₹42,000 / trip / vehicle",
    },
    {
      contractId: "CT-NONTRIP-88210",
      contractType: "NON_TRIP_BASED",
      status: "PENDING",
      startDate: "2026-01-25",
      endDate: "2026-02-25",
      vehicleType: "22ft",
      state: "Karnataka",
      dailyDuration: "12_HOURS",
      rateSlabs: [
        { slab: "0–3000 km", rate: 95000 },
        { slab: "3000–4500 km", rate: 125000 },
        { slab: "4500–6000 km", rate: 160000 },
      ],
      extraKmRate: 34,
      extraHourRate: 250,
      deviationPolicy:
        "• Monthly km computed from GPS-verified distance.\n• Any missed day reduces payable proportionally.\n• Extra hour rate applies only if shift exceeds contracted duration.",
      termsAndConditions:
        "1. Monthly invoicing.\n2. Fuel escalation not applicable.\n3. Vehicle must be available as per daily duration.\n4. Non-compliance may lead to suspension.",
      __pricingSummary: "12_HOURS • Slabs up to 6000 km • Extra ₹34/km, ₹250/hr",
    },
    {
      contractId: "CT-TRIP-99300",
      contractType: "TRIP_BASED",
      status: "ACTIVE",
      startDate: "2026-01-01",
      endDate: "2026-03-31",
      vehicleType: "22ft",
      billingType: "ADHOC",
      route: ["DEL", "LKO"],
      numberOfVehicles: 1,
      ratePerTripPerVehicle: 36000,
      deviationPolicy:
        "• Adhoc trips billed at agreed per-trip rate.\n• Any change in route requires central approval.\n• Extra wait beyond 1 hour billed only with proof.",
      termsAndConditions:
        "1. Weekly payment.\n2. Driver OTP handshake mandatory.\n3. Disputes within 7 days.",
      __pricingSummary: "ADHOC • 1 vehicle • ₹36,000 / trip / vehicle",
    },
    {
      contractId: "CT-NONTRIP-77001",
      contractType: "NON_TRIP_BASED",
      status: "INACTIVE",
      startDate: "2025-11-01",
      endDate: "2025-12-31",
      vehicleType: "32ft",
      state: "Maharashtra",
      dailyDuration: "24_HOURS",
      rateSlabs: [
        { slab: "0–3000 km", rate: 110000 },
        { slab: "3000–4500 km", rate: 145000 },
        { slab: "4500–6000 km", rate: 185000 },
      ],
      extraKmRate: 38,
      extraHourRate: 300,
      deviationPolicy:
        "• 24-hour availability required.\n• Penalties apply for non-availability.\n• Distance computed from GPS.",
      termsAndConditions:
        "1. Monthly payment.\n2. SLA breaches will be penalized.\n3. Termination requires 7-day notice.",
      terminationReason: "Completed contract term (expired)",
      __pricingSummary: "24_HOURS • Slabs up to 6000 km • Extra ₹38/km, ₹300/hr",
    },
  ]);

  const [tab, setTab] = useState<TabKey>("PENDING");

  // Drawer / modal state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"pending" | "readonly">("readonly");
  const [selected, setSelected] = useState<Contract | null>(null);

  const [terminateOpen, setTerminateOpen] = useState(false);
  const [terminateContract, setTerminateContract] = useState<Contract | null>(null);

  const pending = useMemo(() => contracts.filter((c) => c.status === "PENDING"), [contracts]);
  const active = useMemo(() => contracts.filter((c) => c.status === "ACTIVE"), [contracts]);
  const inactive = useMemo(() => contracts.filter((c) => c.status === "INACTIVE"), [contracts]);

  function openDetails(c: Contract, mode: "pending" | "readonly") {
    setSelected(c);
    setDrawerMode(mode);
    setDrawerOpen(true);
  }

  // Actions
  function acceptContract(c: Contract) {
    setContracts((prev) =>
      prev.map((x) =>
        x.contractId === c.contractId ? { ...x, status: "ACTIVE" } : x
      )
    );
    // stay in same tab; behavior still realistic
  }

  function rejectContract(c: Contract, payload: { reason: string; note?: string }) {
    const reasonText = payload.note ? `${payload.reason} — ${payload.note}` : payload.reason;
    setContracts((prev) =>
      prev.map((x) =>
        x.contractId === c.contractId
          ? { ...x, status: "INACTIVE", terminationReason: `Rejected: ${reasonText}` }
          : x
      )
    );
  }

  function requestTerminate(c: Contract) {
    setTerminateContract(c);
    setTerminateOpen(true);
  }

  function confirmTerminate(payload: { reason: string; note?: string }) {
    if (!terminateContract) return;
    const reasonText = payload.note ? `${payload.reason} — ${payload.note}` : payload.reason;

    setContracts((prev) =>
      prev.map((x) =>
        x.contractId === terminateContract.contractId
          ? { ...x, status: "INACTIVE", terminationReason: `Terminated: ${reasonText}` }
          : x
      )
    );

    setTerminateContract(null);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--canvas)" }}>
      <Topbar title="Contract Management" />

      <div className="p-6 space-y-4">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          <TabButton
            active={tab === "PENDING"}
            onClick={() => setTab("PENDING")}
            label={`Pending Acknowledgement (${pending.length})`}
          />
          <TabButton
            active={tab === "ACTIVE"}
            onClick={() => setTab("ACTIVE")}
            label={`Active Contracts (${active.length})`}
          />
          <TabButton
            active={tab === "INACTIVE"}
            onClick={() => setTab("INACTIVE")}
            label={`Inactive Contracts (${inactive.length})`}
          />
        </div>

        {/* Content */}
        {tab === "PENDING" && (
          <div className="grid grid-cols-1 gap-3">
            {pending.map((c) => (
              <ContractCard
                key={c.contractId}
                contract={c}
                onView={() => openDetails(c, "pending")}
                onAccept={() => openDetails(c, "pending")} // accept inside drawer is gated by checkbox
                onReject={() => openDetails(c, "pending")}
              />
            ))}
            {pending.length === 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
                No pending acknowledgements.
              </div>
            )}
          </div>
        )}

        {tab === "ACTIVE" && (
          <ContractTable
            mode="active"
            rows={active}
            onView={(c) => openDetails(c, "readonly")}
            onTerminate={(c) => requestTerminate(c)}
          />
        )}

        {tab === "INACTIVE" && (
          <ContractTable
            mode="inactive"
            rows={inactive}
            onView={(c) => openDetails(c, "readonly")}
          />
        )}
      </div>

      {/* Drawer */}
      <ContractDetailsDrawer
        open={drawerOpen}
        mode={drawerMode}
        contract={selected}
        onClose={() => setDrawerOpen(false)}
        onAccept={(c) => acceptContract(c)}
        onReject={(c, payload) => rejectContract(c, payload)}
      />

      {/* Termination Modal */}
      <TerminateContractModal
        open={terminateOpen}
        contract={terminateContract}
        onClose={() => {
          setTerminateOpen(false);
          setTerminateContract(null);
        }}
        onConfirm={(payload) => confirmTerminate(payload)}
      />
    </div>
  );
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={[
        "rounded-md px-3 py-2 text-sm border",
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
