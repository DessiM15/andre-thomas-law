"use client";

import { useEffect } from "react";

/**
 * Browsers restore your old scroll position on reload, which drops a
 * returning visitor into the middle of the page. Refreshing should open on
 * the hero, the same way clicking the logo does.
 *
 * Anchored URLs (/#practice-areas) are left alone — those are deliberate.
 */
export default function ScrollTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
