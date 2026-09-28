import { content } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

/**
 * The visually hidden "(opens in new tab)" that belongs inside every link
 * with `target="_blank"`. A screen reader user otherwise finds out when the
 * back button stops working.
 */
export default function NewTab({ lang }: { lang: Lang }) {
  return <span className="sr-only"> {content(lang).ui.opensInNewTab}</span>;
}
