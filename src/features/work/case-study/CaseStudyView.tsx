import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyHero } from "./components/CaseStudyHero";
import { CaseStudySection } from "./components/CaseStudySection";
import { CaseStudyNav } from "./components/CaseStudyNav";
import { EditorialQuote } from "./components/EditorialQuote";
import { ImageComposition } from "./components/ImageComposition";
import type { CompositionMotif } from "./components/ImageComposition";
import { DesignSystemBlock } from "./components/DesignSystemBlock";
import { ScreenComposition } from "./components/ScreenComposition";
import { ReflectionBlock } from "./components/ReflectionBlock";
import { OutcomeBlock } from "./components/OutcomeBlock";
import { Prose } from "./components/Prose";
import { BreathingMoment } from "./components/BreathingMoment";
import { ReadingProgress } from "./components/ReadingProgress";
import { ChapterRail } from "./components/ChapterRail";
import { MarginNote } from "./components/MarginNote";
import type { CaseStudyContent } from "./types";

type CaseStudyViewProps = {
  study: CaseStudyContent;
};

/**
 * Publication Engine v2 — assembles a case study as a magazine issue.
 */
export function CaseStudyView({ study }: CaseStudyViewProps) {
  const { publication: pub, meta, figures } = study;
  const { theme, imageFamily, chapters } = pub;

  return (
    <article className="relative">
      <ReadingProgress />
      <ChapterRail chapters={chapters} />

      <CaseStudyHero meta={meta} theme={theme} />

      {figures ? (
        <div className="border-b border-border bg-canvas">
          <div className="mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] py-[var(--space-8)] md:px-[var(--margin-desktop)]">
            <ImageComposition
              family={imageFamily}
              motif={figures.afterHero.motif as CompositionMotif}
              figure={figures.afterHero.figure}
              caption={figures.afterHero.caption}
              ground={theme.ground}
              accent={theme.accent}
              ink={theme.ink}
            />
          </div>
        </div>
      ) : null}

      <CaseStudySection
        id="challenge"
        index="۰۲"
        title={study.challenge.title}
        expansive
      >
        <div className="relative">
          <Prose paragraphs={study.challenge.body} />
          <MarginNote className="mt-[var(--space-6)] lg:mt-0 hidden xl:block">
            مسئله، زیباتر کردن نبود — لمس‌پذیر کردنِ نادر بودن بود.
          </MarginNote>
        </div>
      </CaseStudySection>

      <BreathingMoment size="sm" />

      <CaseStudySection id="discovery" index="۰۳" title={study.discovery.title}>
        <ul className="divide-y divide-border border-y border-border">
          {study.discovery.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.04} as="li">
              <div className="grid gap-[var(--space-3)] py-[var(--space-7)] md:grid-cols-12">
                <p className="type-overline md:col-span-3">{item.label}</p>
                <p className="type-body-lg text-muted md:col-span-8">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection
        id="direction"
        index="۰۴"
        title={study.direction.title}
        expansive
      >
        <div className="mb-[var(--space-7)] flex flex-wrap gap-x-[var(--space-5)] gap-y-2">
          {study.direction.mood.map((word) => (
            <span key={word} className="type-overline text-ink">
              {word}
            </span>
          ))}
        </div>
        <Prose paragraphs={study.direction.body} />
        <EditorialQuote note="جهت خلاقانه">
          {study.direction.quote}
        </EditorialQuote>
        {figures ? (
          <ImageComposition
            family="material"
            motif={figures.afterDirection.motif as CompositionMotif}
            figure={figures.afterDirection.figure}
            caption={figures.afterDirection.caption}
            ground={theme.ground}
            accent={theme.accent}
            ink={theme.ink}
          />
        ) : null}
      </CaseStudySection>

      <CaseStudySection id="system" index="۰۵" title={study.system.title}>
        <DesignSystemBlock system={study.system} />
      </CaseStudySection>

      <CaseStudySection
        id="screens"
        index="۰۶"
        title="صفحات منتخب"
        expansive
      >
        <ScreenComposition screens={study.screens} theme={theme} />
      </CaseStudySection>

      <CaseStudySection
        id="interactions"
        index="۰۷"
        title="تعامل‌های مؤثر"
      >
        <ul className="space-y-[var(--space-9)]">
          {study.interactions.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div>
                <h3 className="type-title text-ink">{item.title}</h3>
                <p className="type-body-lg mt-[var(--space-4)] max-w-[var(--measure)] text-muted">
                  {item.why}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection
        id="reflection"
        index="۰۸"
        title={study.reflection.title}
        tone="inverse"
        theme={{
          ground: theme.ground,
          ink: theme.ink,
          muted: theme.muted,
          accent: theme.accent,
        }}
        expansive
      >
        <ReflectionBlock paragraphs={study.reflection.body} />
      </CaseStudySection>

      <CaseStudySection
        id="outcome"
        index="۰۹"
        title={study.outcome.title}
        expansive
      >
        <OutcomeBlock items={study.outcome.items} />
      </CaseStudySection>

      {figures ? (
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] pb-section md:px-[var(--margin-desktop)]">
          <ImageComposition
            family="geometry"
            motif={figures.closing.motif as CompositionMotif}
            figure={figures.closing.figure}
            caption={figures.closing.caption}
            ground={theme.ground}
            accent={theme.accent}
            ink={theme.ink}
          />
        </div>
      ) : null}

      <CaseStudyNav
        prev={study.prev}
        next={study.next}
        projectName={meta.name}
      />
    </article>
  );
}
