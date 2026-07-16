"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";

const NAV_LINKS = [
  { href: "/work", label: "آثار" },
  { href: "/studio", label: "استودیو" },
  { href: "/contact", label: "تماس" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /** Case study heroes may open on a dark field — invert chrome until scroll. */
  const darkHero =
    Boolean(pathname?.startsWith("/work/")) && pathname !== "/work";
  const inverted = darkHero && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)] transition-[background-color,border-color,color] duration-base ease-out",
        scrolled || menuOpen
          ? "border-b border-border/60 bg-canvas/95"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Grid
        as="div"
        className="items-center py-[var(--space-5)] md:py-[var(--space-6)]"
      >
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <Link
            href="/"
            className={cn(
              "type-wordmark transition-opacity duration-fast ease-out hover:opacity-[var(--opacity-hover)]",
              inverted ? "text-[#EDEAE4]" : "text-ink",
            )}
            onClick={() => setMenuOpen(false)}
          >
            کدکسیفای
          </Link>
        </div>

        <nav
          className="hidden items-center justify-end gap-[var(--space-7)] md:col-span-5 md:flex lg:col-span-8 lg:gap-[var(--space-9)]"
          aria-label="منوی اصلی"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative type-nav transition-colors duration-fast ease-out",
                inverted
                  ? "text-[#EDEAE4] hover:text-[#EDEAE4]/70"
                  : "text-ink hover:text-muted",
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 inset-inline-start-0 h-px w-0 transition-all duration-base ease-out group-hover:w-full",
                  inverted ? "bg-[#EDEAE4]" : "bg-ink",
                )}
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="col-span-2 flex flex-col items-start justify-center gap-[6px] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              "block h-px w-5 transition-all duration-base ease-out",
              inverted ? "bg-[#EDEAE4]" : "bg-ink",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 transition-all duration-base ease-out",
              inverted ? "bg-[#EDEAE4]" : "bg-ink",
              menuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </Grid>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[4.5rem] z-[var(--z-overlay)] bg-canvas transition-opacity duration-base ease-out md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex h-full flex-col justify-center gap-[var(--space-7)] px-[var(--margin-mobile)]"
          aria-label="منوی موبایل"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-heading text-ink transition-opacity duration-fast ease-out hover:opacity-[var(--opacity-hover)]"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
