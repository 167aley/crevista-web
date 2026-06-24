"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Left auth panel image, chosen per route:
 *  /login  → city skyline photo · /signup & others → navy skyline + logo */
export function AuthHero() {
  const pathname = usePathname();
  const src = pathname?.startsWith("/login") ? "/login-hero.png" : "/signup-hero.png";

  return (
    <Link href="/" className="relative hidden overflow-hidden lg:block" aria-label="CREVISTA home">
      <Image src={src} alt="CREVISTA" fill priority sizes="50vw" className="object-cover" />
    </Link>
  );
}
