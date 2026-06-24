import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-gold text-navy hover:bg-gold-dark shadow-soft",
        navy: "bg-navy text-white hover:bg-navy-700",
        outline: "border border-navy/20 bg-white text-navy hover:border-navy hover:bg-navy/5",
        "outline-light": "border border-white/40 bg-transparent text-white hover:bg-white/10",
        ghost: "text-navy hover:bg-navy/5",
        "ghost-light": "text-white/90 hover:bg-white/10",
        link: "text-gold underline-offset-4 hover:underline px-0 h-auto",
        soft: "bg-navy-50 text-navy hover:bg-navy-50/70",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & { className?: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & CommonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps & { href: string }) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
