"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { PropertyListCard } from "@/components/listings/property-list-card";
import { type Listing } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

const PropertyMap = dynamic(() => import("./property-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-navy-50 text-navy">
      <Loader2 className="h-7 w-7 animate-spin" />
    </div>
  ),
});

export function MapExperience({ listings }: { listings: Listing[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid h-[78vh] min-h-[560px] grid-cols-1 overflow-hidden rounded-xl border border-line lg:grid-cols-[minmax(440px,54%)_1fr]">
      {/* List */}
      <div className="scroll-thin order-2 overflow-y-auto bg-surface lg:order-1">
        <div className="space-y-4 p-4">
          {listings.length === 0 ? (
            <div className="rounded-xl border border-line bg-white p-8 text-center text-sm text-muted">
              No properties in this view. Adjust your filters.
            </div>
          ) : (
            listings.map((l) => (
              <div
                key={l.id}
                onMouseEnter={() => setActiveId(l.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <PropertyListCard listing={l} locked={!l.capRate} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative order-1 h-64 lg:order-2 lg:h-auto">
        <PropertyMap
          listings={listings}
          activeId={activeId}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
      </div>
    </div>
  );
}
