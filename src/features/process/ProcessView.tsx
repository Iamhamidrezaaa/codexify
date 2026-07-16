import Link from "next/link";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";
import {
  BreathingMoment,
  EditorialQuote,
  MarginNote,
  Prose,
  ReadingProgress,
} from "@/features/work/case-study";
import { processContent } from "./content";
import { ProcessHero } from "./components/ProcessHero";
import { ProcessSection } from "./components/ProcessSection";
import { EditorialDiagram } from "./components/EditorialDiagram";
import { PrincipleBlock } from "./components/PrincipleBlock";

/**
 * Process publication — editorial journey through six equal stages.
 * One memorable interaction: sticky monumental stage numbers.
 */
export function ProcessView() {
  const { meta, intro, stages, principles, closing } = processContent;

  return (
    <article className="relative" data-publication="process">
      <ReadingProgress />

      <ProcessHero
        overline={meta.overline}
        title={meta.title}
        statement={meta.statement}
        intro={intro}
      />

      <BreathingMoment size="md" />

      {stages.map((stage, i) => (
        <div key={stage.id}>
          {i > 0 ? <BreathingMoment size="sm" /> : null}
          <ProcessSection
            id={stage.id}
            index={stage.index}
            title={stage.title}
            focuses={stage.focuses}
          >
            <div className="relative">
              <Prose paragraphs={stage.body} measure="narrow" />
              {stage.note ? (
                <MarginNote className="mt-[var(--space-6)] hidden xl:block lg:mt-0">
                  {stage.note}
                </MarginNote>
              ) : null}
            </div>

            {stage.diagram ? (
              <div className="mt-[var(--space-10)]">
                <EditorialDiagram
                  motif={stage.diagram.motif}
                  figure={stage.diagram.figure}
                  caption={stage.diagram.caption}
                />
              </div>
            ) : null}

            {stage.quote ? (
              <EditorialQuote note={stage.title}>{stage.quote}</EditorialQuote>
            ) : null}
          </ProcessSection>
        </div>
      ))}

      <BreathingMoment size="lg" />

      <section
        id="chapter-principles"
        className="scroll-mt-28 border-y border-border py-section-expansive"
        aria-labelledby="process-principles-heading"
      >
        <Grid>
          <div className="col-span-4 md:col-span-3">
            <p className="type-overline text-muted" id="process-principles-heading">
              اصول
            </p>
          </div>
          <div className="col-span-4 mt-[var(--space-8)] space-y-[var(--space-10)] md:col-span-5 md:col-start-4 md:mt-0 lg:col-span-7 lg:col-start-5">
            {principles.map((principle) => (
              <PrincipleBlock
                key={principle.id}
                label={principle.label}
                statement={principle.statement}
                body={principle.body}
              />
            ))}
          </div>
        </Grid>
      </section>

      <section
        id="chapter-closing"
        className="scroll-mt-28 py-section-expansive"
        aria-labelledby="process-closing-heading"
      >
        <Grid>
          <div className="col-span-4 md:col-span-7 lg:col-span-8">
            <h2
              id="process-closing-heading"
              className="type-heading text-ink"
            >
              {closing.title}
            </h2>
            <div className="mt-[var(--space-7)] space-y-[var(--space-5)]">
              {closing.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 20)}
                  className="type-body-lg max-w-[var(--measure)] text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-[var(--space-9)]">
              <LinkArrow href="/work">مشاهدهٔ آثار</LinkArrow>
            </div>
            <p className="type-caption mt-[var(--space-6)] text-muted">
              یا{" "}
              <Link
                href="/contact"
                className="text-ink underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
              >
                دربارهٔ پروژه صحبت کنیم
              </Link>
              .
            </p>
          </div>
        </Grid>
      </section>
    </article>
  );
}
