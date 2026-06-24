import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown, SearchX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SearchSidebar } from "@/components/search/search-sidebar";
import { MapFilterButton } from "@/components/search/map-filter-button";
import { PropertyListCard } from "@/components/listings/property-list-card";
import { filterListings, type SearchQuery } from "@/lib/search";
import { propertyTypeMap } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "Search Commercial Real Estate" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchQuery>;
}) {
  const query = await searchParams;
  const results = filterListings(query);
  const typeLabel = query.type && propertyTypeMap[query.type as keyof typeof propertyTypeMap]?.label;
  const mapHref = `/search/map${query.deal ? `?deal=${query.deal}` : ""}`;

  return (
    <div className="bg-surface">
      <Container className="grid gap-6 py-6 lg:grid-cols-[284px_1fr] lg:py-8">
        {/* Filters sidebar — desktop only (mobile uses the drawer button) */}
        <div className="hidden lg:sticky lg:top-[94px] lg:block lg:h-fit">
          <Suspense fallback={<div className="h-96 rounded-xl border border-line bg-white" />}>
            <SearchSidebar />
          </Suspense>
        </div>

        {/* Right column: heading + controls + results */}
        <div>
          <div className="mb-5">
            {/* Heading + Show/Map toggle (top-right) */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-navy sm:text-2xl lg:text-[28px]">
                  CREvista {typeLabel ?? "Commercial Real Estate"}
                </h1>
                <p className="mt-0.5 text-sm text-[#43474f]">
                  Showing <span className="font-semibold text-navy">{formatNumber(results.length)}</span> results for your criteria
                </p>
              </div>

              {/* Desktop: Show Map + Sort */}
              <div className="hidden shrink-0 items-center gap-5 lg:flex">
                <Link href={mapHref} className="group flex items-center gap-2.5" aria-label="Show map">
                  <span className="text-sm font-medium text-navy">Show Map</span>
                  <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-navy/20 transition-colors group-hover:bg-navy/30">
                    <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" />
                  </span>
                </Link>
                <div className="relative">
                  <select className="h-11 cursor-pointer appearance-none rounded-lg border border-line bg-white pl-4 pr-9 text-sm font-medium text-ink focus:border-navy focus:outline-none">
                    <option>Sort</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Cap Rate: High to Low</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
              </div>

            </div>

            {/* Mobile controls: Filters left + Show Map right, Sort below */}
            <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
              <Suspense fallback={<div className="h-11 w-[120px]" />}>
                <MapFilterButton />
              </Suspense>
              <Link href={mapHref} className="group flex shrink-0 items-center gap-2.5" aria-label="Show map">
                <span className="text-sm font-medium text-navy">Show Map</span>
                <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-navy/20 transition-colors group-hover:bg-navy/30">
                  <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" />
                </span>
              </Link>
            </div>
            <div className="relative mt-3 lg:hidden">
              <select className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-line bg-white pl-4 pr-9 text-sm font-medium text-ink focus:border-navy focus:outline-none">
                <option>Sort</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Cap Rate: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-line bg-white py-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface-2 text-muted">
                <SearchX className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-navy">No properties match your filters</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted">Try widening your search criteria.</p>
              <ButtonLink href="/search?deal=sale" variant="navy" size="md" className="mt-6">Reset filters</ButtonLink>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {results.map((listing) => (
                  <PropertyListCard key={listing.id} listing={listing} locked={!listing.capRate} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-1.5">
                <button className="grid h-10 min-w-10 place-items-center rounded-lg border border-line bg-white px-3 text-sm text-muted" disabled>Prev</button>
                {[1, 2, 3].map((n) => (
                  <button key={n} className={n === 1 ? "grid h-10 min-w-10 place-items-center rounded-lg bg-navy px-3 text-sm font-semibold text-white" : "grid h-10 min-w-10 place-items-center rounded-lg border border-line bg-white px-3 text-sm text-ink hover:border-navy/40"}>{n}</button>
                ))}
                <span className="px-1 text-muted">…</span>
                <button className="grid h-10 min-w-10 place-items-center rounded-lg border border-line bg-white px-3 text-sm text-ink hover:border-navy/40">12</button>
                <button className="grid h-10 min-w-10 place-items-center rounded-lg border border-line bg-white px-3 text-sm text-ink hover:border-navy/40">Next</button>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
