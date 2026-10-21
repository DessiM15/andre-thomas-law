import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { eventOver, eventsByDate, type CommunityEvent } from "@/lib/community";
import { communityPath, path, type Lang } from "@/lib/i18n";

/**
 * The `/community/` hub.
 *
 * It exists so the footer's "Community" link has somewhere real to land and
 * so next November's drive has a home without a new section being invented
 * for it. Everything on it is read out of `lib/community.ts`, including
 * which half of the page an event belongs on.
 */
export default function CommunityView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.community;

  const all = eventsByDate();
  const upcoming = all.filter((e) => !eventOver(e));
  const past = all.filter((e) => eventOver(e));

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: c.schema.home, href: path("home", lang) },
          { name: c.schema.community, href: path("community", lang) },
        ]}
      />

      <PageHeader eyebrow={p.eyebrow} n="01" title={p.titleLines} lede={p.lede} />

      {/* Coming up */}
      <section aria-labelledby="upcoming" className="bg-paper py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="02">{p.upcomingEyebrow}</Eyebrow>
            <h2
              id="upcoming"
              className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] text-ink-900"
            >
              {p.upcomingTitle}
            </h2>
          </Reveal>

          <GoldRule className="mt-10 w-full" />

          {upcoming.length === 0 ? (
            <Reveal>
              <p className="mt-10 max-w-xl text-[1.05rem] leading-relaxed text-ink-800/75">
                {p.empty}
              </p>
            </Reveal>
          ) : (
            <ul className="mt-4">
              {upcoming.map((event, i) => (
                <EventRow key={event.key} event={event} lang={lang} view={p.view} delay={i * 0.08} />
              ))}
            </ul>
          )}

          <Reveal>
            <p className="mt-12 max-w-xl text-sm leading-relaxed text-ink-800/70">{p.note}</p>
          </Reveal>
        </div>
      </section>

      {/* Already happened. Nothing comes down after the fact; a drive the
          firm actually ran is worth more as a record than as a dead link. */}
      {past.length > 0 && (
        <section
          aria-labelledby="past"
          className="border-t border-paper-edge bg-paper-warm py-16 md:py-24"
        >
          <div className="container-x">
            <Reveal>
              <Eyebrow n="03">{p.pastEyebrow}</Eyebrow>
              <h2
                id="past"
                className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] text-ink-900"
              >
                {p.pastTitle}
              </h2>
            </Reveal>

            <GoldRule className="mt-10 w-full" />

            <ul className="mt-4">
              {past.map((event, i) => (
                <EventRow key={event.key} event={event} lang={lang} view={p.view} delay={i * 0.08} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand lang={lang} n={past.length > 0 ? "04" : "03"} />
    </>
  );
}

/**
 * One event in the listing. A hairline-divided row rather than a boxed card,
 * which is how the rest of the site lists things.
 */
function EventRow({
  event,
  lang,
  view,
  delay,
}: {
  event: CommunityEvent;
  lang: Lang;
  view: string;
  delay: number;
}) {
  const e = event.copy[lang];
  const href = communityPath(event.slug[lang], lang);

  return (
    <Reveal as="li" delay={delay} className="border-b border-paper-edge">
      <Link href={href} className="group grid gap-6 py-8 sm:grid-cols-12 sm:items-center sm:gap-8">
        {event.flyer && (
          <div
            className="relative w-28 shrink-0 bg-ink-950 sm:col-span-2 sm:w-full"
            style={{ aspectRatio: `${event.flyer.width} / ${event.flyer.height}` }}
          >
            <Image
              src={event.flyer.src}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 112px, 15vw"
              className="object-contain"
            />
          </div>
        )}

        <div className={event.flyer ? "sm:col-span-7" : "sm:col-span-9"}>
          <h3 className="font-display text-2xl leading-snug text-ink-900 md:text-3xl">{e.name}</h3>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-800/75">{e.summary}</p>
        </div>

        <span className="inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800 sm:col-span-3 sm:justify-end">
          {view}
          <span className="h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
        </span>
      </Link>
    </Reveal>
  );
}
