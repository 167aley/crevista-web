import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { footerColumns } from "@/lib/data";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.5.2 15.6 0 14.6 0 12.3 0 11 1.4 11 3.9V6H8v3h3v9h3V9Z" />
    </svg>
  );
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.2 2H21l-6.5 7.4L22 22h-6.3l-4.9-6.4L5.1 22H2.3l6.9-7.9L2 2h6.4l4.4 5.9L18.2 2Zm-1.1 18h1.7L7 3.8H5.2L17.1 20Z" />
    </svg>
  );
}
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { icon: XIcon, href: "#", label: "X" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-black">
              It is a long established fact that a reader will be distracted by the
              text readable content of a page when lorem dummy looking at its layout.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="text-base font-semibold text-black">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-black transition-colors hover:text-gold-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Call for service + Follow */}
          <div className="lg:col-span-4">
            <h3 className="text-base font-semibold text-black">Call For Service</h3>
            <div className="mt-4 flex items-center gap-3">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center">
                <Image src="/Rectangle.png" alt="" fill sizes="48px" className="object-contain" />
                <Image src="/telephone.png" alt="" width={22} height={22} className="relative z-10" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black">
                  Call Us Today
                </p>
                <a href="tel:+13854523598" className="text-xl font-bold text-black">
                  385.452.3598
                </a>
              </div>
            </div>

            <h3 className="mt-7 text-sm font-semibold uppercase tracking-wide text-black">Follow Us</h3>
            <div className="mt-3 flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-sm text-black sm:flex-row">
          <p>© 2026 CREVISTA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-dark">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-dark">Terms &amp; Conditions</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
