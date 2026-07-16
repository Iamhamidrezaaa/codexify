import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyMeta, PublicationTheme } from "../types";

type CaseStudyHeroProps = {
  meta: CaseStudyMeta;
  theme: PublicationTheme;
  className?: string;
};

/**
 * Quiet monumental opening — no CTA.
 * Theme-driven so future studies don't hardcode Atelier colors in the engine.
 */
export function CaseStudyHero({ meta, theme, className }: CaseStudyHeroProps) {
  return (
    <header
      id="chapter-hero"
      className={cn(
        "relative overflow-hidden scroll-mt-28 pt-[8.5rem] pb-[clamp(5rem,16vh,10rem)] md:pt-[10rem]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: theme.ground }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[10%] top-[38%] bottom-[22%] -z-10 border opacity-30"
        style={{ borderColor: theme.accent }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[50%] h-px w-[26%] -translate-x-1/2 -z-10"
        style={{ backgroundColor: theme.accent }}
        aria-hidden
      />

      <Grid>
        <div className="col-span-4 md:col-span-7 lg:col-span-8">
          <Reveal>
            <p
              className="type-number mb-[var(--space-5)]"
              style={{ color: theme.accent }}
            >
              {meta.number}
            </p>
            <p
              className="type-overline mb-[var(--space-7)]"
              style={{ color: theme.accent }}
            >
              {meta.industry}
              <span className="mx-3 opacity-40">·</span>
              {meta.year}
            </p>
            <h1
              className="type-display font-latin tracking-tight"
              style={{ color: theme.ink }}
            >
              {meta.name}
            </h1>
            <p
              className="type-heading mt-[var(--space-9)] max-w-[var(--measure-wide)] font-medium"
              style={{ color: theme.ink, opacity: 0.7 }}
            >
              {meta.statement}
            </p>
          </Reveal>
        </div>
      </Grid>
    </header>
  );
}
