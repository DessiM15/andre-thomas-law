# Andre Thomas Law · accessibility fix

Scanned 2026-09-25 with axe-core (WCAG 2.2 AA + best practice) at desktop and phone widths: home, practice areas (index + 5 detail pages), about, team, reviews, contact, /es.

> **How to use this file.** In Claude Code or Cursor, opened at this project's root, say: "Read ACCESSIBILITY-FIX.md and do everything in it." The findings section is the scan result from 2026-09-25; "The job" section is the work. When it reports done, follow the manual checks, then ask Smart Scale to rescan.

## Findings (cleanest of the three sites)

Passes: alt text, link and button names, form labels, lang on both languages, landmarks, skip link on English pages, one H1 per page, no contrast failures on desktop, no overlay widget.

1. **Intake form has no visible keyboard focus.** The 9 fields (name, phone, email, three selects, textarea) show no focus ring on every page. WCAG 2.4.7 / 2.4.11.
2. **Heading jump on home and /es.** H1 goes straight to H3 ("Core Values and Approach" / "Valores y forma de trabajar"). The values block needs an H2.
3. **Aside nested inside main** on contact and every practice-area detail page (landmark inside landmark).
4. **/es has no skip link** while the English pages do.
5. **Gold step numerals** ("01", "02") on team and reviews pages: #a4823a on #fbf9f5 and #f4efe5 at 11px, 3.1 to 3.4 : 1 on mobile. Needs 4.5 : 1.
6. **Undetermined contrast** (50 to 76 elements per page): nav links over a gradient, hero text over the photo, and decorative ✦ glyphs. Needs a manual check with a solid scrim, and the glyphs need aria-hidden.
7. **Not scanned:** the bilingual chat assistant widget and its intake flow. It must be keyboard operable, announce new messages, and trap focus while open.

---

## The job

Make this Next.js 15 / Tailwind / Framer Motion site conform to WCAG 2.2 Level AA without changing the visual design. An axe-core scan on 2026-09-25 found the issues listed below; fix each one, then do the manual checks, then verify. Do not install an accessibility overlay widget (accessiBe, UserWay, AudioEye or similar).

Fix these specific findings:

1. The intake form fields (name, phone, email, the three selects, and the textarea) have no visible focus indicator. Add a focus-visible style to every input, select, textarea, button and link site-wide: a 2px outline in a brand color with 2px offset, at least 3:1 against the surrounding background. Never use outline-none without replacing it with a visible ring.
2. On the home page and on /es the heading order jumps from H1 to H3 in the values section ("Core Values and Approach" / "Valores y forma de trabajar"). Give that section an H2, or promote those H3s, so levels never skip. Audit every page for the same pattern.
3. On /contact and on every /practice-areas/[slug] page an <aside> is rendered inside <main>. Either make it a <div> with an aria-label, or move it so landmarks do not nest.
4. The Spanish pages under /es have no "skip to main content" link. Add the same skip link the English layout has, with Spanish text, pointing to the main landmark, and make sure the target is focusable.
5. The gold step numerals ("01", "02", ...) on /team and /reviews use #a4823a at 11px on light backgrounds (#fbf9f5, #f4efe5), which is 3.1 to 3.4:1. Darken that gold token (a value around #7a5f1f or darker passes 4.5:1 on those backgrounds) or make the numerals 24px+ where 3:1 is allowed. Apply the same rule to every place that gold token is used for text under 24px.
6. axe could not measure contrast for the nav links over the header gradient, the hero heading and subheading over the photo, and the section labels with decorative pseudo-elements. Put a solid or near-solid scrim behind hero text and confirm the nav links meet 4.5:1 at both ends of the gradient. Mark the decorative ✦ glyphs and any icon-only decorations aria-hidden="true".

Then do these manual checks and fix what you find:

7. The chat assistant: the launcher button needs an accessible name and aria-expanded; the panel must be a dialog with focus moved inside on open, Escape to close, focus returned to the launcher, and new assistant messages announced through an aria-live="polite" region. Every intake question control must be reachable and operable by keyboard with a visible focus ring.
8. Framer Motion animations must respect prefers-reduced-motion. Use the useReducedMotion hook or a global MotionConfig reducedMotion="user" so animations disable for those users. Anything that moves for more than five seconds on its own needs a pause control.
9. Every link that opens a new tab needs a visually hidden "(opens in new tab)" inside the link text.
10. Form validation: errors must be text, associated to the field with aria-describedby, and announced. Required fields must be marked in text, not by color alone. On submit failure move focus to the first error.
11. Check that every image alt text describes the content, and that purely decorative images have alt="".
12. Confirm every page still has exactly one H1 and that the language switch keeps lang="en" / lang="es" correct on the html element.

Add an accessibility statement page at /accessibility (and /es/accesibilidad) linked from the footer. It should state that the site targets WCAG 2.2 AA, list any known limitations, and give the firm's phone and an email for accessibility problems, with a commitment to respond.

Verify when done: add a script that runs axe-core against every route (for example with @axe-core/playwright or @axe-core/cli) using the tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, and make it pass with zero violations at 1366px and 390px widths. Then do a full keyboard-only walkthrough of the home page, a practice-area page, the contact form, and the chat assistant, and confirm focus is always visible and nothing is unreachable. Report what you changed, file by file, and anything you could not fix.
