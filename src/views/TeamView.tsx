import Image from "next/image";
import Link from "next/link";
import CTABand from "@/components/CTABand";
import DraftNotice from "@/components/DraftNotice";
import PageHeader from "@/components/PageHeader";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { teamPath, type Lang } from "@/lib/i18n";
import { team, TEAM_PLACEHOLDER, type TeamKind } from "@/lib/team";
import type { TeamBio } from "@/lib/content/types";

/**
 * One person, as a row. The whole row is the link — a 96px headshot is a
 * cruel tap target on a phone, so the name, the role, and the preview are
 * all part of the same hit area.
 */
function Row({
  bio,
  lang,
  index,
  readBio,
}: {
  bio: TeamBio;
  lang: Lang;
  index: number;
  readBio: string;
}) {
  const person = team.find((p) => p.id === bio.id);
  if (!person) return null;

  return (
    <Reveal as="li" delay={index * 0.06}>
      <Link
        href={teamPath(person.id, lang)}
        className="group grid grid-cols-[5.5rem_1fr] items-start gap-5 border-b border-paper-edge py-7 transition-colors duration-500 hover:bg-paper-warm/70 md:grid-cols-[8.5rem_1fr_auto] md:items-center md:gap-9 md:py-9"
      >
        {/* Headshot. Square, hairline-framed, and it warms on hover — the
            same gold-edge treatment the portrait on the About page uses. */}
        <div className="relative aspect-square w-full overflow-hidden bg-paper-warm">
          <Image
            src={person.image}
            alt={bio.alt}
            fill
            sizes="(max-width: 768px) 88px, 136px"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            style={person.focal ? { objectPosition: person.focal } : undefined}
          />
          <div className="pointer-events-none absolute inset-0 border border-ink-900/10 transition-colors duration-500 group-hover:border-gold-500/50" />
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-gold-600">{bio.role}</p>
          <h3 className="mt-2 font-display text-[1.65rem] leading-tight text-ink-900 md:text-[2.1rem]">
            {person.name}
          </h3>
          <p className="mt-1.5 text-[0.82rem] text-ink-800/60">{bio.credential}</p>
          {/* Two lines on desktop, three on mobile where the column is narrower. */}
          <p className="mt-3 line-clamp-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-800/80 md:line-clamp-2">
            {bio.preview}
          </p>
        </div>

        {/* Desktop affordance. On mobile the row is obviously tappable and an
            arrow floating in a 2-column grid just adds noise. */}
        <span className="hidden items-center gap-4 whitespace-nowrap pl-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-800/70 transition-colors duration-500 group-hover:text-ink-900 md:flex">
          {readBio}
          <span className="h-px w-8 bg-gold-500 transition-all duration-500 group-hover:w-14" />
        </span>
      </Link>
    </Reveal>
  );
}

function Group({
  kind,
  n,
  eyebrow,
  title,
  lang,
  readBio,
}: {
  kind: TeamKind;
  n: string;
  eyebrow: string;
  title: string;
  lang: Lang;
  readBio: string;
}) {
  const c = content(lang);
  // `lib/team.ts` holds the running order; the copy file is keyed, not ordered.
  const people = team
    .filter((p) => p.kind === kind)
    .map((p) => c.team.find((b) => b.id === p.id))
    .filter((b): b is TeamBio => Boolean(b));

  if (!people.length) return null;

  return (
    <div>
      <Reveal>
        <Eyebrow n={n}>{eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.08] text-ink-900">
          {title}
        </h2>
      </Reveal>

      <GoldRule className="mt-9 w-full" />

      <ul className="mt-2">
        {people.map((bio, i) => (
          <Row key={bio.id} bio={bio} lang={lang} index={i} readBio={readBio} />
        ))}
      </ul>
    </div>
  );
}

export default function TeamView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.team;

  return (
    <>
      <PageHeader
        eyebrow={p.eyebrow}
        n="01"
        title={p.titleLines}
        lede={p.lede}
        image="/stock/team-hero.webp"
        alt={p.heroAlt}
        focal="50% 20%"
        tall
      />

      {TEAM_PLACEHOLDER && <DraftNotice>{p.draftNotice}</DraftNotice>}

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x space-y-24 md:space-y-32">
          <Group
            kind="attorney"
            n="02"
            eyebrow={p.attorneysEyebrow}
            title={p.attorneysTitle}
            lang={lang}
            readBio={p.readBio}
          />
          <Group
            kind="staff"
            n="03"
            eyebrow={p.staffEyebrow}
            title={p.staffTitle}
            lang={lang}
            readBio={p.readBio}
          />
        </div>
      </section>

      <CTABand lang={lang} n="04" />
    </>
  );
}
