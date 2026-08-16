import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import ChatWidget from "@/components/chat/ChatWidget";
import LangBanner from "@/components/LangBanner";
import { content } from "@/lib/content";
import { firm, fullAddress, SITE_URL } from "@/lib/firm";
import { htmlLang, path, type Lang } from "@/lib/i18n";

/**
 * The chrome both languages share.
 *
 * English and Spanish have separate root layouts — that is what lets each
 * serve the correct `<html lang>` in the HTML a crawler actually reads,
 * rather than patching it on the client after paint. Everything below the
 * <html> tag is identical, so it lives here.
 */
export default function SiteShell({
  lang,
  fontVars,
  children,
}: {
  lang: Lang;
  fontVars: string;
  children: React.ReactNode;
}) {
  const c = content(lang);

  /** Structured data — this is what earns the rich result in search. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "@id": `${SITE_URL}/#organization`,
    name: firm.name,
    url: `${SITE_URL}${path("home", lang)}`,
    telephone: firm.phone,
    faxNumber: firm.fax,
    email: firm.email,
    image: `${SITE_URL}/andre-standing.webp`,
    priceRange: c.ui.freeConsultation,
    inLanguage: lang,
    knowsLanguage: ["en", "es"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${firm.address.street}, ${firm.address.suite}`,
      addressLocality: firm.address.city,
      addressRegion: firm.address.stateCode,
      postalCode: firm.address.zip,
      addressCountry: "US",
    },
    openingHours: firm.hoursSchema,
    areaServed: [
      { "@type": "State", name: "Texas" },
      { "@type": "State", name: "Tennessee" },
    ],
    sameAs: [firm.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: firm.reviews.rating,
      reviewCount: firm.reviews.count,
      bestRating: 5,
    },
    founder: {
      "@type": "Person",
      name: firm.attorney,
      jobTitle: lang === "es" ? "Abogado" : "Attorney",
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Memphis" },
        {
          "@type": "CollegeOrUniversity",
          name: "Texas Southern University, Thurgood Marshall School of Law",
        },
      ],
    },
    description:
      lang === "es"
        ? `${firm.name} representa a demandantes en casos de lesiones personales en Houston, Texas y en Tennessee. ${fullAddress}.`
        : `${firm.name} represents plaintiffs in personal injury matters in Houston, Texas and in Tennessee. ${fullAddress}.`,
  };

  return (
    <html lang={htmlLang[lang]} className={fontVars}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          {c.ui.skipToContent}
        </a>
        <ScrollTop />
        <Preloader lang={lang} />
        <Nav lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <ChatWidget lang={lang} />
        <LangBanner
          lang={lang}
          question={c.ui.banner.question}
          action={c.ui.banner.action}
          dismiss={c.ui.banner.dismiss}
        />
      </body>
    </html>
  );
}
