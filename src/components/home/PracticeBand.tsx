import Image from "next/image";
import Link from "next/link";
import { Eyebrow, GoldRule, MaskLines, Reveal } from "@/components/Reveal";
import { practiceAreas } from "@/lib/site";

/**
 * One screen, sixteen practice areas, one destination.
 *
 * Each name stays a real link rather than decorative text — the homepage is
 * the strongest page on the site, and these sixteen internal links are what
 * push authority down to the individual practice-area pages.
 */
export default function PracticeBand() {
  return (
    <section
      id="practice-areas"
      className="grain relative overflow-hidden bg-ink-950 py-24 text-paper md:py-32"
    >
      {/* Same photograph the Practice Areas page opens with — clicking through
          lands on it full-bleed, which reads as one continuous move. */}
      <Image
        src="/stock/pa-hero-crash.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950" />

      <div className="container-x relative">
        <Reveal>
          <Eyebrow n="02" tone="light">
            What we handle
          </Eyebrow>
        </Reveal>

        <MaskLines
          className="mt-7 font-display text-[clamp(2.1rem,5.4vw,4.2rem)] leading-[1.04] tracking-[-0.025em]"
          lines={[<>Sixteen ways a life</>, <>gets interrupted.</>]}
        />

        <GoldRule className="mt-10 w-full" />

        {/* The index, set as one dense block of type */}
        <Reveal delay={0.12}>
          <p className="mt-12 max-w-6xl font-display text-[clamp(1.35rem,3.1vw,2.5rem)] leading-[1.5]">
            {practiceAreas.map((area, i) => (
              // Name and its trailing separator travel together and never
              // split, so a line can only break *after* a ✦ — never before
              // one, and never through a practice area's name.
              // inline-block makes each unit an atomic inline box, which is
              // what creates the break opportunity between units — JSX leaves
              // no whitespace text nodes here to break on.
              <span key={area.slug} className="inline-block whitespace-nowrap">
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="text-paper/75 transition-colors duration-300 hover:text-gold-400"
                >
                  {area.name}
                </Link>
                {i < practiceAreas.length - 1 && (
                  <span className="mx-3 select-none text-gold-600/70 md:mx-4">✦</span>
                )}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/practice-areas"
            className="group relative mt-14 inline-flex items-center gap-4 overflow-hidden bg-gold-500 px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
          >
            <span className="relative z-10">Explore practice areas</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
