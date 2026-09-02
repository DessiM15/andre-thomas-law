import Link from "next/link";
import CTABand from "@/components/CTABand";
import DraftNotice from "@/components/DraftNotice";
import PageHeader from "@/components/PageHeader";
import Portrait from "@/components/Portrait";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm, fullAddress, SITE_URL } from "@/lib/firm";
import { path, teamPath, type Lang } from "@/lib/i18n";
import { team, SHOW_DRAFT_BANNER, TEAM_PLACEHOLDER, type TeamPerson } from "@/lib/team";
import type { TeamBio } from "@/lib/content/types";

/** "Maria Hernandez-Castillo" → ["Maria", "Hernandez-Castillo"], so the display
 *  face gets two lines to work with instead of one very long one. */
function splitName(name: string): string[] {
  const i = name.indexOf(" ");
  return i === -1 ? [name] : [name.slice(0, i), name.slice(i + 1)];
}

/**
 * `Person` structured data — the reason these are separate URLs rather than
 * accordions on one page. Suppressed while the roster is placeholder: emitting
 * schema.org credentials for people who do not exist is exactly the kind of
 * assertion this markup is trusted to make truthfully.
 */
function PersonSchema({
  person,
  bio,
  lang,
}: {
  person: TeamPerson;
  bio: TeamBio;
  lang: Lang;
}) {
  if (TEAM_PLACEHOLDER) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: bio.role,
    ...(person.image ? { image: `${SITE_URL}${person.image}` } : {}),
    url: `${SITE_URL}${teamPath(person.id, lang)}`,
    description: bio.preview,
    knowsAbout: bio.focus,
    worksFor: {
      "@type": "LegalService",
      name: firm.name,
      telephone: firm.phone,
      address: fullAddress,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function TeamMemberView({
  lang,
  person,
  bio,
}: {
  lang: Lang;
  person: TeamPerson;
  bio: TeamBio;
}) {
  const c = content(lang);
  const p = c.pages.team;
  const m = p.member;

  const others = team
    .filter((o) => o.id !== person.id)
    .map((o) => ({ person: o, bio: c.team.find((b) => b.id === o.id) }))
    .filter((o): o is { person: TeamPerson; bio: TeamBio } => Boolean(o.bio));

  return (
    <>
      <PersonSchema person={person} bio={bio} lang={lang} />

      <PageHeader
        eyebrow={bio.role}
        n="01"
        title={splitName(person.name)}
        lede={bio.preview}
        crumb={{ label: m.crumb, href: path("team", lang) }}
      />

      {TEAM_PLACEHOLDER && SHOW_DRAFT_BANNER && <DraftNotice>{p.draftNotice}</DraftNotice>}

      {/* Portrait + background. Mirrors the About page so a visitor moving
          between the two is reading the same layout, not learning a new one. */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-14 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="relative aspect-square w-full overflow-hidden">
                <Portrait
                  person={person}
                  alt={bio.alt}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                  monogramClass="text-[5rem] md:text-[7rem]"
                />
                <div className="pointer-events-none absolute inset-0 border border-gold-500/25" />
              </div>
              <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-800/60">
                {bio.credential}
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow n="—">{m.bioEyebrow}</Eyebrow>
              <div className="mt-7 space-y-6 text-[1.05rem] leading-relaxed text-ink-800/85">
                {bio.bio.map((para) => (
                  <p key={para.slice(0, 28)}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Accolades */}
            <Reveal delay={0.1}>
              <div className="mt-14 border-t border-paper-edge pt-10">
                <Eyebrow n="—">{m.highlightsEyebrow}</Eyebrow>
                <dl className="mt-7 space-y-6">
                  {bio.highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
                        {h.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-lg leading-snug text-ink-900">
                        {h.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* What they actually do */}
            <Reveal delay={0.16}>
              <div className="mt-12 border-t border-paper-edge pt-10">
                <Eyebrow n="—">{m.focusEyebrow}</Eyebrow>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {bio.focus.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-800/80"
                    >
                      <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-paper-edge pt-10">
                <Eyebrow n="—">{m.contactEyebrow}</Eyebrow>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink-900">
                  {m.contactTitle}
                </h2>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink-800/80">
                  {m.contactBody}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={firm.phoneHref}
                    className="group relative overflow-hidden bg-gold-500 px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-950 transition-transform duration-300 hover:-translate-y-px"
                  >
                    <span className="relative z-10">{firm.phone}</span>
                    <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  </a>
                  <Link
                    href={path("contact", lang)}
                    className="group inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
                  >
                    {c.ui.sendMessage}
                    <span className="h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The rest of the team — internal links out of every bio, which is half
          the point of giving each person their own URL. */}
      <section className="border-t border-paper-edge bg-paper-warm py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="02">{m.othersEyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight text-ink-900">
              {m.othersTitle}
            </h2>
          </Reveal>

          <GoldRule className="mt-9 w-full" />

          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {others.map((o, i) => (
              <Reveal as="li" key={o.person.id} delay={i * 0.05}>
                <Link href={teamPath(o.person.id, lang)} className="group block">
                  <div className="relative aspect-square w-full overflow-hidden bg-paper">
                    <Portrait
                      person={o.person}
                      alt={o.bio.alt}
                      sizes="(max-width: 640px) 33vw, 16vw"
                      zoomOnHover
                      monogramClass="text-[1.4rem]"
                    />
                    <div className="pointer-events-none absolute inset-0 border border-ink-900/10 transition-colors duration-500 group-hover:border-gold-500/50" />
                  </div>
                  <p className="mt-4 font-display text-lg leading-tight text-ink-900">
                    {o.person.name}
                  </p>
                  <p className="mt-1 text-[0.78rem] leading-snug text-ink-800/65">
                    {o.bio.role}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <Link
              href={path("team", lang)}
              className="group mt-14 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              {m.seeAll}
              <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand lang={lang} n="03" />
    </>
  );
}
