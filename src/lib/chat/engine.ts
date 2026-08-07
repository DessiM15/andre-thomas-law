import {
  ADVICE_PATTERNS,
  ADVICE_RESPONSE,
  allEntries,
  EMERGENCY_PATTERNS,
  EMERGENCY_RESPONSE,
  FALLBACK,
  SENSITIVE_PATTERNS,
  SENSITIVE_RESPONSE,
  type Entry,
} from "./kb";

export type Reply = {
  text: string;
  link?: Entry["link"];
  chips?: string[];
  /** Set when a guardrail fired rather than the knowledge base answering. */
  guarded?: "advice" | "emergency" | "sensitive";
};

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","am","do","does","did","i","you","he","she","it","we","they","my","your","his","her","our","their","me","him","them","of","to","in","on","at","for","with","about","from","by","as","and","or","but","if","so","that","this","these","those","there","here","what","when","where","who","how","why","which","can","could","would","should","will","may","might","have","has","had","get","got","just","please","tell","know","need","want","like","help",
]);

const normalize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").replace(/\s+/g, " ").trim();

const tokenize = (s: string) =>
  normalize(s).split(" ").filter((w) => w.length > 1 && !STOPWORDS.has(w));

/**
 * Retrieval by weighted overlap. Deliberately boring and deterministic —
 * a law firm's assistant should be predictable, not creative.
 *
 * NOTE FOR PHASE TWO: when the firm signs, this is the seam. Replace the
 * body of `answer()` with a Claude API call, passing `allEntries` as
 * grounding context and the guardrail checks below as a system prompt.
 * The UI and the API route stay exactly as they are.
 */
export function answer(input: string): Reply {
  const raw = input.trim();
  if (!raw) return { text: FALLBACK };

  // ── Guardrails run first, in order of seriousness ──────────────
  if (EMERGENCY_PATTERNS.some((p) => p.test(raw)))
    return { text: EMERGENCY_RESPONSE, guarded: "emergency" };

  if (SENSITIVE_PATTERNS.some((p) => p.test(raw)))
    return { text: SENSITIVE_RESPONSE, guarded: "sensitive" };

  if (ADVICE_PATTERNS.some((p) => p.test(raw)))
    return {
      text: ADVICE_RESPONSE,
      link: { label: "Request a free consultation", href: "/contact" },
      guarded: "advice",
    };

  // ── Retrieval ──────────────────────────────────────────────────
  const queryTokens = tokenize(raw);
  const normalized = normalize(raw);
  if (queryTokens.length === 0) return { text: FALLBACK };

  let best: { entry: Entry; score: number } | null = null;

  for (const entry of allEntries) {
    let score = 0;

    for (const tag of entry.tags) {
      const t = normalize(tag);
      // Whole multi-word tag appearing verbatim is the strongest signal.
      if (t.includes(" ") && normalized.includes(t)) score += 6;
      const tagTokens = tokenize(tag);
      for (const tok of tagTokens) {
        if (queryTokens.includes(tok)) score += 3;
      }
    }

    const answerTokens = new Set(tokenize(entry.answer));
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
      text: FALLBACK,
      link: { label: "Contact the firm", href: "/contact" },
      chips: ["What areas do you handle?", "Where is the office?"],
    };
  }

  return {
    text: best.entry.answer,
    link: best.entry.link,
    chips: best.entry.next,
  };
}
