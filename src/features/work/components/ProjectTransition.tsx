"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { getExhibitionReveal } from "@/features/work/projectTransition";
import type { ExhibitionReveal } from "@/features/work/types";

type ProjectTransitionProps = {
  children: React.ReactNode;
  reveal: ExhibitionReveal;
  className?: string;
};

/**
 * Wraps each exhibition entry with a curated entrance.
 * Reduced motion → instant presence.
 */
export function ProjectTransition({
  children,
  reveal,
  className,
}: ProjectTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={getExhibitionReveal(reveal)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35, margin: "-8% 0px" }}
    >
      {children}
    </motion.div>
  );
}
