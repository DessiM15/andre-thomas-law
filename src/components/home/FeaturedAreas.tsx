import Image from "next/image";
import Link from "next/link";
import { Eyebrow, GoldRule, MaskLines, Reveal } from "@/components/Reveal";
import { featuredAreas, getPracticeArea, tickerAreas } from "@/lib/site";

/**
 * Six cards over photographs, then the remaining ten running past in a gold
 * ticker. This is the page's only ticker — the marquee that used to sit under
 * the hero was removed so the device isn't spent twice.
 */
export default function FeaturedAreas() {
  const cards = featuredAreas
    .map((f) => ({ ...f, area: getPracticeArea(f.slug) }))
    .filter((c) => c.area);

  // Duplicated so the CSS loop has a seamless second half to scroll into.
  const ticker = [...tickerAreas, ...tickerAreas];

  return (
    <section
      id="practice-areas"
      // Tighter bottom padding: the attorney section below is also navy, so
      // generous padding on both sides just reads as an empty gap.
      className="grain relative overflow-hidden bg-ink-950 pb-14 pt-24 text-paper md:pb-16 md:pt-32"
    >
      <div className="container-x relative">
        <Reveal>
          <Eyebrow n="02" tone="light">
            What we handle
          </Eyebrow>
        </Reveal>

        <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <MaskLines
            className="font-display text-[clamp(2.1rem,5.4vw,4.2rem)] leading-[1.04] tracking-[-0.025em]"
            lines={[<>Sixteen ways a life</>, <>gets interrupted.</>]}
          />
          <Reveal delay={0.15}>
            <Link
              href="/practice-areas"
              className="group inline-flex shrink-0 items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper"
            >
              All sixteen
              <span className="h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
            </Link>
          </Reveal>
        </div>

        <GoldRule className="mt-10 w-full" />
      </div>

      {/* ── The six ────────────────────────────────────────────── */}
      <div className="container-x relative mt-12">
        <div className="grid gap-px bg-ink-800/50 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <Link
                href={`/practice-areas/${c.slug}`}
                className="group relative flex min-h-[19rem] flex-col justify-end overflow-hidden bg-ink-950 p-7 md:min-h-[22rem] md:p-8"
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div
                  className="absolute inset-0 bg-ink-900 mix-blend-multiply"
                  style={{ opacity: c.dim }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/65 to-ink-950/10 transition-opacity duration-700 group-hover:opacity-90" />

                <div className="relative">
                  <span className="font-display text-xl text-gold-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.6rem] leading-tight text-paper md:text-[1.9rem]">
                    {c.area!.name}
                  </h3>
                  <span className="mt-4 block h-px w-12 bg-gold-500 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20" />
                  <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-200">
                    {c.area!.short}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── And the other ten ──────────────────────────────────── */}
      <div className="relative mt-14">
        <p className="container-x eyebrow mb-5 text-ink-300">
          Also handled
        </p>
        <div className="relative overflow-hidden border-y border-ink-800/50 py-4">
          <div className="flex w-max animate-[atl-ticker_48s_linear_infinite] motion-reduce:animate-none">
            {ticker.map((area, i) => (
              <Link
                key={`${area.slug}-${i}`}
                href={`/practice-areas/${area.slug}`}
                className="flex items-center whitespace-nowrap px-7 font-display text-lg text-paper/70 transition-colors hover:text-gold-400 md:text-xl"
              >
                {area.name}
                <span className="ml-7 text-gold-600/80">✦</span>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-ink-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-ink-950 to-transparent" />
        </div>

        <style>{`
          @keyframes atl-ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <div className="container-x relative mt-14">
        <Reveal>
          <Link
            href="/practice-areas"
            className="group relative inline-flex items-center gap-4 overflow-hidden bg-gold-500 px-9 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
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
