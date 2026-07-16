"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp } from "@/design/motion";
import { cn } from "@/design/utilities/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span" | "p" | "blockquote";
  variants?: Variants;
  once?: boolean;
  amount?: number;
};

/**
 * Section-aware entrance. Pass unique variants per section identity.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variants = fadeUp,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  if (prefersReducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px", amount }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
