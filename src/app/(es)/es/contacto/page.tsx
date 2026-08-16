import type { Metadata } from "next";
import ContactView from "@/views/ContactView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

export const metadata: Metadata = pageMetadata(
  "es",
  "contact",
  content("es").pages.contact
);

export default function Page() {
  return <ContactView lang="es" />;
}
