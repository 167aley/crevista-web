"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, ShieldCheck, CheckCircle2, Lock } from "lucide-react";
import type { Broker } from "@/lib/data";

const field =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none";
const label = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55";

export function InquiryCard({ broker }: { broker: Broker }) {
  const [sent, setSent] = useState(false);
  const license = `Lic. #${broker.phone.replace(/\D/g, "").slice(-7)}-NY`;

  return (
    <div className="rounded-2xl bg-navy p-6 text-white shadow-pop">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <Image src={broker.avatar} alt={broker.name} width={52} height={52} className="h-[52px] w-[52px] rounded-lg object-cover" />
          <div className="min-w-0">
            <p className="flex items-center gap-1 font-semibold">
              {broker.name} <BadgeCheck className="h-4 w-4 text-gold" />
            </p>
            <p className="truncate text-[11px] uppercase tracking-wide text-white/55">{broker.title}</p>
            <p className="truncate text-xs font-medium text-gold">{license}</p>
          </div>
        </div>
        <ShieldCheck className="h-6 w-6 shrink-0 text-white/40" />
      </div>

      {sent ? (
        <div className="py-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-3 font-semibold">Inquiry sent</p>
          <p className="mt-1 text-sm text-white/60">{broker.name} will be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-5 space-y-4">
          <div>
            <label className={label}>Full Name</label>
            <input required placeholder="Your Name" className={`${field} h-11`} />
          </div>
          <div>
            <label className={label}>Corporate Email</label>
            <input required type="email" placeholder="name@firm.com" className={`${field} h-11`} />
          </div>
          <div>
            <label className={label}>Inquiry Type</label>
            <select defaultValue="Request Full Package" className={`${field} h-11 cursor-pointer`}>
              <option className="text-ink">Request Full Package</option>
              <option className="text-ink">Schedule a Tour</option>
              <option className="text-ink">Make an Offer</option>
              <option className="text-ink">General Inquiry</option>
            </select>
          </div>
          <div>
            <label className={label}>Message</label>
            <textarea rows={3} defaultValue="I am interested in this listing..." className={`${field} resize-none py-2.5`} />
          </div>
          <button type="submit" className="h-12 w-full rounded-lg bg-gold font-semibold text-navy transition-colors hover:bg-gold-dark">
            Submit Inquiries
          </button>
          <p className="flex items-center justify-center gap-1.5 pt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">
            <Lock className="h-3 w-3" /> Confidential Data Protocol Enabled
          </p>
        </form>
      )}
    </div>
  );
}
