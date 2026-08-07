import Image from "next/image";
import { Eyebrow, GoldRule, MaskLines, Reveal } from "@/components/Reveal";
import { advocatePanels, whyFirm } from "@/lib/site";

/**
 * One section, two beats: the firm's own "why choose us" paragraph as the
 * lede, then its three pillars as full-bleed panels under a navy wash —
 * the FGT treatment, with the copy lifted verbatim from the firm's site.
 */
export default function WhyFirm() {
  return (
    <section className="bg-paper pt-24 md:pt-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow n="01">A compassionate advocate for justice</Eyebrow>
        </Reveal>

        <MaskLines
          className="mt-7 max-w-4xl font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-ink-900"
          lines={[<>Why Andre Thomas</>, <>Law, PLLC.</>]}
        />

        <GoldRule className="mt-9 w-full max-w-sm" />

        <Reveal delay={0.1}>
          <p className="mt-9 max-w-3xl text-[1.08rem] leading-relaxed text-ink-800/85 md:text-[1.2rem]">
            {whyFirm.lede}
          </p>
        </Reveal>
      </div>

      {/* ── Panels ─────────────────────────────────────────────── */}
      <div className="mt-16 grid grid-cols-1 gap-px bg-paper-edge md:mt-20 md:grid-cols-3">
        {advocatePanels.map((panel, i) => (
          <Reveal key={panel.n} delay={i * 0.09}>
            <article className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden bg-ink-950 p-8 md:min-h-[38rem] md:p-10">
              <Image
                src={panel.image}
                alt={panel.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              {/* Navy wash — binds three unrelated photographs into one set.
                  Kept light enough that the darkest of them still reads. */}
              <div className="absolute inset-0 bg-ink-900/45 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />

              <div className="relative">
                <span className="font-display text-2xl text-gold-500">{panel.n}</span>
                <h3 className="mt-4 font-display text-[1.75rem] leading-tight text-paper md:text-[2.1rem]">
                  {panel.title}
                </h3>
                <span className="mt-5 block h-px w-14 bg-gold-500 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-24" />
                <p className="mt-5 text-[0.92rem] leading-relaxed text-ink-200">
                  {panel.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
