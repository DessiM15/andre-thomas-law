"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";
import { INTRO_EVENT, INTRO_KEY as KEY } from "@/lib/useIntro";

/**
 * The curtain. Navy field, the A|T mark assembling itself, a counter,
 * then the whole thing lifts away to reveal the hero already in motion.
 * Shown once per browser session — an intro you cannot skip is a tax.
 */
export default function Preloader({ lang }: { lang: Lang }) {
  const c = content(lang);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.intro = "done";
      return;
    }
    setActive(true);
    document.body.style.overflow = "hidden";

    // 600ms, not the 1900 this used to hold for.
    //
    // Nothing in the hero paints until this lifts — the hero's own animations
    // key off the curtain and then add their own delay on top — so this
    // number *is* the site's Largest Contentful Paint. At 1900 plus a 1s lift
    // the homepage could not reach a passing LCP no matter what else was
    // optimised. The mark still assembles; it just stops being the critical
    // path.
    const DURATION = 600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out so the number decelerates into 100 rather than snapping
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem(KEY, "1");
        setActive(false);
        document.body.style.overflow = "";
        document.documentElement.dataset.intro = "done";
        // Hand off to the hero mid-lift so the two motions overlap.
        window.dispatchEvent(new Event(INTRO_EVENT));
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="grain fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden bg-ink-950 px-6 py-8 md:px-12 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* top rail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="eyebrow flex justify-end text-ink-300"
          >
            <span className="hidden sm:block">{c.ui.preloader.est}</span>
          </motion.div>

          {/* the mark — wiped open from the centre line outward */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-[86vw] max-w-[50rem]"
            >
              <Image
                src="/logo-light.png"
                alt={c.ui.logoAlt}
                width={1699}
                height={870}
                priority
                sizes="(max-width: 768px) 86vw, 800px"
                className="h-auto w-full"
              />
            </motion.div>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-px w-[40vw] max-w-[16rem] origin-center bg-gold-500"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="eyebrow mt-6 text-center text-ink-300"
            >
              {c.ui.preloader.strapline}
            </motion.p>
          </div>

          {/* bottom rail + progress */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="eyebrow mb-4 flex items-end justify-between text-ink-300"
            >
              <span className="max-w-[60%] leading-relaxed">{firm.name}</span>
              <span className="font-display text-2xl tracking-normal text-gold-500 tabular-nums md:text-3xl">
                {count}
              </span>
            </motion.div>
            <div className="h-px w-full bg-ink-700">
              <motion.div
                className="h-full bg-gold-500"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
