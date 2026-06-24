import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * CREVISTA logo — the official mark exported from Figma
 * (green location-pin with building skyline + "CRE" / "vista" wordmark).
 *  - variant "dark"  → full-color logo (for light backgrounds)
 *  - variant "light" → all-white logo (for navy / dark backgrounds)
 *  - tagline → includes "See the Market. Seize the Opportunity."
 */
export function Logo({
  className,
  variant = "dark",
  href = "/",
  tagline = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  href?: string | null;
  tagline?: boolean;
}) {
  const src =
    variant === "light"
      ? tagline
        ? "/logo-full-white.png"
        : "/logo-white.png"
      : tagline
        ? "/logo-full.png"
        : "/logo.png";

  const img = (
    <Image
      src={src}
      alt="CREVISTA"
      width={1009}
      height={309}
      priority
      className={cn("w-auto", tagline ? "h-12" : "h-9", className)}
    />
  );

  if (href === null) return img;
  return (
    <Link href={href} aria-label="CREVISTA home" className="inline-flex shrink-0">
      {img}
    </Link>
  );
}
