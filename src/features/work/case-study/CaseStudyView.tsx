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
import type { CaseStudyContent, ImageFamily } from "./types";

type CaseStudyViewProps = {
  study: CaseStudyContent;
};

/**
 * Publication Engine v2 — assembles a case study as a magazine issue.
 * Rhythm dials live on `publication.editorial`; story copy stays in content files.
 */
export function CaseStudyView({ study }: CaseStudyViewProps) {
  const { publication: pub, meta, figures } = study;
  const { theme, imageFamily, chapters, atmosphere, editorial } = pub;
  const openBreath = editorial?.breath === "open";
  const measure = editorial?.proseMeasure ?? "default";
  const reflectionTone = editorial?.reflectionTone ?? "inverse";
  const reflectionField =
    editorial?.reflectionField ??
    (atmosphere === "light" ? "surface" : "ground");
  const screensTitle = editorial?.screensTitle ?? "صفحات منتخب";

  const reflectionTheme = {
    ground: reflectionField === "surface" ? theme.surface : theme.ground,
    ink: theme.ink,
    muted: theme.muted,
    accent: theme.accent,
  };

  return (
    <article
      className="relative"
      data-case-atmosphere={atmosphere}
      data-case-family={imageFamily}
    >
      <ReadingProgress />
      <ChapterRail chapters={chapters} />

      <CaseStudyHero meta={meta} theme={theme} atmosphere={atmosphere} />

      {figures ? (
        <div
          className="border-b border-border"
          style={
            atmosphere === "light"
              ? { backgroundColor: theme.ground }
              : { backgroundColor: "var(--color-canvas)" }
          }
        >
          <div
            className={
              openBreath
                ? "mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] py-[clamp(3rem,10vh,7rem)] md:px-[var(--margin-desktop)]"
                : "mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] py-[var(--space-8)] md:px-[var(--margin-desktop)]"
            }
          >
            <ImageComposition
              family={(figures.afterHero.family ?? imageFamily) as ImageFamily}
              motif={figures.afterHero.motif as CompositionMotif}
              figure={figures.afterHero.figure}
              caption={figures.afterHero.caption}
              ground={
                atmosphere === "light" ? theme.surface : theme.ground
              }
              accent={theme.accent}
              ink={theme.ink}
            />
          </div>
        </div>
      ) : null}

      {openBreath ? <BreathingMoment size="lg" /> : null}

      <CaseStudySection
        id="challenge"
        index="۰۲"
        title={study.challenge.title}
        expansive
      >
        <div className="relative">
          <Prose paragraphs={study.challenge.body} measure={measure} />
          {editorial?.marginNote ? (
            <MarginNote className="mt-[var(--space-6)] lg:mt-0 hidden xl:block">
              {editorial.marginNote}
            </MarginNote>
          ) : null}
        </div>
      </CaseStudySection>

      <BreathingMoment size={openBreath ? "md" : "sm"} />

      <CaseStudySection id="discovery" index="۰۳" title={study.discovery.title}>
        <ul
          className={
            openBreath
              ? "divide-y divide-border/60"
              : "divide-y divide-border border-y border-border"
          }
        >
          {study.discovery.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.04} as="li">
              <div
                className={
                  openBreath
                    ? "grid gap-[var(--space-4)] py-[var(--space-9)] md:grid-cols-12"
                    : "grid gap-[var(--space-3)] py-[var(--space-7)] md:grid-cols-12"
                }
              >
                <p className="type-overline md:col-span-3">{item.label}</p>
                <p
                  className={
                    openBreath
                      ? "type-essay text-muted md:col-span-7"
                      : "type-body-lg text-muted md:col-span-8"
                  }
                >
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseStudySection>

      {openBreath ? <BreathingMoment size="lg" /> : null}

      <CaseStudySection
        id="direction"
        index="۰۴"
        title={study.direction.title}
        expansive
      >
        <div
          className={
            openBreath
              ? "mb-[var(--space-9)] flex flex-col gap-[var(--space-3)]"
              : "mb-[var(--space-7)] flex flex-wrap gap-x-[var(--space-5)] gap-y-2"
          }
        >
          {study.direction.mood.map((word) => (
            <span key={word} className="type-overline text-ink">
              {word}
            </span>
          ))}
        </div>
        <Prose paragraphs={study.direction.body} measure={measure} />
        <EditorialQuote note="جهت خلاقانه">
          {study.direction.quote}
        </EditorialQuote>
        {figures ? (
          <ImageComposition
            family={
              (figures.afterDirection.family ?? "material") as ImageFamily
            }
            motif={figures.afterDirection.motif as CompositionMotif}
            figure={figures.afterDirection.figure}
            caption={figures.afterDirection.caption}
            ground={atmosphere === "light" ? theme.surface : theme.ground}
            accent={theme.accent}
            ink={theme.ink}
          />
        ) : null}
      </CaseStudySection>

      {openBreath ? <BreathingMoment size="md" /> : null}

      <CaseStudySection id="system" index="۰۵" title={study.system.title}>
        <DesignSystemBlock system={study.system} />
      </CaseStudySection>

      {openBreath ? <BreathingMoment size="lg" /> : null}

      <CaseStudySection id="screens" index="۰۶" title={screensTitle} expansive>
        <ScreenComposition
          screens={study.screens}
          theme={
            atmosphere === "light"
              ? { ...theme, ground: theme.surface }
              : theme
          }
          spacing={openBreath ? "open" : "default"}
        />
      </CaseStudySection>

      <CaseStudySection id="interactions" index="۰۷" title="تعامل‌های مؤثر">
        <ul
          className={
            openBreath ? "space-y-[var(--space-12)]" : "space-y-[var(--space-9)]"
          }
        >
          {study.interactions.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div>
                <h3 className="type-title text-ink">{item.title}</h3>
                <p
                  className={
                    openBreath
                      ? "type-essay mt-[var(--space-5)] max-w-[var(--measure-narrow)] text-muted"
                      : "type-body-lg mt-[var(--space-4)] max-w-[var(--measure)] text-muted"
                  }
                >
                  {item.why}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseStudySection>

      {openBreath ? <BreathingMoment size="lg" /> : null}

      <CaseStudySection
        id="reflection"
        index="۰۸"
        title={study.reflection.title}
        tone={reflectionTone}
        theme={reflectionTone === "inverse" ? reflectionTheme : undefined}
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
        <div
          className={
            openBreath
              ? "mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] pb-[clamp(4rem,14vh,9rem)] pt-[var(--space-8)] md:px-[var(--margin-desktop)]"
              : "mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] pb-section md:px-[var(--margin-desktop)]"
          }
        >
          <ImageComposition
            family={
              (figures.closing.family ??
                (atmosphere === "light"
                  ? "negative-space"
                  : "geometry")) as ImageFamily
            }
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
