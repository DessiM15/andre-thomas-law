import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content, type PracticeArea } from "@/lib/content";
import { firm, SITE_URL } from "@/lib/firm";
import { areaPath, path, type Lang } from "@/lib/i18n";

export default function PracticeAreaView({
  lang,
  area,
}: {
  lang: Lang;
  area: PracticeArea;
}) {
  const c = content(lang);
  const t = c.ui.area;

  const group = c.practiceGroups.find((g) => g.id === area.group);
  const related = c.practiceAreas
    .filter((a) => a.group === area.group && a.key !== area.key)
    .slice(0, 3);
  const others = c.practiceAreas.filter((a) => a.key !== area.key).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: c.schema.home,
            item: `${SITE_URL}${path("home", lang)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: c.schema.practiceAreas,
            item: `${SITE_URL}${path("practiceAreas", lang)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: area.name,
            item: `${SITE_URL}${areaPath(area.slug, lang)}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `${area.name} — ${t.representation}`,
        serviceType: area.name,
        description: area.short,
        inLanguage: lang,
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
      ? [
          words.slice(0, Math.ceil(words.length / 2)).join(" "),
          words.slice(Math.ceil(words.length / 2)).join(" "),
        ]
      : [area.name];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={group?.label ?? t.fallbackEyebrow}
        n={group?.n}
        title={titleLines}
        lede={area.lede}
        crumb={{ label: t.crumb, href: path("practiceAreas", lang) }}
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
                {area.body.slice(1).map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* What this covers */}
            <Reveal delay={0.14}>
              <div className="mt-16 border-t border-paper-edge pt-12">
                <Eyebrow n="—">{t.covers}</Eyebrow>
                <ul className="mt-8 space-y-0">
                  {area.covers.map((cover, i) => (
                    <li
                      key={cover}
                      className="flex gap-6 border-b border-paper-edge py-5 text-[1rem] leading-relaxed text-ink-800/85"
                    >
                      <span className="shrink-0 font-display text-lg text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{cover}</span>
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
                  <Eyebrow tone="light">{c.ui.freeConsultation}</Eyebrow>
                  <p className="mt-5 font-display text-3xl leading-tight">
                    {t.consultTitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-200">
                    {t.consultBody}
                  </p>
                  <a
                    href={firm.phoneHref}
                    className="mt-8 block font-display text-3xl text-gold-500 transition-colors hover:text-gold-400"
                  >
                    {firm.phone}
                  </a>
                  <Link
                    href={path("contact", lang)}
                    className="group relative mt-6 block overflow-hidden bg-gold-500 px-6 py-3.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
                  >
                    <span className="relative z-10">{c.ui.sendMessage}</span>
                    <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  </Link>
                  <p className="mt-6 text-[0.7rem] leading-relaxed text-ink-300/80">
                    {t.licensedNote} {c.hours}.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="hidden md:block">
                <div className="border border-paper-edge p-8">
                  <Eyebrow>{t.others}</Eyebrow>
                  <ul className="mt-6 space-y-3 text-sm">
                    {others.map((o) => (
                      <li key={o.key}>
                        <Link
                          href={areaPath(o.slug, lang)}
                          className="link-underline text-ink-800/80 transition-colors hover:text-ink-900"
                        >
                          {o.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={path("practiceAreas", lang)}
                    className="eyebrow mt-7 inline-flex items-center gap-3 text-gold-700"
                  >
                    {c.ui.viewAll}
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
              <Eyebrow n={group?.n}>
                {t.alsoUnder} {group?.label}
              </Eyebrow>
            </Reveal>
            <GoldRule className="mt-6 w-full" />
            <div className="grid gap-px bg-paper-edge md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.key} delay={i * 0.06}>
                  <Link
                    href={areaPath(r.slug, lang)}
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
                        {c.ui.learnMore} →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand lang={lang} />
    </>
  );
}
