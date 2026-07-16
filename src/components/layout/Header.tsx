"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { getCaseAtmosphere } from "@/features/work/case-study/atmosphere";

const NAV_LINKS = [
  { href: "/work", label: "آثار" },
  { href: "/process", label: "فرآیند" },
  { href: "/studio", label: "استودیو" },
  { href: "mailto:hello@codexify.studio", label: "تماس" },
] as const;

const CHROME_INVERT = "text-[color:var(--chrome-invert,#EDEAE4)]";
const CHROME_INVERT_BG = "bg-[color:var(--chrome-invert,#EDEAE4)]";

function isNavCurrent(pathname: string | null, href: string) {
  if (!pathname || href.startsWith("mailto:")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const caseSlug = pathname?.match(/^\/work\/([^/]+)/)?.[1];
  const atmosphere = getCaseAtmosphere(caseSlug);
  const inverted = atmosphere === "dark" && !scrolled && !menuOpen;

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
              inverted ? CHROME_INVERT : "text-ink",
            )}
            onClick={() => setMenuOpen(false)}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            کدکسیفای
          </Link>
        </div>

        <nav
          className="hidden items-center justify-end gap-[var(--space-7)] md:col-span-5 md:flex lg:col-span-8 lg:gap-[var(--space-9)]"
          aria-label="منوی اصلی"
        >
          {NAV_LINKS.map((link) => {
            const current = isNavCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "group relative type-nav transition-colors duration-fast ease-out",
                  inverted
                    ? cn(CHROME_INVERT, "hover:opacity-70")
                    : current
                      ? "text-ink"
                      : "text-ink hover:text-muted",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 inset-inline-start-0 h-px transition-all duration-base ease-out",
                    inverted ? CHROME_INVERT_BG : "bg-ink",
                    current ? "w-full opacity-100" : "w-0 opacity-60 group-hover:w-full",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
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
              inverted ? CHROME_INVERT_BG : "bg-ink",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 transition-all duration-base ease-out",
              inverted ? CHROME_INVERT_BG : "bg-ink",
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
          {NAV_LINKS.map((link) => {
            const current = isNavCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "type-heading transition-opacity duration-fast ease-out hover:opacity-[var(--opacity-hover)]",
                  current ? "text-ink" : "text-ink/70",
                )}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
