import { Marquee } from "@/components/ui/Marquee";

const SERVICES = [
  "طراحی وب‌سایت",
  "توسعه وب",
  "رابط و تجربه کاربری",
  "برندینگ",
  "طراحی موشن",
  "تجربه‌های تعاملی",
];

export function MarqueeBand() {
  return <Marquee items={SERVICES} speed="slow" />;
}
