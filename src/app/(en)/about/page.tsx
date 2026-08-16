import type { Metadata } from "next";
import AboutView from "@/views/AboutView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "about",
  content("en").pages.about
);

export default function Page() {
  return <AboutView lang="en" />;
}
