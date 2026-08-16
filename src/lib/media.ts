/**
 * Photography, keyed by content id rather than duplicated per language.
 * Alt text is translated and therefore lives with the copy, not here.
 */

export type GroupId = "foundation" | "road" | "work" | "property" | "aftermath";

/** Stable identity for a practice area across both languages. The slug is
 *  localized; this key is not, so the toggle can map one to the other. */
export type AreaKey =
  | "personal-injury"
  | "car-accidents"
  | "truck-accidents"
  | "motorcycle-accidents"
  | "drunk-driving-injuries"
  | "construction-accidents"
  | "workplace-injuries"
  | "plant-refinery-accidents"
  | "maritime-offshore-injuries"
  | "railroad-accidents"
  | "premises-liability"
  | "product-defects"
  | "dog-bites"
  | "drowning-accidents"
  | "insurance-claims"
  | "serious-injury-wrongful-death";

export const groupImages: Record<GroupId, string> = {
  foundation: "/stock/pa-hero-crash.webp",
  road: "/stock/grp-road.webp",
  work: "/stock/grp-work.webp",
  property: "/stock/grp-property.webp",
  aftermath: "/stock/grp-aftermath.webp",
};

export const panelImages = [
  "/stock/panel-values.webp",
  "/stock/panel-experience.webp",
  "/stock/panel-client.webp",
] as const;

/**
 * The six the homepage leads with — chosen for volume and value, not
 * alphabetically. `dim` is the navy multiply opacity for each photograph:
 * six stock images shot under six lighting conditions do not sit together
 * on their own, and this is what levels them into one set.
 */
export const featuredMedia: { key: AreaKey; image: string; dim: number }[] = [
  { key: "car-accidents", image: "/stock/feat-car.webp", dim: 0.22 },
  { key: "truck-accidents", image: "/stock/grp-road.webp", dim: 0.42 },
  { key: "workplace-injuries", image: "/stock/grp-work.webp", dim: 0.42 },
  { key: "premises-liability", image: "/stock/grp-property.webp", dim: 0.62 },
  { key: "maritime-offshore-injuries", image: "/stock/feat-maritime.webp", dim: 0.6 },
  { key: "serious-injury-wrongful-death", image: "/stock/feat-wrongful.webp", dim: 0.3 },
];
