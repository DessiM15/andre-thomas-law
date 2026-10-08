import type { Metadata } from "next";
import CareersView from "@/views/CareersView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

/** Daily, like the English hub, so expired listings leave on their own. */
export const revalidate = 86400;

const p = content("es").pages.careers;

export const metadata: Metadata = pageMetadata("es", "careers", p, {
  title: { absolute: p.title },
});

export default function Page() {
  return <CareersView lang="es" />;
}
