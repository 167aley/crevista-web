import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { HeroSearch } from "@/components/search/hero-search";
import { DataIcon } from "@/components/ui/icon";
import { propertyTypes } from "@/lib/data";
import { propertyTypeImages, featureImages } from "@/lib/assets";

export default function HomePage() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      {/* Solid navy base + geometric texture filling the whole hero (anchored top) */}
      <section className="relative bg-navy">
        {/* background layer — clipped to the hero so the image/diagonal don't spill,
            but the section itself does NOT clip (so the search dropdown can overflow) */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/herosectionhomebg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/30 to-navy/55" />
          {/* responsive diagonal white cut at the bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-10 bg-white sm:h-16 lg:h-24"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
          />
        </div>

        {/* content — z-20 keeps the open dropdown above the next section */}
        <div className="relative z-20 mx-auto w-full max-w-[1100px] px-4 pb-24 pt-12 text-center sm:px-6 sm:pb-32 sm:pt-20 lg:pb-40 lg:pt-24">
          <h1 className="mx-auto max-w-[1066px] text-balance text-[26px] font-bold leading-tight text-white sm:text-[42px] lg:text-[50px]">
            Find, Analyze &amp; Close Commercial Real Estate Deals
          </h1>
          <p className="mx-auto mt-4 max-w-[640px] text-sm font-medium text-white/85 sm:text-[18px]">
            Search 100,000+ listings across every commercial asset class
          </p>

          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* ===================== BROWSE BY PROPERTY TYPE ===================== */}
      {/* node 164:185 — eyebrow + heading + gold rule + 10 portrait tiles */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Asset Categories
            </p>
            <h2 className="mt-2 text-[26px] font-extrabold text-navy sm:text-[35px]">
              Browse by Property Type
            </h2>
            <span className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gold" />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {propertyTypes.map((type) => {
              // PNG tiles already have the badge + label baked in (Figma export).
              // SVG tiles (e.g. Land) are plain images, so draw the badge + label on top.
              const needsOverlay = propertyTypeImages[type.id]?.endsWith(".svg");
              return (
                <Link
                  key={type.id}
                  href={`/search?deal=sale&type=${type.id}`}
                  className="group relative aspect-[234/335] overflow-hidden rounded-[9px]"
                >
                  <Image
                    src={propertyTypeImages[type.id]}
                    alt={type.label}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {needsOverlay && (
                    <>
                      {/* bottom gradient for label legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
                      {/* circular icon badge — top-left */}
                      <span
                        className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full text-white shadow-md ring-2 ring-white/20"
                        style={{ backgroundColor: type.color }}
                      >
                        <DataIcon name={type.icon} className="h-6 w-6" />
                      </span>
                      {/* white label — bottom-left (sized to match the baked-in tile labels) */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-[22px] font-extrabold capitalize tracking-wide text-white drop-shadow">
                          {type.label}
                        </p>
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== CTA BAND — PRO + INTELLIGENCE ===================== */}
      {/* node 164:160..166 — two image cards, dark text, gold rule between */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1320px] gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FeatureCard
            image={featureImages.pro}
            title="CREvista Pro"
            description="Unlimited listings, advanced filters & direct broker contact. Built for the modern commercial real estate professional."
            ctaLabel="Start Free Trial"
            ctaVariant="navy"
            href="/pricing"
          />
          <FeatureCard
            image={featureImages.intelligence}
            title="Market Intelligence"
            description="Comp data, BOV reports, submarket heat maps & deal analytics. Power your decisions with architectural precision data."
            ctaLabel="Get Intelligence"
            ctaVariant="primary"
            href="/insights"
          />
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  image, title, description, ctaLabel, ctaVariant, href,
}: {
  image: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaVariant: "navy" | "primary";
  href: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width:1024px) 100vw, 50vw"
        className="object-cover"
      />
      {/* white gradient — kept light so the image stays visible (fades to clear) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
      <div className="relative px-6 py-10 text-center sm:px-10">
        <h3 className="text-[26px] font-extrabold text-navy-700 sm:text-[35px]">{title}</h3>
        <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-navy-700 sm:text-[17px]">
          {description}
        </p>
        <ButtonLink href={href} variant={ctaVariant} size="md" className="mt-6 rounded-lg px-12">
          {ctaLabel}
        </ButtonLink>
        {/* spacer so the image shows beneath the faded text block */}
        <div className="h-40 sm:h-52" />
      </div>
    </div>
  );
}
