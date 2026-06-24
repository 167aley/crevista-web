"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthInput, PasswordInput, labelClass } from "./fields";

const roles = ["Investor", "Broker / Agent", "Lender", "Developer", "Property Manager", "Other"];

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-navy">Check your inbox</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          We&apos;ve sent a verification link to your email. Confirm it to activate your
          14-day free trial.
        </p>
        <Button variant="navy" size="lg" className="mt-6 w-full" onClick={() => setDone(false)}>
          Back to sign up
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-[28px] font-bold text-navy">Create Account</h1>
      <p className="mt-1 text-sm text-muted">Start your 14-day free trial today.</p>

      <form
        onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1100); }}
        className="mt-7 space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <AuthInput label="First Name" required placeholder="John" autoComplete="given-name" />
          <AuthInput label="Last Name" required placeholder="Doe" autoComplete="family-name" />
        </div>
        <AuthInput label="Email" type="email" required placeholder="you@company.com" autoComplete="email" />

        <label className="block">
          <span className={labelClass}>User Type</span>
          <select
            defaultValue=""
            required
            className="mt-1.5 h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10"
          >
            <option value="" disabled>Select Your role</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>

        <PasswordInput
          label="Password" required showStrength placeholder="••••••••••••"
          value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"
        />
        <div>
          <PasswordInput
            label="Confirm Password" required placeholder="••••••••••••"
            value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password"
          />
          {confirm.length > 0 && confirm !== password && (
            <p className="mt-1.5 text-xs text-danger">Passwords don&apos;t match.</p>
          )}
        </div>

        <label className="flex items-start gap-2.5 pt-1 text-sm text-muted">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-line accent-navy" />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-gold-dark hover:underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="font-medium text-gold-dark hover:underline">Privacy Policy</Link>.
          </span>
        </label>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading || (confirm.length > 0 && confirm !== password)}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</> : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-gold-dark hover:underline">Log In</Link>
      </p>
    </div>
  );
}
