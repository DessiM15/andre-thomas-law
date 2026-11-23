import Image from "next/image";
import NewTab from "@/components/NewTab";
import VideoFacade from "@/components/VideoFacade";
import { Eyebrow, GoldRule, MaskLines, Reveal } from "@/components/Reveal";
import { awards } from "@/lib/awards";
import type { Lang } from "@/lib/i18n";

/**
 * The attorney's outside recognition: who gave it, for what, the
 * organization's own video, and a link to its profile of him.
 *
 * Shared by the homepage and the About page so the two cannot drift. All of
 * it is read from `lib/awards.ts`; the year, the category, and the badge
 * appear on their own once that entry carries them.
 */
export default function Recognition({
  lang,
  n,
  tone = "paper",
}: {
  lang: Lang;
  n: string;
  /** The field it sits on, chosen to alternate with its neighbors. */
  tone?: "paper" | "warm";
}) {
  const award = awards[0];
  if (!award) return null;
  const a = award.copy[lang];

  const facts: { label: string; value: string }[] = [
    { label: a.awardedBy, value: award.org },
    ...(award.year ? [{ label: a.yearLabel, value: String(award.year) }] : []),
    ...(a.category ? [{ label: a.categoryLabel, value: a.category }] : []),
  ];

  return (
    <section
      id="recognition"
      className={`border-t border-paper-edge ${tone === "warm" ? "bg-paper-warm" : "bg-paper"} py-20 md:py-28`}
    >
      <div className="container-x grid gap-12 md:grid-cols-12 md:items-center md:gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow n={n}>{a.eyebrow}</Eyebrow>
          </Reveal>
          <MaskLines
            as="h2"
            className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink-900"
            lines={a.titleLines}
          />

          <GoldRule className="mt-8 w-32" />

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-800/85">
              {a.body}
            </p>

            <div className="mt-9 flex items-center gap-8">
              {award.badge && (
                <Image
                  src={award.badge.src}
                  alt={a.badgeAlt}
                  width={award.badge.width}
                  height={award.badge.height}
                  className="h-28 w-auto shrink-0 md:h-32"
                />
              )}
              <dl className="space-y-4">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="eyebrow text-gold-800">{f.label}</dt>
                    <dd className="mt-1 font-display text-xl text-ink-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={award.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              {a.profileCta}
              <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
              <NewTab lang={lang} />
            </a>
          </Reveal>
        </div>

        {award.video && (
          <Reveal delay={0.12} className="md:col-span-7">
            <VideoFacade
              youtubeId={award.video.youtubeId}
              thumb={award.video.thumb}
              thumbAlt={a.thumbAlt}
              playLabel={a.play}
              title={a.videoTitle}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
