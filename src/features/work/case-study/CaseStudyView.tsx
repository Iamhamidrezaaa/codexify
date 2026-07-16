import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyHero } from "./components/CaseStudyHero";
import { CaseStudySection } from "./components/CaseStudySection";
import { CaseStudyNav } from "./components/CaseStudyNav";
import { EditorialQuote } from "./components/EditorialQuote";
import { ImageComposition } from "./components/ImageComposition";
import { DesignSystemBlock } from "./components/DesignSystemBlock";
import { ScreenComposition } from "./components/ScreenComposition";
import { ReflectionBlock } from "./components/ReflectionBlock";
import { OutcomeBlock } from "./components/OutcomeBlock";
import type { CaseStudyContent } from "./types";

type CaseStudyViewProps = {
  study: CaseStudyContent;
};

/**
 * Shared case study publication layout — gold standard structure.
 */
export function CaseStudyView({ study }: CaseStudyViewProps) {
  return (
    <article>
      <CaseStudyHero meta={study.meta} />

      <div className="border-b border-border">
        <ImageComposition
          variant="bezel"
          caption="ترکیب هندسی — الهام از قاب و صفحه؛ بدون شبیه‌سازی دستگاه."
          className="mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]"
        />
      </div>

      <CaseStudySection index="۰۲" title={study.challenge.title} expansive>
        <div className="space-y-[var(--space-6)]">
          {study.challenge.body.map((p) => (
            <Reveal key={p.slice(0, 20)}>
              <p className="type-body-lg max-w-[var(--measure)] text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection index="۰۳" title={study.discovery.title}>
        <ul className="divide-y divide-border border-y border-border">
          {study.discovery.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05} as="li">
              <div className="grid gap-[var(--space-3)] py-[var(--space-6)] md:grid-cols-12">
                <p className="type-overline md:col-span-3">{item.label}</p>
                <p className="type-body-lg text-muted md:col-span-8">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseStudySection>

      <CaseStudySection index="۰۴" title={study.direction.title} expansive>
        <div className="mb-[var(--space-6)] flex flex-wrap gap-x-[var(--space-4)] gap-y-2">
          {study.direction.mood.map((word) => (
            <span key={word} className="type-overline text-ink">
              {word}
            </span>
          ))}
        </div>
        <div className="space-y-[var(--space-6)]">
          {study.direction.body.map((p) => (
            <Reveal key={p.slice(0, 20)}>
              <p className="type-body-lg max-w-[var(--measure)] text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
        <EditorialQuote>{study.direction.quote}</EditorialQuote>
        <ImageComposition
          variant="steel"
          caption="بافت فلز سرد — پالت بدون طلا و بدون درخشش مصنوعی."
        />
      </CaseStudySection>

      <CaseStudySection index="۰۵" title={study.system.title}>
        <DesignSystemBlock system={study.system} />
      </CaseStudySection>

      <CaseStudySection index="۰۶" title="صفحات منتخب" expansive>
        <ScreenComposition screens={study.screens} />
      </CaseStudySection>

      <CaseStudySection index="۰۷" title="تعامل‌های مؤثر">
        <ul className="space-y-[var(--space-8)]">
          {study.interactions.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div>
                <h3 className="type-title text-ink">{item.title}</h3>
                <p className="type-body-lg mt-[var(--space-3)] max-w-[var(--measure)] text-muted">
                  {item.why}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseStudySection>

      <div className="bg-[#0B0B0C] py-section-expansive text-[#EDEAE4]">
        <CaseStudySection
          index="۰۸"
          title={study.reflection.title}
          className="[&_.type-overline]:text-[#8A9199] [&_.type-number]:text-[#8A9199] [&_.type-body-lg]:text-[#EDEAE4]/70 [&_.bg-border]:bg-[#8A919944]"
        >
          <ReflectionBlock paragraphs={study.reflection.body} />
        </CaseStudySection>
      </div>

      <CaseStudySection index="۰۹" title={study.outcome.title} expansive>
        <OutcomeBlock items={study.outcome.items} />
      </CaseStudySection>

      <ImageComposition
        variant="dial"
        caption="یک شیء. سکوت بسیار."
        className="mx-auto max-w-[var(--container-wide)] px-[var(--margin-mobile)] pb-section md:px-[var(--margin-desktop)]"
      />

      <CaseStudyNav prev={study.prev} next={study.next} />
    </article>
  );
}
