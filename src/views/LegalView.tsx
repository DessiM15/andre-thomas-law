import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";

/**
 * Privacy and disclaimer share a layout — a masthead and a stack of
 * sections. The Spanish versions carry a closing "Versión que rige"
 * section stating the English text controls.
 */
export default function LegalView({
  lang,
  kind,
}: {
  lang: Lang;
  kind: "privacy" | "disclaimer";
}) {
  const c = content(lang);
  const p = c.pages[kind];

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={[p.heading]} />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x max-w-3xl">
          {p.sections.map((s, i) => (
            <Reveal
              key={s.h}
              delay={i * 0.04}
              className="border-b border-paper-edge py-10 first:pt-0"
            >
              <h2 className="font-display text-2xl leading-snug text-ink-900 md:text-[1.9rem]">
                {s.h}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-800/85">
                {s.p.map((para) => (
                  <p key={para.slice(0, 20)}>{para}</p>
                ))}
              </div>
            </Reveal>
          ))}

          {kind === "disclaimer" && "questions" in p && (
            <Reveal>
              <p className="pt-10 text-sm text-ink-800/60">
                {p.questions[0]}{" "}
                <a href={firm.phoneHref} className="text-gold-700 underline underline-offset-4">
                  {firm.phone}
                </a>{" "}
                {p.questions[1]}{" "}
                <a href={firm.emailHref} className="text-gold-700 underline underline-offset-4">
                  {firm.email}
                </a>
                {p.questions[2]}
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
