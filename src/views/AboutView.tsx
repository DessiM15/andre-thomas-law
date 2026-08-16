import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { path, type Lang } from "@/lib/i18n";

export default function AboutView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.about;

  return (
    <>
      <PageHeader
        eyebrow={p.eyebrow}
        n="01"
        title={p.titleLines}
        lede={p.lede}
        image="/stock/houston-skyline.webp"
        alt={p.skylineAlt}
        focal="50% 65%"
        tall
      />

      {/* Bio + portrait */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-14 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden md:sticky md:top-28">
              <Image
                src="/andre-standing.webp"
                alt={`${firm.attorney}, ${p.portraitAlt} ${firm.name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-[50%_20%]"
              />
              <div className="pointer-events-none absolute inset-0 border border-gold-500/25" />
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-800/85">
                {c.bio.paragraphs.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Credentials */}
            <Reveal delay={0.1}>
              <div className="mt-14 border-t border-paper-edge pt-10">
                <Eyebrow n="—">{p.barAdmissions}</Eyebrow>
                <div className="mt-6 flex flex-wrap gap-3">
                  {firm.barAdmissions.map((state) => (
                    <span
                      key={state}
                      className="border border-gold-500/40 bg-gold-100/50 px-5 py-2.5 font-display text-lg text-ink-900"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-12 border-t border-paper-edge pt-10">
                <Eyebrow n="—">{p.education}</Eyebrow>
                <ul className="mt-6 space-y-5">
                  {c.bio.education.map((e) => (
                    <li key={e.school}>
                      <p className="font-display text-xl text-ink-900">{e.school}</p>
                      <p className="mt-1 text-sm text-ink-800/65">{e.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Career timeline */}
      <section className="border-t border-paper-edge bg-paper-warm py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="02">{p.pathEyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink-900">
              {p.pathTitle}
            </h2>
          </Reveal>

          <GoldRule className="mt-10 w-full" />

          <div className="grid md:grid-cols-3">
            {c.bio.career.map((career, i) => (
              <Reveal
                key={career.role}
                delay={i * 0.08}
                className="border-b border-paper-edge py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <span className="eyebrow text-gold-600">{career.year}</span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ink-900">
                  {career.role}
                </h3>
                <p className="mt-2 text-sm font-medium text-ink-800/70">{career.org}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-800/75">
                  {career.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Notable trials — set in Tennessee, where they were tried */}
      <section className="grain relative overflow-hidden bg-ink-950 py-20 text-paper md:py-28">
        <Image
          src="/stock/memphis-bridge.webp"
          alt={p.bridgeAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />

        <div className="container-x relative">
          <Reveal>
            <Eyebrow n="03" tone="light">{p.trialsEyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
              {p.trialsTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-ink-800/60 md:grid-cols-2">
            {c.bio.notableTrials.map((t, i) => (
              <Reveal key={t.caption} delay={i * 0.08} className="bg-ink-950/80 p-10 backdrop-blur-sm md:p-12">
                <span className="font-display text-3xl text-gold-600/60">0{i + 1}</span>
                <p className="mt-6 font-display text-2xl italic leading-snug md:text-3xl">
                  {t.caption}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-300/70">
              {p.trialsNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="04">{p.meansEyebrow}</Eyebrow>
          </Reveal>
          <GoldRule className="mt-8 w-full" />
          <div className="grid md:grid-cols-2">
            {c.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.n}
                delay={i * 0.06}
                className="border-b border-paper-edge py-10 md:px-10 md:odd:border-r md:odd:pl-0"
              >
                <span className="font-display text-3xl text-gold-600/70">{pillar.n}</span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ink-900">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink-800/75">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link
              href={path("practiceAreas", lang)}
              className="group mt-14 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              {p.seePracticeAreas}
              <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand lang={lang} n="05" />
    </>
  );
}
