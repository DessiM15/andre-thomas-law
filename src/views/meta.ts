import type { Metadata } from "next";
import { firm, SITE_URL } from "@/lib/firm";
import { areaPath, ogLocale, path, routes, teamPath, type Lang, type RouteKey } from "@/lib/i18n";

/**
 * Canonical + hreflang for one page.
 *
 * Every page declares both language versions of itself and an x-default
 * pointing at English. Without this, Google treats the Spanish pages as
 * near-duplicates of the English ones and picks one to index — which
 * defeats the entire point of translating them.
 */
function alternates(lang: Lang, enPath: string, esPath: string) {
  return {
    canonical: lang === "en" ? enPath : esPath,
    languages: {
      "en-US": enPath,
      "es-US": esPath,
      "x-default": enPath,
    },
  };
}

export function pageMetadata(
  lang: Lang,
  key: RouteKey,
  { title, description }: { title: string; description: string },
  extra: Metadata = {}
): Metadata {
  const enPath = routes[key].en;
  const esPath = routes[key].es;
  const self = path(key, lang);

  return {
    title,
    description,
    alternates: alternates(lang, enPath, esPath),
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: `${SITE_URL}${self}`,
      siteName: firm.name,
      title,
      description,
    },
    ...extra,
  };
}

/** Same, for a practice area page, which needs the twin's localized slug. */
export function areaMetadata(
  lang: Lang,
  { title, description, enSlug, esSlug }: {
    title: string;
    description: string;
    enSlug: string;
    esSlug: string;
  }
): Metadata {
  const enPath = areaPath(enSlug, "en");
  const esPath = areaPath(esSlug, "es");

  return {
    title,
    description,
    alternates: alternates(lang, enPath, esPath),
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: `${SITE_URL}${lang === "en" ? enPath : esPath}`,
      siteName: firm.name,
      title,
      description,
    },
  };
}

/** Same, for one person's bio. The slug is a name, so it doesn't localize. */
export function teamMemberMetadata(
  lang: Lang,
  { title, description, id }: { title: string; description: string; id: string }
): Metadata {
  const enPath = teamPath(id, "en");
  const esPath = teamPath(id, "es");

  return {
    title,
    description,
    alternates: alternates(lang, enPath, esPath),
    openGraph: {
      type: "profile",
      locale: ogLocale[lang],
      url: `${SITE_URL}${lang === "en" ? enPath : esPath}`,
      siteName: firm.name,
      title,
      description,
    },
  };
}
