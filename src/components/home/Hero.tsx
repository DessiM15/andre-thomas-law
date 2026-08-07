"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { firm, heroWords } from "@/lib/site";
import { useIntroDone } from "@/lib/useIntro";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!ready || reduce) return;
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % heroWords.length),
      2600
    );
    return () => clearInterval(id);
  }, [ready, reduce]);

  // Everything keys off the curtain lift; +0.35s so the motions overlap.
  const t = (d: number) => ({ duration: 1.1, delay: 0.35 + d, ease: EASE });
  const show = ready ? "show" : "hidden";

  const line = {
    hidden: { y: "115%" },
    show: (d: number) => ({ y: "0%", transition: t(d) }),
  };

  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 pb-8 pt-28 md:pb-10 md:pt-32">
      {/* ── Portrait: full-bleed on mobile, cut to the right edge on desktop ── */}
      <div className="absolute inset-0 md:left-auto md:w-[47%]">
        <Image
          src="/andre-standing.webp"
          alt={`${firm.attorney}, attorney at ${firm.name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 47vw"
          className="object-cover object-[52%_18%] md:object-[50%_22%]"
          style={{ filter: "saturate(0.82) contrast(1.06) brightness(0.92)" }}
        />
        {/* Navy wash — ties the photo to the field instead of pasting it on top */}
        <div className="absolute inset-0 bg-ink-950/45 mix-blend-multiply md:bg-ink-950/25" />
        {/* Mobile: darken from the bottom so the type has a bed to sit on */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/20 md:hidden" />
        {/* Desktop: feather the left edge into the navy field */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink-950 via-ink-950/55 to-transparent md:block" />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="container-x relative z-10 my-auto w-full py-10">
        <div className="max-w-[46rem]">
          <motion.div
            initial="hidden"
            animate={show}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: t(0) } }}
            className="eyebrow mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-gold-500"
          >
            <span>Houston, Texas</span>
            <span className="hidden h-px w-8 bg-gold-500/50 sm:block" />
            <span className="text-ink-200">Licensed in Texas &amp; Tennessee</span>
          </motion.div>

          <h1 className="display-xl font-display text-[clamp(2.6rem,7.6vw,5.9rem)] text-paper">
            {["Empowering", "your voice,"].map((text, i) => (
              <span key={text} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  custom={i * 0.09}
                  variants={line}
                  initial="hidden"
                  animate={show}
                >
                  {text}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.16em]">
              <motion.span
                className="flex flex-wrap items-baseline gap-x-[0.28em]"
                custom={0.18}
                variants={line}
                initial="hidden"
                animate={show}
              >
                <span>ensuring</span>
                {/* Clip the swap so the outgoing word never ghosts above the
                    line. Extra padding keeps italic descenders intact. */}
                <span className="relative -mb-[0.2em] inline-block overflow-hidden pb-[0.2em]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={heroWords[wordIndex]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.75, ease: EASE }}
                      className="inline-block italic text-gold-500"
                    >
                      {heroWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial="hidden"
            animate={show}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t(0.5) } }}
            className="mt-8 max-w-[34rem] text-[1.02rem] leading-relaxed text-ink-200 md:text-[1.12rem]"
          >
            A former prosecutor who now represents the injured. If someone
            else&apos;s negligence changed your life, you deserve an attorney who
            has argued to a jury — and an honest answer about where you stand.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={show}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: t(0.62) } }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-gold-500 px-8 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
            >
              <span className="relative z-10">Free Consultation</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </Link>
            <a
              href={firm.phoneHref}
              className="border border-ink-200/30 px-8 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-gold-500 hover:text-gold-400"
            >
              Call {firm.phone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom rail ─────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate={show}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: t(0.9) } }}
        className="container-x relative z-10 w-full shrink-0"
      >
        <div className="h-px w-full bg-gradient-to-r from-gold-500/70 via-ink-200/20 to-transparent" />
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 pt-5">
          <span className="eyebrow flex items-center gap-2 text-paper">
            <span className="text-gold-500">★</span>
            {firm.reviews.rating}
            <span className="text-ink-300">
              · {firm.reviews.count} Google reviews
            </span>
          </span>
          <span className="eyebrow hidden text-ink-300 sm:block">
            Two state bars
          </span>
          <span className="eyebrow hidden text-ink-300 lg:block">
            Former Shelby County prosecutor
          </span>
        </div>
      </motion.div>
    </section>
  );
}
