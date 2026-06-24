import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold text-navy sm:text-[28px] sm:leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-[15px] leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
