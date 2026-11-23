"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A YouTube video that costs nothing until somebody asks for it.
 *
 * The page ships a local still and a play button. The player, and the
 * several hundred kilobytes of script and the cookies that come with it,
 * load only on click, from the no-cookie domain. That keeps the homepage's
 * load time where it was and keeps YouTube out of the visit of anybody who
 * never presses play.
 */
export default function VideoFacade({
  youtubeId,
  thumb,
  thumbAlt,
  playLabel,
  title,
  priority = false,
}: {
  youtubeId: string;
  thumb: string;
  thumbAlt: string;
  playLabel: string;
  title: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink-950">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
        >
          <Image
            src={thumb}
            alt={thumbAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 92vw, 56vw"
            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute inset-0 bg-ink-950/20 transition-colors duration-500 group-hover:bg-ink-950/5" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 md:h-24 md:w-24"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 md:h-9 md:w-9" fill="currentColor">
              <path d="M8 5.14v13.72L19 12 8 5.14z" />
            </svg>
          </span>
        </button>
      )}
      <div className="pointer-events-none absolute inset-0 border border-gold-500/30" />
    </div>
  );
}
