"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { Figure } from "./Figure";
import type { ImageFamily } from "../types";

export type CompositionMotif =
  | "dial"
  | "steel"
  | "void"
  | "bezel"
  | "plan"
  | "crop"
  | "columns"
  | "mist"
  | "letter"
  | "grain"
  | "aperture"
  | "elevation"
  | "timber"
  | "shadow-cast"
  | "threshold"
  | "linen"
  | "veil";

type ImageCompositionProps = {
  family: ImageFamily;
  motif: CompositionMotif;
  caption?: string;
  figure?: string;
  ground?: string;
  accent?: string;
  ink?: string;
  className?: string;
};

const FAMILY_DEFAULT_MOTIF: Record<ImageFamily, CompositionMotif> = {
  material: "timber",
  geometry: "dial",
  typography: "letter",
  architecture: "plan",
  macro: "bezel",
  texture: "grain",
  "negative-space": "veil",
};

/**
 * Premium editorial plate — material, light, proportion.
 * Solid planes and hairlines only. No device chrome. No glow.
 */
export function ImageComposition({
  family,
  motif,
  caption,
  figure,
  ground = "#0B0B0C",
  accent = "#8A9199",
  ink = "#EDEAE4",
  className,
}: ImageCompositionProps) {
  const prefersReducedMotion = useReducedMotion();
  const resolved = motif || FAMILY_DEFAULT_MOTIF[family];
  const slow =
    family === "architecture" ||
    family === "negative-space" ||
    family === "material";

  const plate = (
    <motion.div
      className={cn(
        "composition-frame relative w-full overflow-hidden shadow-architectural",
        slow ? "aspect-[3/2] md:aspect-[21/9]" : "aspect-[16/10] md:aspect-[2/1]",
      )}
      style={{ backgroundColor: ground }}
      initial={prefersReducedMotion ? false : { opacity: 0.2 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: slow ? 1.8 : 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      role="img"
      aria-label={caption ?? family}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: ink,
          mixBlendMode: "soft-light",
          opacity: 0.035,
        }}
        aria-hidden
      />
      <Motif resolved={resolved} accent={accent} ink={ink} ground={ground} />
      <span
        className="absolute top-5 end-5 type-overline tracking-[0.12em] opacity-[0.35]"
        style={{ color: ink }}
      >
        {family}
      </span>
      <span
        className="absolute bottom-5 start-5 font-latin type-caption opacity-[0.28]"
        style={{ color: ink }}
      >
        Codexify
      </span>
    </motion.div>
  );

  if (figure && caption) {
    return (
      <Figure figure={figure} caption={caption} className={className}>
        {plate}
      </Figure>
    );
  }

  return (
    <figure className={cn("w-full", className)}>
      {plate}
      {caption ? (
        <figcaption className="type-caption mt-[var(--space-3)] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Motif({
  resolved,
  accent,
  ink,
  ground,
}: {
  resolved: CompositionMotif;
  accent: string;
  ink: string;
  ground: string;
}) {
  switch (resolved) {
    case "dial":
      return (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[min(58%,300px)] w-[min(58%,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: accent, opacity: 0.85 }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[min(40%,210px)] w-[min(40%,210px)] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: ink, opacity: 0.35 }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[min(12%,64px)] w-[min(12%,64px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: accent, opacity: 0.2 }}
          />
          <div
            className="absolute left-1/2 top-[24%] h-[26%] w-px origin-bottom -translate-x-1/2"
            style={{ backgroundColor: ink, opacity: 0.7 }}
          />
          <div
            className="absolute left-[28%] top-1/2 h-px w-[18%] -translate-y-1/2"
            style={{ backgroundColor: accent, opacity: 0.45 }}
          />
        </>
      );
    case "bezel":
      return (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[72%] w-[72%] max-h-[360px] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px]"
            style={{ borderColor: accent, opacity: 0.55 }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[58%] w-[58%] max-h-[280px] max-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: ink, opacity: 0.25 }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[42%] w-[42%] max-h-[200px] max-w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: ground, boxShadow: "var(--deboss)" }}
          />
          {[0, 45, 90, 135].map((deg) => (
            <div
              key={deg}
              className="absolute left-1/2 top-1/2 h-[min(34%,160px)] w-px origin-bottom"
              style={{
                backgroundColor: ink,
                opacity: 0.2,
                transform: `translate(-50%, -100%) rotate(${deg}deg)`,
              }}
            />
          ))}
        </>
      );
    case "steel":
      return (
        <>
          <div
            className="absolute inset-y-[14%] start-[10%] end-[48%] border surface-emboss"
            style={{ borderColor: accent, opacity: 0.75, backgroundColor: `${accent}10` }}
          />
          <div
            className="absolute inset-y-[14%] end-[10%] w-[30%]"
            style={{
              background: `repeating-linear-gradient(90deg, ${accent}33, ${accent}33 1px, transparent 1px, transparent 5px)`,
            }}
          />
          <div
            className="absolute inset-x-[10%] bottom-[14%] h-px"
            style={{ backgroundColor: ink, opacity: 0.3 }}
          />
        </>
      );
    case "void":
      return (
        <>
          <div
            className="absolute inset-[18%_14%]"
            style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }}
          />
          <div
            className="absolute inset-[32%_28%]"
            style={{ backgroundColor: `${ink}06` }}
          />
        </>
      );
    case "plan":
      return (
        <>
          <div
            className="absolute inset-x-[8%] top-[18%] h-px"
            style={{ backgroundColor: ink, opacity: 0.22 }}
          />
          <div
            className="absolute inset-x-[8%] top-[48%] h-px"
            style={{ backgroundColor: ink, opacity: 0.12 }}
          />
          <div
            className="absolute inset-x-[8%] bottom-[18%] h-px"
            style={{ backgroundColor: ink, opacity: 0.22 }}
          />
          <div
            className="absolute inset-y-[12%] start-[16%] w-px"
            style={{ backgroundColor: ink, opacity: 0.22 }}
          />
          <div
            className="absolute inset-y-[12%] end-[24%] w-px"
            style={{ backgroundColor: ink, opacity: 0.14 }}
          />
          <div
            className="absolute bottom-[18%] end-[16%] top-[32%] w-[36%] border"
            style={{ borderColor: accent, opacity: 0.9 }}
          />
          <div
            className="absolute bottom-[18%] start-[16%] h-[20%] w-[18%] border border-dashed"
            style={{ borderColor: accent, opacity: 0.4 }}
          />
          <div
            className="absolute start-[16%] top-[18%] h-2 w-2"
            style={{ backgroundColor: accent, opacity: 0.5 }}
          />
        </>
      );
    case "aperture":
      return (
        <>
          <div
            className="absolute inset-[16%_20%]"
            style={{
              boxShadow: `inset 0 0 0 1px ${ink}16`,
              backgroundColor: `${accent}08`,
            }}
          />
          <div
            className="absolute inset-x-[20%] top-[16%] h-px"
            style={{ backgroundColor: accent, opacity: 0.4 }}
          />
          <div
            className="absolute inset-y-[16%] start-[20%] w-px"
            style={{ backgroundColor: accent, opacity: 0.4 }}
          />
          <div
            className="absolute end-[20%] bottom-[16%] h-3 w-3 border"
            style={{ borderColor: ink, opacity: 0.25 }}
          />
        </>
      );
    case "elevation":
      return (
        <>
          <div
            className="absolute inset-x-[14%] bottom-[16%] top-[26%] border"
            style={{ borderColor: `${ink}24` }}
          />
          <div
            className="absolute inset-x-[26%] bottom-[16%] top-[40%] border-x"
            style={{ borderColor: accent, opacity: 0.55 }}
          />
          <div
            className="absolute inset-x-[14%] top-[26%] h-[10%]"
            style={{ backgroundColor: `${accent}22` }}
          />
          <div
            className="absolute inset-x-[10%] bottom-[12%] h-px"
            style={{ backgroundColor: ink, opacity: 0.4 }}
          />
          <div
            className="absolute start-[14%] bottom-[16%] top-[52%] w-[12%]"
            style={{ backgroundColor: `${ink}08` }}
          />
        </>
      );
    case "timber":
      return (
        <>
          <div
            className="absolute inset-y-[12%] start-[8%] w-[44%]"
            style={{
              background: `repeating-linear-gradient(0deg, ${accent}1a, ${accent}1a 1px, transparent 1px, transparent 16px)`,
            }}
          />
          <div
            className="absolute inset-y-[18%] end-[10%] start-[56%] border surface-emboss"
            style={{ borderColor: `${ink}18`, backgroundColor: `${accent}0d` }}
          />
          <div
            className="absolute bottom-[18%] end-[10%] start-[56%] h-[14%]"
            style={{ backgroundColor: `${accent}30` }}
          />
        </>
      );
    case "shadow-cast":
      return (
        <>
          <div
            className="absolute inset-y-[14%] start-[12%] w-[40%] border"
            style={{ borderColor: `${ink}18` }}
          />
          <div
            className="absolute inset-y-[14%] start-[12%] w-[40%]"
            style={{
              boxShadow: `18px 0 0 0 ${ink}0f`,
            }}
          />
          <div
            className="absolute inset-y-[26%] end-[14%] w-px"
            style={{ backgroundColor: accent, opacity: 0.45 }}
          />
          <div
            className="absolute end-[14%] top-[26%] h-2 w-2"
            style={{ backgroundColor: accent, opacity: 0.55 }}
          />
        </>
      );
    case "threshold":
      return (
        <>
          <div
            className="absolute inset-y-[10%] start-[50%] w-px"
            style={{ backgroundColor: ink, opacity: 0.28 }}
          />
          <div
            className="absolute inset-y-[18%] start-[14%] end-[50%] border"
            style={{ borderColor: `${accent}50` }}
          />
          <div
            className="absolute inset-y-[18%] start-[50%] end-[14%]"
            style={{ backgroundColor: `${ink}07` }}
          />
          <div
            className="absolute inset-x-[14%] bottom-[18%] h-px"
            style={{ backgroundColor: accent, opacity: 0.35 }}
          />
        </>
      );
    case "crop":
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
            className="absolute bottom-[14%] start-[8%] h-px w-[26%]"
            style={{ backgroundColor: ink, opacity: 0.4 }}
          />
          <div
            className="absolute top-[10%] start-[8%] h-3 w-3 border"
            style={{ borderColor: ink, opacity: 0.3 }}
          />
        </>
      );
    case "columns":
      return (
        <>
          {[16, 32, 48, 64, 80].map((left) => (
            <div
              key={left}
              className="absolute bottom-[18%] top-[18%] w-px"
              style={{
                insetInlineStart: `${left}%`,
                backgroundColor: ink,
                opacity: left === 48 ? 0.35 : 0.14,
              }}
            />
          ))}
          <div
            className="absolute bottom-[18%] start-[16%] end-[16%] h-px"
            style={{ backgroundColor: accent }}
          />
          <div
            className="absolute top-[18%] start-[16%] end-[48%] h-px"
            style={{ backgroundColor: ink, opacity: 0.3 }}
          />
        </>
      );
    case "mist":
      return (
        <>
          <div
            className="absolute left-[22%] top-[18%] h-[52%] w-[52%] rounded-full"
            style={{
              backgroundColor: accent,
              opacity: 0.18,
              boxShadow: `0 0 0 40px ${accent}0a`,
            }}
          />
          <div
            className="absolute inset-x-[20%] bottom-[24%] top-[28%] border"
            style={{ borderColor: ink, opacity: 0.12 }}
          />
        </>
      );
    case "veil":
      return (
        <>
          <div
            className="absolute inset-[10%_8%]"
            style={{ backgroundColor: `${accent}14` }}
          />
          <div
            className="absolute inset-[26%_22%]"
            style={{
              boxShadow: `inset 0 0 0 1px ${ink}12`,
              backgroundColor: `${ground}`,
              opacity: 0.55,
            }}
          />
          <div
            className="absolute inset-x-[22%] top-[26%] h-px"
            style={{ backgroundColor: accent, opacity: 0.35 }}
          />
        </>
      );
    case "linen":
      return (
        <>
          <div
            className="absolute inset-y-[14%] start-[10%] end-[10%]"
            style={{
              background: `repeating-linear-gradient(0deg, ${accent}16, ${accent}16 1px, transparent 1px, transparent 20px)`,
            }}
          />
          <div
            className="absolute inset-x-[26%] top-[28%] bottom-[28%] border surface-deboss"
            style={{ borderColor: `${ink}12`, backgroundColor: `${accent}08` }}
          />
          <div
            className="absolute inset-x-[26%] bottom-[28%] h-[16%]"
            style={{ backgroundColor: `${accent}1f` }}
          />
        </>
      );
    case "letter":
      return (
        <>
          <div
            className="absolute inset-x-[12%] top-[20%] bottom-[22%] border"
            style={{ borderColor: `${ink}14` }}
          />
          <p
            className="absolute inset-0 flex items-center justify-center font-latin text-[clamp(4.5rem,16vw,10rem)] font-medium leading-none"
            style={{ color: ink, opacity: 0.1 }}
          >
            Aa
          </p>
          <div
            className="absolute inset-x-[18%] bottom-[28%] h-px"
            style={{ backgroundColor: accent, opacity: 0.45 }}
          />
        </>
      );
    case "grain":
      return (
        <>
          <div
            className="absolute inset-y-0 start-0 w-[30%]"
            style={{
              background: `repeating-linear-gradient(-14deg, ${accent}24, ${accent}24 2px, transparent 2px, transparent 8px)`,
            }}
          />
          <div
            className="absolute inset-[14%_12%_14%_36%] border surface-emboss"
            style={{ borderColor: ink, opacity: 0.4, backgroundColor: `${ink}06` }}
          />
          <div
            className="absolute bottom-[14%] end-[12%] h-[24%] w-[20%]"
            style={{ backgroundColor: accent, opacity: 0.5 }}
          />
        </>
      );
    default:
      return null;
  }
}
