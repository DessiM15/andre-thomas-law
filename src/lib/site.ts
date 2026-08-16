/**
 * Compatibility surface.
 *
 * Facts live in `firm.ts`, copy lives in `content/`, and photography lives
 * in `media.ts`. This module just re-exports the pieces so imports read the
 * same way they did before the site became bilingual.
 */

export { firm, fullAddress, SITE_URL } from "./firm";
export {
  content,
  getPracticeArea,
  getPracticeAreaByKey,
  tickerAreas,
  alternatePath,
} from "./content";
export type { Content, PracticeArea, PracticeGroup } from "./content";
export { featuredMedia, groupImages, panelImages } from "./media";
export type { AreaKey, GroupId } from "./media";
export { DEFAULT_LANG, LANGS, areaPath, langFromPath, path, routes } from "./i18n";
export type { Lang } from "./i18n";
