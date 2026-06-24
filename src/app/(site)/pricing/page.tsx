import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PricingTable } from "@/components/pricing/pricing-table";
import { pricingFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing & Products",
  description: "Professional CRE tools for every stage of a deal — Pro and Market Intelligence plans.",
};

export default function PricingPage() {
  return (
    <div className="bg-surface">
      <Container className="py-16 lg:py-20">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy sm:text-[34px]">Choose Your CREvista Plan</h1>
          <p className="mt-2 text-muted">Professional tools for every stage of a CRE deal</p>
        </div>

        {/* Plans */}
        <div className="mt-10">
          <PricingTable />
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-8">
            {pricingFaqs.map((f) => (
              <details key={f.q} className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-navy">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
