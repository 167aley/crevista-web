"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SearchSidebar } from "./search-sidebar";
import { cn } from "@/lib/utils";

export function MapFilterButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Collapsed FILTERS button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 shadow-sm transition-colors hover:border-navy/40",
          className,
        )}
        aria-label="Open filters"
      >
        <Menu className="h-5 w-5 text-navy" />
        <span className="text-sm font-semibold text-navy">Filters</span>
      </button>

      {/* Drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-navy/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="scroll-thin fixed left-0 top-0 z-[70] h-full w-[330px] max-w-[85vw] overflow-y-auto bg-surface p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wide text-navy">Filters</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-navy/5">
                <X className="h-5 w-5 text-navy" />
              </button>
            </div>
            <SearchSidebar />
          </div>
        </>
      )}
    </>
  );
}
