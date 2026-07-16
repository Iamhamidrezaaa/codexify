import { cn } from "@/design/utilities/cn";

type GridProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "ul";
};

/**
 * 12-column editorial grid.
 * Mobile 4 · Tablet 8 · Desktop 12
 * Gutters and margins from design tokens.
 */
export function Grid({ children, className, as: Tag = "div" }: GridProps) {
  return (
    <Tag
      className={cn(
        "mx-auto grid w-full max-w-[var(--container-wide)]",
        "grid-cols-4 gap-x-[var(--gutter-mobile)] px-[var(--margin-mobile)]",
        "md:grid-cols-8 md:gap-x-[var(--gutter-tablet)] md:px-[var(--margin-tablet)]",
        "lg:grid-cols-12 lg:gap-x-[var(--gutter-desktop)] lg:px-[var(--margin-desktop)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
