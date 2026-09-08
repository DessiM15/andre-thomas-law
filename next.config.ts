import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // Marie was listed as "Marie Castillo-Hernandez" until 2026-09-08; her
      // signature reads "Marie Hernandez", so the slug followed. Both routes
      // had been in the sitemap, hence permanent redirects.
      {
        source: "/team/marie-castillo-hernandez",
        destination: "/team/marie-hernandez",
        permanent: true,
      },
      {
        source: "/es/equipo/marie-castillo-hernandez",
        destination: "/es/equipo/marie-hernandez",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
