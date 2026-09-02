import { SITE_URL } from "@/lib/firm";

/**
 * `BreadcrumbList` structured data.
 *
 * Emits nothing visible — it tells Google where a page sits in the site so
 * the search result can show a path rather than a bare URL. The practice-area
 * pages built this inline; this is the same shape, extracted so the team and
 * reviews pages are not a third and fourth copy of it.
 */
export default function Breadcrumbs({
  trail,
}: {
  /** Ordered root-first. `href` is a site-relative path. */
  trail: { name: string; href: string }[];
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
