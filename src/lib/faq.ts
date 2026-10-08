import type { Faq } from "@/lib/content/types";

/** The element id a question is reachable at: `/contact#faq-contingency-fee`. */
export const faqAnchor = (id: string) => `faq-${id}`;

/**
 * `FAQPage` structured data for one page's questions.
 *
 * Google stopped showing FAQ rich results for most sites in 2023, so this
 * is not chasing a snippet; it is there so the page's questions are read as
 * questions, with the answer text attached, by anything that parses the
 * markup. Answers carry the same paragraphs the page renders, as `<p>`s —
 * the markup must match what a visitor can see.
 */
export function faqJsonLd(faqs: Faq[], lang: string) {
  return {
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.map((p) => `<p>${p}</p>`).join(""),
      },
    })),
  };
}
