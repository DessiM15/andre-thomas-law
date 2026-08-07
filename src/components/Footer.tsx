import Image from "next/image";
import Link from "next/link";
import { firm, nav, practiceAreas } from "@/lib/site";

export default function Footer() {
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
              width={946}
              height={484}
              sizes="320px"
              className="h-auto w-[15rem] md:w-[19rem]"
            />
            <p className="mt-7 max-w-md font-display text-2xl italic leading-snug text-paper/90 md:text-3xl">
              {firm.tagline}
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 self-start border border-ink-200/25 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-gold-500 hover:text-gold-400 md:self-auto"
          >
            Start your free consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <h2 className="eyebrow mb-6 text-gold-500">Navigate</h2>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
                  Instagram ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h2 className="eyebrow mb-6 text-gold-500">Practice Areas</h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="link-underline text-ink-200 transition-colors hover:text-paper"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-6 text-gold-500">Office</h2>
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
                <p className="text-ink-300">Fax {firm.fax}</p>
              </div>
              <a
                href={firm.emailHref}
                className="link-underline block break-all text-ink-200 transition-colors hover:text-paper"
              >
                {firm.email}
              </a>
              <p className="text-ink-300">{firm.hours}</p>
            </address>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-ink-800/60 pt-10">
          <p className="max-w-4xl text-xs leading-relaxed text-ink-300/80">
            The information on this website is provided for general informational
            purposes only and is not legal advice. Viewing this site, contacting
            the firm, or sending information through this website does not create
            an attorney–client relationship. Do not send confidential information
            until an attorney–client relationship has been established in
            writing. Prior results do not guarantee a similar outcome.{" "}
            {firm.attorney} is licensed to practice law in Texas and Tennessee.
          </p>
          <div className="mt-8 flex flex-col gap-4 text-xs text-ink-300/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {firm.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/disclaimer" className="transition-colors hover:text-paper">
                Disclaimer
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-paper">
                Privacy
              </Link>
              <p>
                Powered by{" "}
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
