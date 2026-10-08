"use client";

import { useEffect } from "react";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import type { Faq } from "@/lib/content/types";
import { faqAnchor } from "@/lib/faq";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";

/**
 * The collapsible question-and-answer section.
 *
 * Native `<details>`: no script is needed to open an answer, every answer is
 * in the HTML a crawler reads, and the keyboard and screen-reader behaviour
 * comes from the browser. The one script this does run opens the question a
 * link points at — a Business Profile post sends people to
 * `/contact#faq-contingency-fee`, and landing on a closed row with the
 * answer hidden would be a poor first impression.
 */
export default function FaqSection({
  lang,
  faqs,
  n,
  tone = "paper",
}: {
  lang: Lang;
  faqs: Faq[];
  /** The running section numeral, where the page has one. */
  n?: string;
  tone?: "paper" | "warm";
}) {
  const c = content(lang);
  const t = c.ui.faq;

  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={`border-t border-paper-edge py-16 md:py-24 ${
        tone === "warm" ? "bg-paper-warm" : "bg-paper"
      }`}
    >
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow n={n}>{t.eyebrow}</Eyebrow>
            <h2
              id="faq-heading"
              className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-ink-900"
            >
              {t.title}
            </h2>
          </Reveal>
          <GoldRule className="mt-8 w-32" />
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-sm leading-relaxed text-ink-800/80">{t.lede}</p>
            <p className="mt-6 text-sm text-ink-800/80">
              {t.more}{" "}
              <a
                href={firm.phoneHref}
                className="font-display text-xl text-gold-800 transition-colors hover:text-ink-900"
              >
                {firm.phone}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <div className="border-t border-paper-edge">
            {faqs.map((f, i) => (
              <details
                key={f.id}
                id={faqAnchor(f.id)}
                className="group scroll-mt-32 border-b border-paper-edge"
              >
                <summary className="flex cursor-pointer list-none items-start gap-5 py-6 [&::-webkit-details-marker]:hidden md:gap-7 md:py-7">
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-display text-lg text-gold-800"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 font-display text-[1.3rem] leading-snug text-ink-900 transition-colors group-hover:text-gold-800 md:text-[1.6rem]">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-display text-2xl leading-none text-gold-800 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="space-y-4 pb-8 pl-[2.6rem] pr-8 text-[1rem] leading-relaxed text-ink-800/85 md:pl-[3.3rem]">
                  {f.a.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
