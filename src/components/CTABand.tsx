import ContactForm from "@/components/ContactForm";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { firm, fullAddress } from "@/lib/site";

export default function CTABand({ n = "07" }: { n?: string }) {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink-950 py-24 text-paper md:py-32">
      <div className="container-x relative">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          {/* Pitch */}
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow n={n} tone="light">Talk to Andre</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04]">
                The consultation is free.
                <span className="block italic text-gold-500">
                  So is finding out where you stand.
                </span>
              </h2>
            </Reveal>

            <GoldRule className="mt-8 w-40" />

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md leading-relaxed text-ink-200">
                Tell us what happened. You&apos;ll get a straight answer about
                whether you have a case worth pursuing — no obligation, no
                pressure, no cost.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-12 space-y-7 text-sm">
                <div>
                  <dt className="eyebrow mb-2 text-gold-500">Call</dt>
                  <dd>
                    <a
                      href={firm.phoneHref}
                      className="font-display text-3xl transition-colors hover:text-gold-400 md:text-4xl"
                    >
                      {firm.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2 text-gold-500">Email</dt>
                  <dd>
                    <a href={firm.emailHref} className="link-underline break-all text-ink-200">
                      {firm.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2 text-gold-500">Office</dt>
                  <dd className="leading-relaxed text-ink-200">
                    <a
                      href={firm.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-paper"
                    >
                      {fullAddress}
                    </a>
                    <span className="mt-2 block text-ink-300">{firm.hours}</span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
            <ContactForm tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
