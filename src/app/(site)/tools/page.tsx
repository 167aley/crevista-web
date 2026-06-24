import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DataIcon } from "@/components/ui/icon";
import { tools } from "@/lib/data";

export const metadata: Metadata = {
  title: "Professional CRE Tools",
  description: "Built for brokers, investors, and analysts — BOV, underwriting, lease-vs-buy, and comp search.",
};

export default function ToolsPage() {
  return (
    <div className="bg-surface">
      <Container className="py-16 lg:py-20">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy sm:text-[34px]">Professional CRE Tools</h1>
          <p className="mt-2 text-muted">Built for brokers, investors, and analysts — right when you need them</p>
        </div>

        {/* Tool cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <div key={tool.slug} className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
              <DataIcon name={tool.icon} className="h-10 w-10 text-gold-dark" />
              <h3 className="mt-5 text-lg font-bold text-navy">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>
              <Link
                href={`/tools/${tool.slug}`}
                className="mt-6 inline-flex h-11 w-fit items-center justify-center rounded-lg bg-[#0e7c86] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0a626b]"
              >
                Launch Tool
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
