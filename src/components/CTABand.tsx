import ContactForm from "@/components/ContactForm";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm, fullAddress } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";

export default function CTABand({ lang, n = "07" }: { lang: Lang; n?: string }) {
  const c = content(lang);

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink-950 py-24 text-paper md:py-32">
      <div className="container-x relative">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          {/* Pitch */}
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow n={n} tone="light">{c.ui.cta.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04]">
                {c.ui.cta.titleA}
                <span className="block italic text-gold-500">{c.ui.cta.titleB}</span>
              </h2>
            </Reveal>

            <GoldRule className="mt-8 w-40" />

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md leading-relaxed text-ink-200">{c.ui.cta.body}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-12 space-y-7 text-sm">
                <div>
                  <dt className="eyebrow mb-2 text-gold-500">{c.ui.cta.call}</dt>
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
                  <dt className="eyebrow mb-2 text-gold-500">{c.ui.cta.email}</dt>
                  <dd>
                    <a href={firm.emailHref} className="link-underline break-all text-ink-200">
                      {firm.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2 text-gold-500">{c.ui.cta.office}</dt>
                  <dd className="leading-relaxed text-ink-200">
                    <a
                      href={firm.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-paper"
                    >
                      {fullAddress}
                    </a>
                    <span className="mt-2 block text-ink-300">{c.hours}</span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
            <ContactForm lang={lang} tone="dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
