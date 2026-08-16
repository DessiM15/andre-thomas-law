import { NextResponse } from "next/server";
import { answer } from "@/lib/chat/engine";
import { firm } from "@/lib/firm";
import { DEFAULT_LANG, isLang } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * Chat endpoint.
 *
 * Today: deterministic retrieval over the site's own content (see engine.ts).
 * Phase two, once the firm signs: swap the `answer()` call below for a Claude
 * API request. The contract this route returns — { text, link, chips } — is
 * what the widget renders, so the front end will not need to change.
 *
 *   const res = await anthropic.messages.create({
 *     model: "claude-sonnet-5",
 *     system: SYSTEM_PROMPT,      // guardrails from kb.ts, verbatim
 *     messages: [...history, { role: "user", content: message }],
 *   })
 */
export async function POST(req: Request) {
  try {
    const { message, lang } = await req.json();
    const language = isLang(lang) ? lang : DEFAULT_LANG;

    if (typeof message !== "string" || message.length > 1000) {
      return NextResponse.json(
        {
          text:
            language === "es"
              ? "Perdón — no pude leer eso. ¿Puede escribirlo de otra forma?"
              : "Sorry — I couldn't read that. Try rephrasing?",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(answer(message, language));
  } catch {
    return NextResponse.json(
      { text: `Something went wrong on my end. Please call ${firm.phone}.` },
      { status: 500 }
    );
  }
}
