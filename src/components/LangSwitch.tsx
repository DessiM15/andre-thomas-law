"use client";

import { usePathname } from "next/navigation";
import { alternatePath } from "@/lib/content";
import { LANG_PREF_KEY, type Lang } from "@/lib/i18n";

/**
 * The language toggle.
 *
 * Lands on the *same* page in the other language — `/about` goes to
 * `/es/nosotros`, and a practice area resolves through its stable key so
 * `/practice-areas/car-accidents` reaches `/es/areas-de-practica/accidentes-de-auto`
 * rather than dumping the visitor on the homepage.
 *
 * A plain anchor rather than <Link>: the two languages have separate root
 * layouts, so this is a document navigation either way, and the click needs
 * to record the preference before the page goes.
 */
export default function LangSwitch({
  lang,
  label,
  ariaLabel,
  className = "",
}: {
  lang: Lang;
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const target: Lang = lang === "en" ? "es" : "en";
  const href = alternatePath(pathname, target);

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      onClick={() => {
        try {
          localStorage.setItem(LANG_PREF_KEY, target);
        } catch {
          /* Private mode: the toggle still works, it just won't be remembered. */
        }
      }}
      className={className}
    >
      {label}
    </a>
  );
}
