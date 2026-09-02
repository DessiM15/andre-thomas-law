/**
 * The accident itself — when and where it happened.
 *
 * Both intake channels need this and they need it to agree. The contact form
 * collects a real date from a native picker and a state from a dropdown; the
 * chat widget collects the same two facts as free text and has to make sense
 * of whatever the visitor types. Putting the parsing, the state list, and the
 * limitations arithmetic in one place is what keeps a lead reading identically
 * in the firm's inbox however it arrived.
 */

/** Texas civil practice & remedies code § 16.003. */
export const LIMITATIONS_YEARS = 2;

/** How close to the bar date a lead has to be before the email says so. */
const URGENT_WINDOW_DAYS = 90;

/** Nobody was injured before this; a year this old is a typo in the picker. */
const EARLIEST_YEAR = 1900;

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

/**
 * The firm is in Houston and licensed in Texas and Tennessee, so the
 * overwhelming majority of these accidents happened in Texas. Pre-selecting it
 * saves nearly every visitor a scroll through fifty states; the dropdown is
 * still there for the ones it doesn't fit.
 */
export const DEFAULT_STATE = "TX";

/** Accents are optional the way people actually type. Strip them and compare. */
const flatten = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

/**
 * Spanish names for the states whose names actually change in Spanish. A
 * Spanish-speaking visitor typing "Tejas" into the chat has answered the
 * question, and refusing to understand them is a lead on the floor.
 */
const SPANISH_STATE_NAMES: Record<string, string> = {
  tejas: "TX",
  "nuevo mexico": "NM",
  "nueva york": "NY",
  "nueva jersey": "NJ",
  "nuevo hampshire": "NH",
  "carolina del norte": "NC",
  "carolina del sur": "SC",
  "dakota del norte": "ND",
  "dakota del sur": "SD",
  "virginia occidental": "WV",
  luisiana: "LA",
  pensilvania: "PA",
  misisipi: "MS",
  misuri: "MO",
  hawai: "HI",
  "distrito de columbia": "DC",
  "carolina norte": "NC",
  "carolina sur": "SC",
};

const STATE_LOOKUP: Record<string, string> = (() => {
  const map: Record<string, string> = { ...SPANISH_STATE_NAMES };
  for (const s of US_STATES) {
    map[flatten(s.code)] = s.code;
    map[flatten(s.name)] = s.code;
  }
  return map;
})();

/** A state code, or "" if that isn't a state. Accepts "TX", "tx", "Texas", "Tejas". */
export function normalizeState(value: string | undefined): string {
  if (!value) return "";
  return STATE_LOOKUP[flatten(value)] ?? "";
}

export const stateName = (code: string) =>
  US_STATES.find((s) => s.code === code)?.name ?? code;

/* ── Dates ─────────────────────────────────────────────────────────── */

/**
 * Dates are handled as plain `YYYY-MM-DD` strings, never as `Date` objects in
 * transit. `new Date("2025-03-14")` parses as UTC midnight, which in Houston
 * is the evening of the 13th — an off-by-one that would silently misdate every
 * accident and, at the margin, misreport a limitations deadline.
 */
export const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Midday local, so a DST shift can never tip the date into a neighbouring day. */
const localDate = (y: number, m: number, d: number) => new Date(y, m - 1, d, 12);

export const todayISO = (now: Date = new Date()) =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;

/** True only for a real calendar day — rejects 2025-02-30 and friends. */
export function isRealDate(iso: string): boolean {
  const m = ISO_DATE.exec(iso);
  if (!m) return false;
  const [, y, mo, d] = m.map(Number);
  const dt = localDate(y, mo, d);
  return (
    dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d
  );
}

export type DateProblem = "missing" | "unparseable" | "future" | "ancient";

/** What is wrong with this date, or null if nothing is. */
export function dateProblem(
  iso: string | undefined,
  now: Date = new Date()
): DateProblem | null {
  const value = (iso ?? "").trim();
  if (!value) return "missing";
  if (!isRealDate(value)) return "unparseable";
  if (value > todayISO(now)) return "future";
  if (Number(value.slice(0, 4)) < EARLIEST_YEAR) return "ancient";
  return null;
}

