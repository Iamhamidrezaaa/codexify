"use client";

import { cn } from "@/design/utilities/cn";
import type { ExhibitionProject } from "@/features/work/types";

type ProjectVisualProps = {
  project: ExhibitionProject;
  active?: boolean;
  className?: string;
};

/**
 * Brand-led editorial plate — material presence, no devices.
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
        "composition-frame relative aspect-[16/10] w-full overflow-hidden shadow-architectural md:aspect-[16/9] lg:aspect-[2/1]",
        "transition-[transform,box-shadow] duration-[1.2s] ease-out",
        active && "lg:scale-[1.008]",
        className,
      )}
      style={{ backgroundColor: ground, color: ink }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: ink, mixBlendMode: "soft-light", opacity: 0.03 }}
      />

      {motif === "noir" && <NoirMotif accent={accent} ink={ink} />}
      {motif === "plan" && <PlanMotif accent={accent} ink={ink} />}
      {motif === "crop" && <CropMotif accent={accent} ink={ink} />}
      {motif === "columns" && <ColumnsMotif accent={accent} ink={ink} />}
      {motif === "mist" && <MistMotif accent={accent} ink={ink} />}
      {motif === "grain" && <GrainMotif accent={accent} ink={ink} />}

      <span
        className="pointer-events-none absolute bottom-[var(--space-5)] start-[var(--space-5)] font-latin type-caption tracking-[0.04em] opacity-45 md:bottom-[var(--space-6)] md:start-[var(--space-6)]"
        style={{ color: ink }}
      >
        {project.name}
      </span>
      <span
        className="pointer-events-none absolute top-[var(--space-5)] end-[var(--space-5)] type-number opacity-40 md:top-[var(--space-6)] md:end-[var(--space-6)]"
        style={{ color: ink }}
      >
        {project.number}
      </span>
    </div>
  );
}

function NoirMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-[14%_18%] border"
        style={{ borderColor: accent, opacity: 0.85 }}
      />
      <div
        className="absolute inset-[28%_30%] border"
        style={{ borderColor: ink, opacity: 0.2 }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-px w-[36%] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute left-1/2 top-[44%] h-2.5 w-2.5 -translate-x-1/2 rounded-full"
        style={{ backgroundColor: ink, opacity: 0.9 }}
      />
      <div
        className="absolute bottom-[14%] start-[18%] end-[18%] h-px"
        style={{ backgroundColor: accent, opacity: 0.35 }}
      />
    </>
  );
}

function PlanMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-x-[10%] top-[24%] h-px"
        style={{ backgroundColor: ink, opacity: 0.28 }}
      />
      <div
        className="absolute inset-x-[10%] top-[50%] h-px"
        style={{ backgroundColor: ink, opacity: 0.12 }}
      />
      <div
        className="absolute inset-y-[14%] start-[16%] w-px"
        style={{ backgroundColor: ink, opacity: 0.28 }}
      />
      <div
        className="absolute bottom-[18%] end-[14%] top-[32%] w-[40%] border"
        style={{ borderColor: accent }}
      />
      <div
        className="absolute bottom-[18%] end-[14%] h-[30%] w-[16%] border-e border-t"
        style={{ borderColor: ink, opacity: 0.35 }}
      />
      <div
        className="absolute start-[16%] top-[24%] h-1.5 w-1.5"
        style={{ backgroundColor: accent, opacity: 0.6 }}
      />
    </>
  );
}

function CropMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-y-0 end-0 w-[44%]"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute inset-y-[10%] start-[8%] w-[38%] border"
        style={{ borderColor: ink, opacity: 0.22 }}
      />
      <div
        className="absolute bottom-[16%] start-[12%] h-px w-[30%]"
        style={{ backgroundColor: ink, opacity: 0.45 }}
      />
      <div
        className="absolute top-[10%] start-[8%] h-3 w-3 border"
        style={{ borderColor: ink, opacity: 0.35 }}
      />
    </>
  );
}

function ColumnsMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      {[16, 32, 48, 64, 80].map((left) => (
        <div
          key={left}
          className="absolute bottom-[18%] top-[18%] w-px"
          style={{
            insetInlineStart: `${left}%`,
            backgroundColor: ink,
            opacity: left === 48 ? 0.32 : 0.14,
          }}
        />
      ))}
      <div
        className="absolute bottom-[18%] start-[16%] end-[16%] h-px"
        style={{ backgroundColor: accent, opacity: 0.8 }}
      />
      <div
        className="absolute top-[18%] start-[16%] end-[36%] h-px"
        style={{ backgroundColor: ink, opacity: 0.35 }}
      />
    </>
  );
}

function MistMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute left-[20%] top-[16%] h-[54%] w-[54%] rounded-full"
        style={{
          backgroundColor: accent,
          opacity: 0.2,
          boxShadow: `0 0 0 48px ${accent}0c`,
        }}
      />
      <div
        className="absolute inset-x-[18%] bottom-[26%] top-[26%] border"
        style={{ borderColor: ink, opacity: 0.14 }}
      />
      <div
        className="absolute inset-x-[18%] top-[26%] h-px"
        style={{ backgroundColor: accent, opacity: 0.4 }}
      />
    </>
  );
}

function GrainMotif({ accent, ink }: { accent: string; ink: string }) {
  return (
    <>
      <div
        className="absolute inset-y-0 start-0 w-[30%]"
        style={{
          background: `repeating-linear-gradient(-12deg, ${accent}26, ${accent}26 2px, transparent 2px, transparent 8px)`,
        }}
      />
      <div
        className="absolute inset-[14%_12%_14%_36%] border"
        style={{ borderColor: ink, opacity: 0.38 }}
      />
      <div
        className="absolute bottom-[14%] end-[12%] h-[24%] w-[22%]"
        style={{ backgroundColor: accent, opacity: 0.55 }}
      />
    </>
  );
}
