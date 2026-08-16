import type { Metadata } from "next";
import LegalView from "@/views/LegalView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "privacy",
  content("en").pages.privacy,
  { robots: { index: false, follow: true } }
);

export default function Page() {
  return <LegalView lang="en" kind="privacy" />;
}
