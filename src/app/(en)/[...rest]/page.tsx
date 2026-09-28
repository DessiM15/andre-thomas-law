import { notFound } from "next/navigation";

/**
 * Catch-all for every path no other route claims.
 *
 * English and Spanish have separate root layouts, so there is no single
 * root `not-found.tsx` for Next to fall back to; an unknown URL was getting
 * the framework's bare 404 — no `<html lang>`, no skip link, no `<main>`.
 * Throwing `notFound()` from inside this layout renders the site's own
 * 404 page, with the chrome, in the right language.
 */
export default function CatchAll() {
  notFound();
}
