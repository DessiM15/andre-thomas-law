"use client";

import { useEffect, useState } from "react";

export const INTRO_KEY = "atl-intro-seen";
export const INTRO_EVENT = "atl:intro-done";

/**
 * True once the preloader curtain has begun lifting (or was never shown).
 * The hero holds its animation until this flips, so the two motions
 * overlap instead of the hero finishing behind a closed curtain.
 */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setDone(true);
      return;
    }
    const handler = () => setDone(true);
    window.addEventListener(INTRO_EVENT, handler);
    // Safety net: never leave the hero hidden if something goes sideways.
    const failsafe = setTimeout(() => setDone(true), 4000);
    return () => {
      window.removeEventListener(INTRO_EVENT, handler);
      clearTimeout(failsafe);
    };
  }, []);

  return done;
}
