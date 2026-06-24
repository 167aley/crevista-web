"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  label: string;
  count: number;
  typeId: string;
  sub: string[];
}

const categories: Category[] = [
  { label: "All", count: 1000, typeId: "all", sub: [] },
  { label: "Retail", count: 500, typeId: "retail", sub: ["Strip Center", "Single-Tenant", "Anchored Center", "Outlet"] },
  { label: "Office", count: 100, typeId: "office", sub: ["Traditional Office", "Executive Office", "Coworking", "Medical Office", "Creative Office"] },
  { label: "Industrial", count: 300, typeId: "industrial", sub: ["Warehouse", "Manufacturing", "Flex", "Cold Storage"] },
  { label: "Short Term", count: 115, typeId: "hospitality", sub: ["Hospitality", "Serviced Office", "Pop-up Retail"] },
  { label: "Land", count: 120, typeId: "land", sub: ["Commercial Land", "Industrial Land", "Residential Land"] },
  { label: "Restaurant", count: 200, typeId: "retail", sub: ["Quick Service", "Full Service", "Cafe / Bakery"] },
  { label: "Special Purpose", count: 80, typeId: "special-purpose", sub: ["Self-Storage", "Data Center", "Medical", "Automotive"] },
];

export function HeroSearch() {
  const router = useRouter();
  const [deal, setDeal] = useState<"lease" | "sale">("lease");
  const [q, setQ] = useState("");

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState("All Properties");
  const [selectedType, setSelectedType] = useState("all");
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choose(label: string, typeId: string) {
    setSelectedLabel(label);
    setSelectedType(typeId);
    setOpen(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ deal });
    if (q) params.set("q", q);
    if (selectedType !== "all") params.set("type", selectedType);
    router.push(`/search?${params.toString()}`);
  }

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
        {/* Custom categorized dropdown */}
        <div ref={ddRef} className="relative sm:w-[210px] sm:shrink-0 sm:border-r sm:border-line">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 w-full items-center justify-between rounded-md bg-transparent pl-4 pr-3 text-[15px] text-muted hover:text-navy sm:h-full"
          >
            <span className="truncate">{selectedLabel}</span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
          </button>

          {open && (
            <div className="scroll-thin absolute left-0 top-full z-50 mt-2 max-h-[330px] w-full overflow-y-auto rounded-lg border border-line bg-white py-1 shadow-pop">
              <button
                type="button"
                onClick={() => choose("All Properties", "all")}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface hover:text-gold"
              >
                <span>All</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted">(1000)</span>
                  <span className="h-5 w-5" aria-hidden />
                </span>
              </button>

              {categories.slice(1).map((cat) => {
                const isOpen = expanded === cat.label;
                return (
                  <div key={cat.label} className="border-t border-line/60">
                    <div
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors",
                        isOpen ? "text-gold" : "text-ink hover:bg-surface hover:text-gold",
                      )}
                    >
                      <button type="button" onClick={() => choose(cat.label, cat.typeId)} className={cn("flex-1 text-left", isOpen && "font-semibold")}>
                        {cat.label}
                      </button>
                      <span className="flex items-center gap-2">
                        <span className={cn("text-xs", isOpen ? "text-gold" : "text-muted")}>({cat.count})</span>
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
                        {cat.sub.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => choose(s, cat.typeId)}
                            className="block w-full px-6 py-1.5 text-left text-[13px] text-muted transition-colors hover:bg-surface hover:text-gold"
                          >
                            {s}
                          </button>
                        ))}
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
