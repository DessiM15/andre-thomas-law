"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade-and-rise on scroll. The workhorse. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  // Under reduced motion this has to *assert* the visible state, not simply
  // decline to animate. The server cannot know the preference, so it renders
  // the markup with `opacity: 0` inline; passing `undefined` here leaves that
  // untouched and the section never appears. `initial={false}` tells framer
  // the element is already at its target and to write it immediately.
  const rest = { className, transition: { duration: 0.9, delay, ease: EASE } };

  if (reduce) {
    return (
      <MotionTag {...rest} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Line-by-line mask reveal — text rises out from behind a clipped edge.
 * Pass an array of lines so the break points stay art-directed rather
 * than wherever the viewport happens to wrap them.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  as = "div",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /**
   * The wrapper element. Defaults to a div, which is what this was before —
   * and why every page but the homepage had no `h1` at all. Pass "h1" on the
   * page's leading headline. Purely semantic: the rendered box, the mask, and
   * the animation are identical either way.
   */
  as?: "div" | "h1" | "h2";
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line: Variants = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
  };

  /**
   * One structure, animated or not — the same shape `GoldRule` below uses.
   *
   * This used to return a different tree when reduced motion was on: plain
   * divs instead of the masked spans. Two trees for one component means the
   * server (which cannot know the preference) and the client can disagree on
   * the very first render, and a hydration mismatch here leaves the subtree
   * frozen exactly as the server sent it — masked lines sitting translated
   * 115% out of an `overflow-hidden` parent, with the animation that would
   * have pulled them back suppressed. The heading is in the DOM, has correct
   * dimensions, and cannot be seen.
   *
   * Passing `undefined` instead of the variants keeps the markup identical in
   * both modes, so there is nothing for hydration to disagree about, and with
   * reduced motion the lines simply render in place with no transform.
   */
  const motionProps = reduce
    ? // `initial={false}` means "you are already in the target state" — framer
      // writes it straight to the element with no animation. It has to write
      // it: the server rendered this markup with the animation on (it cannot
      // know the preference), so the element arrives carrying an inline
      // `translateY(115%)`. Merely declining to animate would leave that
      // there, and the line would stay parked outside its `overflow-hidden`
      // parent — present, measured, invisible.
      { className, variants: container, initial: false as const, animate: "show" as const }
    : {
        className,
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, margin: "-10% 0px" },
      };

  const masked = lines.map((l, i) => (
    <span key={i} className="block overflow-hidden pb-[0.06em]">
      <motion.span className={`block ${lineClassName ?? ""}`} variants={line}>
        {l}
      </motion.span>
    </span>
  ));

  // Spelled out rather than resolved from a lookup, so each branch is a
  // stable component type and `motion.*` is only touched during render.
  if (as === "h1") return <motion.h1 {...motionProps}>{masked}</motion.h1>;
  if (as === "h2") return <motion.h2 {...motionProps}>{masked}</motion.h2>;
  return <motion.div {...motionProps}>{masked}</motion.div>;
}

/** A gold hairline that draws itself left-to-right when it enters. */
export function GoldRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    // Same reasoning as `Reveal`: the server ships `scaleX(0)`, so reduced
    // motion has to write the drawn state rather than skip the animation.
    <motion.div
      className={`h-px origin-left bg-gold-500 ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      animate={reduce ? { scaleX: 1 } : undefined}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
    />
  );
}

/** Tracked-out small-caps label with the gold numeral. */
export function Eyebrow({
  n,
  children,
  tone = "dark",
  className = "",
  as = "div",
}: {
  n?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  /**
   * Semantic only — the styling is identical whichever tag is used. `h1` is
   * for the one page where the keyword heading belongs on this small line
   * rather than on the display type beneath it.
   */
  as?: "div" | "h1";
}) {
  // The heading tag goes on the text, not the row. The row also holds the
  // section numeral, and "01Client Reviews — ..." is not the heading anyone
  // wants indexed. Both elements stay inline, so nothing moves.
  const Text = as;
  return (
    <div
      className={`eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-ink-700/70" : "text-ink-200"
      } ${className}`}
    >
      {n && <span className="text-gold-600">{n}</span>}
      <Text className="font-[inherit] text-[inherit] leading-[inherit] tracking-[inherit]">
        {children}
      </Text>
    </div>
  );
}
