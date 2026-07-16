import { cn } from "@/design/utilities/cn";

type FigureProps = {
  figure: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Numbered publication figure — captions are part of the reading, not decoration.
 */
export function Figure({ figure, caption, children, className }: FigureProps) {
  return (
    <figure className={cn("w-full", className)}>
      {children}
      <figcaption className="mt-[var(--space-4)] flex gap-[var(--space-4)] border-t border-border pt-[var(--space-3)]">
        <span className="type-number shrink-0">شکل {figure}</span>
        <span className="type-caption text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}
