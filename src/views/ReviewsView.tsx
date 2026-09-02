import PageHeader from "@/components/PageHeader";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { path, type Lang } from "@/lib/i18n";

export default function ReviewsView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.reviews;

  const rated =
    lang === "es"
      ? `Calificación de ${firm.reviews.rating} estrellas en ${firm.reviews.count} reseñas de Google.`
      : `Rated ${firm.reviews.rating} stars across ${firm.reviews.count} Google reviews.`;

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: c.schema.home, href: path("home", lang) },
          { name: p.eyebrow, href: path("reviews", lang) },
        ]}
      />

      {/* The keyword heading sits on the eyebrow here, not on the display
          line. "What it's like to be represented." is the better line and it
          stays exactly as it renders; only the tag moved. */}
      <PageHeader
        eyebrow={p.eyebrow}
        n="01"
        title={p.titleLines}
        lede={`${rated} ${p.lede}`}
        h1="eyebrow"
      />

      <ReviewsBand lang={lang} n="02" />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="03">{p.whyEyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink-900">
              {p.whyTitle}
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-800/80">{p.whyBody}</p>
          </Reveal>

          <GoldRule className="mt-12 w-full" />

          <div className="grid md:grid-cols-2">
            {c.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.n}
                delay={i * 0.06}
                className="border-b border-paper-edge py-10 md:px-10 md:odd:border-r md:odd:pl-0"
              >
                <span className="font-display text-3xl text-gold-600/70">{pillar.n}</span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ink-900">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink-800/75">
                  {pillar.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a
              href={firm.reviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-14 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              {p.readOnGoogle}
              <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand lang={lang} n="04" />
    </>
  );
}
