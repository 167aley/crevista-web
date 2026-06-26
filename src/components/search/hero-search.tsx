"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubCategory {
  label: string;
  count: number;
}

interface Category {
  label: string;
  count: number;
  typeId: string;
  sub: SubCategory[];
}

// Sub-counts are split so they add up to exactly the parent count.
const categories: Category[] = [
  { label: "All", count: 1000, typeId: "all", sub: [] },
  { label: "Retail", count: 500, typeId: "retail", sub: [
    { label: "Strip Center", count: 160 },
    { label: "Single-Tenant", count: 130 },
    { label: "Anchored Center", count: 120 },
    { label: "Outlet", count: 90 },
  ] }, // = 500
  { label: "Office", count: 100, typeId: "office", sub: [
    { label: "Traditional Office", count: 30 },
    { label: "Executive Office", count: 20 },
    { label: "Coworking", count: 18 },
    { label: "Medical Office", count: 17 },
    { label: "Creative Office", count: 15 },
  ] }, // = 100
  { label: "Industrial", count: 300, typeId: "industrial", sub: [
    { label: "Warehouse", count: 110 },
    { label: "Manufacturing", count: 80 },
    { label: "Flex", count: 65 },
    { label: "Cold Storage", count: 45 },
  ] }, // = 300
  { label: "short Term", count: 115, typeId: "hospitality", sub: [
    { label: "Hospitality", count: 50 },
    { label: "Serviced Office", count: 40 },
    { label: "Pop-up Retail", count: 25 },
  ] }, // = 115
  { label: "Land", count: 120, typeId: "land", sub: [
    { label: "Commercial Land", count: 50 },
    { label: "Industrial Land", count: 40 },
    { label: "Residential Land", count: 30 },
  ] }, // = 120
  { label: "Restaurant", count: 200, typeId: "retail", sub: [
    { label: "Quick Service", count: 90 },
    { label: "Full Service", count: 70 },
    { label: "Cafe / Bakery", count: 40 },
  ] }, // = 200
  { label: "Special Purpose", count: 80, typeId: "special-purpose", sub: [
    { label: "Self-Storage", count: 28 },
    { label: "Data Center", count: 22 },
    { label: "Medical", count: 18 },
    { label: "Automotive", count: 12 },
  ] }, // = 80
];

