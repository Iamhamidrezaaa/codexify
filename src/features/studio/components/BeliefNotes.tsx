import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";
import type { ManifestoBelief } from "../types";

type BeliefNotesProps = {
  items: ManifestoBelief[];
  className?: string;
};

/**
 * Editorial belief notes — pencil marks in a book margin.
 * Static and quiet; the memorable interaction lives on the opening statement.
 */
export function BeliefNotes({ items, className }: BeliefNotesProps) {
  return (
    <ul className={cn("space-y-[var(--space-8)]", className)}>
      {items.map((item, i) => (
        <Reveal key={item.id} variants={editorialDissolve} delay={i * 0.04} as="li">
          <div className="border-s border-border ps-[var(--space-5)]">
            <p className="type-body-lg max-w-[var(--measure)] leading-[1.75] text-muted">
              {item.text}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
