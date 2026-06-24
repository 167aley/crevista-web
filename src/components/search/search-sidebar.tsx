"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalesFiltersModal } from "./sales-filters-modal";
import { cn } from "@/lib/utils";

const inputCls =
  "h-11 w-full rounded-[6px] border border-[#c3c6d0] bg-[#f8f9fa] px-3 text-sm text-ink focus:border-navy focus:outline-none";
const fieldLabel = "mb-1.5 block text-sm font-semibold text-[#001836]";

function LabeledSelect({
  label, placeholder, value, options,
}: {
  label?: string; placeholder?: string; value?: string; options: string[];
}) {
  return (
    <div>
      {label && <span className={fieldLabel}>{label}</span>}
      <div className="relative">
        <select
          defaultValue={value ?? ""}
          className={cn(inputCls, "cursor-pointer appearance-none pr-9 text-[#43474f]")}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#43474f]" />
      </div>
    </div>
  );
}

const typeFilters: { label: string; id: string }[] = [
  { label: "Industrial", id: "industrial" },
  { label: "Office", id: "office" },
  { label: "Retail", id: "retail" },
  { label: "Multi-Family", id: "multifamily" },
];

export function SearchSidebar({ collapsible = false }: { collapsible?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [type, setType] = useState(params.get("type") ?? "");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") ?? "");
  const [open, setOpen] = useState(false); // mobile expand/collapse
  const deal = params.get("deal") ?? "sale";

  function apply() {
    const next = new URLSearchParams(params.toString());
    if (type) next.set("type", type); else next.delete("type");
    if (minPrice) next.set("minPrice", minPrice); else next.delete("minPrice");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between border-b border-line pb-3",
          collapsible ? "lg:pointer-events-none" : "pointer-events-none",
        )}
      >
        <span className="text-sm font-bold uppercase tracking-[0.1em] text-[#43474f]">Filters</span>
        {collapsible && (
          <ChevronDown className={cn("h-5 w-5 text-muted transition-transform lg:hidden", open && "rotate-180")} />
        )}
      </button>

      {/* Collapsible body — always open on desktop and when not collapsible */}
      <div className={cn(collapsible && !open ? "hidden lg:block" : "block")}>
        {/* Property Type */}
        <div className="py-4">
          <p className="mb-3 text-sm font-semibold text-[#001836]">Property Type</p>
          <div className="space-y-2.5">
            {typeFilters.map((t) => (
              <label key={t.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#43474f]">
                <input
                  type="checkbox"
                  checked={type === t.id}
                  onChange={() => setType(type === t.id ? "" : t.id)}
                  className="h-4 w-4 rounded-[3px] border-[#c3c6d0] accent-navy"
                />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-line py-4">
          <LabeledSelect label="For Sale" placeholder="For Sale" options={["For Sale", "For Lease", "Auction"]} />
          <LabeledSelect label="Retail" placeholder="Select type" options={["Retail", "Office", "Industrial", "Multi-Family", "Land"]} />
          <LabeledSelect value="Any price range" options={["Any price range", "$1M – $5M", "$5M – $25M", "$25M – $50M", "$50M+"]} />

          <div>
            <p className="mb-2 text-sm font-semibold text-[#001836]">Price</p>
            <div className="space-y-3">
              <div>
                <span className="mb-1 block text-xs font-medium text-[#43474f]">Min</span>
                <div className="flex items-center rounded-[6px] border border-[#c3c6d0] bg-[#f8f9fa] focus-within:border-navy">
                  <span className="pl-3 text-sm text-[#43474f]">$</span>
                  <input value={minPrice} onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ""))} className="h-11 w-full bg-transparent px-2 text-sm focus:outline-none" />
                </div>
              </div>
              <div>
                <span className="mb-1 block text-xs font-medium text-[#43474f]">Max</span>
                <div className="flex items-center rounded-[6px] border border-[#c3c6d0] bg-[#f8f9fa] focus-within:border-navy">
                  <span className="pl-3 text-sm text-[#43474f]">$</span>
                  <input className="h-11 w-full bg-transparent px-2 text-sm focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#43474f]">
            <input type="checkbox" className="h-4 w-4 rounded-[3px] border-[#c3c6d0] accent-navy" />
            Exclude Unpriced Listing
          </label>

          <Button variant="primary" size="md" className="w-full text-navy" onClick={apply}>Apply</Button>
        </div>

        <div className="space-y-4 border-t border-line py-4">
          <LabeledSelect label="Any CAP Rate" placeholder="Any CAP Rate" options={["Any CAP Rate", "4%+", "5%+", "6%+", "7%+"]} />
          <LabeledSelect label="Size" placeholder="Any size" options={["Any size", "5,000 SF+", "25,000 SF+", "100,000 SF+"]} />
        </div>

        <div className="space-y-2.5 border-t border-line pt-4">
          <SalesFiltersModal deal={deal} />
          <Button variant="outline" size="md" className="w-full gap-2">
            <ListFilter className="h-4 w-4" /> Apply 12 Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
