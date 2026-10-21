import type { Metadata } from "next";
import CommunityView from "@/views/CommunityView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "community",
  content("en").pages.community
);

export default function Page() {
  return <CommunityView lang="en" />;
}
