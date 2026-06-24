import Link from "next/link";
import Image from "next/image";
import { Share2, Lock, Phone, Clock } from "lucide-react";
import { SaveButton } from "./save-button";
import { ButtonLink } from "@/components/ui/button";
import { type Listing, propertyTypeMap } from "@/lib/data";
import { formatUSD, formatNumber, formatMoneyShort } from "@/lib/utils";

const zoningMap: Record<string, string> = {
  office: "O-2", retail: "C-4", industrial: "M-1", multifamily: "R-4",
  land: "A-1", "mixed-use": "MU-2", "self-storage": "C-3",
  hospitality: "C-5", "data-center": "M-2", "special-purpose": "SP-1",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#43474f]/70">{label}</p>
      <p className="mt-0.5 text-[15px] font-bold text-navy">{value}</p>
    </div>
  );
}

export function PropertyListCard({
  listing,
  locked = false,
}: {
  listing: Listing;
  locked?: boolean;
}) {
  const type = propertyTypeMap[listing.type];
  const href = `/listings/${listing.slug}`;
  const askingPrice = listing.deal === "lease" ? `$${listing.leaseRate}/SF/yr` : formatUSD(listing.price);

  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-white shadow-card transition-shadow hover:shadow-pop sm:flex-row">
      {/* Image */}
      <Link href={href} className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[212px]">
        <Image
          src={listing.photos[0]}
          alt={listing.title}
          fill
          sizes="(max-width:640px) 100vw, 212px"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-[3px] bg-[#0e7c86] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {type.label}
        </span>
      </Link>

      {/* Content */}
      <div className="@container flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={href}>
              <h3 className="truncate text-[18px] font-bold text-navy hover:text-gold-dark">{listing.title}</h3>
            </Link>
            <p className="mt-0.5 truncate text-sm text-[#43474f]">
              {listing.city}, {listing.state} {listing.zip}
              <span className="font-semibold text-[#0e7c86]"> · {listing.market}</span>
            </p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <SaveButton className="h-9 w-9 border border-line bg-white" />
            <button className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-navy transition-colors hover:bg-navy/5" aria-label="Share">
              <Share2 className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {locked ? (
          <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-[#43474f]">
              <p className="flex items-center gap-1.5 blur-[3px] select-none"><Phone className="h-3.5 w-3.5" /> Contact: John Smith (+1 909-555-0123)</p>
              <p className="blur-[3px] select-none">Email: jsmith@cbre.com</p>
            </div>
            <ButtonLink href="/pricing" variant="primary" size="sm" className="shrink-0">
              <Lock className="h-3.5 w-3.5" /> Upgrade to Pro to unlock details
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-3">
            <Stat label="Asking Price" value={askingPrice} />
            <Stat label="SF" value={listing.sqft > 0 ? formatNumber(listing.sqft) : "—"} />
            <Stat label="Cap Rate" value={listing.capRate ? `${listing.capRate}%` : "—"} />
            <Stat label="Price/SF" value={listing.sqft > 0 ? formatMoneyShort(listing.pricePerSqft) : "—"} />
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#43474f]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {listing.daysOnMarket} days on market
            </span>
            <span>Broker: <span className="font-medium text-navy">{listing.broker.firm}</span></span>
          </div>
          <span className="shrink-0 rounded bg-surface-2 px-2 py-1 text-[11px] font-medium text-navy">
            Zoning: <span className="font-bold text-gold-dark">{zoningMap[listing.type] ?? "C-2"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
