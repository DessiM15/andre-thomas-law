import type { MetadataRoute } from "next";
import { content, getPracticeAreaByKey } from "@/lib/content";
import { SITE_URL } from "@/lib/firm";
import { areaPath, routes, type RouteKey } from "@/lib/i18n";

/**
 * Both languages, with `alternates.languages` on every entry — the sitemap
 * half of the hreflang signal. Google wants the relationship declared in
 * both places, and a Spanish page that only appears in the head risks being
 * treated as a duplicate of its English twin.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${SITE_URL}${p === "/" ? "" : p}`;

  const core: { key: RouteKey; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { key: "home", priority: 1, changeFrequency: "monthly" },
    { key: "practiceAreas", priority: 0.9, changeFrequency: "monthly" },
    { key: "about", priority: 0.8, changeFrequency: "yearly" },
    { key: "reviews", priority: 0.7, changeFrequency: "monthly" },
    { key: "contact", priority: 0.9, changeFrequency: "yearly" },
  ];

  const corePages = core.flatMap(({ key, priority, changeFrequency }) => {
    const languages = {
      "en-US": abs(routes[key].en),
      "es-US": abs(routes[key].es),
    };
    return [
      {
        url: abs(routes[key].en),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: abs(routes[key].es),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });

  const areaPages = content("en").practiceAreas.flatMap((area) => {
    const twin = getPracticeAreaByKey(area.key, "es");
    const languages = {
      "en-US": abs(areaPath(area.slug, "en")),
      "es-US": abs(areaPath(twin?.slug ?? area.slug, "es")),
    };
    return [
      {
        url: languages["en-US"],
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages },
      },
      {
        url: languages["es-US"],
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages },
      },
    ];
  });

  return [...corePages, ...areaPages];
}
