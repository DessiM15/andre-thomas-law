import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ReviewsBand from "@/components/ReviewsBand";
import CTABand from "@/components/CTABand";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { firm, pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Reviews — 4.9 Stars Across 60 Google Reviews",
  description: `Read what clients say about ${firm.name}. Rated ${firm.reviews.rating} stars across ${firm.reviews.count} Google reviews.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client reviews"
        n="01"
        title={["What it's like", "to be represented."]}
        lede={`Rated ${firm.reviews.rating} stars across ${firm.reviews.count} Google reviews. These are published exactly as clients wrote them.`}
      />

      <ReviewsBand n="02" />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow n="03">Why clients stay</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink-900">
              Diligence, determination, and empathy.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink-800/80">
              The firm&apos;s practice is built around client-centric values —
              prioritizing each client&apos;s needs and concerns rather than
              running them through a process.
            </p>
          </Reveal>

          <GoldRule className="mt-12 w-full" />

          <div className="grid md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.06}
                className="border-b border-paper-edge py-10 md:px-10 md:odd:border-r md:odd:pl-0"
              >
                <span className="font-display text-3xl text-gold-600/70">{p.n}</span>
                <h3 className="mt-5 font-display text-2xl leading-snug text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-ink-800/75">
                  {p.body}
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
              Read every review on Google
              <span className="h-px w-12 bg-gold-500 transition-all duration-500 group-hover:w-20" />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand n="04" />
    </>
  );
}
