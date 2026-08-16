import type { Metadata, Viewport } from "next";
import SiteShell from "@/views/SiteShell";
import { fontVars } from "@/views/fonts";
import { content } from "@/lib/content";
import { firm, SITE_URL } from "@/lib/firm";
import "../globals.css";

const KEYWORDS = [
  "Houston personal injury attorney",
  "Houston car accident lawyer",
  "Houston truck accident attorney",
  "Texas wrongful death lawyer",
  "Tennessee personal injury attorney",
  "Andre Thomas Law",
];

const c = content("en");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: c.pages.home.title,
    template: `%s — ${firm.name}`,
  },
  description: c.pages.home.description,
  keywords: KEYWORDS,
  authors: [{ name: firm.attorney }],
  twitter: {
    card: "summary_large_image",
    title: c.pages.home.title,
    description: c.pages.home.description,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteShell lang="en" fontVars={fontVars}>
      {children}
    </SiteShell>
  );
}
