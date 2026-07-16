"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

type ImageCompositionProps = {
  variant?: "dial" | "steel" | "void" | "bezel";
  caption?: string;
  className?: string;
};

/**
 * Curated geometric / material compositions — no device frames.
 */
export function ImageComposition({
  variant = "dial",
  caption,
  className,
}: ImageCompositionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <figure className={cn("w-full", className)}>
      <motion.div
        className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[2/1]"
        style={{ backgroundColor: "#0B0B0C" }}
        initial={prefersReducedMotion ? false : { opacity: 0.4 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {variant === "dial" && <DialComposition />}
        {variant === "steel" && <SteelComposition />}
        {variant === "void" && <VoidComposition />}
        {variant === "bezel" && <BezelComposition />}
      </motion.div>
      {caption ? (
        <figcaption className="type-caption mt-[var(--space-3)] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function DialComposition() {
  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 h-[min(52%,280px)] w-[min(52%,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: "#8A9199" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[min(36%,190px)] w-[min(36%,190px)] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-50"
        style={{ borderColor: "#EDEAE4" }}
      />
      <div
        className="absolute left-1/2 top-[28%] h-[22%] w-px origin-bottom -translate-x-1/2"
        style={{ backgroundColor: "#EDEAE4" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: "#5C1F24" }}
      />
    </>
  );
}

function SteelComposition() {
  return (
    <>
      <div
        className="absolute inset-y-[18%] start-[12%] end-[42%] border"
        style={{ borderColor: "#8A9199", opacity: 0.7 }}
      />
      <div
        className="absolute inset-y-[18%] end-[12%] w-[26%]"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #8A919922,
            #8A919922 1px,
            transparent 1px,
            transparent 6px
          )`,
        }}
      />
      <div
        className="absolute bottom-[18%] start-[12%] h-px w-[46%]"
        style={{ backgroundColor: "#EDEAE4", opacity: 0.35 }}
      />
    </>
  );
}

function VoidComposition() {
  return (
    <>
      <div
        className="absolute inset-[22%_18%]"
        style={{ boxShadow: "inset 0 0 0 1px #8A919944" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-px w-[20%] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: "#8A9199" }}
      />
    </>
  );
}

function BezelComposition() {
  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] max-h-[340px] max-w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, #161618 0deg, #8A9199 40deg, #161618 80deg, #8A919966 140deg, #0B0B0C 200deg, #8A9199 280deg, #161618 360deg)`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[48%] w-[48%] max-h-[220px] max-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: "#0B0B0C" }}
      />
    </>
  );
}
