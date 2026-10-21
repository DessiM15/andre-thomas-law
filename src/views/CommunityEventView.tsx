import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";
import NewTab from "@/components/NewTab";
import PageHeader from "@/components/PageHeader";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import {
  eventEnd,
  eventStart,
  type CommunityEvent,
} from "@/lib/community";
import { firm, SITE_URL } from "@/lib/firm";
import { communityPath, path, type Lang } from "@/lib/i18n";

/**
 * One community event.
 *
 * Every event renders through this, so the next drive is an entry in
 * `lib/community.ts` and nothing else. The recap section is absent until
 * that entry grows a `recap` or `photos` field, at which point it appears
 * in the right place and the section numbering closes back up around it.
 */
type SectionKey = "whenWhere" | "how" | "why" | "recap" | "ask" | "cta";

export default function CommunityEventView({
  lang,
  event,
}: {
  lang: Lang;
  event: CommunityEvent;
}) {
  const c = content(lang);
  const hub = c.pages.community;
  const e = event.copy[lang];
  const hasRecap = Boolean(e.recap || event.photos?.length);

  /**
   * The running numerals down the left of every section on this site. Listed
   * rather than counted inline so dropping the recap in later renumbers the
   * sections under it instead of leaving a gap where it used to be.
   */
  const order: SectionKey[] = [
    "whenWhere",
    "how",
    "why",
    ...(hasRecap ? (["recap"] as const) : []),
    "ask",
    "cta",
  ];
  const n = (key: SectionKey) => String(order.indexOf(key) + 2).padStart(2, "0");

  /**
   * `Event` markup. This is the piece that earns the event rich result and
   * the Google "things to do" surfaces, which is most of why this page
   * exists before November 21 rather than after it.
   *
   * `endDate` is stated even though the copy says "until the turkeys are
   * gone": the markup requires a real end, and an event with no end is
   * treated as malformed rather than as open-ended.
   */
  const selfPath = communityPath(event.slug[lang], lang);
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Andre Thomas Law Turkey Drive",
    description:
      "Free turkey giveaway for Houston families. 100 turkeys with all the fixings, first come first served.",
    startDate: eventStart(event),
    endDate: eventEnd(event),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${SITE_URL}${selfPath}`,
    inLanguage: lang,
    ...(event.flyer ? { image: [`${SITE_URL}${event.flyer.src}`] } : {}),
    location: {
      "@type": "Place",
      name: firm.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "13201 Northwest Fwy Ste 485",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77040",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "LegalService",
      name: firm.name,
      url: "https://andrethomaslaw.com",
      telephone: "+1-713-212-3003",
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: `${event.announced}T00:00:00-06:00`,
      url: "https://andrethomaslaw.com/community/turkey-drive-2026",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Breadcrumbs
        trail={[
          { name: c.schema.home, href: path("home", lang) },
          { name: c.schema.community, href: path("community", lang) },
          { name: e.name, href: selfPath },
        ]}
      />

      <PageHeader
        eyebrow={e.eyebrow}
        n="01"
        title={e.titleLines}
        lede={e.lede}
        crumb={{ label: hub.crumb, href: path("community", lang) }}
      />

      {/* The flyer, and the four things somebody actually needs to know */}
      <section
        aria-labelledby="when-where"
        className="bg-paper py-16 md:py-24"
      >
        <div className="container-x grid gap-12 md:grid-cols-12 md:items-start md:gap-12">
          <Reveal className="md:col-span-5">
            {event.flyer && (
              <div
                className="relative mx-auto w-full max-w-sm bg-ink-950 md:max-w-none"
                style={{
                  aspectRatio: `${event.flyer.width} / ${event.flyer.height}`,
                }}
              >
                <Image
                  src={event.flyer.src}
                  alt={e.flyerAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 38vw"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute inset-0 border border-gold-500/30" />
              </div>
            )}
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow n={n("whenWhere")}>{e.whenWhereEyebrow}</Eyebrow>
              <h2
                id="when-where"
                className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] text-ink-900"
              >
                {e.whenWhereTitle}
              </h2>
            </Reveal>

            <GoldRule className="mt-8 w-32" />

            <Reveal delay={0.08}>
              <dl className="mt-10 space-y-7">
                {e.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-t border-paper-edge pt-6 first:border-t-0 first:pt-0"
                  >
                    <dt className="eyebrow text-gold-800">{fact.label}</dt>
                    <dd className="mt-3 space-y-1 text-[1.05rem] leading-relaxed text-ink-800/85">
                      {fact.value.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={firm.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
              >
                {e.directions}
                <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
                <NewTab lang={lang} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        aria-labelledby="how-it-works"
        className="border-t border-paper-edge bg-paper-warm py-16 md:py-24"
      >
        <div className="container-x">
          <Reveal>
            <Eyebrow n={n("how")}>{e.howEyebrow}</Eyebrow>
            <h2
              id="how-it-works"
              className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] text-ink-900"
            >
              {e.howTitle}
            </h2>
          </Reveal>

          <GoldRule className="mt-10 w-full" />

          <div className="grid md:grid-cols-3">
            {e.steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.08}
                className="border-b border-paper-edge py-9 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span aria-hidden className="font-display text-3xl text-gold-700">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-snug text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-800/75">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why, on navy, because this is the part that is about the firm */}
      <section
        aria-labelledby="why-we-do-this"
        className="grain relative overflow-hidden bg-ink-950 py-16 text-paper md:py-24"
      >
        <div className="container-x relative grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow n={n("why")} tone="light">
                {e.whyEyebrow}
              </Eyebrow>
              <h2
                id="why-we-do-this"
                className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.06]"
              >
                {e.whyTitle}
              </h2>
            </Reveal>
            <GoldRule className="mt-8 w-32" />
          </div>

          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-200">
              {e.whyBody.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/*
        After the event: the recap and the photographs. Absent until the entry
        in `lib/community.ts` carries them, which is what keeps this page from
        needing a rebuild on November 22.
      */}
      {hasRecap && (
        <section
          aria-labelledby="recap"
          className="border-t border-paper-edge bg-paper py-16 md:py-24"
        >
          <div className="container-x">
            {e.recap && (
              <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                <Reveal className="md:col-span-5">
                  <Eyebrow n={n("recap")}>{e.recap.eyebrow}</Eyebrow>
                  <h2
                    id="recap"
                    className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] text-ink-900"
                  >
                    {e.recap.title}
                  </h2>
                  <GoldRule className="mt-8 w-32" />
                </Reveal>
                <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
                  <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-800/85">
                    {e.recap.body.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>
                </Reveal>
              </div>
            )}

            {event.photos && event.photos.length > 0 && (
              <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
                {event.photos.map((photo, i) => (
                  <Reveal
                    key={photo.src}
                    delay={i * 0.06}
                    className={photo.wide ? "sm:col-span-2" : ""}
                  >
                    <div
                      className="relative w-full overflow-hidden bg-ink-950"
                      style={{ aspectRatio: photo.wide ? "16 / 9" : "4 / 3" }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt[lang]}
                        fill
                        sizes={
                          photo.wide
                            ? "(max-width: 640px) 92vw, 60vw"
                            : "(max-width: 640px) 92vw, 30vw"
                        }
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Questions */}
      <section
        aria-labelledby="questions"
        className={`${hasRecap ? "border-t border-paper-edge bg-paper-warm" : "border-t border-paper-edge bg-paper"} py-16 md:py-24`}
      >
        <div className="container-x">
          <Reveal>
            <Eyebrow n={n("ask")}>{e.askEyebrow}</Eyebrow>
            <h2
              id="questions"
              className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] text-ink-900"
            >
              {e.askTitle}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink-800/85">
              {e.askBody}
            </p>

            <a
              href={firm.phoneHref}
              className="group relative mt-9 inline-block overflow-hidden bg-gold-500 px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-950 transition-transform duration-300 hover:-translate-y-px"
            >
              <span className="relative z-10">{e.askCta}</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </a>

            <p className="mt-10 max-w-xl text-sm leading-relaxed text-ink-800/70">
              {hub.note}
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand lang={lang} n={n("cta")} />
    </>
  );
}
