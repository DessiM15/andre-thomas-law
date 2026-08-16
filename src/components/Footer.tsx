import Image from "next/image";
import Link from "next/link";
import LangSwitch from "@/components/LangSwitch";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { areaPath, path, type Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const c = content(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink-950 text-ink-200">
      <div className="container-x relative py-20 md:py-28">
        {/* Mark + tagline */}
        <div className="flex flex-col gap-10 border-b border-ink-800/60 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
              src="/logo-light.png"
              alt={firm.name}
              width={1699}
              height={870}
              sizes="(max-width: 768px) 304px, 448px"
              className="h-auto w-[19rem] md:w-[28rem]"
            />
            <p className="mt-7 max-w-md font-display text-2xl italic leading-snug text-paper/90 md:text-3xl">
              {c.tagline}
            </p>
          </div>

          <Link
            href={path("contact", lang)}
            className="group inline-flex items-center gap-4 self-start border border-ink-200/25 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-gold-500 hover:text-gold-400 md:self-auto"
          >
            {c.ui.footer.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <h2 className="eyebrow mb-6 text-gold-500">{c.ui.footer.navigate}</h2>
            <ul className="space-y-3 text-sm">
              {c.nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={path(item.key, lang)}
                    className="link-underline text-ink-200 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={firm.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-200 transition-colors hover:text-paper"
                >
                  {c.ui.instagram} ↗
                </a>
              </li>
              <li>
                <LangSwitch
                  lang={lang}
                  label={lang === "en" ? "Ver en español" : "View in English"}
                  ariaLabel={c.ui.switchLangAria}
                  className="link-underline text-gold-500 transition-colors hover:text-gold-400"
                />
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h2 className="eyebrow mb-6 text-gold-500">{c.ui.footer.practiceAreas}</h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {c.practiceAreas.map((area) => (
                <li key={area.key}>
                  <Link
                    href={areaPath(area.slug, lang)}
                    className="link-underline text-ink-200 transition-colors hover:text-paper"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-6 text-gold-500">{c.ui.footer.office}</h2>
            <address className="space-y-5 text-sm not-italic leading-relaxed">
              <a
                href={firm.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-ink-200 transition-colors hover:text-paper"
              >
                {firm.address.street}
                <br />
                {firm.address.suite}
                <br />
                {firm.address.city}, {firm.address.state} {firm.address.zip}
              </a>
              <div className="space-y-1">
                <a
                  href={firm.phoneHref}
                  className="block font-display text-2xl text-paper transition-colors hover:text-gold-400"
                >
                  {firm.phone}
                </a>
                <p className="text-ink-300">
                  {c.ui.footer.fax} {firm.fax}
                </p>
              </div>
              <a
                href={firm.emailHref}
                className="link-underline block break-all text-ink-200 transition-colors hover:text-paper"
              >
                {firm.email}
              </a>
              <p className="text-ink-300">{c.hours}</p>
            </address>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-ink-800/60 pt-10">
          <p className="max-w-4xl text-xs leading-relaxed text-ink-300/80">
            {c.ui.footer.legal}{" "}
            {lang === "es"
              ? `${firm.attorney} tiene licencia para ejercer la abogacía en Texas y Tennessee.`
              : `${firm.attorney} is licensed to practice law in Texas and Tennessee.`}
          </p>
          <div className="mt-8 flex flex-col gap-4 text-xs text-ink-300/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {firm.name}. {c.ui.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href={path("disclaimer", lang)} className="transition-colors hover:text-paper">
                {c.ui.footer.disclaimer}
              </Link>
              <Link href={path("privacy", lang)} className="transition-colors hover:text-paper">
                {c.ui.footer.privacy}
              </Link>
              <p>
                {c.ui.footer.poweredBy}{" "}
                <a
                  href="https://smartscaleagent.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium text-gold-500 transition-colors hover:text-gold-400"
                >
                  SmartScale
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
