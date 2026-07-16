import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";

type ProseProps = {
  paragraphs: string[];
  className?: string;
  /** Alternate short/long rhythm emphasis */
  measure?: "narrow" | "default" | "wide";
};

const MEASURE = {
  narrow: "max-w-[var(--measure-narrow)]",
  default: "max-w-[var(--measure)]",
  wide: "max-w-[var(--measure-wide)]",
} as const;

/**
 * Editorial body — calm vertical rhythm, token measures only.
 */
export function Prose({
  paragraphs,
  className,
  measure = "default",
}: ProseProps) {
  return (
    <div className={cn("space-y-[var(--space-7)]", className)}>
      {paragraphs.map((paragraph, i) => (
        <Reveal key={`${i}-${paragraph.slice(0, 16)}`} delay={i * 0.05}>
          <p
            className={cn(
              "type-body-lg text-muted",
              MEASURE[measure],
              i === 0 && "text-ink/80",
            )}
          >
            {paragraph}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
