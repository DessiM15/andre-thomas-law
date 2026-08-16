import type { Metadata } from "next";
import ReviewsView from "@/views/ReviewsView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "reviews",
  content("en").pages.reviews
);

export default function Page() {
  return <ReviewsView lang="en" />;
}
