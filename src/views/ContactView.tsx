import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm, fullAddress } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";

export default function ContactView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.contact;

  return (
    <>
      <PageHeader
        eyebrow={p.eyebrow}
        n="01"
        title={p.titleLines}
        lede={p.lede}
        image="/stock/contact-distress.webp"
        alt={p.heroAlt}
        focal="70% 30%"
        tall
      />

      {/* Form + details */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow n="02">{p.requestEyebrow}</Eyebrow>
            </Reveal>
            <GoldRule className="mt-6 mb-12 w-32" />
            <Reveal delay={0.06}>
              <ContactForm lang={lang} />
            </Reveal>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.1}>
              <div className="md:sticky md:top-28">
                <Eyebrow n="03">{p.officeEyebrow}</Eyebrow>

                <dl className="mt-8 space-y-8 text-[0.95rem]">
                  <div>
                    <dt className="eyebrow mb-3 text-gold-700">{p.phone}</dt>
                    <dd>
                      <a
                        href={firm.phoneHref}
                        className="font-display text-3xl text-ink-900 transition-colors hover:text-gold-700"
                      >
                        {firm.phone}
                      </a>
                      <span className="mt-2 block text-sm text-ink-800/60">
                        {c.ui.footer.fax} {firm.fax}
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow mb-3 text-gold-700">{p.email}</dt>
                    <dd>
                      <a
                        href={firm.emailHref}
                        className="link-underline break-all text-ink-800/85"
                      >
                        {firm.email}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow mb-3 text-gold-700">{p.address}</dt>
                    <dd className="leading-relaxed text-ink-800/85">
                      <a
                        href={firm.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-ink-900"
                      >
                        {firm.address.street}
                        <br />
                        {firm.address.suite}
                        <br />
                        {firm.address.city}, {firm.address.state} {firm.address.zip}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="eyebrow mb-3 text-gold-700">{p.hours}</dt>
                    <dd className="text-ink-800/85">{c.hours}</dd>
                  </div>

                  <div>
                    <dt className="eyebrow mb-3 text-gold-700">{p.licensedIn}</dt>
                    <dd className="flex gap-3">
                      {firm.barAdmissions.map((s) => (
                        <span
                          key={s}
                          className="border border-gold-500/40 bg-gold-100/60 px-4 py-2 font-display text-base text-ink-900"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-paper-edge">
        <div className="relative h-[380px] w-full bg-paper-warm md:h-[460px]">
          <iframe
            title={`${p.mapTitle} ${firm.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed&hl=${lang}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[0.35] contrast-[1.05]"
            style={{ border: 0 }}
          />
        </div>
      </section>

      {/* What happens next */}
      <section className="grain relative overflow-hidden bg-ink-950 py-20 text-paper md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="04" tone="light">{p.nextEyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
              {p.nextTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-ink-800/60 md:grid-cols-2 lg:grid-cols-4">
            {c.process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06} className="bg-ink-950 p-8 md:p-10">
                <span className="font-display text-3xl text-gold-600/70">{step.n}</span>
                <h3 className="mt-5 font-display text-xl leading-snug md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-200">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-12 max-w-3xl text-xs leading-relaxed text-ink-300/70">
              {p.formNote}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
