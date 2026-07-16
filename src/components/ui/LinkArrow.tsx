"use client";

import Link from "next/link";
import { cn } from "@/design/utilities/cn";

type LinkArrowProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function LinkArrow({
  href,
  children,
  className,
  external = false,
}: LinkArrowProps) {
  const linkClass = cn(
    "group inline-flex items-center gap-[var(--space-3)] type-button text-ink transition-colors duration-fast ease-out hover:text-muted",
    className,
  );

  const content = (
    <>
      <span className="relative pb-px">
        {children}
        <span
          className="absolute inset-inline-start-0 -bottom-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-base ease-out group-hover:scale-x-100"
          aria-hidden
        />
      </span>
      <span
        className="inline-block text-[0.85em] transition-transform duration-fast ease-out group-hover:-translate-x-0.5"
        aria-hidden
      >
        ←
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {content}
    </Link>
  );
}
