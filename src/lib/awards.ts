/**
 * Recognition the attorney has received from outside organizations.
 *
 * One entry per award. The homepage and the About page both render the
 * first entry through `components/Recognition.tsx`, and the site-wide
 * `Attorney` schema lists every entry under the founder's `award`.
 *
 * Texas attorney advertising rules treat an award as a statement about the
 * lawyer, so each one says who gave it and for what year. `year`,
 * `category`, and `badge` are optional only so the section can be built
 * before the firm sends them. Fill them in before this goes live.
 */

import type { Lang } from "@/lib/i18n";

export type AwardCopy = {
  eyebrow: string;
  /** The section's `h2`, as art-directed lines. */
  titleLines: string[];
  body: string;
  /** Labels for the facts rail. */
  awardedBy: string;
  yearLabel: string;
  categoryLabel: string;
  /** Practice area the award names, if it names one. */
  category?: string;
  profileCta: string;
  /** Accessible name of the play button. */
  play: string;
  /** `title` of the player once it loads. */
  videoTitle: string;
  thumbAlt: string;
  badgeAlt: string;
};

export type Award = {
  key: string;
  /** The awarding organization. Never translated. */
  org: string;
  /** The honor as the organization words it. */
  honor: string;
  year?: number;
  /** The attorney's profile on the organization's own site. */
  profileUrl: string;
  video?: {
    youtubeId: string;
    /** Under `public/awards/`. A local copy, so nothing loads from YouTube until play. */
    thumb: string;
    width: number;
    height: number;
  };
  /** The organization's official badge, under `public/awards/`. */
  badge?: { src: string; width: number; height: number };
  copy: Record<Lang, AwardCopy>;
};

export const awards: Award[] = [
  {
    key: "elite-lawyer",
    org: "Elite Lawyer",
    honor: "Elite Lawyer",
    // TODO(firm): award year, category, and the official badge file.
    profileUrl: "https://www.elitelawyer.com/profile/17443-andre-thomas",
    video: {
      youtubeId: "Kq2XE-BjhAg",
      thumb: "/awards/andre-thomas-named-elite-lawyer-video.webp",
      width: 1280,
      height: 720,
    },
    copy: {
      en: {
        eyebrow: "Recognition",
        titleLines: ["Andre Thomas,", "named an Elite Lawyer."],
        body:
          "Houston personal injury attorney Andre Thomas has been named an Elite Lawyer. Watch the announcement from Elite Lawyer, or read his profile on their site.",
        awardedBy: "Awarded by",
        yearLabel: "Year",
        categoryLabel: "Practice area",
        profileCta: "View the Elite Lawyer profile",
        play: "Play video: Andre Thomas Named an Elite Lawyer",
        videoTitle: "Andre Thomas Named an Elite Lawyer",
        thumbAlt:
          "Still from the Elite Lawyer announcement video: a presenter beside a portrait of Houston personal injury attorney Andre Thomas.",
        badgeAlt: "Elite Lawyer badge awarded to Andre Thomas",
      },
      es: {
        eyebrow: "Reconocimiento",
        titleLines: ["Andre Thomas,", "nombrado Elite Lawyer."],
        body:
          "Andre Thomas, abogado de lesiones personales en Houston, fue nombrado Elite Lawyer. Vea el anuncio de Elite Lawyer o lea su perfil en el sitio de la organización.",
        awardedBy: "Otorgado por",
        yearLabel: "Año",
        categoryLabel: "Área de práctica",
        profileCta: "Ver el perfil en Elite Lawyer",
        play: "Reproducir el video: Andre Thomas Named an Elite Lawyer",
        videoTitle: "Andre Thomas Named an Elite Lawyer",
        thumbAlt:
          "Imagen del video de anuncio de Elite Lawyer: un presentador junto a un retrato de Andre Thomas, abogado de lesiones personales en Houston.",
        badgeAlt: "Insignia de Elite Lawyer otorgada a Andre Thomas",
      },
    },
  },
];

/** How an award reads in structured data: "Elite Lawyer, 2026". */
export const awardSchemaName = (a: Award) =>
  a.year ? `${a.honor}, ${a.year}` : a.honor;
