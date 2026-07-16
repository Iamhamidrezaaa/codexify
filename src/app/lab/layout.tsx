import type { Metadata } from "next";
import { LabShell } from "@/lab/playground/LabShell";

export const metadata: Metadata = {
  title: "Interaction Lab",
  description: "Codexify internal R&D interaction laboratory",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabShell>{children}</LabShell>;
}