const EN_MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const ES_MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** Month number from a written month name, in either language. 0 if unknown. */
function monthFromName(word: string): number {
  const w = flatten(word);
  if (w.length < 3) return 0;
  const hit = (list: string[]) =>
    list.findIndex((m) => m.startsWith(w) || w.startsWith(m.slice(0, 3)));
  const en = hit(EN_MONTHS);
  if (en >= 0) return en + 1;
  // "setiembre" is a common Spanish spelling that drops the p.
  const es = hit(w === "setiembre" ? ["septiembre"] : ES_MONTHS);
  if (es >= 0) return w === "setiembre" ? 9 : es + 1;
  return 0;
}

/** Two-digit years are always in the past here, so 25 is 2025 and 98 is 1998. */
function fullYear(n: number, now: Date): number {
  if (n >= 100) return n;
  return n <= now.getFullYear() % 100 ? 2000 + n : 1900 + n;
}

const shiftBack = (now: Date, unit: string, n: number): Date => {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  if (unit === "day") d.setDate(d.getDate() - n);
  else if (unit === "week") d.setDate(d.getDate() - n * 7);
  else if (unit === "month") d.setMonth(d.getMonth() - n);
  else d.setFullYear(d.getFullYear() - n);
  return d;
};

const UNITS: Record<string, string> = {
  day: "day", days: "day", dia: "day", dias: "day",
  week: "week", weeks: "week", semana: "week", semanas: "week",
  month: "month", months: "month", mes: "month", meses: "month",
  year: "year", years: "year", ano: "year", anos: "year",
};

/**
 * Make a date out of whatever a person typed into the chat.
 *
 * The form has a native date picker and needs none of this. The chat does not,
 * and the alternative to being generous here is telling an injured person that
 * their answer was formatted wrong — which is where they close the tab. So it
 * accepts 3/14/2025, 2025-03-14, "March 14 2025", "14 de marzo de 2025",
 * "yesterday", and "6 months ago", in both languages.
 *
 * Returns `YYYY-MM-DD`, or "" when there is genuinely nothing to read.
 */
export function parseIncidentDate(raw: string, now: Date = new Date()): string {
  const text = flatten(raw).replace(/[,]/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";

  const iso = (d: Date) => todayISO(d);

  if (/^(today|hoy|esta manana|this morning)$/.test(text)) return iso(now);
  if (/^(yesterday|ayer)$/.test(text)) return iso(shiftBack(now, "day", 1));

  // "6 months ago", "hace 6 meses", "hace un ano"
  const rel = /(?:hace\s+)?(\d+|un|una|uno|a|an)\s*([a-z]+)(?:\s+ago)?$/.exec(text);
  if (rel) {
    const unit = UNITS[rel[2]];
    if (unit && (/^hace\b/.test(text) || /\bago$/.test(text))) {
      const n = /^\d+$/.test(rel[1]) ? Number(rel[1]) : 1;
      if (n > 0 && n < 200) return iso(shiftBack(now, unit, n));
    }
  }

  // 2025-03-14 (and 2025/3/14)
  const ymd = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(text);
  if (ymd) {
    const candidate = `${ymd[1]}-${ymd[2].padStart(2, "0")}-${ymd[3].padStart(2, "0")}`;
    return isRealDate(candidate) ? candidate : "";
  }

  // 3/14/2025 — US order, which is what this audience types. A Spanish
  // speaker writing 14/3/2025 out of habit is unambiguous the moment the
  // first number is over twelve, so read that one the way they meant it
  // rather than rejecting a date we plainly understand.
  const mdy = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})$/.exec(text);
  if (mdy) {
    let month = Number(mdy[1]);
    let day = Number(mdy[2]);
    if (month > 12 && day <= 12) [month, day] = [day, month];
    const y = fullYear(Number(mdy[3]), now);
    const candidate = `${y}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return isRealDate(candidate) ? candidate : "";
  }

  // "march 14 2025" / "14 de marzo de 2025" / "march 2025"
  const words = text.replace(/\b(de|del|el|on|the)\b/g, " ").split(/\s+/).filter(Boolean);
  let month = 0;
  let day = 0;
  let year = 0;
  for (const w of words) {
    const asMonth = monthFromName(w);
    if (asMonth && !month) {
      month = asMonth;
      continue;
    }
    const n = Number(w.replace(/(st|nd|rd|th)$/, ""));
    if (!Number.isFinite(n)) continue;
    if (n >= 1000) year = n;
    else if (n <= 31 && !day) day = n;
    else if (!year) year = fullYear(n, now);
  }
  if (month) {
    // A month and a year but no day: treat it as the first, and let the firm
    // pin it down on the call. Better an approximate date than no lead.
    const y = year || now.getFullYear();
    const candidate = `${y}-${String(month).padStart(2, "0")}-${String(day || 1).padStart(2, "0")}`;
    if (isRealDate(candidate) && candidate <= todayISO(now)) return candidate;
    return isRealDate(candidate) ? candidate : "";
  }

  return "";
}

/** "March 14, 2025" — what the firm reads in the email. */
export function formatIncidentDate(iso: string): string {
  const m = ISO_DATE.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m.map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(localDate(y, mo, d));
}

/** Whole months between two dates, used for both the elapsed line and the bar date. */
function monthsBetween(from: Date, to: Date): number {
  let months =
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months -= 1;
  return Math.max(0, months);
}

/** "1 yr 5 mo ago" — how stale this is, at a glance. */
export function elapsedLabel(iso: string, now: Date = new Date()): string {
  const m = ISO_DATE.exec(iso);
  if (!m) return "";
  const [, y, mo, d] = m.map(Number);
  const then = localDate(y, mo, d);
  const days = Math.floor((now.getTime() - then.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 31) return `${days} days ago`;
  const months = monthsBetween(then, now);
  if (months < 12) return `${months} mo ago`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years} yr ${rem} mo ago` : `${years} yr ago`;
}

