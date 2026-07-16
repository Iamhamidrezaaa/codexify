"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

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
    "group inline-flex items-center gap-3 font-sans text-sm tracking-wide text-ink transition-colors duration-400 hover:text-accent",
    className,
  );

  const content = (
    <>
      <span className="relative">
        {children}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-400 ease-premium group-hover:w-full"
          aria-hidden
        />
      </span>
      <span
        className="inline-block transition-transform duration-400 ease-premium group-hover:translate-x-1"
        aria-hidden
      >
        →
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
