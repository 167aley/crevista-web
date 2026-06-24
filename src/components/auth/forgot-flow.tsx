"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MailSearch, Loader2, Lock } from "lucide-react";
import { AuthInput, PasswordInput } from "./fields";

type Step = 1 | 2 | 3 | 4;

const tealBtn =
  "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0e7c86] font-semibold text-white transition-colors hover:bg-[#0a626b] disabled:opacity-60";
const goldOutlineBtn =
  "flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gold font-semibold text-gold-dark transition-colors hover:bg-gold/5";

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold-dark">
      {children}
    </div>
  );
}

export function ForgotFlow() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const advance = (to: Step) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(to); }, 900);
  };

  return (
    <div className="text-center">
      {step === 1 && (
        <>
          <IconBadge><Lock className="h-7 w-7" /></IconBadge>
          <h1 className="mt-5 text-[26px] font-bold text-navy">Forgot Password</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Enter the email address associated with your account and we&apos;ll send you a
            link to reset your password.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); advance(2); }} className="mt-7 space-y-4 text-left">
            <AuthInput label="Email" type="email" required placeholder="you@company.com" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className={tealBtn} disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send Reset Link"}
            </button>
          </form>
          <BackToLogin />
        </>
      )}

      {step === 2 && (
        <>
          <IconBadge><MailSearch className="h-7 w-7" /></IconBadge>
          <h1 className="mt-5 text-[26px] font-bold text-navy">Check Your Email</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            We&apos;ve sent a password reset link to your email address. Please check your
            inbox and follow the instructions.
          </p>
          <div className="mt-7 space-y-3 text-left">
            <AuthInput label="Email" type="email" readOnly value={email || "you@company.com"} />
            <button onClick={() => setStep(3)} className={tealBtn}>Open Email App</button>
            <Link href="/login" className={goldOutlineBtn}>Back To Login</Link>
          </div>
          <p className="mt-5 text-center text-sm text-muted">
            Didn&apos;t Received Email?{" "}
            <button onClick={() => advance(2)} className="font-semibold text-gold-dark hover:underline">Resend Link</button>
          </p>
        </>
      )}

      {step === 3 && (
        <>
          <IconBadge><Lock className="h-7 w-7" /></IconBadge>
          <h1 className="mt-5 text-[26px] font-bold text-navy">Set New Password</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Please choose a new, strong password for your account.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); if (pwd && pwd === confirm) advance(4); }} className="mt-7 space-y-4 text-left">
            <PasswordInput label="New Password" required showStrength placeholder="Enter new password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <div>
              <PasswordInput label="Confirm Password" required placeholder="Re-enter new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              {confirm.length > 0 && confirm !== pwd && (
                <p className="mt-1.5 text-xs text-danger">Passwords don&apos;t match.</p>
              )}
            </div>
            <button type="submit" className={tealBtn} disabled={loading || !pwd || pwd !== confirm}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : "Save New Password"}
            </button>
          </form>
          <Link href="/login" className="mt-6 inline-block text-sm font-medium text-muted transition-colors hover:text-navy">
            Cancel And Go Back
          </Link>
        </>
      )}

      {step === 4 && (
        <>
          <IconBadge><Lock className="h-7 w-7" /></IconBadge>
          <h1 className="mt-5 text-[26px] font-bold text-navy">Password Updated</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Your password has been successfully reset. You can now log in with your new
            credentials.
          </p>
          <div className="mt-7 space-y-4 text-left">
            <PasswordInput label="New Password" readOnly value={pwd || "ResetPass123!"} />
            <PasswordInput label="Confirm Password" readOnly value={confirm || "ResetPass123!"} />
            <Link href="/login" className={tealBtn}>Login Now</Link>
          </div>
        </>
      )}
    </div>
  );
}

function BackToLogin() {
  return (
    <Link href="/login" className="mt-6 inline-block text-sm font-medium text-muted transition-colors hover:text-navy">
      Back To Log In
    </Link>
  );
}
