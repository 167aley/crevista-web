"use client";

import { useState, useEffect, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { MapPin, Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

const labelCls = "mb-1.5 block text-[13px] font-semibold text-navy";
const inputCls =
  "h-10 w-full rounded-md border border-[#c3c6d0] bg-white px-3 text-sm text-ink placeholder:text-muted focus:border-navy focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      {children}
    </div>
  );
}

function TextInput({
  placeholder, icon: Icon, defaultValue,
}: { placeholder?: string; icon?: ComponentType<{ className?: string }>; defaultValue?: string }) {
  return (
    <div className="relative">
      {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />}
      <input defaultValue={defaultValue} placeholder={placeholder} className={cn(inputCls, Icon && "pl-9")} />
    </div>
  );
}

function SelectInput({ defaultValue, options }: { defaultValue?: string; options: string[] }) {
  return (
    <div className="relative">
      <select defaultValue={defaultValue} className={cn(inputCls, "cursor-pointer appearance-none pr-9")}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

function MinMax({ min = "Min", max = "Max" }: { min?: string; max?: string }) {
  return (
    <div className="flex items-center gap-2">
      <input placeholder={min} className={inputCls} />
      <span className="text-muted">—</span>
      <input placeholder={max} className={inputCls} />
    </div>
  );
}

function Slider({ defaultValue = 50 }: { defaultValue?: number }) {
  return (
    <input type="range" min={0} max={100} defaultValue={defaultValue} className="mt-3 h-1.5 w-full cursor-pointer accent-navy" />
  );
}

function ToggleGroup({ options, defaultIdx = -1 }: { options: string[]; defaultIdx?: number }) {
  const [active, setActive] = useState(defaultIdx);
  return (
    <div className="flex gap-2">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => setActive(active === i ? -1 : i)}
          className={cn(
            "h-10 flex-1 rounded-md border text-sm font-medium transition-colors",
            active === i ? "border-gold bg-gold text-white" : "border-[#c3c6d0] bg-white text-ink hover:border-navy/40",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CheckRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-[5px] text-sm text-ink">
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded-[3px] border-[#c3c6d0] accent-navy" />
      {label}
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 text-sm font-semibold text-navy">{children}</h3>;
}

export function SalesFiltersModal({ deal = "sale" }: { deal?: string }) {
  const [open, setOpen] = useState(false);
  const title = deal === "lease" ? "Lease Filters" : "Sale Filters";

  // Lock page scroll while the modal is open (removes the page scrollbar behind it)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-11 w-full rounded-lg bg-navy text-sm font-semibold text-white transition-colors hover:bg-navy-700"
      >
        Sales Filters
      </button>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-navy/40 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="scroll-thin relative max-h-[94vh] w-full max-w-[1280px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">{title}</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg text-navy hover:bg-navy/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="my-5 border-t border-line" />

            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-4">
              {/* Column 1 */}
              <div className="space-y-5">
                <Field label="Location(s)"><TextInput icon={MapPin} placeholder="City, State, or Zip" /></Field>
                <Field label="Keywords"><TextInput placeholder="e.g. Dark store, anchor" /></Field>
                <Field label="Property Type(s)">
                  <div className="space-y-2">
                    <SelectInput defaultValue="Retail" options={["Retail", "Industrial", "Office", "Multifamily", "Land"]} />
                    <SelectInput defaultValue="Industrial" options={["Industrial", "Retail", "Office", "Multifamily", "Land"]} />
                    <SelectInput defaultValue="Office" options={["Office", "Retail", "Industrial", "Multifamily", "Land"]} />
                  </div>
                </Field>
                <Field label="Price Range">
                  <MinMax />
                  <Slider defaultValue={45} />
                </Field>
                <Field label="Cap Rate Range (%)">
                  <div className="flex items-center gap-2">
                    <input defaultValue="0.00" className={inputCls} />
                    <span className="text-muted">—</span>
                    <input defaultValue="10.0+" className={inputCls} />
                  </div>
                  <Slider defaultValue={25} />
                </Field>
              </div>

              {/* Column 2 */}
              <div className="space-y-5">
                <Field label="Tenant/Brand"><TextInput icon={Search} placeholder="Search brands..." /></Field>
                <Field label="Remaining Term (Years)">
                  <Slider defaultValue={50} />
                  <div className="mt-1 flex justify-between text-xs text-muted"><span>0 Yrs</span><span>20+ Yrs</span></div>
                </Field>
                <Field label="Broker / Agent"><TextInput placeholder="Search agent name" /></Field>
                <Field label="Brokerage Shop"><TextInput placeholder="Search shop" /></Field>
                <Field label="Tenancy"><ToggleGroup options={["Vacant", "Single", "Multi"]} defaultIdx={0} /></Field>
                <Field label="Lease Type"><ToggleGroup options={["NNN", "Net", "NN", "Gross"]} defaultIdx={1} /></Field>
              </div>

              {/* Column 3 */}
              <div className="space-y-5">
                <div className="rounded-lg border border-line p-4">
                  <SectionTitle>Additional Dimensions</SectionTitle>
                  <div className="space-y-3">
                    <Field label="Square Footage (GLA)"><MinMax /></Field>
                    <Field label="Price per SF ($/SF)"><MinMax /></Field>
                    <Field label="Acreage"><MinMax /></Field>
                  </div>
                </div>
                <Field label="Tenant Credit"><ToggleGroup options={["Inv. Grade", "Non-IG"]} /></Field>
                <Field label="Occupancy %">
                  <div className="flex items-center gap-3">
                    <input defaultValue="100" className={cn(inputCls, "w-24")} />
                    <span className="text-sm text-muted">% Occupied</span>
                  </div>
                  <Slider defaultValue={100} />
                </Field>
                <Field label="Listing Timeline">
                  <SelectInput defaultValue="Last 30 Days" options={["Last 30 Days", "Last 7 Days", "Last 90 Days", "Anytime"]} />
                </Field>
              </div>

              {/* Column 4 */}
              <div className="flex flex-col">
                <div className="space-y-5">
                  <div>
                    <SectionTitle>Listing Status</SectionTitle>
                    <CheckRow label="Active" defaultChecked />
                    <CheckRow label="On-Market" defaultChecked />
                    <CheckRow label="Auction" />
                    <CheckRow label="Coming Soon" />
                    <CheckRow label="Sold / Closed" />
                  </div>
                  <div className="flex items-center justify-between">
                    <SectionTitle>Opportunity Zone</SectionTitle>
                    <ZoneToggle />
                  </div>
                  <Field label="Property Class"><ToggleGroup options={["A", "B", "C", "D"]} defaultIdx={0} /></Field>
                  <div>
                    <SectionTitle>Other Options</SectionTitle>
                    <CheckRow label="Broker/Agent Co-Op" />
                    <CheckRow label="Owner/User Opportunity" />
                    <CheckRow label="Shadow Anchored" />
                  </div>
                </div>
                <div className="mt-6 space-y-2 xl:mt-auto xl:pt-6">
                  <button onClick={() => setOpen(false)} className="h-12 w-full rounded-lg bg-navy text-sm font-semibold text-white transition-colors hover:bg-navy-700">
                    Apply 12 Filters
                  </button>
                  <button onClick={() => setOpen(false)} className="w-full py-1 text-center text-sm font-medium text-muted transition-colors hover:text-navy">
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function ZoneToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={cn("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors", on ? "bg-gold" : "bg-navy/20")}
    >
      <span className={cn("absolute h-5 w-5 rounded-full bg-white shadow transition-all", on ? "left-[23px]" : "left-0.5")} />
    </button>
  );
}
