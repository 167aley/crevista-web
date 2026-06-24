import Link from "next/link";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { MapFilterButton } from "@/components/search/map-filter-button";
import { MapExperience } from "@/components/search/map-experience";
import { filterListings, type SearchQuery } from "@/lib/search";
import { propertyTypeMap } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "Map Search" };

export default async function MapSearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchQuery>;
}) {
  const query = await searchParams;
  const results = filterListings(query);
  const typeLabel = query.type && propertyTypeMap[query.type as keyof typeof propertyTypeMap]?.label;
  const listHref = `/search${query.deal ? `?deal=${query.deal}` : ""}`;

  return (
    <div className="bg-surface">
      {/* Heading row: collapsed FILTERS + title + Show Map toggle + Sort */}
      <div className="border-b border-line bg-white">
        <Container className="py-4">
          <div>
            {/* Heading + Show/Map toggle (top-right) */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-navy sm:text-2xl lg:text-[24px]">
                  CREvista {typeLabel ?? "Commercial Real Estate"}
                </h1>
                <p className="mt-0.5 text-sm text-[#43474f]">
                  Showing <span className="font-semibold text-navy">{formatNumber(results.length)}</span> results for your criteria
                </p>
              </div>

              {/* Desktop: Filters + Show Map + Sort */}
              <div className="hidden shrink-0 items-center gap-5 lg:flex">
                <MapFilterButton />
                <Link href={listHref} className="flex items-center gap-2.5" aria-label="Hide map">
                  <span className="text-sm font-medium text-navy">Show Map</span>
                  <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-gold transition-colors">
                    <span className="absolute right-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" />
                  </span>
                </Link>
                <div className="relative">
                  <select className="h-11 cursor-pointer appearance-none rounded-lg border border-line bg-white pl-4 pr-9 text-sm font-medium text-ink focus:border-navy focus:outline-none">
                    <option>Sort</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Cap Rate: High to Low</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
              </div>

            </div>

            {/* Mobile controls: Filters left + Show Map right, Sort below */}
            <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
              <MapFilterButton />
              <Link href={listHref} className="flex shrink-0 items-center gap-2.5" aria-label="Hide map">
                <span className="text-sm font-medium text-navy">Show Map</span>
                <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-gold transition-colors">
                  <span className="absolute right-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" />
                </span>
              </Link>
            </div>
            <div className="relative mt-3 lg:hidden">
              <select className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-line bg-white pl-4 pr-9 text-sm font-medium text-ink focus:border-navy focus:outline-none">
                <option>Sort</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Cap Rate: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-6">
        <MapExperience listings={results} />
      </Container>
    </div>
  );
}
