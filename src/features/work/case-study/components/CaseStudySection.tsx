import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type CaseStudySectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  expansive?: boolean;
  tone?: "default" | "inverse";
  theme?: {
    ground: string;
    ink: string;
    muted: string;
    accent: string;
  };
};

export function CaseStudySection({
  id,
  index,
  title,
  children,
  className,
  expansive = false,
  tone = "default",
  theme,
}: CaseStudySectionProps) {
  const inverse = tone === "inverse" && theme;

  return (
    <section
      id={`chapter-${id}`}
      className={cn(
        expansive ? "py-section-expansive" : "py-section",
        "scroll-mt-28",
        className,
      )}
      style={
        inverse
          ? { backgroundColor: theme.ground, color: theme.ink }
          : undefined
      }
      aria-labelledby={`cs-heading-${id}`}
    >
      <Grid>
        <div className="col-span-4 md:col-span-3 lg:col-span-3">
          <Reveal variants={editorialDissolve}>
            <div className="flex items-center gap-[var(--space-3)] lg:sticky lg:top-[32vh]">
              <span
                className="type-number"
                style={inverse ? { color: theme.accent } : undefined}
              >
                {index}
              </span>
              <span
                className={cn("h-px w-5", !inverse && "bg-border")}
                style={
                  inverse ? { backgroundColor: `${theme.accent}55` } : undefined
                }
                aria-hidden
              />
              <h2
                id={`cs-heading-${id}`}
                className="type-overline"
                style={inverse ? { color: theme.accent } : undefined}
              >
                {title}
              </h2>
            </div>
          </Reveal>
        </div>
        <div
          className="relative col-span-4 mt-[var(--space-9)] md:col-span-5 md:col-start-4 md:mt-0 lg:col-span-7 lg:col-start-5"
          style={
            inverse
              ? ({ ["--fg-muted" as string]: theme.muted } as React.CSSProperties)
              : undefined
          }
        >
          {children}
        </div>
      </Grid>
    </section>
  );
}
