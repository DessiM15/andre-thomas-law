import Link from "next/link";
import { firm } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-ink-950 py-32 text-paper">
      <div className="container-x">
        <p className="eyebrow text-gold-500">Error 404</p>
        <h1 className="mt-7 font-display text-[clamp(2.6rem,9vw,6rem)] leading-[1.02]">
          This page isn&apos;t here.
        </h1>
        <p className="mt-7 max-w-md leading-relaxed text-ink-200">
          The link may have moved or never existed. The practice areas are a good
          place to pick the thread back up — or just call.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/practice-areas"
            className="bg-gold-500 px-8 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
          >
            Practice areas
          </Link>
          <a
            href={firm.phoneHref}
            className="border border-ink-200/30 px-8 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            Call {firm.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
