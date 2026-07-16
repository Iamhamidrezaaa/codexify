import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve, quietArrive } from "@/design/motion";

type PrincipleBlockProps = {
  statement: string;
  body?: string;
  className?: string;
  /** Compact process plate */
  label?: string;
  /** Manifesto scale */
  index?: string;
  aside?: string;
  variant?: "plate" | "manifesto";
};

/**
 * Shared principle plate — one component, two scales.
 * `plate` = Process (v1). `manifesto` = Studio (v2).
 */
export function PrincipleBlock({
  statement,
  body,
  className,
  label,
  index,
  aside,
  variant,
}: PrincipleBlockProps) {
  const mode =
    variant ?? (index || aside ? "manifesto" : "plate");

  if (mode === "manifesto") {
    return (
      <Reveal
        variants={editorialDissolve}
        as="article"
        className={cn(
          "grid gap-[var(--space-5)] border-t border-border pt-[var(--space-8)] md:grid-cols-12 md:gap-[var(--space-6)]",
          className,
        )}
      >
        {index ? (
          <p className="type-number md:col-span-2">{index}</p>
        ) : null}
        <div className={index ? "md:col-span-10" : "md:col-span-12"}>
          <h3 className="type-heading text-ink">{statement}</h3>
          {body ? (
            <p className="type-essay mt-[var(--space-5)] max-w-[var(--measure)] text-muted">
              {body}
            </p>
          ) : null}
          {aside ? (
            <p className="type-caption mt-[var(--space-5)] max-w-[var(--measure-narrow)] text-subtle">
              {aside}
            </p>
          ) : null}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal
      variants={quietArrive}
      as="article"
      className={cn("border-t border-border pt-[var(--space-6)]", className)}
    >
      {label ? <p className="type-overline text-muted">{label}</p> : null}
      <h3 className="type-title mt-[var(--space-4)] text-ink">{statement}</h3>
      {body ? (
        <p className="type-body-lg mt-[var(--space-4)] max-w-[var(--measure)] text-muted">
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
