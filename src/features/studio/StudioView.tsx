import {
  BreathingMoment,
  MarginNote,
  ReadingProgress,
} from "@/features/work/case-study";
import { EditorialDiagram } from "@/features/process";
import { studioContent } from "./content";
import { OpeningStatement } from "./components/OpeningStatement";
import { ManifestoSection } from "./components/ManifestoSection";
import { EditorialEssay } from "./components/EditorialEssay";
import { PrincipleBlock } from "./components/PrincipleBlock";
import { BeliefNotes } from "./components/BeliefNotes";

/**
 * Studio manifesto — opening essay of a design book.
 * One memorable interaction: opening words clarifying into ink.
 * No team. No CTA. No persuasion.
 */
export function StudioView() {
  const { meta, opening, why, principles, work, beliefs, closing } =
    studioContent;

  return (
    <article className="relative" data-publication="studio">
      <ReadingProgress />

      <OpeningStatement
        overline={meta.overline}
        title={meta.title}
        statement={opening.statement}
      />

      <BreathingMoment size="lg" />

      <ManifestoSection id="why" index={why.index} title={why.title}>
        <div className="relative">
          <EditorialEssay paragraphs={why.paragraphs} measure="narrow" />
          {why.note ? (
            <MarginNote className="mt-[var(--space-6)] hidden xl:block lg:mt-0">
              {why.note}
            </MarginNote>
          ) : null}
        </div>
        <div className="mt-[var(--space-10)]">
          <EditorialDiagram
            motif="paper"
            figure="۰۱"
            caption="کاغذ و جوهر — میدان خالی پیش از تصمیم."
            ground="var(--bg-subtle, #F4F2EE)"
            ink="var(--fg, #1A1A1A)"
            accent="var(--fg-muted, #6B6560)"
          />
        </div>
      </ManifestoSection>

      <BreathingMoment size="md" />

      <ManifestoSection
        id="principles"
        index={principles.index}
        title={principles.title}
      >
        <EditorialEssay
          paragraphs={[principles.intro]}
          measure="narrow"
          lead={false}
        />
        <div className="mt-[var(--space-10)] space-y-[var(--space-2)]">
          {principles.items.map((item) => (
            <PrincipleBlock
              key={item.id}
              index={item.index}
              statement={item.statement}
              body={item.body}
              aside={item.aside}
            />
          ))}
        </div>
      </ManifestoSection>

      <BreathingMoment size="md" />

      <ManifestoSection id="work" index={work.index} title={work.title}>
        <div className="relative">
          <EditorialEssay paragraphs={work.paragraphs} measure="narrow" />
          {work.note ? (
            <MarginNote className="mt-[var(--space-6)] hidden xl:block lg:mt-0">
              {work.note}
            </MarginNote>
          ) : null}
        </div>
        <div className="mt-[var(--space-10)]">
          <EditorialDiagram
            motif="typography"
            figure="۰۲"
            caption="تایپ به‌مثابهٔ ساختار — نه تزئین."
            ground="var(--bg-subtle, #F4F2EE)"
            ink="var(--fg, #1A1A1A)"
            accent="var(--fg-muted, #6B6560)"
          />
        </div>
      </ManifestoSection>

      <BreathingMoment size="md" />

      <ManifestoSection
        id="beliefs"
        index={beliefs.index}
        title={beliefs.title}
      >
        <BeliefNotes items={beliefs.items} />
      </ManifestoSection>

      <BreathingMoment size="lg" />

      <ManifestoSection id="closing" spine="essay" className="border-t border-border">
        <p className="type-statement max-w-[var(--measure-wide)] text-ink/80">
          {closing.thought}
        </p>
      </ManifestoSection>

      <BreathingMoment size="lg" />
    </article>
  );
}
