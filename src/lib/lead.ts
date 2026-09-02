/**
 * Lead intake — screening, validation, and the payload the firm's inbox sees.
 *
 * This module runs in the BROWSER. Web3Forms' free plan refuses server-side
 * submissions outright ("Use our API in client side ... Pro plan is
 * required"), so the visitor's own browser hands the lead to Web3Forms and
 * there is no server hop in between.
 *
 * That makes `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` public — it is in the page
 * source, and that is Web3Forms' intended model: it is an *access key*, not a
 * secret. Lock it to the site's domain in the Web3Forms dashboard (Settings →
 * Domain Restriction) so a copied key cannot be used to post from anywhere
 * else, and leave their spam filtering on.
 *
 * Everything here is shared by the contact form, the chat widget's completed
 * capture, and the chat widget's abandonment beacon, so a lead reads
 * identically in the inbox however it arrived.
 */

import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";
import {
  dateProblem,
  elapsedLabel,
  formatIncidentDate,
  limitationsFlag,
  locationLabel,
  normalizeState,
} from "@/lib/incident";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

/**
 * Intake screening.
 *
 * The visitor answers in their own language but the firm reads the email in
 * English, so the widget stores a stable key and the label is looked up here.
 * `flag` is what actually earns this feature its place: an answer that changes
 * how urgently a file should be looked at belongs in the subject line, not
 * buried where someone has to read the whole email to find it.
 *
 * The other flag — the limitations one — is no longer a fixed bucket. Both
 * channels now collect the accident's actual date, so `limitationsFlag` works
 * the Texas two-year period out from the day itself and can say how long is
 * left rather than only that it has run.
 */
const DOCTOR_LABELS: Record<string, { label: string; flag?: string }> = {
  yes: { label: "Yes, has seen a doctor" },
  er: { label: "Went to the ER" },
  no: { label: "No treatment yet", flag: "No medical treatment yet" },
};

export type LeadInput = {
  name?: string;
  phone?: string;
  email?: string;
  matter?: string;
  message?: string;
  /** Honeypot. Real people leave it empty. */
  website?: string;
  source?: string;
  /** The day of the accident, as `YYYY-MM-DD`. */
  incidentDate?: string;
  city?: string;
  /** Two-letter state code. */
  state?: string;
  doctor?: string;
  /** A capture the visitor started and walked away from. */
  partial?: boolean;
};

/**
 * Houston local time, not UTC. Whoever reads this is deciding how stale the
 * lead is, and an ISO timestamp makes them do timezone arithmetic to find out.
 *
 * Explicit components, not dateStyle/timeStyle — Intl throws outright when
 * either of those is combined with timeZoneName.
 */
const receivedAtLocal = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);

/**
 * The chat collects name and phone only. Insisting on an email address
 * mid-conversation is where people abandon, and a phone number is what the
 * firm actually acts on. The web form still requires all three.
 */
export function validateLead(
  input: LeadInput,
  lang: Lang
): Record<string, string> {
  const t = content(lang).ui.form;
  const fromChat = input.source === "chat";
  const errors: Record<string, string> = {};

  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() ?? "";

  if (name.length < 2) errors.name = t.errName;
  if (phone.replace(/\D/g, "").length < 10) errors.phone = t.errPhone;
  if (!fromChat || email) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      errors.email = t.errEmail;
  }

  // A date the firm cannot trust is worse than no date, because it will be
  // used to work out the limitations position. A typo'd year in the picker is
  // easy to make and expensive to believe.
  const problem = dateProblem(input.incidentDate);
  if (problem === "future") errors.incidentDate = t.errDateFuture;
  else if (problem) errors.incidentDate = t.errDate;

  if ((input.city ?? "").trim().length < 2) errors.city = t.errCity;
  if (!normalizeState(input.state)) errors.state = t.errState;

  if (input.message && input.message.length > 4000) errors.message = t.errLong;

  return errors;
}

/** Header injection guard — a newline in the subject splits the header. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/**
 * The Web3Forms submission. Field names here become the labels in the email
 * the firm receives, so they read as a callback sheet rather than a JSON dump.
 *
 * Returned flat and all-strings so the same object can go out as JSON or, for
 * the abandonment beacon, as url-encoded form data.
 */
