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
  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
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
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
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

  if (reduce) {
    return (
      <div className={className}>
        {lines.map((l, i) => (
          <div key={i} className={lineClassName}>
            {l}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className={`block ${lineClassName ?? ""}`} variants={line}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

/** A gold hairline that draws itself left-to-right when it enters. */
export function GoldRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left bg-gold-500 ${className}`}
      initial={reduce ? undefined : { scaleX: 0 }}
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
}: {
  n?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-ink-700/70" : "text-ink-200"
      } ${className}`}
    >
      {n && <span className="text-gold-600">{n}</span>}
      <span>{children}</span>
    </div>
  );
}
