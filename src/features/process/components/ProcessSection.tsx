import { Reveal } from "@/components/ui/Reveal";
import { processSettle } from "@/design/motion";
import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";

type ProcessSectionProps = {
  id: string;
  index: string;
  title: string;
  focuses?: string[];
  children: React.ReactNode;
  className?: string;
};

/**
 * Process chapter — equal weight stages.
 * Memorable interaction: large index stays sticky while the chapter is read.
 */
export function ProcessSection({
  id,
  index,
  title,
  focuses,
  children,
  className,
}: ProcessSectionProps) {
  return (
    <section
      id={`chapter-${id}`}
      className={cn("py-section-expansive scroll-mt-header", className)}
      aria-labelledby={`process-heading-${id}`}
    >
      <Grid>
        <div className="col-span-4 md:col-span-3 lg:col-span-3">
          <Reveal variants={processSettle}>
            <div className="lg:sticky lg:top-[28vh]">
              <p
                className="type-display font-latin tabular-nums tracking-tight text-ink/90"
                aria-hidden
              >
                {index}
              </p>
              <div className="mt-[var(--space-5)] flex items-center gap-[var(--space-3)]">
                <span className="h-px w-5 bg-border" aria-hidden />
                <h2
                  id={`process-heading-${id}`}
                  className="type-overline text-ink"
                >
                  {title}
                </h2>
              </div>
              {focuses && focuses.length > 0 ? (
                <ul className="mt-[var(--space-7)] space-y-[var(--space-2)]">
                  {focuses.map((focus) => (
                    <li key={focus} className="type-caption text-muted">
                      {focus}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </div>

        <div className="relative col-span-4 mt-[var(--space-9)] md:col-span-5 md:col-start-4 md:mt-0 lg:col-span-7 lg:col-start-5">
          {children}
        </div>
      </Grid>
    </section>
  );
}
