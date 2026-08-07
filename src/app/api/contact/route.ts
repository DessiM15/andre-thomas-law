import { NextResponse } from "next/server";
import { firm } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Lead intake.
 *
 * ⚠️ DELIVERY IS NOT WIRED YET. Without RESEND_API_KEY set, a submission is
 * validated and logged to the server console and the visitor sees success —
 * nothing is emailed. Before this goes anywhere near real traffic, set:
 *
 *   RESEND_API_KEY=...        LEAD_TO=AT@andrethomaslaw.com
 *
 * and uncomment the delivery block below (or swap in whatever the firm
 * already uses — their current site posts to GoDaddy's handler).
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, email, matter, message, website } = data ?? {};

    // Honeypot — real people leave this hidden field empty.
    if (website) return NextResponse.json({ ok: true });

    const errors: Record<string, string> = {};
    if (!name?.trim() || name.trim().length < 2) errors.name = "Please enter your name.";
    if (!phone?.trim() || phone.replace(/\D/g, "").length < 10)
      errors.phone = "Please enter a valid phone number.";
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      errors.email = "Please enter a valid email address.";
    if (message && message.length > 4000) errors.message = "That message is too long.";

    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const lead = {
      receivedAt: new Date().toISOString(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      matter: matter ? String(matter) : "Not specified",
      message: message ? String(message).trim() : "",
    };

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM ?? "leads@andrethomaslaw.com",
          to: process.env.LEAD_TO ?? firm.email,
          reply_to: lead.email,
          subject: `New consultation request — ${lead.name}`,
          text: [
            `Name:    ${lead.name}`,
            `Phone:   ${lead.phone}`,
            `Email:   ${lead.email}`,
            `Matter:  ${lead.matter}`,
            ``,
            lead.message || "(no message)",
            ``,
            `Received ${lead.receivedAt}`,
          ].join("\n"),
        }),
      });
      return NextResponse.json({ ok: true });
    }

    console.info("[lead — NOT DELIVERED, no RESEND_API_KEY set]", lead);
    return NextResponse.json({ ok: true, demo: true });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Something went wrong. Please call us." } },
      { status: 500 }
    );
  }
}
