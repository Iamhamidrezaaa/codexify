import { Marquee } from "@/components/ui/Marquee";

const SERVICES = [
  "Website Design",
  "Web Development",
  "UI / UX",
  "Branding",
  "Motion Design",
  "Interactive Experiences",
];

export function MarqueeBand() {
  return <Marquee items={SERVICES} speed="slow" />;
}
