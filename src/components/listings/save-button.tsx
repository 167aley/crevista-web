"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveButton({ className }: { className?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved" : "Save property"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved((v) => !v);
      }}
      className={cn(
        "grid place-items-center rounded-full bg-white/90 text-navy shadow-soft transition-colors hover:bg-white",
        saved ? "text-danger" : "hover:text-danger",
        className,
      )}
    >
      <Heart className={cn("h-[18px] w-[18px]", saved && "fill-current")} />
    </button>
  );
}
