"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import ContractCard from "@/components/contracts/ContractCard";
import ContractTable from "@/components/contracts/ContractTable";
import ContractDetailsDrawer from "@/components/contracts/ContractDetailsDrawer";
import TerminateContractModal from "@/components/contracts/TerminateContractModal";

type ContractType = "TRIP_BASED" | "SLAB_BASED";
type Status = "PENDING" | "ACTIVE" | "INACTIVE";

type TripBased = {
  billingType: "REGULAR" | "ADHOC";
  route: string[];
  numberOfVehicles: number;
  ratePerTripPerVehicle: number;
};

type SlabBased = {
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
  numberOfVehicles: number;
  billingType: "REGULAR" | "ADHOC";

  deviationPolicy: string;
  termsAndConditions: string;

  // Trip-based
  route?: string[];
  ratePerTripPerVehicle?: number;

  // Slab-based
  rateSlabs?: SlabBased["rateSlabs"];
  extraKmRate?: SlabBased["extraKmRate"];
  extraHourRate?: SlabBased["extraHourRate"];

  terminationReason?: string;
};

type TabKey = "PENDING" | "ACTIVE" | "INACTIVE";

import * as XLSX from "xlsx";

function isActiveFilter(v: string) {
  return v && v !== "ALL";
}

function downloadContractsXlsx(rows: any[], fileName: string) {
  // Flatten a clean export shape
  const exportRows = rows.map((c) => ({
    Contract_ID: c.contractId,
    Status: c.status,
    Contract_Type: c.contractType === "TRIP_BASED" ? "Trip based" : "Slab based",
    Billing_Type: c.billingType === "REGULAR" ? "Regular" : "Adhoc",
    Vehicle_Size: c.vehicleType,
    No_of_Vehicles: c.numberOfVehicles,
    Start_Date: c.startDate,
    End_Date: c.endDate,
    Pricing:
      c.contractType === "TRIP_BASED"
        ? `₹${new Intl.NumberFormat("en-IN").format(c.ratePerTripPerVehicle)} per trip`
        : "Slab based (see details)",
    Termination_Reason: c.terminationReason || "",
  }));

  const ws = XLSX.utils.json_to_sheet(exportRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Contracts");
  XLSX.writeFile(wb, fileName);
}


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
        "1. Payment cycle is weekly.\n2. GPS must remain ON during trip execution.\n3. Any billing dispute must be raised within 7 days.\n4. Valmo reserves right to audit trip proofs.\n5. Contract is non-transferable."
    },
    {
      contractId: "CT-SLAB-88210",
      contractType: "SLAB_BASED",
      status: "PENDING",
      startDate: "2026-01-25",
      endDate: "2026-02-25",
      vehicleType: "22ft",
      numberOfVehicles: 1,
      billingType: "REGULAR",
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
        "1. Monthly invoicing.\n2. Fuel escalation not applicable.\n3. Vehicle must be available as per daily duration.\n4. Non-compliance may lead to suspension."
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
        "1. Weekly payment.\n2. Driver OTP handshake mandatory.\n3. Disputes within 7 days."
    },
    {
      contractId: "CT-SLAB-22222",
      contractType: "SLAB_BASED",
      status: "PENDING",
      startDate: "2026-01-25",
      endDate: "2026-02-25",
      vehicleType: "22ft",
      numberOfVehicles: 1,
      billingType: "REGULAR",
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
        "1. Monthly invoicing.\n2. Fuel escalation not applicable.\n3. Vehicle must be available as per daily duration.\n4. Non-compliance may lead to suspension."
    },
  ]);

  const [tab, setTab] = useState<TabKey>("PENDING");
  const [vehicleFilter, setVehicleFilter] = useState<string>("ALL");
  const [billingFilter, setBillingFilter] = useState<"ALL" | "REGULAR" | "ADHOC">("ALL");
  const [contractTypeFilter, setContractTypeFilter] = useState<"ALL" | "TRIP_BASED" | "SLAB_BASED">("ALL");
  const [sortBy, setSortBy] = useState<"DURATION_DESC" | "START_DATE_ASC">("START_DATE_ASC");
  
  function parseDate(d: string) {
    return new Date(d + "T00:00:00");
  }
  function durationDays(c: Contract) {
    const ms = parseDate(c.endDate).getTime() - parseDate(c.startDate).getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  }
  
  const vehicleOptions = useMemo(() => {
    const set = new Set(contracts.map((c) => c.vehicleType));
    return ["ALL", ...Array.from(set)];
  }, [contracts]);
  
  function applyFilters(list: Contract[]) {
    let out = [...list];
  
    if (vehicleFilter !== "ALL") out = out.filter((c) => c.vehicleType === vehicleFilter);
    if (billingFilter !== "ALL") out = out.filter((c) => c.billingType === billingFilter);
    if (contractTypeFilter !== "ALL") out = out.filter((c) => c.contractType === contractTypeFilter);
  
    if (sortBy === "DURATION_DESC") {
      out.sort((a, b) => durationDays(b) - durationDays(a));
    } else {
      out.sort((a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime());
    }
  
    return out;
  }
  

  // Drawer / modal state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"pending" | "readonly">("readonly");
  const [selected, setSelected] = useState<Contract | null>(null);

  const [terminateOpen, setTerminateOpen] = useState(false);
  const [terminateContract, setTerminateContract] = useState<Contract | null>(null);

  const pending = useMemo(() => applyFilters(contracts.filter((c) => c.status === "PENDING")), [contracts, vehicleFilter, billingFilter, contractTypeFilter, sortBy]);
  const active = useMemo(() => applyFilters(contracts.filter((c) => c.status === "ACTIVE")), [contracts, vehicleFilter, billingFilter, contractTypeFilter, sortBy]);
  const inactive = useMemo(() => applyFilters(contracts.filter((c) => c.status === "INACTIVE")), [contracts, vehicleFilter, billingFilter, contractTypeFilter, sortBy]);
  
  const currentRows = tab === "PENDING" ? pending : tab === "ACTIVE" ? active : inactive;
  const currentCount = currentRows.length;
  
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
        {/* Filters + Sort (after tabs) */}
        <div className="rounded-lg border border-slate-200 bg-white">
          {/* Row 1: dropdowns + download */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3">
            <div className="text-sm text-slate-600">Filter by :</div>

            <select
              className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
            >
              {vehicleOptions.map((v) => (
                <option key={v} value={v}>
                  {v === "ALL" ? "Vehicle Size" : v}
                </option>
              ))}
            </select>

            <select
              className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
              value={billingFilter}
              onChange={(e) => setBillingFilter(e.target.value as any)}
            >
              <option value="ALL">Billing Type</option>
              <option value="REGULAR">Regular</option>
              <option value="ADHOC">Adhoc</option>
            </select>

            <select
              className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
              value={contractTypeFilter}
              onChange={(e) => setContractTypeFilter(e.target.value as any)}
            >
              <option value="ALL">Contract Type</option>
              <option value="TRIP_BASED">Trip based</option>
              <option value="SLAB_BASED">Slab based</option>
            </select>

            <div className="ml-auto flex items-center gap-3">
              <div className="text-sm text-slate-600">Sort by :</div>
              <select
                className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="START_DATE_ASC">Start date (priority)</option>
                <option value="DURATION_DESC">Duration (longest first)</option>
              </select>

              <button
                className="h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  const file = `Contracts_${tab}_${new Date().toISOString().slice(0, 10)}.xlsx`;
                  downloadContractsXlsx(currentRows, file);
                }}
              >
                Download ⬇
              </button>
            </div>
          </div>

          {/* Row 2: result count + chips + clear all */}
          <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
            <div className="text-sm text-slate-800 font-medium">
              {currentCount} results found
            </div>

            <div className="flex flex-wrap items-center gap-2 ml-2">
              {isActiveFilter(vehicleFilter) && (
                <Chip
                  label={vehicleFilter}
                  onRemove={() => setVehicleFilter("ALL")}
                />
              )}
              {isActiveFilter(billingFilter) && (
                <Chip
                  label={billingFilter === "REGULAR" ? "Regular" : "Adhoc"}
                  onRemove={() => setBillingFilter("ALL")}
                />
              )}
              {isActiveFilter(contractTypeFilter) && (
                <Chip
                  label={contractTypeFilter === "TRIP_BASED" ? "Trip based" : "Slab based"}
                  onRemove={() => setContractTypeFilter("ALL")}
                />
              )}
            </div>

            {(isActiveFilter(vehicleFilter) ||
              isActiveFilter(billingFilter) ||
              isActiveFilter(contractTypeFilter)) && (
              <button
                className="ml-3 text-sm font-medium text-slate-800 hover:underline"
                onClick={() => {
                  setVehicleFilter("ALL");
                  setBillingFilter("ALL");
                  setContractTypeFilter("ALL");
                }}
              >
                Clear All
              </button>
            )}
          </div>
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
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
      {label}
      <button
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  );
}

