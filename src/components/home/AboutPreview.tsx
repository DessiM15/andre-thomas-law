import Image from "next/image";
import Link from "next/link";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { bio, firm } from "@/lib/site";

export default function AboutPreview() {
  return (
    <section className="grain relative overflow-hidden bg-ink-950 py-24 text-paper md:py-32">
      <div className="container-x relative">
        <div className="grid gap-14 md:grid-cols-12 md:gap-12">
          {/* Portrait */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/andre-seated.webp"
                alt={`${firm.attorney} on the courthouse steps`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                style={{ filter: "saturate(0.85) contrast(1.04)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-ink-950/15 mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 border border-gold-500/25" />
            </div>
            <p className="eyebrow mt-5 text-ink-300">
              {firm.attorney} · Founding Attorney
            </p>
          </Reveal>

          {/* Copy */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow n="04" tone="light">
                The attorney
              </Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
                {bio.heading}
              </h2>
            </Reveal>

            <GoldRule className="mt-8 w-full max-w-xs" />

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-ink-200">
                {bio.paragraphs.slice(0, 2).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* Notable trials */}
            <Reveal delay={0.18}>
              <div className="mt-10 border-t border-ink-800/70 pt-8">
                <p className="eyebrow mb-5 text-gold-500">Notable trials</p>
                <ul className="space-y-3">
                  {bio.notableTrials.map((t) => (
                    <li
                      key={t.caption}
                      className="font-display text-lg italic text-paper/90 md:text-xl"
                    >
                      {t.caption}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-4 border border-ink-200/25 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-gold-500 hover:text-gold-400"
              >
                Read the full background
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
