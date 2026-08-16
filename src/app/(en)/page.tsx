import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "home",
  content("en").pages.home
);

export default function Page() {
  return <HomeView lang="en" />;
}
