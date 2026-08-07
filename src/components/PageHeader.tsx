import Image from "next/image";
import Link from "next/link";
import { Eyebrow, MaskLines } from "@/components/Reveal";

/**
 * The navy masthead every inner page opens with. Optionally sits over a
 * photograph, always under the same navy wash so the pages read as a set
 * rather than as separate stock-photo headers.
 */
export default function PageHeader({
  eyebrow,
  n,
  title,
  lede,
  crumb,
  image,
  alt = "",
  focal = "center",
  tall = false,
}: {
  eyebrow: string;
  n?: string;
  title: string[];
  lede?: string;
  crumb?: { label: string; href: string };
  image?: string;
  alt?: string;
  focal?: string;
  tall?: boolean;
}) {
  return (
    <header
      className={`grain relative overflow-hidden bg-ink-950 text-paper ${
        tall
          ? "flex min-h-[70svh] flex-col justify-end pb-16 pt-40 md:min-h-[78svh] md:pb-24 md:pt-56"
          : "pb-16 pt-36 md:pb-24 md:pt-56"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: focal }}
          />
          {/* The blue tint: multiply for depth, then a gradient so type always
              has a dark bed regardless of what the photograph is doing. */}
          <div className="absolute inset-0 bg-ink-900/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/35" />
        </>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-gold-500/60 via-ink-700 to-transparent" />

      <div className="container-x relative">
        {crumb && (
          <Link
            href={crumb.href}
            className="eyebrow mb-8 inline-flex items-center gap-3 text-ink-300 transition-colors hover:text-gold-400"
          >
            <span>←</span>
            {crumb.label}
          </Link>
        )}

        <Eyebrow n={n} tone="light">
          {eyebrow}
        </Eyebrow>

        <MaskLines
          className="mt-7 font-display text-[clamp(2.4rem,7.5vw,5.6rem)] leading-[1.02] tracking-[-0.025em]"
          lines={title}
        />

        {lede && (
          <p className="mt-9 max-w-2xl text-[1.05rem] leading-relaxed text-ink-200 md:text-[1.15rem]">
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}
