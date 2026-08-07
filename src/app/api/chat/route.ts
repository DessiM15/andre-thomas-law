import { NextResponse } from "next/server";
import { answer } from "@/lib/chat/engine";

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
    const { message } = await req.json();

    if (typeof message !== "string" || message.length > 1000) {
      return NextResponse.json(
        { text: "Sorry — I couldn't read that. Try rephrasing?" },
        { status: 400 }
      );
    }

    return NextResponse.json(answer(message));
  } catch {
    return NextResponse.json(
      { text: "Something went wrong on my end. Please call 713-212-3003." },
      { status: 500 }
    );
  }
}
