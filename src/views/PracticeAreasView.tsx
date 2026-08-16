import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/firm";
import { areaPath, path, type Lang } from "@/lib/i18n";
import { groupImages } from "@/lib/media";

export default function PracticeAreasView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.practiceAreas;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: p.listName,
    inLanguage: lang,
    itemListElement: c.practiceAreas.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${SITE_URL}${areaPath(a.slug, lang)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        eyebrow={p.eyebrow}
        n="01"
        title={p.titleLines}
        lede={p.lede}
        image="/stock/pa-hero-crash.webp"
        alt={p.heroAlt}
        focal="50% 45%"
        tall
      />

      {/* Each group: an image plate paired with a compact index. Sides
          alternate so the page reads as a rhythm rather than a stack. */}
      {c.practiceGroups.map((group, gi) => {
        const areas = c.practiceAreas.filter((a) => a.group === group.id);
        if (areas.length === 0) return null;
        const flip = gi % 2 === 1;

        return (
          <section
            key={group.id}
            className={gi % 2 === 0 ? "bg-paper" : "border-y border-paper-edge bg-paper-warm"}
          >
            <div className="container-x grid items-start gap-10 py-14 md:grid-cols-12 md:gap-14 md:py-20">
              {/* Plate */}
              <Reveal className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden md:sticky md:top-28">
                  <Image
                    src={groupImages[group.id]}
                    alt={group.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink-900/55 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                    <Eyebrow n={group.n} tone="light">
                      {group.label}
                    </Eyebrow>
                    <p className="mt-4 max-w-xs text-[0.92rem] leading-relaxed text-ink-200">
                      {group.blurb}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 border border-gold-500/20" />
                </div>
              </Reveal>

              {/* Index */}
              <div className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                {areas.map((area, i) => (
                  <Reveal key={area.key} delay={i * 0.05}>
                    <Link
                      href={areaPath(area.slug, lang)}
                      className="group relative block overflow-hidden border-t border-paper-edge last:border-b"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-ink-950 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                      <span className="relative flex items-center gap-5 py-5 transition-[padding] duration-500 group-hover:px-5">
                        <span className="flex-1">
                          <span className="block font-display text-[1.4rem] leading-tight text-ink-900 transition-colors duration-500 group-hover:text-paper md:text-[1.75rem]">
                            {area.name}
                          </span>
                          <span className="mt-1.5 block text-[0.88rem] leading-relaxed text-ink-800/60 transition-colors duration-500 group-hover:text-ink-200">
                            {area.short}
                          </span>
                        </span>
                        <span className="shrink-0 text-gold-600 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold-400">
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Criminal defense — from the firm's own bio */}
      <section className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col gap-8 border border-paper-edge bg-paper-warm p-9 md:flex-row md:items-center md:justify-between md:p-12">
              <div>
                <Eyebrow n="06">{p.alsoHandled}</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.12] text-ink-900">
                  {p.criminalTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-800/75">
                  {p.criminalBody}
                </p>
              </div>
              <Link
                href={path("contact", lang)}
                className="group inline-flex shrink-0 items-center gap-4 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
              >
                {p.criminalCta}
                <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
              </Link>
            </div>
          </Reveal>
          <GoldRule className="mt-14 w-full" />
        </div>
      </section>

      <CTABand lang={lang} n="07" />
    </>
  );
}
