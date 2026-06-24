import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight, MapPin, Share2, Bookmark, CheckCircle2, Repeat, FileText, Download,
  TrainFront, Utensils, Hotel, Footprints, Wallet,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListingGallery } from "@/components/listings/listing-gallery";
import { InquiryCard } from "@/components/listings/inquiry-card";
import { LocationMap } from "@/components/listings/location-map";
import { PropertyCard } from "@/components/listings/property-card";
import { listings, listingMap, propertyTypeMap } from "@/lib/data";
import { formatUSD, formatNumber, formatMoneyShort } from "@/lib/utils";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const listing = listingMap[slug];
  if (!listing) return { title: "Listing not found" };
  return { title: `${listing.title} — ${listing.city}, ${listing.state}`, description: listing.description };
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = listingMap[slug];
  if (!listing) notFound();

  const type = propertyTypeMap[listing.type];
  const noi = listing.capRate ? Math.round((listing.price * listing.capRate) / 100) : 0;
  const gpr = noi ? Math.round(noi / 0.65) : 0;
  const opex = gpr - noi;
  const reserves = gpr ? Math.round(gpr * 0.02) : 0;
  const listingId = `#CRV-${listing.id.padStart(6, "0")}`;

  const similar = listings.filter((l) => l.id !== listing.id && l.type === listing.type);
  const similarListings = (similar.length >= 3 ? similar : listings.filter((l) => l.id !== listing.id)).slice(0, 3);

  const stats = [
    { label: "Asking Price", value: formatUSD(listing.price), accent: false },
    { label: "Total Area", value: listing.sqft > 0 ? `${formatNumber(listing.sqft)} SF` : "—", accent: false },
    { label: "Cap Rate", value: listing.capRate ? `${listing.capRate}%` : "—", accent: true },
    { label: "Year Built", value: listing.yearBuilt > 0 ? `${listing.yearBuilt}` : "—", accent: false },
  ];

  return (
    <div className="bg-surface">
      <Container className="py-5">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-navy">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/search?deal=${listing.deal}`} className="hover:text-navy">For {listing.deal === "lease" ? "Lease" : "Sale"}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/search?deal=${listing.deal}&type=${listing.type}`} className="hover:text-navy">{type.label}</Link>
        </nav>
      </Container>

      <Container>
        <ListingGallery photos={listing.photos} title={listing.title} />
      </Container>

      {/* Title block */}
      <Container className="mt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">
              <span className="text-gold-dark">Class {listing.class} {type.label} Asset</span>
              <span className="mx-2 text-line">•</span>
              <span className="text-muted">{listing.market}</span>
            </p>
            <h1 className="mt-2 max-w-3xl text-[26px] font-bold leading-tight text-navy sm:text-[32px]">
              {listing.title} {listing.address}, {listing.city}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant="gold" size="md">For {listing.deal === "lease" ? "Lease" : "Sale"}</Badge>
              {listing.exchange1031 && <Badge variant="soft" size="md">1031 Eligible</Badge>}
              <span className="text-sm text-muted">Listing ID: {listingId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="md" className="gap-2 text-sm font-semibold uppercase tracking-wide">
              <Bookmark className="h-4 w-4" /> Save Property
            </Button>
            <Button variant="outline" size="md" className="gap-2 text-sm font-semibold uppercase tracking-wide">
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </Container>

      {/* Stats bar */}
      <Container className="mt-5">
        <div className="grid grid-cols-2 divide-y divide-line rounded-2xl border border-line bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{s.label}</p>
              <p className={`mt-1 text-xl font-bold ${s.accent ? "text-gold-dark" : "text-navy"}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Body */}
      <Container className="mt-8 grid gap-8 pb-16 lg:grid-cols-[1fr_372px]">
        {/* Left */}
        <div className="space-y-9">
          <section>
            <h2 className="text-lg font-semibold text-navy">Asset Summary</h2>
            <p className="mt-3 leading-relaxed text-ink/80">{listing.description}</p>
            <p className="mt-3 leading-relaxed text-ink/80">
              This premium asset features a distinctive design with abundant natural light and
              column-free floor plates. It is currently {listing.occupancy ?? 94}% leased to a
              diversified roster of investment-grade tenants, providing stable, long-term cash flow.
            </p>
            <button className="mt-3 text-sm font-semibold uppercase tracking-wide text-gold-dark underline-offset-4 hover:underline">
              Read More
            </button>
          </section>

          {/* Financial Performance — navy header + light rows */}
          {listing.deal === "sale" && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-navy">Financial Performance</h2>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="flex items-center justify-between bg-navy px-5 py-3 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wide">Income Component</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Annual Amount</span>
                </div>
                <FinRow label="Gross Scheduled Income" value={gpr ? formatUSD(gpr) : "—"} />
                <FinRow label="Total Operating Expenses" value={opex ? `(${formatUSD(opex)})` : "—"} variant="expense" />
                <FinRow label="Net Operating Income (NOI)" value={noi ? formatUSD(noi) : "—"} variant="noi" />
                <FinRow label="Capital Reserves" value={reserves ? formatUSD(reserves) : "—"} variant="muted" />
              </div>
            </section>
          )}

          {/* Investment Resources */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">Investment Resources</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "Offering Memorandum", meta: "PDF · 42 MB" },
                { name: "Full Floor Plans", meta: "DWG | PDF · 18 MB" },
              ].map((d) => (
                <button key={d.name} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-4 text-left transition-colors hover:border-navy/30">
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/15 text-gold-dark">
                      <FileText className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-navy">{d.name}</span>
                      <span className="block text-[11px] uppercase tracking-wide text-muted">{d.meta}</span>
                    </span>
                  </span>
                  <Download className="h-5 w-5 text-muted" />
                </button>
              ))}
            </div>
          </section>

          {/* Strategic Location */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">Strategic Location</h2>
            <div className="relative">
              <LocationMap listing={listing} />
              <div className="absolute inset-x-3 bottom-3 z-[500] flex flex-wrap items-center justify-around gap-2 rounded-lg bg-white/95 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-navy shadow-soft backdrop-blur">
                <span className="inline-flex items-center gap-1.5"><TrainFront className="h-4 w-4 text-gold-dark" /> Subway: 2 mins</span>
                <span className="inline-flex items-center gap-1.5"><Utensils className="h-4 w-4 text-gold-dark" /> Dining: 12+ nearby</span>
                <span className="inline-flex items-center gap-1.5"><Hotel className="h-4 w-4 text-gold-dark" /> Hotels: 5 luxury</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <LocStat icon={Footprints} label="Walk Score" value="98" sub="Walker's Paradise" />
              <LocStat icon={Wallet} label="Avg HH Income" value="$182k" sub="Top 5% Locally" />
              <LocStat icon={TrainFront} label="Transit Score" value="100" sub="Rider's Dream" />
            </div>
          </section>

          {/* Investment Highlights */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-navy">Investment Highlights</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {listing.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] text-ink/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" /> {h}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right sticky */}
        <div className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <InquiryCard broker={listing.broker} />

          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Market Context</h3>
            <div className="mt-4 space-y-3 text-sm">
              {[
                { k: "Market Rent Avg", v: `$${(listing.pricePerSqft ? listing.pricePerSqft / 4 : 88.5).toFixed(2)}/SF`, accent: false },
                { k: "Submarket Vacancy", v: `${(100 - (listing.occupancy ?? 94)).toFixed(1)}%`, accent: true },
                { k: "Walk Score", v: "Elite", accent: false },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
                  <span className="text-muted">{r.k}</span>
                  <span className={`font-bold ${r.accent ? "text-gold-dark" : "text-navy"}`}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {listing.exchange1031 && (
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="flex items-center gap-2 font-semibold text-navy"><Repeat className="h-5 w-5 text-gold-dark" /> 1031 Exchange Eligible</p>
              <p className="mt-2 text-sm text-muted">Defer capital gains by reinvesting proceeds. Track your 45/180-day deadlines in our 1031 Hub.</p>
              <Link href="/tools/1031-exchange" className="mt-3 inline-flex text-sm font-semibold text-gold-dark hover:underline">Open 1031 Hub →</Link>
            </div>
          )}
        </div>
      </Container>

      {/* Similar */}
      <div className="border-t border-line bg-white py-14">
        <Container>
          <h2 className="text-2xl font-semibold text-navy">Similar Properties</h2>
          <p className="mt-1 text-sm text-muted">More {type.label.toLowerCase()} opportunities you may like.</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarListings.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
        </Container>
      </div>
    </div>
  );
}

function FinRow({ label, value, variant }: { label: string; value: string; variant?: "expense" | "noi" | "muted" }) {
  const rowBg = variant === "expense" ? "bg-gold/10" : variant === "muted" ? "bg-surface/60" : "bg-white";
  const labelColor = variant === "noi" ? "font-semibold text-gold-dark" : "text-ink/80";
  const valueColor = variant === "noi" ? "text-gold-dark" : variant === "expense" ? "text-danger" : "text-navy";
  return (
    <div className={`flex items-center justify-between border-t border-line px-5 py-3.5 text-sm ${rowBg}`}>
      <span className={labelColor}>{label}</span>
      <span className={`font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}

function LocStat({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 text-center">
      <Icon className="mx-auto h-5 w-5 text-gold-dark" />
      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="text-2xl font-bold text-navy">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wide text-gold-dark">{sub}</p>
    </div>
  );
}
