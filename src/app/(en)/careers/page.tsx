import type { Metadata } from "next";
import CareersView from "@/views/CareersView";
import { pageMetadata } from "@/views/meta";
import { content } from "@/lib/content";

/**
 * Re-rendered once a day so a listing drops off the day it expires,
 * without anyone remembering to redeploy. Same on the job pages and the
 * sitemap.
 */
export const revalidate = 86400;

const p = content("en").pages.careers;

export const metadata: Metadata = pageMetadata("en", "careers", p, {
  title: { absolute: p.title },
});

export default function Page() {
  return <CareersView lang="en" />;
}
