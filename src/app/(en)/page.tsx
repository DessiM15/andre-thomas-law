import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "home",
  content("en").pages.home
);

/**
 * Daily. The community strip decides what to show from today's date, and a
 * fully static page would keep announcing an event until the next deploy.
 */
export const revalidate = 86400;

export default function Page() {
  return <HomeView lang="en" />;
}
