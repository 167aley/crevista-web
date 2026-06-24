"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="relative flex h-[78px] items-center justify-between gap-4">
        {/* Logo with tagline */}
        <Logo tagline className="h-11" />

        {/* Centered nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-ink/85 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/login" variant="outline" size="md" className="rounded-xl border-2 border-black px-7 font-semibold text-navy hover:bg-navy/5">
            Log In
          </ButtonLink>
          <ButtonLink href="/signup" variant="primary" size="md" className="rounded-xl px-7 font-semibold text-white">
            Sign Up
          </ButtonLink>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-navy/5"
            aria-label="Notifications"
          >
            <Image src="/Union.png" alt="Notifications" width={20} height={22} />
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-navy/5"
            aria-label="Language"
          >
            <Image src="/language1.png" alt="Language" width={24} height={24} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-navy lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-white transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0 border-t-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-navy/5"
            >
              {link.label}
              <ChevronDown className="h-4 w-4 -rotate-90 text-muted" />
            </Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <ButtonLink href="/login" variant="outline" size="md" onClick={() => setOpen(false)}>
              Log In
            </ButtonLink>
            <ButtonLink href="/signup" variant="primary" size="md" className="font-semibold text-white" onClick={() => setOpen(false)}>
              Sign Up
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
