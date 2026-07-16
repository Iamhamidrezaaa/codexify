"use client";

import { cn } from "@/design/utilities/cn";
import type { ExhibitionProject } from "@/features/work/types";

type ProjectVisualProps = {
  project: ExhibitionProject;
  active?: boolean;
  className?: string;
};

/**
 * Brand-led abstract composition — no device mockups.
 * Personality comes from motif + palette.
 */
export function ProjectVisual({
  project,
  active = false,
  className,
}: ProjectVisualProps) {
  const { ground, accent, ink, motif } = project.visual;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9] lg:aspect-[2/1]",
        "transition-transform duration-[1.2s] ease-out",
        active && "lg:scale-[1.01]",
        className,
      )}
      style={{ backgroundColor: ground, color: ink }}
      aria-hidden
    >
      {motif === "noir" && <NoirMotif accent={accent} ink={ink} />}
      {motif === "plan" && <PlanMotif accent={accent} ink={ink} />}
      {motif === "crop" && <CropMotif accent={accent} ink={ink} />}
      {motif === "columns" && <ColumnsMotif accent={accent} ink={ink} />}
      {motif === "mist" && <MistMotif accent={accent} ink={ink} />}
      {motif === "grain" && <GrainMotif accent={accent} ink={ink} />}

      <span
        className="pointer-events-none absolute bottom-[var(--space-5)] start-[var(--space-5)] font-latin type-caption opacity-50 md:bottom-[var(--space-6)] md:start-[var(--space-6)]"
        style={{ color: ink }}
      >
        {project.name}
      </span>
    </div>
  );
}

function NoirMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-[18%_22%] border transition-transform duration-[1.4s] ease-out group-hover/project:scale-[1.03]"
        style={{ borderColor: accent }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[1px] w-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute left-1/2 top-[42%] h-3 w-3 -translate-x-1/2 rounded-full"
        style={{ backgroundColor: ink, opacity: 0.85 }}
      />
    </>
  );
}

function PlanMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-x-[12%] top-[28%] h-px"
        style={{ backgroundColor: ink, opacity: 0.25 }}
      />
      <div
        className="absolute inset-y-[18%] start-[18%] w-px"
        style={{ backgroundColor: ink, opacity: 0.25 }}
      />
      <div
        className="absolute bottom-[22%] end-[16%] top-[34%] w-[38%] border transition-transform duration-[1.4s] ease-out group-hover/project:translate-y-[-4px]"
        style={{ borderColor: accent }}
      />
      <div
        className="absolute bottom-[22%] end-[16%] h-[28%] w-[18%] border-e border-t"
        style={{ borderColor: ink, opacity: 0.35 }}
      />
    </>
  );
}

function CropMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-y-0 end-0 w-[42%] transition-transform duration-[1.4s] ease-out group-hover/project:translate-x-[-2%]"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute inset-y-[12%] start-[10%] w-[36%] border"
        style={{ borderColor: ink, opacity: 0.2 }}
      />
      <div
        className="absolute bottom-[18%] start-[14%] h-px w-[28%]"
        style={{ backgroundColor: ink, opacity: 0.45 }}
      />
    </>
  );
}

function ColumnsMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      {[18, 34, 50, 66].map((left) => (
        <div
          key={left}
          className="absolute bottom-[20%] top-[20%] w-px"
          style={{
            insetInlineStart: `${left}%`,
            backgroundColor: ink,
            opacity: 0.18,
          }}
        />
      ))}
      <div
        className="absolute bottom-[20%] start-[18%] end-[18%] h-px"
        style={{ backgroundColor: accent, opacity: 0.7 }}
      />
      <div
        className="absolute top-[20%] start-[18%] end-[34%] h-px transition-opacity duration-700 group-hover/project:opacity-100"
        style={{ backgroundColor: ink, opacity: 0.35 }}
      />
    </>
  );
}

function MistMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-[20%] rounded-full opacity-40 transition-transform duration-[1.6s] ease-out group-hover/project:scale-105"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${accent} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-x-[22%] bottom-[30%] top-[30%] border"
        style={{ borderColor: ink, opacity: 0.12 }}
      />
    </>
  );
}

function GrainMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-y-0 start-0 w-[28%]"
        style={{
          background: `repeating-linear-gradient(
            -12deg,
            ${accent}22,
            ${accent}22 2px,
            transparent 2px,
            transparent 7px
          )`,
        }}
      />
      <div
        className="absolute inset-[16%_14%_16%_36%] border transition-transform duration-[1.4s] ease-out group-hover/project:translate-y-[-3px]"
        style={{ borderColor: ink, opacity: 0.35 }}
      />
      <div
        className="absolute bottom-[16%] end-[14%] h-[22%] w-[22%]"
        style={{ backgroundColor: accent, opacity: 0.55 }}
      />
    </>
  );
}
