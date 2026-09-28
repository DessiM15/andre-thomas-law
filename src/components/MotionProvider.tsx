"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One switch for every Framer Motion animation on the site.
 *
 * `reducedMotion="user"` makes framer honour the operating system's
 * reduce-motion setting: transform and layout animations are skipped and
 * only opacity-style changes still run. The components that manage their
 * own reduced-motion state (`Reveal`, `MaskLines`, the hero) keep doing so;
 * this catches everything that does not — the header, the mobile menu, the
 * chat panel, the language banner, the form's success card.
 *
 * The CSS half of the same promise lives in `globals.css`.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
