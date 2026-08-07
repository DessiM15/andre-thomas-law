import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { practiceAreas, practiceGroups, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice Areas — Houston Personal Injury Attorney",
  description:
    "Car and truck accidents, workplace and industrial injuries, maritime and offshore, premises liability, product defects, insurance disputes, wrongful death, and more. Free consultation.",
  alternates: { canonical: "/practice-areas" },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Practice Areas",
  itemListElement: practiceAreas.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.name,
    url: `${SITE_URL}/practice-areas/${a.slug}`,
  })),
};

export default function PracticeAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHeader
        eyebrow="Practice areas"
        n="01"
        title={["Sixteen ways", "a life gets interrupted."]}
        lede="Every one of these begins the same way — someone else was careless, and you are the one carrying it. Find yours below, or call and describe what happened."
      />

      {practiceGroups.map((group, gi) => {
        const areas = practiceAreas.filter((a) => a.group === group.id);
        if (areas.length === 0) return null;

        return (
          <section
            key={group.id}
            className={gi % 2 === 0 ? "bg-paper" : "border-y border-paper-edge bg-paper-warm"}
          >
            <div className="container-x py-16 md:py-20">
              <Reveal>
                <Eyebrow n={group.n}>{group.label}</Eyebrow>
              </Reveal>
              <GoldRule className="mt-6 w-full" />

              <div className="grid gap-px bg-paper-edge md:grid-cols-2 lg:grid-cols-3">
                {areas.map((area, i) => (
                  <Reveal key={area.slug} delay={i * 0.05}>
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className={`group relative flex h-full flex-col overflow-hidden p-8 transition-colors duration-500 md:p-10 ${
                        gi % 2 === 0 ? "bg-paper" : "bg-paper-warm"
                      }`}
                    >
                      <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-950 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                      <span className="relative flex h-full flex-col">
                        <span className="font-display text-2xl leading-tight text-ink-900 transition-colors duration-500 group-hover:text-paper md:text-[1.75rem]">
                          {area.name}
                        </span>
                        <span className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-ink-800/65 transition-colors duration-500 group-hover:text-ink-200">
                          {area.short}
                        </span>
                        <span className="eyebrow mt-8 flex items-center gap-3 text-gold-600 transition-colors duration-500 group-hover:text-gold-400">
                          Learn more
                          <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Criminal defense note — from the firm's own bio */}
      <section className="bg-paper py-16 md:py-20">
        <div className="container-x">
          <Reveal>
            <div className="border border-paper-edge bg-paper-warm p-10 md:p-14">
              <Eyebrow n="06">Also handled</Eyebrow>
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] text-ink-900">
                Criminal defense — felony and misdemeanor.
              </h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-ink-800/80">
                Alongside the personal injury practice, Andre defends clients
                facing felony and misdemeanor charges. Having prosecuted at the
                Shelby County District Attorney&apos;s Office, he has worked these
                cases from both sides of the aisle.
              </p>
              <Link
                href="/contact"
                className="group mt-9 inline-flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
              >
                Discuss your case
                <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand n="07" />
    </>
  );
}
