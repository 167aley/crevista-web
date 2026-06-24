"use client";

import { useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const labelClass = "text-[11px] font-semibold uppercase tracking-[0.08em] text-navy/70";

export function AuthInput({
  label, icon: Icon, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: LucideIcon }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative mt-1.5">
        {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />}
        <input
          {...props}
          className={cn(
            "h-12 w-full rounded-lg border border-line bg-white text-sm text-ink placeholder:text-muted/60 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10",
            Icon ? "pl-10 pr-3" : "px-3.5",
          )}
        />
      </div>
    </label>
  );
}

export { labelClass };

export function PasswordInput({
  label, showStrength, value, onChange, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  showStrength?: boolean;
}) {
  const [show, setShow] = useState(false);
  const pwd = (value as string) ?? "";
  const score = strength(pwd);

  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative mt-1.5">
        <input
          {...props}
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          className="h-12 w-full rounded-lg border border-line bg-white px-3.5 pr-11 text-sm text-ink placeholder:text-muted/60 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted hover:text-navy"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>
      {showStrength && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">Password Strength</span>
            {pwd.length > 0 && (
              <span className="text-[10px] font-bold uppercase tracking-wide text-navy">{strengthLabel(score)}</span>
            )}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn("h-1.5 flex-1 rounded-full transition-colors", i < score ? "bg-gold" : "bg-line")}
              />
            ))}
          </div>
          <p className="mt-1.5 text-[11px] italic text-muted">
            Hint: Include a mix of uppercase, symbols and numbers.
          </p>
        </div>
      )}
    </label>
  );
}

function strength(pwd: string) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
  if (/\d/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s;
}
function strengthColor(s: number) {
  return s <= 1 ? "bg-danger" : s === 2 ? "bg-gold" : s === 3 ? "bg-info" : "bg-success";
}
function strengthLabel(s: number) {
  return ["Weak", "Weak", "Fair", "Good", "Great"][s];
}

export function SocialRow() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white text-sm font-medium text-ink transition-colors hover:bg-surface">
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
        </svg>
        Google
      </button>
      <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white text-sm font-medium text-ink transition-colors hover:bg-surface">
        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
          <path fill="#F25022" d="M2 2h9.5v9.5H2z" /><path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
          <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" /><path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
        </svg>
        Microsoft
      </button>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-medium text-muted">OR</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
