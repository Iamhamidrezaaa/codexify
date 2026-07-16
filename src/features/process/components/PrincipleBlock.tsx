import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type PrincipleBlockProps = {
  label: string;
  statement: string;
  body?: string;
  className?: string;
};

/**
 * Quiet principle plate — statement first, explanation second.
 * Not a feature card. Not a marketing pillar.
 */
export function PrincipleBlock({
  label,
  statement,
  body,
  className,
}: PrincipleBlockProps) {
  return (
    <Reveal
      variants={editorialDissolve}
      as="article"
      className={cn(
        "border-t border-border pt-[var(--space-6)]",
        className,
      )}
    >
      <p className="type-overline text-muted">{label}</p>
      <h3 className="type-title mt-[var(--space-4)] text-ink">{statement}</h3>
      {body ? (
        <p className="type-body-lg mt-[var(--space-4)] max-w-[var(--measure)] text-muted">
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
