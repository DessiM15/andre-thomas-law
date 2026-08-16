import type { Metadata } from "next";
import PracticeAreasView from "@/views/PracticeAreasView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "es",
  "practiceAreas",
  content("es").pages.practiceAreas
);

export default function Page() {
  return <PracticeAreasView lang="es" />;
}
