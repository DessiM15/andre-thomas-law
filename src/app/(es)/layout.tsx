import type { Metadata, Viewport } from "next";
import SiteShell from "@/views/SiteShell";
import { fontVars } from "@/views/fonts";
import { content } from "@/lib/content";
import { firm, SITE_URL } from "@/lib/firm";
import "../globals.css";

const KEYWORDS = [
  "abogado de lesiones personales en Houston",
  "abogado de accidentes de auto en Houston",
  "abogado de accidentes de camion Houston",
  "abogado que habla espanol en Houston",
  "abogado de muerte por negligencia Texas",
  "Andre Thomas Law",
];

const c = content("es");

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
    <SiteShell lang="es" fontVars={fontVars}>
      {children}
    </SiteShell>
  );
}
