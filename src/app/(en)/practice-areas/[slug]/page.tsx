import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PracticeAreaView from "@/views/PracticeAreaView";
import { areaMetadata } from "@/views/meta";
import { content, getPracticeArea, getPracticeAreaByKey } from "@/lib/content";
import { firm } from "@/lib/firm";

const LANG = "en" as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return content(LANG).practiceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug, LANG);
  if (!area) return {};

  // The twin in the other language, so hreflang points at the right slug.
  const en = getPracticeAreaByKey(area.key, "en");
  const es = getPracticeAreaByKey(area.key, "es");

  return areaMetadata(LANG, {
    title: `${area.name} Attorney in Houston, Texas`,
    description: `${area.short} ${firm.attorney} represents the injured in Texas and Tennessee. Free consultation — ${firm.phone}.`,
    enSlug: en?.slug ?? area.slug,
    esSlug: es?.slug ?? area.slug,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug, LANG);
  if (!area) notFound();

  return <PracticeAreaView lang={LANG} area={area} />;
}
