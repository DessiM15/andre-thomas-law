import type { Metadata } from "next";
import ReviewsView from "@/views/ReviewsView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "es",
  "reviews",
  content("es").pages.reviews
);

export default function Page() {
  return <ReviewsView lang="es" />;
}
