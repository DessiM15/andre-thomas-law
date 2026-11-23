import Link from "next/link";
import { Eyebrow } from "@/components/Reveal";
import { content } from "@/lib/content";
import { communityPath, type Lang } from "@/lib/i18n";
import { eventOver, eventsByDate, recapCurrent } from "@/lib/community";

/**
 * The homepage's link into `/community/`.
 *
 * A strip, not a section, for the same reason the team page's hiring notice
 * is one: it should read as an announcement on the way down the page rather
 * than compete with the practice areas for somebody who arrived with a case.
 * It carries no section numeral, so the homepage's running count is
 * unchanged whether or not an event is coming up.
 *
 * Driven by `lib/community.ts`, so it appears when the next drive is entered.
 * The day after that drive it stops announcing; once the entry has a recap
 * it points at the photographs instead, through the end of that year. An
 * upcoming event always wins over a recap. The page it points at stays up
 * either way.
 */
export default function CommunityNotice({ lang }: { lang: Lang }) {
  const all = eventsByDate();
  const upcoming = all.find((e) => !eventOver(e));
  const next = upcoming ?? all.find((e) => recapCurrent(e));
  if (!next) return null;

  const c = content(lang);
  const e = next.copy[lang];
  const recap = upcoming ? undefined : e.recap;
  const href = communityPath(next.slug[lang], lang);

  return (
    <div className="border-b border-paper-edge bg-paper-warm">
      <div className="container-x flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:py-7">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
          <Eyebrow>{e.eyebrow}</Eyebrow>
          <p className="font-display text-xl leading-snug text-ink-900 md:text-2xl">
            {recap ? recap.notice : e.notice}
          </p>
        </div>
        <Link
          href={href}
          className="group inline-flex items-center gap-4 self-start border border-ink-900/20 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-900 transition-colors duration-300 hover:border-gold-700 hover:text-gold-800 md:self-auto"
        >
          {recap ? recap.cta : c.pages.community.view}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
