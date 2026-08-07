import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { pillars } from "@/lib/site";

export default function Pillars() {
  return (
    <section className="border-t border-paper-edge bg-paper-warm py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow n="02">Why the other side should worry</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08] text-ink-900">
              Credentials are common. This combination is not.
            </h2>
          </Reveal>
        </div>

        <GoldRule className="mt-12 w-full" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.08}
              className="group border-b border-paper-edge px-0 py-10 md:border-r md:px-8 md:first:pl-0 lg:last:border-r-0 [&:nth-child(2)]:md:border-r-0 lg:[&:nth-child(2)]:border-r"
            >
              <span className="font-display text-4xl text-gold-600/70 transition-colors duration-500 group-hover:text-gold-600">
                {p.n}
              </span>
              <h3 className="mt-6 font-display text-2xl leading-snug text-ink-900">
                {p.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-800/75">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