export function buildSubmission(
  input: LeadInput,
  lang: Lang
): Record<string, string> {
  const fromChat = input.source === "chat";
  const incomplete = input.partial === true;

  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const email = (input.email ?? "").trim();

  const incidentDate = (input.incidentDate ?? "").trim();
  const dateIsUsable = !dateProblem(incidentDate);
  const doctorAnswer = DOCTOR_LABELS[input.doctor ?? ""];
  const flags = [
    dateIsUsable ? limitationsFlag(incidentDate) : undefined,
    doctorAnswer?.flag,
  ].filter((f): f is string => Boolean(f));

  // "March 14, 2025 (1 yr 5 mo ago)" — the date and how stale it is, together,
  // because whoever picks this up is deciding how fast to move on it.
  const dateLine = dateIsUsable
    ? `${formatIncidentDate(incidentDate)} (${elapsedLabel(incidentDate)})`
    : "(not provided)";

  // An abandoned capture that already has a name and a number is still a lead
  // worth calling — it just needs to be obvious in the subject line that the
  // person did not finish, so nobody reads the gaps as answers.
  const kind = incomplete
    ? "Chat lead (INCOMPLETE)"
    : fromChat
      ? "Chat lead"
      : "Consultation request";

  return {
    access_key: ACCESS_KEY,
    from_name: `${firm.shortName} website`,
    subject: oneLine(
      `${kind} — ${name}${lang === "es" ? " (Spanish)" : ""}${
        flags.length ? " ⚠" : ""
      }`
    ),
    // So hitting reply in the inbox writes to the lead, not to the website.
    ...(email ? { replyto: email } : {}),
    Name: name,
    Phone: phone,
    Email: email || "(not provided)",
    Matter: input.matter || "Not specified",
    "Date of accident": dateLine,
    Location: locationLabel(input.city, input.state) || "(not provided)",
    Treatment: doctorAnswer?.label ?? "(not provided)",
    ...(flags.length ? { Flags: flags.join(" · ") } : {}),
    Language: lang === "es" ? "Spanish — call back in Spanish" : "English",
    Source: incomplete
      ? "Website chat widget — VISITOR DID NOT FINISH, details above are all we have"
      : fromChat
        ? "Website chat widget"
        : "Website contact form",
    Message: (input.message ?? "").trim() || "(no message)",
    Received: receivedAtLocal(new Date()),
  };
}

export type SendResult = { ok: true } | { ok: false; errors: Record<string, string> };

/**
 * Validate, then hand the lead to Web3Forms.
 *
 * Fails visibly rather than swallowing anything. An earlier version of this
 * pipeline logged the lead and returned success, which meant a misconfigured
 * deploy silently ate every enquiry while telling the visitor "Message
 * received." For a firm that buys leads, that is the most expensive bug this
 * file could have.
 */
export async function sendLead(
  input: LeadInput,
  lang: Lang
): Promise<SendResult> {
  const t = content(lang).ui.form;

  // Honeypot — say nothing, do nothing, and let the bot think it worked.
  if (input.website) return { ok: true };

  const errors = validateLead(input, lang);
  if (Object.keys(errors).length) return { ok: false, errors };

  if (!ACCESS_KEY) {
    console.error(
      "[lead] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — refusing to " +
        "accept a lead that cannot be delivered. Set it in the Vercel " +
        "project settings and redeploy."
    );
    return { ok: false, errors: { form: t.errServer } };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildSubmission(input, lang)),
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.success) {
      console.error("[lead] Web3Forms rejected the submission", {
        status: res.status,
        result,
      });
      return { ok: false, errors: { form: t.errServer } };
    }
    return { ok: true };
  } catch {
    return { ok: false, errors: { form: `${t.couldNotSend} ${firm.phone}.` } };
  }
}

/**
 * The abandonment path: fire-and-forget, from a page that is already closing.
 *
 * `sendBeacon` cannot be used with an `application/json` body here — that
 * content type makes the request non-simple, and a CORS preflight issued
 * during unload is not reliably completed. `application/x-www-form-urlencoded`
 * is a CORS-simple type, needs no preflight, and is a shape Web3Forms accepts,
 * so the beacon actually lands.
 */
export function beaconLead(input: LeadInput, lang: Lang): void {
  if (!ACCESS_KEY) return;
  if (input.website) return;
  // Requires a name and a number — anything less is not a lead, and mailing
  // the firm a fragment they cannot act on just trains them to ignore the
  // inbox.
  if (!input.name?.trim() || !input.phone?.trim()) return;

  try {
    const body = new URLSearchParams(buildSubmission(input, lang));
    navigator.sendBeacon(
      WEB3FORMS_ENDPOINT,
      new Blob([body.toString()], {
        type: "application/x-www-form-urlencoded",
      })
    );
  } catch {
    /* Nothing further to try — the visitor is already gone. */
  }
}
