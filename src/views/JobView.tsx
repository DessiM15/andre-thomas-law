import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewTab from "@/components/NewTab";
import PageHeader from "@/components/PageHeader";
import { Eyebrow, GoldRule, Reveal } from "@/components/Reveal";
import { content } from "@/lib/content";
import { firm, fullAddress, SITE_URL } from "@/lib/firm";
import { jobPath, path } from "@/lib/i18n";
import { isLive, jobDescriptionHtml, jobLocation, type Job } from "@/lib/jobs";

/** Listings are English only — see `lib/jobs.ts` for why. */
const LANG = "en" as const;

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

const longDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "America/Chicago" }).format(
    new Date(`${iso}T12:00:00-06:00`)
  );

function ApplyButton({ job, className = "" }: { job: Job; className?: string }) {
  const t = content(LANG).pages.careers.job;
  const external = job.apply.type === "url";
  return (
    <a
      href={external ? job.apply.value : `mailto:${job.apply.value}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative block overflow-hidden bg-gold-500 px-6 py-3.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-950 ${className}`}
    >
      <span className="relative z-10">
        {t.apply}
        {external && <NewTab lang={LANG} />}
      </span>
      <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
    </a>
  );
}

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="mt-14 border-t border-paper-edge pt-10">
      <h2 className="font-display text-2xl leading-snug text-ink-900 md:text-[1.9rem]">{heading}</h2>
      <ul className="mt-6 space-y-0">
        {items.map((item, i) => (
          <li
            key={item}
            className="flex gap-6 border-b border-paper-edge py-4 text-[1rem] leading-relaxed text-ink-800/85"
          >
            <span aria-hidden className="shrink-0 font-display text-lg text-gold-800">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobView({ job }: { job: Job }) {
  const c = content(LANG);
  const p = c.pages.careers;
  const t = p.job;
  const live = isLive(job);

  const trail = [
    { name: c.schema.home, href: path("home", LANG) },
    { name: c.schema.careers, href: path("careers", LANG) },
    { name: job.title, href: jobPath(job.slug) },
  ];

  // Filled or expired: the page stays reachable for anyone holding the
  // link, but says so plainly and carries no JobPosting markup — an expired
  // listing that still claims to be open is what Google penalises.
  if (!live) {
    return (
      <>
        <Breadcrumbs trail={trail} />
        <PageHeader
          eyebrow={t.filledEyebrow}
          title={[job.title]}
          lede={t.filledBody}
          crumb={{ label: t.crumb, href: path("careers", LANG) }}
        />
        <section className="bg-paper py-20 md:py-28">
          <div className="container-x">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.28] text-ink-900">
                {t.filledTitle}
              </p>
              <Link
                href={path("careers", LANG)}
                className="eyebrow mt-10 inline-flex items-center gap-3 text-gold-800"
              >
                {t.filledCta}
                <span className="h-px w-8 bg-gold-500" />
              </Link>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: jobDescriptionHtml(job, t),
    identifier: { "@type": "PropertyValue", name: firm.name, value: job.identifier },
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59-06:00`,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: firm.name,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo-dark.png`,
    },
    jobLocation,
    ...(job.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salary.min,
          maxValue: job.salary.max,
          unitText: job.salary.unit,
        },
      },
    }),
    // The application happens on the firm's hiring platform, not on this page.
    directApply: false,
  };

  const typeLabel = p.employmentType[job.employmentType];
  const salaryLine = job.salary
    ? `${money(job.salary.min)} – ${money(job.salary.max)} ${job.salary.unit === "HOUR" ? t.perHour : t.perYear}`
    : null;

  return (
    <>
      <Breadcrumbs trail={trail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={p.eyebrow}
        n="01"
        title={[job.title]}
        lede={`${typeLabel} · ${firm.address.city}, ${firm.address.state}${salaryLine ? ` · ${salaryLine}` : ""}`}
        crumb={{ label: t.crumb, href: path("careers", LANG) }}
      />

      {/* On a phone the sidebar lands below the whole description, so the
          apply button gets a second home directly under the masthead —
          most job seekers are on phones and should not have to scroll past
          nine qualifications to find it. */}
      <div className="border-b border-paper-edge bg-paper-warm md:hidden">
        <div className="container-x py-5">
          <ApplyButton job={job} />
        </div>
      </div>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow n="02">{t.roleEyebrow}</Eyebrow>
              <p className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.28] text-ink-900">
                {job.summary}
              </p>
            </Reveal>
            <GoldRule className="mt-10 w-32" />

            <Reveal delay={0.08}>
              <List heading={t.responsibilities} items={job.responsibilities} />
              <List heading={t.qualifications} items={job.qualifications} />
              {job.benefits && job.benefits.length > 0 && (
                <List heading={t.benefits} items={job.benefits} />
              )}
            </Reveal>
          </div>

          {/* A labelled region rather than an <aside>: complementary
              landmarks may not sit inside <main>. */}
          <section aria-label={t.detailsEyebrow} className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28">
              <Reveal>
                <div className="grain relative overflow-hidden bg-ink-950 p-9 text-paper">
                  <Eyebrow tone="light">{t.detailsEyebrow}</Eyebrow>
                  <dl className="mt-6 space-y-5 text-sm">
                    <div>
                      <dt className="eyebrow mb-1.5 text-gold-500">{t.type}</dt>
                      <dd className="text-ink-200">{typeLabel}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1.5 text-gold-500">{t.location}</dt>
                      <dd className="leading-relaxed text-ink-200">{fullAddress}</dd>
                    </div>
                    {salaryLine && (
                      <div>
                        <dt className="eyebrow mb-1.5 text-gold-500">{t.compensation}</dt>
                        <dd className="font-display text-2xl text-paper">{salaryLine}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="eyebrow mb-1.5 text-gold-500">{t.posted}</dt>
                      <dd className="text-ink-200">{longDate(job.datePosted)}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1.5 text-gold-500">{t.closes}</dt>
                      <dd className="text-ink-200">{longDate(job.validThrough)}</dd>
                    </div>
                  </dl>
                  <ApplyButton job={job} className="mt-8" />
                  <p className="mt-6 text-[0.7rem] leading-relaxed text-ink-300">{t.applyNote}</p>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
