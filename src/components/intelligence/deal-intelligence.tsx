"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, Phone, BookmarkPlus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { propertyPhotos } from "@/lib/assets";

const TEAL = "#0e7c86";
const tabs = ["Overview", "Comps", "Financials", "Owner Info"] as const;

/* small solid right-pointing triangle marker */
function Tri({ className }: { className?: string }) {
  return (
    <span className={cn("inline-block h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent", className)} />
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border border-line bg-white p-5 shadow-card", className)}>{children}</div>;
}

/* ---- AI Deal Score gauge ---- */
function Gauge({ score }: { score: number }) {
  const pct = 0.78;
  const r = 80, cx = 100, cy = 100;
  const start = { x: cx - r, y: cy };
  const trackEnd = { x: cx + r, y: cy };
  const a = Math.PI - pct * Math.PI;
  const end = { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
  return (
    <svg viewBox="0 0 200 112" className="mx-auto w-full max-w-[280px]">
      <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`} fill="none" stroke="#ece4d2" strokeWidth="13" strokeLinecap="round" />
      <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`} fill="none" stroke="#c8a14b" strokeWidth="13" strokeLinecap="round" />
      <circle cx={end.x} cy={end.y} r="6" fill="#fff" stroke="#c8a14b" strokeWidth="3" />
      <text x="100" y="94" textAnchor="middle" className="fill-navy font-display" fontSize="36" fontWeight="700">{score}</text>
    </svg>
  );
}

/* ---- Rent upside bar chart ---- */
function Bar({ h, color }: { h: number; color: string }) {
  return <div className="w-12 rounded-t-[4px] sm:w-[68px]" style={{ height: `${h}%`, backgroundColor: color }} />;
}

export function DealIntelligence() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <div className="space-y-5">
      {/* ===== Hero image + badges ===== */}
      <div className="relative h-56 overflow-hidden rounded-xl sm:h-72 lg:h-80">
        <Image src={propertyPhotos[1]} alt="Sunset Plaza Retail Center" fill className="object-cover" sizes="(max-width:1024px) 100vw, 70vw" priority />
        <div className="absolute left-3 top-3 flex flex-nowrap gap-1.5 sm:left-4 sm:top-4 sm:gap-2">
          <span className="whitespace-nowrap rounded-md bg-navy px-2.5 py-1 text-xs font-semibold text-white shadow sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm">Below Market Rents</span>
          <span className="whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-navy shadow sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm">Loan Maturity: 8 Months</span>
        </div>
      </div>

      {/* ===== Header bar ===== */}
      <Card className="p-0">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div>
            <h1 className="text-2xl font-bold text-navy sm:text-[28px]">Sunset Plaza Retail Center</h1>
            <p className="mt-1 text-[15px] text-muted">1234 Market St, Los Angeles, CA</p>
          </div>
          <div className="sm:text-right">
            <p className="text-2xl font-bold text-navy sm:text-[28px]">$4,750,000</p>
            <p className="mt-0.5 text-sm font-semibold text-gold">Cap Rate: 6.8%</p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted">Value-Add Retail Center</p>
          </div>
        </div>

        {/* tabs */}
        <div className="flex gap-6 border-t border-line px-5 sm:px-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "-mb-px border-b-2 py-3 text-sm font-semibold transition-colors",
                tab === t ? "border-gold text-gold" : "border-transparent text-muted hover:text-navy",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {tab !== "Overview" ? (
        <Card className="py-16 text-center text-muted">{tab} details coming soon.</Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* ============ LEFT COLUMN ============ */}
          <div className="space-y-5">
            {/* Investment Highlights */}
            <Card>
              <h2 className="text-base font-bold text-navy">Investment Highlights</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { v: "12%", t: "Under Market", s: "Price" },
                  { v: "22%", t: "Rent upside", s: "Potential" },
                  { v: "12%", t: "Months", s: "Loan Maturity" },
                ].map((h) => (
                  <div key={h.s} className="rounded-lg border border-line p-4">
                    <p className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold" style={{ color: TEAL }}>{h.v}</span>
                      <span className="text-sm font-medium text-ink">{h.t}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">{h.s}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rent Upside Analysis */}
            <Card>
              <h2 className="text-base font-bold text-navy">Rent Upside Analysis</h2>
              <div className="mt-5 flex gap-5">
                {/* y-axis — label zone spacer keeps ticks aligned to the bar area */}
                <div className="flex flex-col text-xs text-muted">
                  <div className="h-10" />
                  <div className="flex h-44 flex-col justify-between">
                    <span>$18 / SF</span><span>$20 / SF</span><span>$22 / SF</span>
                  </div>
                </div>
                {/* both groups reserve an equal h-10 zone above the bars → shared baseline.
                    centered with a fixed gap so the two groups never touch */}
                <div className="flex flex-1 justify-center gap-8 sm:gap-16">
                  <div className="flex flex-col items-center">
                    <div className="h-10" />
                    <div className="flex h-44 items-end gap-2">
                      <Bar h={55} color="#5b9bf3" />
                      <Bar h={74} color="#2f4fd6" />
                    </div>
                    <span className="mt-2 text-xs text-muted">Current Rents</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 items-start justify-center">
                      <span className="text-center text-sm font-semibold leading-tight text-[#22a559]">+22% upside potential</span>
                    </div>
                    <div className="flex h-44 items-end gap-2">
                      <Bar h={62} color="#86d6a4" />
                      <Bar h={82} color="#1f9d57" />
                    </div>
                    <span className="mt-2 text-xs text-muted">Current Rents</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Sales Comps */}
            <Card>
              <h2 className="text-base font-bold text-navy">Recent Sales Comps</h2>
              <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {[
                  { n: "Lakeside Shops", p: "$5,100,000", c: "6.5%" },
                  { n: "Broadway Center", p: "$4,950,000", c: "7.0% Cap" },
                  { n: "Metro Plaza", p: "$5,250,000", c: "6.4%" },
                  { n: "Metro Plaza", p: "$5,250,000", c: "6.4% Cap" },
                  { n: "Lakeside Shops", p: "$5,100,000", c: "6.5%" },
                  { n: "Broadway Center", p: "$4,950,000", c: "7.0% Cap" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-line/70 pb-2.5 text-sm">
                    <span className="flex items-center gap-2 font-semibold" style={{ color: TEAL }}>
                      <Tri className="border-l-[#0e7c86]" /> {c.n}
                    </span>
                    <span className="text-muted">{c.p} | {c.c}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* What Should I Do? */}
            <Card>
              <h2 className="text-base font-bold text-navy">What Should I Do?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Strong upside potential with below-market price and near-term loan maturity. Ideal time to acquire.
              </p>
              <button className="mt-4 h-11 w-full rounded-lg text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90" style={{ backgroundColor: TEAL }}>
                Recommendation: Buy
              </button>
            </Card>
          </div>

          {/* ============ RIGHT COLUMN ============ */}
          <div className="space-y-5">
            {/* AI Deal Score */}
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-navy">AI Deal Score</h2>
                <Info className="h-4 w-4 text-muted" />
              </div>
              <Gauge score={660} />
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">Quick Insights:</p>
              <div className="mt-2 space-y-2">
                {["12% Below Market Value", "Rental Upside Potential", "Motivated Seller Signal"].map((q) => (
                  <div key={q} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink">
                    <Tri className="border-l-gold" /> {q}
                  </div>
                ))}
              </div>
            </Card>

            {/* Likely Seller Signals */}
            <Card>
              <h2 className="text-base font-bold text-navy">Likely Seller Signals</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-ink">
                <li className="flex items-center gap-2"><Tri className="border-l-gold" /> Owned <b className="font-semibold">9+ Years</b></li>
                <li className="flex items-center gap-2"><Tri className="border-l-gold" /> Loan Maturity: <b className="font-semibold">8 Months</b></li>
                <li className="flex items-center gap-2"><Tri className="border-l-gold" /> High Vacancy Nearby</li>
              </ul>
            </Card>

            {/* Owner Information */}
            <Card>
              <h2 className="text-base font-bold text-navy">Owner Information</h2>
              <ul className="mt-3 space-y-3 text-sm text-ink">
                {["XYZ Capital LLC", "David Thompson", "15 Properties | 220,000 SF"].map((o) => (
                  <li key={o} className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-muted">
                      <User className="h-4 w-4" />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Actions */}
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: TEAL }}>
              <BookmarkPlus className="h-5 w-5" /> Add to Watchlist
            </button>
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold text-sm font-semibold text-white transition-colors hover:bg-gold-dark">
              <Phone className="h-5 w-5" /> Contact Broker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
