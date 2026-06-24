import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium",
  {
    variants: {
      variant: {
        navy: "bg-navy text-white",
        gold: "bg-gold text-navy",
        soft: "bg-navy-50 text-navy",
        white: "bg-white/90 text-navy backdrop-blur",
        new: "bg-success text-white",
        "price-drop": "bg-danger text-white",
        "under-contract": "bg-navy-700 text-white",
        outline: "border border-line bg-white text-muted",
        success: "bg-success/12 text-success",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "soft", size: "sm" },
  },
);

export function Badge({
  className,
  variant,
  size,
  children,
}: VariantProps<typeof badgeVariants> & { className?: string; children: React.ReactNode }) {
  return <span className={cn(badgeVariants({ variant, size }), className)}>{children}</span>;
}
