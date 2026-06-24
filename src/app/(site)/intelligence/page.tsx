import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SearchSidebar } from "@/components/search/search-sidebar";
import { MapFilterButton } from "@/components/search/map-filter-button";
import { DealIntelligence } from "@/components/intelligence/deal-intelligence";

export const metadata: Metadata = { title: "Property Intelligence" };

export default function IntelligencePage() {
  return (
    <div className="bg-surface">
      <Container className="grid gap-6 py-6 lg:grid-cols-[284px_1fr] lg:py-8">
        {/* Filters sidebar — desktop only */}
        <div className="hidden lg:sticky lg:top-[94px] lg:block lg:h-fit">
          <Suspense fallback={<div className="h-96 rounded-xl border border-line bg-white" />}>
            <SearchSidebar />
          </Suspense>
        </div>

        <div>
          {/* Mobile filters drawer */}
          <div className="mb-4 lg:hidden">
            <Suspense fallback={<div className="h-11 w-[120px]" />}>
              <MapFilterButton />
            </Suspense>
          </div>
          <DealIntelligence />
        </div>
      </Container>
    </div>
  );
}
