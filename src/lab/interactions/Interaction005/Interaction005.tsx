"use client";

import Link from "next/link";
import { cn } from "@/design/utilities/cn";

export type ProgressiveUnderlineProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Interaction005 — Progressive Underline
 * Underline scales from inline-start on hover/focus. Transform-only.
 */
export function Interaction005({
  href,
  children,
  className,
}: ProgressiveUnderlineProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block type-button text-ink outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas",
        className,
      )}
    >
      <span className="relative pb-1">
        {children}
        <span
          className="absolute inset-inline-start-0 -bottom-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
          aria-hidden
        />
      </span>
    </Link>
  );
}
