import type { MetadataRoute } from "next";
import { practiceAreas, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = [
    { url: "/", priority: 1, changeFrequency: "monthly" as const },
    { url: "/practice-areas", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/reviews", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
  ];

  return [
    ...core.map((p) => ({
      url: `${SITE_URL}${p.url}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...practiceAreas.map((a) => ({
      url: `${SITE_URL}/practice-areas/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
