import type { Metadata } from "next";
import ContactView from "@/views/ContactView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "en",
  "contact",
  content("en").pages.contact
);

export default function Page() {
  return <ContactView lang="en" />;
}
