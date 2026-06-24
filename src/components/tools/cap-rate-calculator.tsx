"use client";

import { useState } from "react";
import { formatUSD } from "@/lib/utils";

function Field({
  label, value, onChange, prefix, suffix,
}: {
  label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/80">{label}</span>
      <div className="mt-1.5 flex items-center rounded-lg border border-line bg-white focus-within:border-navy">
        {prefix && <span className="pl-3 text-muted">{prefix}</span>}
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          className="h-11 w-full bg-transparent px-3 text-sm text-ink focus:outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-muted">{suffix}</span>}
      </div>
    </label>
  );
}

export function CapRateCalculator() {
  const [price, setPrice] = useState("12500000");
  const [income, setIncome] = useState("1450000");
  const [expenses, setExpenses] = useState("520000");

  const p = parseFloat(price) || 0;
  const noi = (parseFloat(income) || 0) - (parseFloat(expenses) || 0);
  const capRate = p > 0 ? (noi / p) * 100 : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="grid lg:grid-cols-2">
        <div className="space-y-4 p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-navy">Cap Rate Calculator</h3>
          <Field label="Purchase Price" value={price} onChange={setPrice} prefix="$" />
          <Field label="Gross Annual Income" value={income} onChange={setIncome} prefix="$" />
          <Field label="Annual Operating Expenses" value={expenses} onChange={setExpenses} prefix="$" />
        </div>
        <div className="flex flex-col justify-center gap-5 bg-navy p-6 text-white lg:p-8">
          <div>
            <p className="text-sm text-white/60">Net Operating Income</p>
            <p className="text-2xl font-bold">{formatUSD(noi)}</p>
          </div>
          <div className="h-px bg-white/10" />
          <div>
            <p className="text-sm text-white/60">Capitalization Rate</p>
            <p className="text-5xl font-bold text-gold">{capRate.toFixed(2)}%</p>
            <p className="mt-2 text-xs text-white/50">
              Cap rate = NOI ÷ Purchase Price. A higher cap rate generally implies higher
              risk and return.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
