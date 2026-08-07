# Andre Thomas Law, PLLC — website concept

A Next.js 15 concept build for Andre Thomas Law, PLLC (Houston, TX), produced
by [SmartScale](https://smartscaleagent.com) as a pitch piece.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Bodoni Moda + Inter via `next/font`.

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/site.ts` | **Single source of truth.** Firm details, bio, all 16 practice areas, reviews, process steps. Edit copy here, not in components. |
| `src/lib/chat/kb.ts` | Chat assistant knowledge base + guardrail patterns. |
| `src/lib/chat/engine.ts` | Retrieval and guardrail logic. |
| `src/app/api/chat/route.ts` | Chat endpoint — the swap point for a real LLM. |
| `src/app/api/contact/route.ts` | Lead intake. |
| `src/components/` | Shared UI. `home/` holds homepage-only sections. |

## ⚠️ Before this goes live

**1. Lead delivery is not wired up.** `src/app/api/contact/route.ts` validates
and logs submissions but sends no email unless these are set:

```
RESEND_API_KEY=...
LEAD_TO=AT@andrethomaslaw.com
LEAD_FROM=leads@andrethomaslaw.com
```

Without them the visitor still sees a success message. Wire this up or swap in
whatever handler the firm already uses.

**2. Confirm the review excerpts.** Two of the three reviews in `site.ts` are
truncated exactly as Google displays them. Pull the full text before launch.

**3. Google reviews link** in `site.ts` is a search URL. Replace with the
firm's Google Place URL.

**4. `SITE_URL`** in `src/lib/site.ts` drives canonicals, sitemap, and JSON-LD.
Point it at the real deployment domain.

**5. Have the firm's attorney review** `/disclaimer` and `/privacy`. These are
drafted from standard practice, not from the firm's existing policies.

**6. Stock photography.** Everything in `public/stock/` comes from Pexels under
the [Pexels License](https://www.pexels.com/license/) — free for commercial use,
no attribution required, no release needed for the site. Swap any of them by
replacing the file; paths are referenced from `src/lib/site.ts` and the page
components. Note that `panel-client.webp` shows models, not firm personnel — if
that reads as "our team" to the client, replace it.

**7. Logo.** `public/logo-dark.png` and `public/logo-light.png` were derived
from `andre thomas PLLC logo.webp` by keying the white field to transparency
(luminance → alpha, which preserves the hairline serifs). If the firm supplies
an original transparent vector or PNG, drop it in and replace both — a native
file will always beat a derived one.

## The chat assistant

Deterministic retrieval over the site's own content — no model call, so it
cannot hallucinate. Guardrails run *before* retrieval, in order:

1. **Emergency** — anything suggesting danger routes to 911.
2. **Sensitive data** — SSN-shaped input, DOB, policy numbers get refused.
3. **Legal advice** — "do I have a case", "what's it worth", "how long do I
   have", "should I sign" and similar patterns are declined and redirected to
   a consultation.

A permanent, non-dismissible banner states it is not an attorney and that no
attorney–client relationship is created.

### Upgrading to Claude

Replace the `answer()` call in `src/app/api/chat/route.ts` with an Anthropic
request, passing `allEntries` from `kb.ts` as grounding context and the
guardrail rules as the system prompt. The response contract
(`{ text, link, chips }`) is what the widget renders, so no front-end changes
are needed.

## SEO

Per-page metadata and canonicals · `Attorney` + `Service` + `BreadcrumbList` +
`ItemList` JSON-LD · generated `sitemap.xml` and `robots.txt` · 16 statically
generated practice-area pages · semantic headings · `prefers-reduced-motion`
respected throughout.
