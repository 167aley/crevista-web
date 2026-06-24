import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize2, TrendingUp, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SaveButton } from "./save-button";
import { type Listing, propertyTypeMap } from "@/lib/data";
import { formatUSD, formatNumber, formatMoneyShort } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusLabel: Record<Listing["status"], { label: string; variant: "new" | "price-drop" | "under-contract" }> = {
  new: { label: "New", variant: "new" },
  "price-drop": { label: "Price Drop", variant: "price-drop" },
  "under-contract": { label: "Under Contract", variant: "under-contract" },
  active: { label: "Active", variant: "new" },
};

export function PropertyCard({
  listing,
  className,
  orientation = "vertical",
  priority = false,
}: {
  listing: Listing;
  className?: string;
  orientation?: "vertical" | "horizontal";
  priority?: boolean;
}) {
  const type = propertyTypeMap[listing.type];
  const status = statusLabel[listing.status];
  const priceLabel =
    listing.deal === "lease"
      ? `$${listing.leaseRate}/SF/yr`
      : formatUSD(listing.price);

  const isHorizontal = orientation === "horizontal";

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-[14px] border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop",
        isHorizontal ? "flex-row" : "flex-col",
        className,
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-surface-2",
          isHorizontal ? "w-44 sm:w-56" : "aspect-[4/3] w-full",
        )}
      >
        <Image
          src={listing.photos[0]}
          alt={listing.title}
          fill
          sizes={isHorizontal ? "224px" : "(max-width:768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {listing.status !== "active" && (
            <Badge variant={status.variant} size="sm">{status.label}</Badge>
          )}
          {listing.exchange1031 && (
            <Badge variant="white" size="sm">1031</Badge>
          )}
        </div>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-navy/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {listing.deal === "lease" ? "For Lease" : "For Sale"}
        </span>
        <SaveButton className="absolute right-3 top-3 h-9 w-9" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5" style={{ color: type.color }}>
            <Building2 className="h-3.5 w-3.5" /> {type.label}
          </span>
          <span className="text-line">·</span>
          <span>Class {listing.class}</span>
        </div>

        <h3 className="mt-1.5 line-clamp-1 text-[17px] font-semibold text-navy">
          {listing.title}
        </h3>
        <p className="mt-1 line-clamp-1 flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {listing.address}, {listing.city}, {listing.state}
        </p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-navy">{priceLabel}</p>
            {listing.deal === "sale" && listing.sqft > 0 && (
              <p className="text-xs text-muted">{formatMoneyShort(listing.pricePerSqft)} /SF</p>
            )}
          </div>
          {listing.capRate && (
            <div className="rounded-lg bg-success/10 px-2.5 py-1 text-right">
              <p className="text-[11px] leading-none text-success/80">Cap Rate</p>
              <p className="text-sm font-bold text-success">{listing.capRate}%</p>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-line pt-3 text-xs text-muted">
          {listing.sqft > 0 && (
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" /> {formatNumber(listing.sqft)} SF
            </span>
          )}
          {listing.units && (
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" /> {listing.units} units
            </span>
          )}
          {listing.lotAcres && (
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" /> {listing.lotAcres} acres
            </span>
          )}
          {listing.occupancy && (
            <span className="ml-auto inline-flex items-center gap-1 text-success">
              <TrendingUp className="h-3.5 w-3.5" /> {listing.occupancy}% leased
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
