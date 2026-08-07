import Link from "next/link";
import { Eyebrow, MaskLines } from "@/components/Reveal";

/**
 * The navy masthead every inner page opens with — keeps the nav's
 * transparent-on-dark state valid and gives each page the same first beat.
 */
export default function PageHeader({
  eyebrow,
  n,
  title,
  lede,
  crumb,
}: {
  eyebrow: string;
  n?: string;
  title: string[];
  lede?: string;
  crumb?: { label: string; href: string };
}) {
  return (
    <header className="grain relative overflow-hidden bg-ink-950 pb-16 pt-32 text-paper md:pb-24 md:pt-44">
      {/* faint gold horizon */}
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
