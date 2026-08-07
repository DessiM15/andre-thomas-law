import Link from "next/link";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { practiceAreas, practiceGroups } from "@/lib/site";

/**
 * The index. Sixteen practice areas presented as an editorial table of
 * contents rather than a grid of identical cards — the row itself is the
 * interaction, sweeping navy on hover.
 */
export default function PracticeIndex() {
  return (
    <section id="practice-areas" className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow n="03">What we handle</Eyebrow>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08] text-ink-900">
              Sixteen ways a life gets interrupted.
            </h2>
            <Link
              href="/practice-areas"
              className="group inline-flex shrink-0 items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              All practice areas
              <span className="h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
            </Link>
          </div>
        </Reveal>

        <GoldRule className="mt-12 w-full" />

        {practiceGroups.map((group) => {
          const areas = practiceAreas.filter((a) => a.group === group.id);
          if (areas.length === 0) return null;

          return (
            <div key={group.id} className="grid gap-4 border-b border-paper-edge py-10 md:grid-cols-12 md:gap-8">
              <Reveal className="md:col-span-3">
                <div className="md:sticky md:top-28">
                  <Eyebrow n={group.n}>{group.label}</Eyebrow>
                </div>
              </Reveal>

              <div className="md:col-span-9">
                {areas.map((area, i) => (
                  <Reveal key={area.slug} delay={i * 0.05}>
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className="group relative block overflow-hidden border-t border-paper-edge first:border-t-0"
                    >
                      {/* navy sweep */}
                      <span className="absolute inset-0 origin-left scale-x-0 bg-ink-950 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                      <span className="relative flex items-center gap-5 px-0 py-6 transition-[padding] duration-500 group-hover:px-6">
                        <span className="flex-1">
                          <span className="block font-display text-[clamp(1.5rem,3vw,2.35rem)] leading-tight text-ink-900 transition-colors duration-500 group-hover:text-paper">
                            {area.name}
                          </span>
                          <span className="mt-2 block max-w-xl text-[0.92rem] leading-relaxed text-ink-800/65 transition-colors duration-500 group-hover:text-ink-200">
                            {area.short}
                          </span>
                        </span>
                        <span className="shrink-0 text-gold-600 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold-400">
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
