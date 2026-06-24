"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { pricingPlans } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";

export function PricingTable() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className={cn("text-sm font-semibold", !annual ? "text-navy" : "text-muted")}>Monthly</span>
        <button
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual((v) => !v)}
          className={cn("relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer rounded-full transition-colors", annual ? "bg-gold" : "bg-navy/20")}
        >
          <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", annual ? "left-[27px]" : "left-1")} />
        </button>
        <span className={cn("text-sm font-semibold", annual ? "text-navy" : "text-muted")}>Annual</span>
        <Badge variant="gold" size="md">15% Discount</Badge>
      </div>

      {/* Plan cards */}
      <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
        {pricingPlans.map((plan) => {
          // Annual = monthly × 12 with the 15% discount applied
          const price = annual ? Math.round(plan.monthly * 12 * 0.85) : plan.monthly;
          const period = annual ? "/year" : "/month";
          const isNavy = !!plan.featured;
          return (
            <div
              key={plan.name}
              className={cn("relative flex flex-col rounded-2xl p-7 shadow-pop sm:p-8", isNavy ? "bg-navy" : "bg-[#0e7c86]")}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                  Most Popular
                </span>
              )}

              <h3 className={cn("text-lg font-semibold", isNavy ? "text-gold" : "text-white")}>{plan.name}</h3>
              <div className="mt-2 flex items-end gap-1 text-white">
                <span className="text-[40px] font-bold leading-none">${formatNumber(price)}</span>
                <span className="mb-1 text-sm text-white/55">{period}</span>
              </div>
              <p className="mt-2 text-xs italic text-white/55">14-day free trial</p>

              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((f, i) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/90">
                    {isNavy && i === 0 ? (
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-navy">
                        <Star className="h-3 w-3 fill-current" />
                      </span>
                    ) : (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-white/80" />
                    )}
                    {f}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/signup"
                variant={isNavy ? "primary" : "navy"}
                size="lg"
                className="mt-8 w-full rounded-lg text-white"
              >
                {plan.cta}
              </ButtonLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
