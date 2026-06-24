"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail, CheckCircle2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Broker } from "@/lib/data";

export function ContactBroker({ broker, listingTitle }: { broker: Broker; listingTitle: string }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <Image
          src={broker.avatar}
          alt={broker.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-semibold text-navy">
            {broker.name} <BadgeCheck className="h-4 w-4 text-info" />
          </p>
          <p className="truncate text-xs text-muted">{broker.title}</p>
          <p className="truncate text-xs font-medium text-gold-dark">{broker.firm}</p>
        </div>
      </div>

      <a
        href={`tel:${broker.phone.replace(/[^\d+]/g, "")}`}
        className="mt-4 flex h-11 items-center justify-center gap-2 rounded-lg border border-navy/20 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
      >
        <Phone className="h-4 w-4" /> {broker.phone}
      </a>

      {sent ? (
        <div className="mt-4 rounded-xl bg-success/10 p-4 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
          <p className="mt-2 text-sm font-semibold text-navy">Request sent</p>
          <p className="mt-1 text-xs text-muted">{broker.name} will reach out shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-4 space-y-2.5"
        >
          <div className="grid grid-cols-2 gap-2.5">
            <input required placeholder="First name" className="h-10 rounded-lg border border-line px-3 text-sm focus:border-navy focus:outline-none" />
            <input required placeholder="Last name" className="h-10 rounded-lg border border-line px-3 text-sm focus:border-navy focus:outline-none" />
          </div>
          <input required type="email" placeholder="Email address" className="h-10 w-full rounded-lg border border-line px-3 text-sm focus:border-navy focus:outline-none" />
          <input type="tel" placeholder="Phone (optional)" className="h-10 w-full rounded-lg border border-line px-3 text-sm focus:border-navy focus:outline-none" />
          <textarea
            rows={3}
            defaultValue={`I'm interested in ${listingTitle}. Please send me more information.`}
            className="w-full rounded-lg border border-line p-3 text-sm focus:border-navy focus:outline-none"
          />
          <Button type="submit" variant="primary" size="lg" className="w-full">
            <Mail className="h-4 w-4" /> Contact broker
          </Button>
          <p className="text-center text-[11px] leading-relaxed text-muted">
            By submitting, you agree to CREVISTA&apos;s Terms &amp; Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
}
