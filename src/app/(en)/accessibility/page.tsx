import type { Metadata } from "next";
import LegalView from "@/views/LegalView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "accessibility",
  content("en").pages.accessibility
);

export default function Page() {
  return <LegalView lang="en" kind="accessibility" />;
}
