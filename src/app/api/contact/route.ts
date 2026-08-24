import { NextResponse } from "next/server";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { DEFAULT_LANG, isLang } from "@/lib/i18n";

export const runtime = "nodejs";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Lead intake — the web form and the chat widget both land here.
 *
 * Delivery goes through Web3Forms, which relays the submission to the firm's
 * inbox. The access key is server-side only: it never reaches the browser, so
 * it cannot be scraped from page source and used to spam the firm.
 *
 *   WEB3FORMS_ACCESS_KEY=...          (required — see .env.example)
 *   LEAD_TO=AT@andrethomaslaw.com     (optional; Web3Forms defaults to the
 *                                      address the key is registered to)
 *
 * If the key is missing this route FAILS LOUDLY. It used to log the lead to
 * the server console and return success, which meant a misconfigured deploy
 * silently ate every enquiry while telling the visitor "Message received."
 * For a firm that buys leads, that is the most expensive bug this file could
 * have. A visible error on the form is strictly better than a silent hole.
 */
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  const language = isLang(data?.lang) ? data.lang : DEFAULT_LANG;
  const t = content(language).ui.form;

  try {
    const { name, phone, email, matter, message, website, source } = data ?? {};

    // Honeypot — real people leave this hidden field empty.
    if (website) return NextResponse.json({ ok: true });

    // The chat collects name and phone only. Insisting on an email address
    // mid-conversation is where people abandon, and a phone number is what
    // the firm actually acts on. The web form still requires all three.
    const fromChat = source === "chat";

    const errors: Record<string, string> = {};
    if (!name?.trim() || name.trim().length < 2) errors.name = t.errName;
    if (!phone?.trim() || phone.replace(/\D/g, "").length < 10)
      errors.phone = t.errPhone;
    if (!fromChat || email?.trim()) {
      if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
        errors.email = t.errEmail;
    }
    if (message && message.length > 4000) errors.message = t.errLong;

    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const lead = {
      receivedAt: new Date().toISOString(),
      // Which language the lead came in through — the firm needs to know
      // whether to call this person back in Spanish.
      language,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : "",
      matter: matter ? String(matter) : "Not specified",
      message: message ? String(message).trim() : "",
    };

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error(
        "[lead] WEB3FORMS_ACCESS_KEY is not set — refusing to accept a lead " +
          "that cannot be delivered. Set it in the Vercel project settings."
      );
      return NextResponse.json(
        { ok: false, errors: { form: t.errServer } },
        { status: 500 }
      );
    }

    // Field names here become the labels in the email the firm receives, so
    // they read as a callback sheet rather than as a JSON dump.
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        ...(process.env.LEAD_TO ? { ccemail: process.env.LEAD_TO } : {}),
        from_name: `${firm.shortName} website`,
        subject: `${fromChat ? "Chat lead" : "Consultation request"} — ${lead.name}${
          language === "es" ? " (Spanish)" : ""
        }`,
        ...(lead.email ? { replyto: lead.email } : {}),
        Name: lead.name,
        Phone: lead.phone,
        Email: lead.email || "(not provided)",
        Matter: lead.matter,
        Language:
          language === "es" ? "Spanish — call back in Spanish" : "English",
        Source: fromChat ? "Website chat widget" : "Website contact form",
        Message: lead.message || "(no message)",
        Received: lead.receivedAt,
      }),
    });

    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.success) {
      console.error("[lead] Web3Forms rejected the submission", {
        status: res.status,
        result,
      });
      return NextResponse.json(
        { ok: false, errors: { form: t.errServer } },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: t.errServer } },
      { status: 500 }
    );
  }
}
