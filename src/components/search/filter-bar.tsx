"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, ChevronDown, Map, List, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  propertyTypes, priceBuckets, sizeBuckets, saleSortOptions,
} from "@/lib/data";

function FilterSelect({
  value, onChange, children, className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-line bg-white pl-3.5 pr-9 text-sm font-medium text-ink transition-colors hover:border-navy/40 focus:border-navy focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

export function FilterBar({ view = "list" }: { view?: "list" | "map" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const deal = params.get("deal") ?? "sale";

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value === null || value === "" || value === "all" || value === "No min") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const goView = (v: "list" | "map") => {
    const qs = params.toString();
    router.push(`${v === "map" ? "/search/map" : "/search"}${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="space-y-3">
      {/* Search input row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            defaultValue={params.get("q") ?? ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") setParam("q", (e.target as HTMLInputElement).value);
            }}
            placeholder="City, address, ZIP, or market…"
            className="h-11 w-full rounded-lg border border-line bg-white pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:border-navy focus:outline-none"
          />
        </div>

        {/* Deal toggle */}
        <div className="flex h-11 shrink-0 overflow-hidden rounded-lg border border-line">
          {(["sale", "lease"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setParam("deal", d)}
              className={cn(
                "px-5 text-sm font-semibold capitalize transition-colors",
                deal === d ? "bg-navy text-white" : "bg-white text-muted hover:bg-navy/5",
              )}
            >
              {d === "sale" ? "Buy" : "Lease"}
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <FilterSelect
          value={params.get("type") ?? "all"}
          onChange={(v) => setParam("type", v)}
          className="w-[150px]"
        >
          <option value="all">All Types</option>
          {propertyTypes.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={params.get("minPrice") ?? "No min"}
          onChange={(v) => setParam("minPrice", v)}
          className="w-[120px]"
        >
          {priceBuckets.map((p) => (
            <option key={p} value={p}>{p === "No min" ? "Any Price" : `${p}+`}</option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={params.get("minSize") ?? "No min"}
          onChange={(v) => setParam("minSize", v)}
          className="w-[130px]"
        >
          {sizeBuckets.map((s) => (
            <option key={s} value={s}>{s === "No min" ? "Any Size" : `${s}+`}</option>
          ))}
        </FilterSelect>

        <button
          onClick={() => setParam("exchange1031", params.get("exchange1031") === "1" ? null : "1")}
          className={cn(
            "h-10 rounded-lg border px-3.5 text-sm font-medium transition-colors",
            params.get("exchange1031") === "1"
              ? "border-gold bg-gold/10 text-gold-dark"
              : "border-line bg-white text-ink hover:border-navy/40",
          )}
        >
          1031 Eligible
        </button>

        <button className="hidden h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-ink transition-colors hover:border-navy/40 sm:inline-flex">
          <SlidersHorizontal className="h-4 w-4" /> More Filters
        </button>

        {/* Right side: sort + view toggle */}
        <div className="ml-auto flex items-center gap-2.5">
          <FilterSelect
            value={params.get("sort") ?? "Recommended"}
            onChange={(v) => setParam("sort", v === "Recommended" ? null : v)}
            className="w-[185px]"
          >
            {saleSortOptions.map((s) => (
              <option key={s} value={s}>Sort: {s}</option>
            ))}
          </FilterSelect>

          <div className="flex h-10 overflow-hidden rounded-lg border border-line">
            <button
              onClick={() => goView("list")}
              className={cn("grid w-10 place-items-center", view === "list" ? "bg-navy text-white" : "bg-white text-muted hover:bg-navy/5")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => goView("map")}
              className={cn("grid w-10 place-items-center border-l border-line", view === "map" ? "bg-navy text-white" : "bg-white text-muted hover:bg-navy/5")}
              aria-label="Map view"
            >
              <Map className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
