"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { Listing } from "@/lib/data";

const PropertyMap = dynamic(() => import("@/components/search/property-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-navy-50 text-navy">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
});

export function LocationMap({ listing }: { listing: Listing }) {
  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-line">
      <PropertyMap
        listings={[listing]}
        activeId={listing.id}
        selectedId={null}
        onSelect={() => {}}
      />
    </div>
  );
}