/** small checkbox indicator */
function CheckBox({ on }: { on: boolean }) {
  return (
    <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border transition-colors", on ? "border-gold bg-gold text-white" : "border-[#c3c6d0]")}>
      {on && <Check className="h-3 w-3" strokeWidth={3} />}
    </span>
  );
}

export function HeroSearch() {
  const router = useRouter();
  const [deal, setDeal] = useState<"lease" | "sale">("lease");
  const [q, setQ] = useState("");

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ label: string; typeId: string }[]>([]);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isSelected = (label: string) => selected.some((s) => s.label === label);
  function toggle(label: string, typeId: string) {
    setSelected((prev) =>
      prev.some((s) => s.label === label)
        ? prev.filter((s) => s.label !== label)
        : [...prev, { label, typeId }],
    );
  }
  const remove = (label: string) => setSelected((prev) => prev.filter((s) => s.label !== label));
  const clearAll = () => setSelected([]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ deal });
    if (q) params.set("q", q);
    const types = [...new Set(selected.map((s) => s.typeId))].filter((t) => t !== "all");
    if (types.length) params.set("type", types.join(","));
    router.push(`/search?${params.toString()}`);
  }

  const triggerLabel = selected.length === 0 ? "All Properties" : `${selected.length} selected`;

  return (
    <div className="mx-auto w-full max-w-[920px]">
      {/* Lease / Sale toggle */}
      <div className="mb-5 flex items-center justify-center gap-5">
        <button
          onClick={() => setDeal("lease")}
          className={cn("text-xl font-bold uppercase tracking-wide transition-colors sm:text-[25px]", deal === "lease" ? "text-gold underline underline-offset-8" : "text-white/70 hover:text-white")}
        >
          Lease
        </button>
        <span className="h-7 w-px bg-white/40" />
        <button
          onClick={() => setDeal("sale")}
          className={cn("text-xl font-bold uppercase tracking-wide transition-colors sm:text-[25px]", deal === "sale" ? "text-gold underline underline-offset-8" : "text-white/70 hover:text-white")}
        >
          Sale
        </button>
      </div>

      {/* Search field */}
      <form onSubmit={submit} className="flex flex-col gap-2 rounded-lg bg-surface p-2 shadow-pop sm:h-[72px] sm:flex-row sm:items-center sm:gap-0 sm:p-1.5">
        {/* Custom multi-select categorized dropdown */}
        <div ref={ddRef} className="relative sm:w-[210px] sm:shrink-0 sm:border-r sm:border-line">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 w-full items-center justify-between rounded-md bg-transparent pl-4 pr-3 text-[15px] hover:text-navy sm:h-full"
          >
            <span className={cn("truncate", selected.length > 0 ? "font-semibold text-navy" : "text-muted")}>{triggerLabel}</span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform", open && "rotate-180")} />
          </button>

          {open && (
            <div className="scroll-thin absolute left-0 top-full z-50 mt-2 max-h-[360px] w-full min-w-[260px] overflow-y-auto rounded-lg border border-line bg-white py-1 shadow-pop">
              {/* selected chips box */}
              {selected.length > 0 && (
                <div className="border-b border-line px-3 pb-2.5 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {selected.map((s) => (
                      <span key={s.label} className="flex items-center gap-1 rounded-md bg-navy/[0.06] py-1 pl-2 pr-1 text-xs font-medium text-navy">
                        {s.label}
                        <button type="button" onClick={() => remove(s.label)} className="grid h-4 w-4 place-items-center rounded hover:bg-navy/10" aria-label={`Remove ${s.label}`}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <button type="button" onClick={clearAll} className="mt-2 text-xs font-semibold text-gold hover:underline">Clear all</button>
                </div>
              )}

              {/* All — clears selection (no filter) */}
              <button
                type="button"
                onClick={clearAll}
                className={cn("flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface hover:text-gold", selected.length === 0 ? "font-semibold text-gold" : "text-ink")}
              >
                <span>All</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted">(1000)</span>
                  <span className="h-5 w-5" aria-hidden />
                </span>
              </button>

              {categories.slice(1).map((cat) => {
                const isOpen = expanded === cat.label;
                const catSel = isSelected(cat.label);
                return (
                  <div key={cat.label} className="border-t border-line/60">
                    <div className={cn("flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors", isOpen || catSel ? "text-gold" : "text-ink hover:bg-surface hover:text-gold")}>
                      <button type="button" onClick={() => toggle(cat.label, cat.typeId)} className={cn("flex flex-1 items-center gap-2.5 text-left", catSel && "font-semibold")}>
                        <CheckBox on={catSel} />
                        {cat.label}
                      </button>
                      <span className="flex items-center gap-2">
                        <span className={cn("text-xs", isOpen || catSel ? "text-gold" : "text-muted")}>({cat.count})</span>
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : cat.label)}
                          className="grid h-5 w-5 place-items-center rounded hover:bg-surface"
                          aria-label="Toggle subtypes"
                        >
                          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                        </button>
                      </span>
                    </div>
                    {isOpen && (
                      <div className="pb-1">
                        {cat.sub.map((s) => {
                          const subSel = isSelected(s.label);
                          return (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => toggle(s.label, cat.typeId)}
                              className={cn("flex w-full items-center justify-between py-1.5 pl-6 pr-4 text-left text-[13px] transition-colors hover:bg-surface hover:text-gold", subSel ? "text-gold" : "text-muted")}
                            >
                              <span className="flex items-center gap-2.5">
                                <CheckBox on={subSel} />
                                {s.label}
                              </span>
                              <span className="flex items-center gap-2">
                                <span className="text-xs">({s.count})</span>
                                <span className="h-5 w-5" aria-hidden />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by property type, city, state, ZIP, keyword"
            className="h-12 w-full bg-transparent pl-11 pr-3 text-[15px] text-ink placeholder:text-muted focus:outline-none sm:h-full"
          />
        </div>

        <button type="submit" className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-gold px-9 text-[17px] font-medium text-white transition-colors hover:bg-gold-dark sm:h-[58px]">
          <Search className="h-5 w-5 sm:hidden" />
          Search
        </button>
      </form>
    </div>
  );
}
