"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthInput, PasswordInput } from "./fields";

function GoogleIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="text-[28px] font-bold text-navy">Log In</h1>
      <p className="mt-1 text-sm text-muted">Welcome back. Sign in to your account.</p>

      <form
        onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1100); }}
        className="mt-7 space-y-4"
      >
        <AuthInput label="Email" type="email" required placeholder="you@company.com" autoComplete="email" />
        <div>
          <PasswordInput
            label="Password" required placeholder="••••••••••••"
            value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
          />
          <div className="mt-2.5 flex items-center justify-between">
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-navy/70">
              <input type="checkbox" className="h-4 w-4 rounded border-line accent-navy" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-dark hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button type="submit" variant="navy" size="lg" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : "Log in"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs font-medium text-muted">or continue with</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* Social — full width stacked */}
      <div className="space-y-3">
        <button type="button" className="flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-line bg-white text-sm font-medium text-ink transition-colors hover:bg-surface">
          <GoogleIcon /> Google
        </button>
        <button type="button" className="flex h-12 w-full items-center justify-center gap-2.5 rounded-lg border border-line bg-white text-sm font-medium text-ink transition-colors hover:bg-surface">
          <LinkedInIcon /> LinkedIn
        </button>
      </div>

      <p className="mt-7 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-gold-dark hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}