/**
 * The limitations read.
 *
 * This is a prompt to check, not a conclusion — tolling, the discovery rule,
 * and a claimant who was a minor all move the real date, and none of them are
 * things a web form can know. What it can do is make sure nobody opens this
 * email without noticing that the clock is a problem.
 */
export function limitationsFlag(
  iso: string,
  now: Date = new Date()
): string | undefined {
  const m = ISO_DATE.exec(iso);
  if (!m) return undefined;
  const [, y, mo, d] = m.map(Number);
  const bar = localDate(y + LIMITATIONS_YEARS, mo, d);
  const days = Math.ceil((bar.getTime() - now.getTime()) / 86_400_000);

  if (days <= 0) {
    return `OVER ${LIMITATIONS_YEARS} YEARS — check limitations before responding`;
  }
  if (days <= URGENT_WINDOW_DAYS) {
    return `URGENT — ${LIMITATIONS_YEARS}-year limitations runs in ${days} day${
      days === 1 ? "" : "s"
    } (${formatIncidentDate(todayISO(bar))})`;
  }
  return undefined;
}

/** "Houston, TX" for the inbox; "" when we have nothing worth printing. */
export function locationLabel(city?: string, state?: string): string {
  const c = (city ?? "").trim();
  const s = normalizeState(state);
  if (c && s) return `${c}, ${s}`;
  return c || (s ? stateName(s) : "");
}

/**
 * Read "Houston, TX" — or "houston texas", or just "Houston" — out of one line
 * of chat. Returns the state as "" when the visitor didn't name one, so the
 * widget knows to ask rather than quietly assuming Texas.
 */
export function parseLocation(raw: string): { city: string; state: string } {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) return { city: "", state: "" };

  const comma = text.lastIndexOf(",");
  if (comma > 0) {
    const state = normalizeState(text.slice(comma + 1));
    if (state) return { city: text.slice(0, comma).trim(), state };
  }

  // No comma — peel words off the end until what's left of them is a state.
  const words = text.split(" ");
  for (let take = Math.min(3, words.length - 1); take >= 1; take--) {
    const state = normalizeState(words.slice(-take).join(" "));
    if (state) return { city: words.slice(0, -take).join(" ").trim(), state };
  }

  const whole = normalizeState(text);
  if (whole) return { city: "", state: whole };
  return { city: text, state: "" };
}
