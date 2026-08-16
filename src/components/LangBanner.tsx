"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { alternatePath } from "@/lib/content";
import { LANG_PREF_KEY, LANG_PROMPT_KEY, type Lang } from "@/lib/i18n";

/**
 * A one-time offer to switch languages, shown to visitors whose browser is
 * set to the other language.
 *
 * Deliberately an offer and never a redirect: auto-redirecting on
 * Accept-Language breaks crawlers, breaks shared links, and annoys the
 * bilingual visitor who chose this version on purpose. Shown once, then
 * remembered.
 */
export default function LangBanner({
  lang,
  question,
  action,
  dismiss,
}: {
  lang: Lang;
  question: string;
  action: string;
  dismiss: string;
}) {
  const pathname = usePathname() || "/";
  const [show, setShow] = useState(false);
  const other: Lang = lang === "en" ? "es" : "en";

  useEffect(() => {
    let asked = false;
    let chosen: string | null = null;
    try {
      asked = localStorage.getItem(LANG_PROMPT_KEY) === "1";
      chosen = localStorage.getItem(LANG_PREF_KEY);
    } catch {
      return; // No storage, no banner — better than nagging on every page.
    }
    if (asked || chosen) return;

    const prefersOther = navigator.languages?.some((l) =>
      l.toLowerCase().startsWith(other)
    );
    if (prefersOther) {
      // Let the page settle before interrupting.
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, [other]);

  const close = () => {
    setShow(false);
    try {
      localStorage.setItem(LANG_PROMPT_KEY, "1");
    } catch {
      /* nothing to remember it with */
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label={question}
          className="fixed inset-x-0 bottom-0 z-[88] border-t border-gold-500/40 bg-ink-950/95 backdrop-blur-md"
        >
          <div className="container-x flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p lang={other} className="text-[0.9rem] leading-snug text-paper">
              {question}
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <a
                href={alternatePath(pathname, other)}
                hrefLang={other}
                lang={other}
                onClick={() => {
                  try {
                    localStorage.setItem(LANG_PREF_KEY, other);
                    localStorage.setItem(LANG_PROMPT_KEY, "1");
                  } catch {
                    /* proceed anyway */
                  }
                }}
                className="bg-gold-500 px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-950 transition-transform duration-300 hover:-translate-y-px"
              >
                {action}
              </a>
              <button
                onClick={close}
                className="text-[0.72rem] uppercase tracking-[0.18em] text-ink-300 transition-colors hover:text-paper"
              >
                {dismiss}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
