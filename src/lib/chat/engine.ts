import { DEFAULT_LANG, type Lang } from "@/lib/i18n";
import { contactLink, getBundle, type Bundle, type Entry } from "./kb";

export type Reply = {
  text: string;
  link?: Entry["link"];
  chips?: string[];
  /** Set when a guardrail fired rather than the knowledge base answering. */
  guarded?: "advice" | "emergency" | "sensitive";
};

/**
 * Fold accents before comparing. Without this, "años" tokenizes as "a" +
 * "os" and every accented Spanish query scores zero — the single change
 * that makes retrieval work in Spanish at all.
 */
const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalize = (s: string) =>
  fold(s.toLowerCase())
    .replace(/[^a-z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s: string, stopwords: Set<string>) =>
  normalize(s)
    .split(" ")
    .filter((w) => w.length > 1 && !stopwords.has(w));

/**
 * Retrieval by weighted overlap. Deliberately boring and deterministic —
 * a law firm's assistant should be predictable, not creative.
 *
 * NOTE FOR PHASE TWO: when the firm signs, this is the seam. Replace the
 * body of `answer()` with a Claude API call, passing the bundle's entries
 * as grounding context and the guardrails below as a system prompt. Pass
 * `lang` through so the model replies in the visitor's language. The UI
 * and the API route stay exactly as they are.
 */
export function answer(input: string, lang: Lang = DEFAULT_LANG): Reply {
  const bundle: Bundle = getBundle(lang);
  const raw = input.trim();
  if (!raw) return { text: bundle.fallback };

  // ── Guardrails run first, in order of seriousness ──────────────
  if (bundle.emergency.patterns.some((p) => p.test(raw)))
    return { text: bundle.emergency.response, guarded: "emergency" };

  if (bundle.sensitive.patterns.some((p) => p.test(raw)))
    return { text: bundle.sensitive.response, guarded: "sensitive" };

  if (bundle.advice.patterns.some((p) => p.test(raw)))
    return {
      text: bundle.advice.response,
      link: { label: bundle.advice.linkLabel, href: contactLink(lang).href },
      guarded: "advice",
    };

  // ── Retrieval ──────────────────────────────────────────────────
  const queryTokens = tokenize(raw, bundle.stopwords);
  const normalized = normalize(raw);
  if (queryTokens.length === 0) return { text: bundle.fallback };

  let best: { entry: Entry; score: number } | null = null;

  for (const entry of bundle.entries) {
    let score = 0;

    for (const tag of entry.tags) {
      const t = normalize(tag);
      // Whole multi-word tag appearing verbatim is the strongest signal.
      if (t.includes(" ") && normalized.includes(t)) score += 6;
      const tagTokens = tokenize(tag, bundle.stopwords);
      for (const tok of tagTokens) {
        if (queryTokens.includes(tok)) score += 3;
      }
    }

    const answerTokens = new Set(tokenize(entry.answer, bundle.stopwords));
    for (const tok of queryTokens) {
      if (answerTokens.has(tok)) score += 0.4;
    }

    // Damp entries that simply carry more tags — but gently. A square root
    // penalised well-tagged entries so hard that single-keyword hits like
    // "arrested" fell below the threshold and hit the fallback.
    score = score / Math.pow(Math.max(entry.tags.length, 1), 0.25);

    if (!best || score > best.score) best = { entry, score };
  }

  if (!best || best.score < 1.1) {
    return {
      text: bundle.fallback,
      link: contactLink(lang),
      chips: bundle.openers.slice(0, 2),
    };
  }

  return {
    text: best.entry.answer,
    link: best.entry.link,
    chips: best.entry.next,
  };
}
