import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudyMeta } from "../types";

type CaseStudyHeroProps = {
  meta: CaseStudyMeta;
  className?: string;
};

/**
 * Quiet monumental opening — no CTA.
 */
export function CaseStudyHero({ meta, className }: CaseStudyHeroProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden pt-[8.5rem] pb-[clamp(4rem,14vh,9rem)] md:pt-[10rem]",
        className,
      )}
    >
      {/* Immersive dark field — Atelier atmosphere without leaving Codexify chrome entirely */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.97]"
        style={{ backgroundColor: "#0B0B0C" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[10%] top-[35%] bottom-[20%] -z-10 border opacity-30"
        style={{ borderColor: "#8A9199" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[48%] h-px w-[28%] -translate-x-1/2 -z-10"
        style={{ backgroundColor: "#8A9199" }}
        aria-hidden
      />

      <Grid>
        <div className="col-span-4 md:col-span-7 lg:col-span-8">
          <Reveal>
            <p className="type-number mb-[var(--space-5)]" style={{ color: "#8A9199" }}>
              {meta.number}
            </p>
            <p className="type-overline mb-[var(--space-6)]" style={{ color: "#8A9199" }}>
              {meta.industry}
              <span className="mx-3 opacity-40">·</span>
              {meta.year}
            </p>
            <h1
              className="type-display font-latin tracking-tight"
              style={{ color: "#EDEAE4" }}
            >
              {meta.name}
            </h1>
            <p
              className="type-heading mt-[var(--space-8)] max-w-[var(--measure-wide)] font-medium"
              style={{ color: "#EDEAE4", opacity: 0.72 }}
            >
              {meta.statement}
            </p>
          </Reveal>
        </div>
      </Grid>
    </header>
  );
}
