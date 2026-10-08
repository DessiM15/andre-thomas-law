import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobView from "@/views/JobView";
import { firm, SITE_URL } from "@/lib/firm";
import { jobPath } from "@/lib/i18n";
import { getJob, isLive, jobs } from "@/lib/jobs";

/** Daily, so the page flips to "filled" the day after `validThrough`. */
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

// Every job, live or not: a filled role keeps a page that says so rather
// than a 404 for anyone who saved the link.
export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};

  const self = jobPath(job.slug);
  const title = `${job.title} — ${firm.address.city}, ${firm.address.stateCode} | ${firm.shortName}`;
  const description = job.summary.length > 155 ? `${job.summary.slice(0, 152).trimEnd()}…` : job.summary;

  // English only, so no hreflang pair — a Spanish alternate that does not
  // exist is worse than none.
  const meta: Metadata = {
    title: { absolute: title },
    description,
    alternates: { canonical: self },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${SITE_URL}${self}`,
      siteName: firm.name,
      title,
      description,
    },
  };

  return isLive(job) ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return <JobView job={job} />;
}
