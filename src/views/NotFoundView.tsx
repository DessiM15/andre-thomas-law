import Link from "next/link";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { path, type Lang } from "@/lib/i18n";

export default function NotFoundView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const t = c.ui.notFound;

  return (
    <section className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-ink-950 py-32 text-paper">
      <div className="container-x">
        <p className="eyebrow text-gold-500">{t.eyebrow}</p>
        <h1 className="mt-7 font-display text-[clamp(2.6rem,9vw,6rem)] leading-[1.02]">
          {t.title}
        </h1>
        <p className="mt-7 max-w-md leading-relaxed text-ink-200">{t.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={path("practiceAreas", lang)}
            className="bg-gold-500 px-8 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
          >
            {t.cta}
          </Link>
          <a
            href={firm.phoneHref}
            className="border border-ink-200/30 px-8 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            {c.ui.callPhone} {firm.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
