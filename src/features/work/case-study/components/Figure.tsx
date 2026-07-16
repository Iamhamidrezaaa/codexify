import { cn } from "@/design/utilities/cn";

type FigureProps = {
  figure: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Numbered publication figure — micro-typography as craft, not chrome.
 */
export function Figure({ figure, caption, children, className }: FigureProps) {
  return (
    <figure className={cn("w-full", className)}>
      {children}
      <figcaption className="mt-[var(--space-5)] flex items-baseline gap-[var(--space-5)] border-t border-[color:var(--hairline)] pt-[var(--space-4)]">
        <span className="type-number shrink-0 tracking-[0.08em] text-muted">
          شکل&nbsp;{figure}
        </span>
        <span className="type-caption max-w-[var(--measure)] text-muted leading-[1.55]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
