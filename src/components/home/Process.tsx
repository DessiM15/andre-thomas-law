import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { process } from "@/lib/site";

export default function Process() {
  return (
    <section id="process" className="bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Sticky heading rail */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <Eyebrow n="05">What actually happens</Eyebrow>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.08] text-ink-900">
                  Four steps, in plain English.
                </h2>
                <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-ink-800/75">
                  No one should have to guess what comes next. Here is the whole
                  shape of it, start to finish.
                </p>
              </Reveal>
              <GoldRule className="mt-8 w-24" />
            </div>
          </div>

          {/* Steps */}
          <div className="md:col-span-7 md:col-start-6">
            {process.map((step, i) => (
              <Reveal
                key={step.n}
                delay={i * 0.06}
                className="border-t border-paper-edge py-10 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-6 md:gap-10">
                  <span className="font-display text-2xl text-gold-600 md:text-3xl">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-snug text-ink-900 md:text-[1.85rem]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[1rem] leading-relaxed text-ink-800/80">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
