"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The gold marquee of the practice areas the homepage does not feature.
 *
 * It scrolls on its own and never stops, so WCAG 2.2.2 owes the reader a
 * pause control; the button beside the label is it. The strip also pauses
 * itself whenever one of its links takes keyboard focus — a focus ring that
 * slides off the screen is not a visible focus ring.
 *
 * The list is rendered twice so the CSS loop has a seamless second half.
 * The copy is purely visual: hidden from assistive technology and taken
 * out of the tab order, so nobody meets the same ten links twice.
 */
export default function Ticker({
  items,
  label,
  pause,
  resume,
}: {
  items: { key: string; name: string; href: string }[];
  label: string;
  pause: string;
  resume: string;
}) {
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const still = paused || focused;

  const strip = (hidden: boolean) =>
    items.map((area) => (
      <Link
        key={`${area.key}-${hidden ? "b" : "a"}`}
        href={area.href}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        onFocus={hidden ? undefined : () => setFocused(true)}
        onBlur={hidden ? undefined : () => setFocused(false)}
        className="flex items-center whitespace-nowrap px-7 font-display text-lg text-paper/70 transition-colors hover:text-gold-400 md:text-xl"
      >
        {area.name}
        <span aria-hidden className="ml-7 text-gold-500">
          ✦
        </span>
      </Link>
    ));

  return (
    <div className="relative mt-14">
      <div className="container-x mb-5 flex items-center gap-4">
        <p className="eyebrow text-ink-300">{label}</p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? resume : pause}
          className="flex h-7 w-7 items-center justify-center border border-ink-200/30 text-paper transition-colors duration-300 hover:border-gold-500 hover:text-gold-400 motion-reduce:hidden"
        >
          {paused ? (
            <svg aria-hidden width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <path d="M2 1l7 4-7 4z" />
            </svg>
          ) : (
            <svg aria-hidden width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <path d="M2 1h2v8H2zM6 1h2v8H6z" />
            </svg>
          )}
        </button>
      </div>
      <div className="relative overflow-hidden border-y border-ink-800/50 py-4">
        <div
          className={`flex w-max animate-[atl-ticker_48s_linear_infinite] motion-reduce:animate-none ${
            still ? "[animation-play-state:paused]" : ""
          }`}
        >
          {strip(false)}
          {strip(true)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-ink-950 to-transparent" />
      </div>

      <style>{`
        @keyframes atl-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
