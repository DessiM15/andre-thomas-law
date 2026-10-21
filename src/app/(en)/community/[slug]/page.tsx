import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommunityEventView from "@/views/CommunityEventView";
import { eventMetadata } from "@/views/meta";
import { events, getEvent } from "@/lib/community";

const LANG = "en" as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug[LANG] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug, LANG);
  if (!event) return {};

  return eventMetadata(LANG, event);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug, LANG);
  if (!event) notFound();

  return <CommunityEventView lang={LANG} event={event} />;
}
