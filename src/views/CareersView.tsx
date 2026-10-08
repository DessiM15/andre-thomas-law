import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { jobPath, path, type Lang } from "@/lib/i18n";
import { liveJobs } from "@/lib/jobs";

/**
 * The careers hub: why the firm, then whatever is open.
 *
 * No `JobPosting` markup here, on purpose. Google only permits it on a page
 * about a single job; on a list it is a structured-data policy violation.
 * Each opening's own page carries it.
 */
export default function CareersView({ lang }: { lang: Lang }) {
  const c = content(lang);
  const p = c.pages.careers;
  const open = liveJobs();

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} n="01" title={p.titleLines} lede={p.lede} />

      {/* Why work here */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow n="02">{p.whyEyebrow}</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-ink-900">
                {p.whyTitle}
              </h2>
            </Reveal>
            <GoldRule className="mt-8 w-32" />
          </div>
          <Reveal delay={0.08} className="md:col-span-7 md:col-start-6">
            <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-800/85">
              {p.whyBody.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <p className="mt-10 text-sm text-ink-800/70">
              {p.aboutLink}{" "}
              <Link href={path("about", lang)} className="link-underline text-gold-800">
                {p.aboutLinkLabel}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Openings */}
      <section
        id="openings"
        aria-labelledby="openings-heading"
        className="border-t border-paper-edge bg-paper-warm py-20 md:py-28"
      >
        {/* Centred, unlike the rest of the site's sections: this is the one
            block a job seeker arrives for, and it sits alone on the page. */}
        <div className="container-x mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow n="03" className="justify-center">{p.openingsEyebrow}</Eyebrow>
            <h2
              id="openings-heading"
              className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink-900"
            >
              {p.openingsTitle}
            </h2>
            {lang !== "en" && open.length > 0 && (
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-800/70">
                {p.englishNote}
              </p>
            )}
          </Reveal>
          <GoldRule className="mx-auto mt-10 w-32" />

          {open.length === 0 ? (
            <Reveal>
              <p className="mx-auto max-w-2xl py-12 text-[1.05rem] leading-relaxed text-ink-800/85">
                {p.empty}
              </p>
            </Reveal>
          ) : (
            <ul className="mt-4">
              {open.map((job, i) => (
                <Reveal key={job.slug} as="li" delay={i * 0.06}>
                  <Link
                    href={jobPath(job.slug)}
                    hrefLang="en"
                    className="group flex flex-col items-center gap-4 border-b border-paper-edge py-10 transition-colors duration-500 hover:bg-paper/70 md:py-12"
                  >
                    <span className="eyebrow block text-gold-800">
                      {p.employmentType[job.employmentType]} · {firm.address.city},{" "}
                      {firm.address.stateCode}
                    </span>
                    <span className="block font-display text-[1.65rem] leading-tight text-ink-900 md:text-[2.1rem]">
                      {job.title}
                    </span>
                    <span className="line-clamp-2 block max-w-2xl text-[0.95rem] leading-relaxed text-ink-800/80">
                      {job.summary}
                    </span>
                    <span className="mt-2 flex items-center gap-4 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-800/70 transition-colors duration-500 group-hover:text-ink-900">
                      <span className="h-px w-8 bg-gold-500 transition-all duration-500 group-hover:w-14" />
                      {p.viewRole}
                      <span className="h-px w-8 bg-gold-500 transition-all duration-500 group-hover:w-14" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
