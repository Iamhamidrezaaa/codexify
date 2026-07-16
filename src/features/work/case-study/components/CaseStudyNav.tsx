import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";

type CaseStudyNavProps = {
  prev?: { slug: string; name: string };
  next?: { slug: string; name: string };
  projectName?: string;
};

/**
 * Closing navigation — back to exhibition, prev/next.
 * Quiet typography only.
 */
export function CaseStudyNav({ prev, next, projectName }: CaseStudyNavProps) {
  return (
    <nav
      className="border-t border-border py-[var(--space-10)]"
      aria-label="پیمایش آثار"
    >
      <Grid className="items-start gap-y-[var(--space-8)]">
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <p className="type-overline mb-[var(--space-3)]">نمایشگاه</p>
          <LinkArrow href="/work">بازگشت به آثار</LinkArrow>
          {projectName ? (
            <p className="type-caption mt-[var(--space-4)]">
              پایان مطالعهٔ <span className="font-latin">{projectName}</span>
            </p>
          ) : null}
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-6">
          <p className="type-overline mb-[var(--space-3)]">قبلی</p>
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="font-latin type-title text-ink transition-opacity duration-fast hover:opacity-[var(--opacity-hover)]"
            >
              {prev.name}
            </Link>
          ) : (
            <p className="type-caption">آغاز نمایشگاه</p>
          )}
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-10">
          <p className="type-overline mb-[var(--space-3)]">بعدی</p>
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="font-latin type-title text-ink transition-opacity duration-fast hover:opacity-[var(--opacity-hover)]"
            >
              {next.name}
            </Link>
          ) : (
            <p className="type-caption">—</p>
          )}
        </div>
      </Grid>
    </nav>
  );
}
