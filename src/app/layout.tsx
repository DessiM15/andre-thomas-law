import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import ChatWidget from "@/components/chat/ChatWidget";
import { firm, fullAddress, SITE_URL } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${firm.name} — Houston Personal Injury Attorney`,
    template: `%s — ${firm.name}`,
  },
  description:
    "Houston personal injury attorney Andre Thomas. Licensed in Texas and Tennessee, former prosecutor, trial-tested. Free consultation — 713-212-3003.",
  keywords: [
    "Houston personal injury attorney",
    "Houston car accident lawyer",
    "Houston truck accident attorney",
    "Texas wrongful death lawyer",
    "Tennessee personal injury attorney",
    "Andre Thomas Law",
  ],
  authors: [{ name: firm.attorney }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: firm.name,
    title: `${firm.name} — Houston Personal Injury Attorney`,
    description:
      "Empowering your voice, ensuring justice. Licensed in Texas and Tennessee. Free consultation.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${firm.name} — Houston Personal Injury Attorney`,
    description:
      "Empowering your voice, ensuring justice. Licensed in Texas and Tennessee.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1a30",
  colorScheme: "light",
};

/** Structured data — this is what earns the rich result in search. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Attorney",
  "@id": `${SITE_URL}/#organization`,
  name: firm.name,
  url: SITE_URL,
  telephone: firm.phone,
  faxNumber: firm.fax,
  email: firm.email,
  image: `${SITE_URL}/andre-standing.webp`,
  priceRange: "Free consultation",
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
    jobTitle: "Attorney",
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Memphis" },
      {
        "@type": "CollegeOrUniversity",
        name: "Texas Southern University, Thurgood Marshall School of Law",
      },
    ],
  },
  description: `${firm.name} represents plaintiffs in personal injury matters in Houston, Texas and in Tennessee. ${fullAddress}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <ScrollTop />
        <Preloader />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
