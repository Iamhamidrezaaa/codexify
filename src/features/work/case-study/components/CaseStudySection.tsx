import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type CaseStudySectionProps = {
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Expansive padding for quieter chapters */
  expansive?: boolean;
};

export function CaseStudySection({
  index,
  title,
  children,
  className,
  expansive = false,
}: CaseStudySectionProps) {
  return (
    <section
      className={cn(
        expansive ? "py-section-expansive" : "py-section",
        className,
      )}
      aria-labelledby={`cs-${index}`}
    >
      <Grid>
        <div className="col-span-4 md:col-span-3 lg:col-span-3">
          <Reveal variants={editorialDissolve}>
            <div className="flex items-center gap-[var(--space-3)] lg:sticky lg:top-[30vh]">
              <span className="type-number">{index}</span>
              <span className="h-px w-5 bg-border" aria-hidden />
              <h2 id={`cs-${index}`} className="type-overline">
                {title}
              </h2>
            </div>
          </Reveal>
        </div>
        <div className="col-span-4 mt-[var(--space-8)] md:col-span-5 md:col-start-4 md:mt-0 lg:col-span-7 lg:col-start-5">
          {children}
        </div>
      </Grid>
    </section>
  );
}
