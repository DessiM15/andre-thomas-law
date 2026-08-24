/**
 * Language plumbing.
 *
 * English keeps the URLs it always had (`/about`); Spanish lives under a
 * localized path (`/es/nosotros`). Nothing here imports content, so the
 * content files can import this type without a cycle.
 */

export type Lang = "en" | "es";

export const LANGS: readonly Lang[] = ["en", "es"] as const;
export const DEFAULT_LANG: Lang = "en";

/** Remembers a visitor's explicit choice so the banner stops asking. */
export const LANG_PREF_KEY = "atl-lang";
/** Set once the banner has been shown and dismissed. */
export const LANG_PROMPT_KEY = "atl-lang-prompt";

export const isLang = (v: unknown): v is Lang =>
  typeof v === "string" && (LANGS as readonly string[]).includes(v);

/**
 * Every static route, in both languages. The language toggle reads this
 * backwards to land the visitor on the same page rather than the homepage.
 */
export const routes = {
  home: { en: "/", es: "/es" },
  practiceAreas: { en: "/practice-areas", es: "/es/areas-de-practica" },
  about: { en: "/about", es: "/es/nosotros" },
  team: { en: "/team", es: "/es/equipo" },
  reviews: { en: "/reviews", es: "/es/resenas" },
  contact: { en: "/contact", es: "/es/contacto" },
  privacy: { en: "/privacy", es: "/es/privacidad" },
  disclaimer: { en: "/disclaimer", es: "/es/aviso-legal" },
} as const;

export type RouteKey = keyof typeof routes;

/** The path for a named route in a given language. */
export const path = (key: RouteKey, lang: Lang): string => routes[key][lang];

/** The path for one person's bio. Slugs are names, so they don't localize. */
export const teamPath = (id: string, lang: Lang): string =>
  `${routes.team[lang]}/${id}`;

/** The path for a practice area, given that language's own slug. */
export const areaPath = (slug: string, lang: Lang): string =>
  `${routes.practiceAreas[lang]}/${slug}`;

/** `/es/nosotros` → `es`. Used by the client-side toggle. */
export const langFromPath = (pathname: string): Lang =>
  pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";

export const htmlLang: Record<Lang, string> = { en: "en", es: "es" };
export const ogLocale: Record<Lang, string> = { en: "en_US", es: "es_US" };

/** Display name of each language, written in that language. */
export const langName: Record<Lang, string> = { en: "English", es: "Español" };
