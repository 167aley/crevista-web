"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { AuthHero } from "./auth-hero";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Forgot Password → centered card on the line-art building background
  if (pathname?.startsWith("/forgot-password")) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#f8f9fa]">
        <Image src="/forgotpasswordbg.png" alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        <header className="relative z-10 bg-white shadow-sm">
          <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-6">
            <Logo />
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-navy">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </div>
        </header>
        <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
          <div className="w-full max-w-[560px] rounded-2xl bg-white p-8 shadow-pop sm:p-12">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Login / Sign Up → split-screen
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthHero />
      <div className="flex flex-col bg-[#f8f9fa]">
        <div className="flex items-center justify-between p-6">
          <Logo className="h-9 lg:hidden" />
          <Link href="/" className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-navy">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="w-full max-w-[440px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
