import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`text-gold-600 ${className}`} aria-hidden>
      ★★★★★
    </span>
  );
}

export default function ReviewsBand({ lang, n = "06" }: { lang: Lang; n?: string }) {
  const c = content(lang);

  return (
    <section className="border-t border-paper-edge bg-paper-warm py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow n={n}>{c.ui.reviewsBand.eyebrow}</Eyebrow>
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
                  {firm.reviews.count} {c.ui.reviewsBand.googleReviews}
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
              {c.ui.reviewsBand.readAll}
              <span className="h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
            </a>
          </Reveal>
        </div>

        <GoldRule className="mt-12 w-full" />

        {/* Quotes. Reproduced in the language the client wrote them in —
            translating a real person's words would misrepresent them. */}
        <div className="grid gap-px bg-paper-edge md:grid-cols-3">
          {c.reviews.map((r, i) => (
            <Reveal key={r.author} delay={i * 0.08} className="bg-paper-warm p-8 md:p-10">
              <Stars className="text-sm" />
              <blockquote
                lang="en"
                className="mt-6 font-display text-xl leading-snug text-ink-900 md:text-[1.6rem]"
              >
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
                    {c.ui.reviewsBand.readFull}
                  </a>
                )}
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-xs text-ink-800/50">{c.ui.reviewsBand.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
