import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { firm, reviews } from "@/lib/site";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`text-gold-600 ${className}`} aria-hidden>
      ★★★★★
    </span>
  );
}

export default function ReviewsBand({ n = "06" }: { n?: string }) {
  return (
    <section className="border-t border-paper-edge bg-paper-warm py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow n={n}>In their words</Eyebrow>
        </Reveal>

        {/* The number, big */}
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex items-end gap-6">
              <span className="font-display text-[clamp(4rem,13vw,9rem)] leading-[0.82] text-ink-900">
                {firm.reviews.rating}
              </span>
              <div className="pb-3">
                <Stars className="text-lg" />
                <p className="mt-2 text-sm text-ink-800/70">
                  {firm.reviews.count} Google reviews
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={firm.reviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-800"
            >
              Read them all on Google
              <span className="h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
            </a>
          </Reveal>
        </div>

        <GoldRule className="mt-12 w-full" />

        {/* Quotes */}
        <div className="grid gap-px bg-paper-edge md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.author} delay={i * 0.08} className="bg-paper-warm p-8 md:p-10">
              <Stars className="text-sm" />
              <blockquote className="mt-6 font-display text-xl leading-snug text-ink-900 md:text-[1.6rem]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 text-sm text-ink-800/65">
                <span className="font-medium text-ink-900">{r.author}</span>
                <span className="mx-2 text-gold-600">·</span>
                {r.date}
                {r.truncated && (
                  <a
                    href={firm.reviews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline ml-2 text-gold-700"
                  >
                    Read full review
                  </a>
                )}
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-xs text-ink-800/50">
            Reviews are shown as published on Google. Prior results do not
            guarantee a similar outcome.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
