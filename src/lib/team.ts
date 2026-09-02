/**
 * The people, minus their words.
 *
 * Names, photographs, and slugs do not translate, so they live here and both
 * languages read from the same copy — the same split `firm.ts` uses. Roles and
 * biographies *are* language-specific and live in `content/en.ts` / `es.ts`,
 * keyed by the `TeamId` below.
 *
 * Every person on this page is real, and every biography was supplied by the
 * firm. The invented attorneys and staff that stood here during design have
 * been removed — publishing them would have violated Tex. Disciplinary R.
 * Prof. Conduct 7.01 and Tenn. Sup. Ct. R. 8, RPC 7.1, both of which prohibit
 * false or misleading statements about who works at a firm.
 *
 * Two people are still waiting on photographs. Rather than hold their bios
 * back, they render as a monogram (see `Portrait` in `components/Portrait`),
 * which is honest about the gap instead of borrowing a stock face. Drop a
 * headshot into `public/team/` and set `image` to publish it.
 */

/** Was true while the roster was invented. Kept as the switch that gates
 *  `noindex`, the nav entry, and the sitemap, in case the page ever goes
 *  back into draft. */
export const TEAM_PLACEHOLDER = false;

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
  | "maria-hernandez-castillo"
  | "milagro-rodriguez-mejia"
  | "nayla-mendez"
  | "marie-castillo-hernandez"
  | "marissa-lopez"
  | "itzel-tapia";

export type TeamKind = "attorney" | "staff";

export type TeamPerson = {
  /** Doubles as the URL slug — identical in both languages, since names don't translate. */
  id: TeamId;
  name: string;
  kind: TeamKind;
  /** Omitted while someone's headshot is outstanding; they render as a monogram. */
  image?: string;
  /** `object-position` for the headshot, when centre isn't the right crop. */
  focal?: string;
  /** Initials for the monogram fallback. Only read when `image` is absent —
   *  set by hand because a double-barrelled surname should still give two
   *  letters: "Marie Castillo-Hernandez" is MC, not MCH. */
  initials?: string;
};

/**
 * Display order: the founding attorney, then the staff who carry the files day
 * to day, by years in the field — 25, 10, 9, 8, 7, then Itzel, whose figure
 * the firm has not given. Not alphabetical: a visitor scanning this page is
 * reading for seniority and for who they are likely to speak to.
 */
export const team: TeamPerson[] = [
  {
    id: "andre-thomas",
    name: "Andre Thomas",
    kind: "attorney",
    image: "/team/andre-thomas.webp",
  },
  {
    id: "maria-hernandez-castillo",
    name: "Maria Hernandez-Castillo",
    kind: "staff",
    image: "/team/maria-hernandez-castillo.webp",
  },
  {
    id: "marie-castillo-hernandez",
    name: "Marie Castillo-Hernandez",
    kind: "staff",
    initials: "MC",
  },
  {
    id: "nayla-mendez",
    name: "Nayla Mendez",
    kind: "staff",
    image: "/team/nayla-mendez.webp",
  },
  {
    id: "milagro-rodriguez-mejia",
    name: "Milagro Rodriguez Mejia",
    kind: "staff",
    image: "/team/milagro-rodriguez-mejia.webp",
  },
  {
    id: "marissa-lopez",
    name: "Marissa Lopez",
    kind: "staff",
    image: "/team/marissa-lopez.webp",
  },
  {
    id: "itzel-tapia",
    name: "Itzel Tapia",
    kind: "staff",
    initials: "IT",
  },
];

export const getPerson = (id: string): TeamPerson | undefined =>
  team.find((p) => p.id === id);
