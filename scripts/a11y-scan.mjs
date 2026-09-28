/**
 * Accessibility scan — axe-core against every route, at desktop and phone
 * widths, plus a few structural checks axe does not make.
 *
 *   npm run build && npm run a11y          # builds, serves, scans
 *   BASE_URL=http://localhost:3000 npm run a11y   # scan a server you started
 *
 * Exits non-zero on any axe violation (tags: wcag2a, wcag2aa, wcag21a,
 * wcag21aa, wcag22aa) or any structural failure. Routes come from the site's
 * own sitemap, plus the noindex legal pages and the 404 page, so a new page
 * is scanned the day it is added to the sitemap.
 *
 * Pages are loaded with `prefers-reduced-motion: reduce`. That is not a
 * shortcut: it is what makes every scroll-revealed section render at full
 * opacity immediately, so axe measures the real colours instead of skipping
 * text that is still faded in at load. (It also means the site's
 * reduced-motion path is what gets audited, which is the one that matters
 * most to the readers this is for.)
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const PORT = 3110;
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const WIDTHS = [
  { name: "desktop", width: 1366, height: 900 },
  { name: "phone", width: 390, height: 844 },
];
/** Not in the sitemap on purpose (noindex), but still pages people read. */
const EXTRA_PATHS = [
  "/privacy",
  "/disclaimer",
  "/es/privacidad",
  "/es/aviso-legal",
  "/this-page-does-not-exist",
  "/es/esta-pagina-no-existe",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let server;

async function startServer() {
  if (!existsSync(".next")) {
    console.error("No .next build found. Run `npm run build` first (or set BASE_URL).");
    process.exit(2);
  }
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "inherit"],
  });
  const url = `http://localhost:${PORT}`;
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status) return url;
    } catch {
      await sleep(500);
    }
  }
  console.error("Server did not start.");
  process.exit(2);
}

async function routes() {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...new Set([...locs, ...EXTRA_PATHS])];
}

/** Checks axe does not make: one h1, the right lang, a skip link, no nested aside. */
async function structure(page, path) {
  const wantLang = path === "/es" || path.startsWith("/es/") ? "es" : "en";
  return page.evaluate((wantLang) => {
    const problems = [];
    const h1s = document.querySelectorAll("h1").length;
    if (h1s !== 1) problems.push(`expected exactly one h1, found ${h1s}`);
    const lang = document.documentElement.getAttribute("lang");
    if (lang !== wantLang) problems.push(`html lang is "${lang}", expected "${wantLang}"`);
    const skip = document.querySelector('a[href="#main"]');
    if (!skip) problems.push("no skip link to #main");
    const main = document.getElementById("main");
    if (!main) problems.push("no #main landmark");
    else if (main.tabIndex !== -1) problems.push("#main is not focusable (needs tabindex=-1)");
    if (document.querySelector("main aside")) problems.push("<aside> nested inside <main>");
    for (const a of document.querySelectorAll('a[target="_blank"]')) {
      const t = (a.textContent ?? "").toLowerCase();
      if (!t.includes("new tab") && !t.includes("pestaña nueva"))
        problems.push(`new-tab link without warning text: "${(a.textContent ?? "").trim().slice(0, 40)}"`);
    }
    return problems;
  }, wantLang);
}

async function scan(page, label) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return { label, violations: results.violations, incomplete: results.incomplete.length };
}

const base = process.env.BASE_URL?.replace(/\/$/, "") ?? (await startServer());
const browser = await chromium.launch();
const paths = await routes();
let failed = 0;
let scanned = 0;

for (const vp of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: "reduce",
    isMobile: vp.width < 500,
    hasTouch: vp.width < 500,
  });

  for (const path of paths) {
    const page = await context.newPage();
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    // Nudge every lazy image and sticky element into place.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(250);
    // On the home pages, give the chat's one-per-session nudge bubble time
    // to appear (it arms after six seconds once the visitor is past the
    // fold), so its dismiss button is part of what gets scanned.
    if (path === "/" || path === "/es") await sleep(6500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(250);

    const states = [await scan(page, `${vp.name} ${path}`)];

    // The chat assistant, open, with its greeting and chips rendered.
    if (path === "/" || path === "/es") {
      await page.locator('button[aria-haspopup="dialog"]').click();
      await page.locator('[role="dialog"] input').waitFor();
      await sleep(300);
      states.push(await scan(page, `${vp.name} ${path} (chat open)`));
      await page.keyboard.press("Escape");
    }

    // The contact form in its failed-validation state.
    if (path === "/contact" || path === "/es/contacto") {
      await page.locator('form button[type="submit"]').first().click();
      await page.locator('[role="alert"]').first().waitFor();
      await sleep(300);
      states.push(await scan(page, `${vp.name} ${path} (form errors)`));
    }

    const structural = await structure(page, path);

    for (const s of states) {
      scanned += 1;
      if (s.violations.length === 0 && structural.length === 0) {
        console.log(`✓ ${s.label}  (${s.incomplete} incomplete)`);
        continue;
      }
      failed += 1;
      console.log(`✗ ${s.label}`);
      for (const p of structural) console.log(`    structure: ${p}`);
      for (const v of s.violations) {
        console.log(`    [${v.impact}] ${v.id}: ${v.help}`);
        for (const n of v.nodes.slice(0, 5)) {
          console.log(`        ${n.target.join(" ")}`);
          if (n.failureSummary) console.log(`        ${n.failureSummary.split("\n").join("\n        ")}`);
        }
        if (v.nodes.length > 5) console.log(`        …and ${v.nodes.length - 5} more`);
      }
      // Structural problems are the same across states; print them once.
      structural.length = 0;
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
server?.kill();

console.log(`\n${scanned} scans, ${failed} with problems.`);
process.exit(failed ? 1 : 0);
