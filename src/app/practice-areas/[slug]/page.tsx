import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import {
  firm,
  getPracticeArea,
  practiceAreas,
  practiceGroups,
  SITE_URL,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};

  return {
    title: `${area.name} Attorney in Houston, Texas`,
    description: `${area.short} ${firm.attorney} represents the injured in Texas and Tennessee. Free consultation — ${firm.phone}.`,
    alternates: { canonical: `/practice-areas/${area.slug}` },
    openGraph: {
      title: `${area.name} — ${firm.name}`,
      description: area.short,
      url: `${SITE_URL}/practice-areas/${area.slug}`,
    },
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const group = practiceGroups.find((g) => g.id === area.group);
  const related = practiceAreas
    .filter((a) => a.group === area.group && a.slug !== area.slug)
    .slice(0, 3);
  const others = practiceAreas.filter((a) => a.slug !== area.slug).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Practice Areas",
            item: `${SITE_URL}/practice-areas`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: area.name,
            item: `${SITE_URL}/practice-areas/${area.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `${area.name} Representation`,
        serviceType: area.name,
        description: area.short,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "State", name: "Texas" },
          { "@type": "State", name: "Tennessee" },
        ],
      },
    ],
  };

  // Break the title across lines at a sensible point rather than letting
  // the viewport decide where a two-word practice area wraps.
  const words = area.name.split(" ");
  const titleLines =
    words.length > 2
      ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")]
      : [area.name];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={group?.label ?? "Practice area"}
        n={group?.n}
        title={titleLines}
        lede={area.lede}
        crumb={{ label: "All practice areas", href: "/practice-areas" }}
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-14 md:grid-cols-12 md:gap-12">
          {/* Body */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.28] text-ink-900">
                {area.body[0]}
              </p>
            </Reveal>

            <GoldRule className="mt-10 w-32" />

            <Reveal delay={0.08}>
              <div className="mt-10 space-y-6 text-[1.05rem] leading-relaxed text-ink-800/85">
                {area.body.slice(1).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* What this covers */}
            <Reveal delay={0.14}>
              <div className="mt-16 border-t border-paper-edge pt-12">
                <Eyebrow n="—">What this covers</Eyebrow>
                <ul className="mt-8 space-y-0">
                  {area.covers.map((c, i) => (
                    <li
                      key={c}
                      className="flex gap-6 border-b border-paper-edge py-5 text-[1rem] leading-relaxed text-ink-800/85"
                    >
                      <span className="shrink-0 font-display text-lg text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28 md:space-y-8">
              <Reveal>
                <div className="grain relative overflow-hidden bg-ink-950 p-9 text-paper">
                  <Eyebrow tone="light">Free consultation</Eyebrow>
                  <p className="mt-5 font-display text-3xl leading-tight">
                    Find out where you stand.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-200">
                    It costs nothing and commits you to nothing.
                  </p>
                  <a
                    href={firm.phoneHref}
                    className="mt-8 block font-display text-3xl text-gold-500 transition-colors hover:text-gold-400"
                  >
                    {firm.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="group relative mt-6 block overflow-hidden bg-gold-500 px-6 py-3.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
                  >
                    <span className="relative z-10">Send a message</span>
                    <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  </Link>
                  <p className="mt-6 text-[0.7rem] leading-relaxed text-ink-300/80">
                    Licensed in Texas and Tennessee. {firm.hours}.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="hidden md:block">
                <div className="border border-paper-edge p-8">
                  <Eyebrow>Other practice areas</Eyebrow>
                  <ul className="mt-6 space-y-3 text-sm">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/practice-areas/${o.slug}`}
                          className="link-underline text-ink-800/80 transition-colors hover:text-ink-900"
                        >
                          {o.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/practice-areas"
                    className="eyebrow mt-7 inline-flex items-center gap-3 text-gold-700"
                  >
                    View all
                    <span className="h-px w-8 bg-gold-500" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-paper-edge bg-paper-warm py-16 md:py-24">
          <div className="container-x">
            <Reveal>
              <Eyebrow n={group?.n}>Also under {group?.label}</Eyebrow>
            </Reveal>
            <GoldRule className="mt-6 w-full" />
            <div className="grid gap-px bg-paper-edge md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.06}>
                  <Link
                    href={`/practice-areas/${r.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden bg-paper-warm p-8 md:p-10"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-950 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                    <span className="relative flex h-full flex-col">
                      <span className="font-display text-2xl leading-tight text-ink-900 transition-colors duration-500 group-hover:text-paper">
                        {r.name}
                      </span>
                      <span className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-ink-800/65 transition-colors duration-500 group-hover:text-ink-200">
                        {r.short}
                      </span>
                      <span className="eyebrow mt-8 text-gold-600 transition-colors duration-500 group-hover:text-gold-400">
                        Learn more →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
