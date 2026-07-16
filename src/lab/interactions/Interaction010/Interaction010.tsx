"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type OrganicButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * Interaction010 — Organic Button Hover
 * Soft radius morph + ink fill rising from bottom via transform scaleY.
 */
export function Interaction010({
  children,
  className,
  onClick,
  type = "button",
}: OrganicButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden",
        "border border-ink px-[var(--space-6)] py-[var(--space-3)]",
        "type-button text-ink outline-none transition-[border-radius,color] duration-500 ease-out",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
        !prefersReducedMotion && "hover:rounded-[1.75rem] hover:text-canvas",
        prefersReducedMotion && "hover:bg-ink hover:text-canvas",
        className,
      )}
    >
      {!prefersReducedMotion && (
        <span
          className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
          aria-hidden
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
