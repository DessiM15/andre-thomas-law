import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { bio, firm, pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Andre Thomas — Houston Attorney, Licensed in TX & TN",
  description:
    "Andre Thomas is licensed in Texas and Tennessee. Former Shelby County prosecutor, Thurgood Marshall School of Law graduate, and trial attorney representing the injured.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The attorney"
        n="01"
        title={["Meet Andre Thomas:", "committed to justice."]}
        lede="Licensed in two states. A career that began by prosecuting cases and now spends itself taking them apart on behalf of the people they were built against."
        image="/stock/houston-skyline.webp"
        alt="The downtown Houston skyline at dusk"
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
                alt={`${firm.attorney}, attorney at ${firm.name}`}
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
                {bio.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* Credentials */}
            <Reveal delay={0.1}>
              <div className="mt-14 border-t border-paper-edge pt-10">
                <Eyebrow n="—">Bar admissions</Eyebrow>
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
                <Eyebrow n="—">Education</Eyebrow>
                <ul className="mt-6 space-y-5">
                  {bio.education.map((e) => (
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
            <Eyebrow n="02">The path here</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink-900">
              Both sides of the courtroom.
            </h2>
          </Reveal>

          <GoldRule className="mt-10 w-full" />

          <div className="grid md:grid-cols-3">
            {bio.career.map((c, i) => (
              <Reveal
                key={c.role}
                delay={i * 0.08}
                className="border-b border-paper-edge py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <span className="eyebrow text-gold-600">{c.year}</span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ink-900">
                  {c.role}
                </h3>
                <p className="mt-2 text-sm font-medium text-ink-800/70">{c.org}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-800/75">
                  {c.detail}
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
          alt="The Hernando de Soto Bridge over the Mississippi River at Memphis"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />

        <div className="container-x relative">
          <Reveal>
            <Eyebrow n="03" tone="light">Notable trials</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
              High-profile matters, argued in open court.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-ink-800/60 md:grid-cols-2">
            {bio.notableTrials.map((t, i) => (
              <Reveal key={t.caption} delay={i * 0.08} className="bg-ink-950/80 p-10 backdrop-blur-sm md:p-12">
                <span className="font-display text-3xl text-gold-600/60">
                  0{i + 1}
                </span>
                <p className="mt-6 font-display text-2xl italic leading-snug md:text-3xl">
                  {t.caption}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 max-w-2xl text-xs leading-relaxed text-ink-300/70">
              Matters listed reflect trials in which Andre Thomas participated.
              Prior results do not guarantee or predict a similar outcome in any
              future case.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="04">What that means for you</Eyebrow>
          </Reveal>
          <GoldRule className="mt-8 w-full" />
          <div className="grid md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.06}
                className="border-b border-paper-edge py-10 md:px-10 md:odd:border-r md:odd:pl-0"
              >
                <span className="font-display text-3xl text-gold-600/70">{p.n}</span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink-800/75">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link
              href="/practice-areas"
              className="group mt-14 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              See the practice areas
              <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand n="05" />
    </>
  );
}
