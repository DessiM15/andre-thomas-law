/**
 * The people, minus their words.
 *
 * Names, photographs, and slugs do not translate, so they live here and both
 * languages read from the same copy — the same split `firm.ts` uses. Roles and
 * biographies *are* language-specific and live in `content/en.ts` / `es.ts`,
 * keyed by the `TeamId` below.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ⚠  PLACEHOLDER CONTENT — NOT FOR PUBLICATION
 *
 * Only Andre Thomas and Maria Hernandez-Castillo are real. Every other person
 * on this page is invented: the name, the photograph, the credentials, the
 * accolades, and the case history. They exist so the page can be designed and
 * reviewed before real bios are collected.
 *
 * Publishing invented attorneys would violate Tex. Disciplinary R. Prof.
 * Conduct 7.01 and Tenn. Sup. Ct. R. 8, RPC 7.1, both of which prohibit false
 * or misleading statements about a firm's lawyers. While `TEAM_PLACEHOLDER`
 * is true the page is `noindex`, absent from the nav, and absent from the
 * sitemap. Flip it to `false` only once every entry below is a real person
 * with verified credentials.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const TEAM_PLACEHOLDER = true;

/**
 * Whether the draft banner is rendered.
 *
 * Split from `TEAM_PLACEHOLDER` so the page can be demonstrated to a client
 * without weakening any actual publication guard: with this false and
 * `TEAM_PLACEHOLDER` still true, the routes stay noindex, stay out of the
 * sitemap, and still emit no `Person` schema. Only the visible warning goes.
 *
 * ⚠ This is the one guard a human can see. With it off, nothing on the page
 * tells a reader that five of these seven people are invented. Turn it back
 * on the moment the demo is over — it is not a substitute for replacing the
 * placeholder roster, and it must never be false once the site is public.
 */
export const SHOW_DRAFT_BANNER = false;

// Build-time reminder, so a temporary demo setting cannot quietly become
// permanent: this prints on every `next build` and `next dev` until either
// the banner comes back or the roster becomes real.
if (TEAM_PLACEHOLDER && !SHOW_DRAFT_BANNER) {
  console.warn(
    "\n⚠  Team page: placeholder roster is live with the draft banner HIDDEN." +
      "\n   Five of seven people are invented and nothing on the page says so." +
      "\n   Restore SHOW_DRAFT_BANNER in src/lib/team.ts after the demo.\n"
  );
}

export type TeamId =
  | "andre-thomas"
  | "rachel-kim"
  | "michael-sorensen"
  | "nadia-haddad"
  | "maria-hernandez-castillo"
  | "amara-whitfield"
  | "tyler-nguyen";

export type TeamKind = "attorney" | "staff";

export type TeamPerson = {
  /** Doubles as the URL slug — identical in both languages, since names don't translate. */
  id: TeamId;
  name: string;
  kind: TeamKind;
  image: string;
  /** `object-position` for the headshot, when centre isn't the right crop. */
  focal?: string;
  /** False only for the two real people. Drives the review banner. */
  invented: boolean;
  /**
   * Whether the biography copy is factual. Maria is a real person whose bio
   * is still placeholder, so this is a separate axis from `invented`.
   */
  bioVerified: boolean;
  /** Photograph attribution, so the credits are traceable when these get replaced. */
  credit?: string;
};

/**
 * Display order: the founding attorney, then attorneys, then the staff who
 * carry the files day to day. Not alphabetical — seniority is the signal a
 * visitor is actually scanning for.
 */
export const team: TeamPerson[] = [
  {
    id: "andre-thomas",
    name: "Andre Thomas",
    kind: "attorney",
    image: "/team/andre-thomas.webp",
    invented: false,
    bioVerified: true,
  },
  {
    id: "rachel-kim",
    name: "Rachel Kim",
    kind: "attorney",
    image: "/team/rachel-kim.webp",
    invented: true,
    bioVerified: false,
    credit: "Unsplash — photo-1581065178047",
  },
  {
    id: "michael-sorensen",
    name: "Michael Sorensen",
    kind: "attorney",
    image: "/team/michael-sorensen.webp",
    invented: true,
    bioVerified: false,
    credit: "Unsplash — photo-1585846416120",
  },
  {
    id: "nadia-haddad",
    name: "Nadia Haddad",
    kind: "attorney",
    image: "/team/nadia-haddad.webp",
    invented: true,
    bioVerified: false,
    credit: "Unsplash — photo-1666867540898",
  },
  {
    id: "maria-hernandez-castillo",
    name: "Maria Hernandez-Castillo",
    kind: "staff",
    image: "/team/maria-hernandez-castillo.webp",
    invented: false,
    bioVerified: false,
  },
  {
    id: "amara-whitfield",
    name: "Amara Whitfield",
    kind: "staff",
    image: "/team/amara-whitfield.webp",
    invented: true,
    bioVerified: false,
    credit: "Unsplash — photo-1573496527892",
  },
  {
    id: "tyler-nguyen",
    name: "Tyler Nguyen",
    kind: "staff",
    image: "/team/tyler-nguyen.webp",
    invented: true,
    bioVerified: false,
    credit: "Unsplash — photo-1622902141397",
  },
];

export const getPerson = (id: string): TeamPerson | undefined =>
  team.find((p) => p.id === id);
