import { cn } from "@/design/utilities/cn";
import { ColorPalette } from "./ColorPalette";
import { TypographyShowcase } from "./TypographyShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { BreathingMoment } from "./BreathingMoment";
import type { CaseStudyContent } from "../types";

type DesignSystemBlockProps = {
  system: CaseStudyContent["system"];
  className?: string;
};

/**
 * Collectible design-system chapter — plates for grid, space, color, type.
 */
export function DesignSystemBlock({ system, className }: DesignSystemBlockProps) {
  return (
    <div className={cn("space-y-[var(--space-11)]", className)}>
      <Reveal>
        <SystemPlate title="شبکه">
          <p className="type-body-lg max-w-[var(--measure)] text-muted">
            {system.grid}
          </p>
          <GridDiagram className="mt-[var(--space-6)]" />
        </SystemPlate>
      </Reveal>

      <Reveal delay={0.05}>
        <SystemPlate title="فاصله">
          <p className="type-body-lg max-w-[var(--measure)] text-muted">
            {system.spacing}
          </p>
          <SpacingDiagram className="mt-[var(--space-6)]" />
        </SystemPlate>
      </Reveal>

      <BreathingMoment size="sm" />

      <Reveal delay={0.06}>
        <SystemPlate title="رنگ">
          <ColorPalette colors={system.colors} />
        </SystemPlate>
      </Reveal>

      <Reveal delay={0.08}>
        <SystemPlate title="تایپوگرافی">
          <TypographyShowcase roles={system.typeRoles} />
        </SystemPlate>
      </Reveal>

      <div className="grid gap-[var(--space-8)] md:grid-cols-2">
        <Reveal delay={0.1}>
          <SystemPlate title="اجزا">
            <ul className="space-y-3">
              {system.components.map((item) => (
                <li key={item} className="type-body text-muted">
                  — {item}
                </li>
              ))}
            </ul>
          </SystemPlate>
        </Reveal>
        <Reveal delay={0.12}>
          <SystemPlate title="اصول تعامل">
            <ul className="space-y-3">
              {system.interaction.map((item) => (
                <li key={item} className="type-body text-muted">
                  — {item}
                </li>
              ))}
            </ul>
          </SystemPlate>
        </Reveal>
      </div>
    </div>
  );
}

function SystemPlate({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border p-[var(--space-5)] md:p-[var(--space-6)]">
      <p className="type-overline mb-[var(--space-5)]">{title}</p>
      {children}
    </div>
  );
}

function GridDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid h-28 grid-cols-12 gap-1 border border-border p-2 md:h-36",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-full bg-ink/[0.04]",
            i < 4 && "bg-ink/[0.08]",
            i >= 5 && i < 12 && "bg-accent/10",
          )}
        />
      ))}
    </div>
  );
}

function SpacingDiagram({ className }: { className?: string }) {
  const steps = [
    "var(--space-2)",
    "var(--space-3)",
    "var(--space-4)",
    "var(--space-5)",
    "var(--space-6)",
    "var(--space-8)",
  ];
  return (
    <div className={cn("flex items-end gap-3", className)} aria-hidden>
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 flex-col items-center gap-2">
          <div className="w-full bg-ink/10" style={{ height: step }} />
          <span className="type-caption">{i + 1}</span>
        </div>
      ))}
    </div>
  );
}
