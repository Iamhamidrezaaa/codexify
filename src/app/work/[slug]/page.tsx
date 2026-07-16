import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  CaseStudyView,
  getCaseStudy,
  getCaseStudySlugs,
} from "@/features/work/case-study";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "اثر" };

  return {
    title: study.meta.name,
    description: study.meta.statement,
    openGraph: {
      title: `${study.meta.name} — کدکسیفای`,
      description: study.meta.statement,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Header />
      <main id="main-content">
        <CaseStudyView study={study} />
      </main>
      <Footer />
    </>
  );
}
