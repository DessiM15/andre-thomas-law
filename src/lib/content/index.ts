import { DEFAULT_LANG, langFromPath, routes, type Lang } from "@/lib/i18n";
import type { AreaKey } from "@/lib/media";
import { en } from "./en";
import { es } from "./es";
import type { Content, PracticeArea } from "./types";

export type { Content, PracticeArea, PracticeGroup } from "./types";

const dictionaries: Record<Lang, Content> = { en, es };

/** Every string on the site, in one language. */
export const content = (lang: Lang): Content => dictionaries[lang] ?? dictionaries[DEFAULT_LANG];

export const getPracticeArea = (slug: string, lang: Lang): PracticeArea | undefined =>
  content(lang).practiceAreas.find((a) => a.slug === slug);

export const getPracticeAreaByKey = (key: AreaKey, lang: Lang): PracticeArea | undefined =>
  content(lang).practiceAreas.find((a) => a.key === key);

/** Areas not featured on the homepage — the ticker's contents. */
export const tickerAreas = (lang: Lang, featured: readonly AreaKey[]): PracticeArea[] =>
  content(lang).practiceAreas.filter((a) => !featured.includes(a.key));

/**
 * The same page in the other language.
 *
 * Practice area pages resolve through the stable `key`, so
 * `/practice-areas/car-accidents` lands on `/es/areas-de-practica/accidentes-de-auto`
 * rather than dumping the visitor on the Spanish homepage.
 */
export function alternatePath(pathname: string, target: Lang): string {
  const current = langFromPath(pathname);
  if (current === target) return pathname;

  const clean = pathname.replace(/\/+$/, "") || "/";

  // Static routes: find the key whose path matches, then read the other side.
  for (const key of Object.keys(routes) as (keyof typeof routes)[]) {
    if (routes[key][current] === clean) return routes[key][target];
  }

  // Practice area detail pages.
  const prefix = routes.practiceAreas[current];
  if (clean.startsWith(prefix + "/")) {
    const slug = clean.slice(prefix.length + 1);
    const area = getPracticeArea(slug, current);
    const twin = area && getPracticeAreaByKey(area.key, target);
    if (twin) return `${routes.practiceAreas[target]}/${twin.slug}`;
    return routes.practiceAreas[target];
  }

  // Anything unrecognized (a 404, say) falls back to that language's home.
  return routes.home[target];
}
