import { cn } from "@/design/utilities/cn";

type MarginNoteProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Quiet side annotation — desktop only, never competes with body.
 */
export function MarginNote({ children, className }: MarginNoteProps) {
  return (
    <aside
      className={cn(
        "type-caption text-muted",
        "mt-[var(--space-4)] max-w-[14rem]",
        "lg:mt-0 lg:absolute lg:end-0 lg:top-0 lg:translate-x-0",
        "xl:end-[-1rem] xl:max-w-[11rem]",
        className,
      )}
    >
      {children}
    </aside>
  );
}
