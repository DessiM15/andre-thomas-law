"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";
import { sendLead, type LeadInput } from "@/lib/lead";

type Tone = "light" | "dark";

const field = (tone: Tone) =>
  `peer w-full border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] outline-none transition-colors duration-300 ${
    tone === "dark"
      ? "border-ink-200/25 text-paper placeholder:text-transparent focus:border-gold-500"
      : "border-paper-edge text-ink-900 placeholder:text-transparent focus:border-gold-600"
  }`;

const select = (tone: Tone) =>
  `w-full appearance-none border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] outline-none transition-colors duration-300 ${
    tone === "dark"
      ? "border-ink-200/25 text-paper focus:border-gold-500 [&>option]:bg-ink-900"
      : "border-paper-edge text-ink-900 focus:border-gold-600"
  }`;

const label = (tone: Tone) =>
  `pointer-events-none absolute left-0 top-3 origin-left text-[0.95rem] transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.78] ${
    tone === "dark"
      ? "text-ink-300 peer-focus:text-gold-500"
      : "text-ink-800/55 peer-focus:text-gold-700"
  }`;

export default function ContactForm({
  lang,
  tone = "light",
}: {
  lang: Lang;
  tone?: Tone;
}) {
  const c = content(lang);
  const t = c.ui.form;
  const q = c.ui.qualify;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const input = Object.fromEntries(fd.entries()) as LeadInput;

    // The browser hands the lead to Web3Forms directly — their free plan
    // refuses server-side submissions, so there is no API route in between.
    const result = await sendLead(input, lang);
    if (!result.ok) {
      setErrors(result.errors ?? { form: t.checkDetails });
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  const dark = tone === "dark";

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`border p-10 ${dark ? "border-gold-500/30 bg-ink-900" : "border-gold-200 bg-gold-100"}`}
      >
        <p className="font-display text-3xl leading-snug text-gold-600">{t.doneTitle}</p>
        <p className={`mt-4 leading-relaxed ${dark ? "text-ink-200" : "text-ink-800/80"}`}>
          {t.doneBody[0]}{" "}
          <a href={firm.phoneHref} className="font-medium text-gold-700 underline underline-offset-4">
            {firm.phone}
          </a>{" "}
          {t.doneBody[1]}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-9 sm:grid-cols-2">
        <div className="relative">
          <input
            id="name" name="name" type="text" required placeholder=" "
            autoComplete="name" className={field(tone)}
          />
          <label htmlFor="name" className={label(tone)}>{t.name}</label>
          {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="relative">
          <input
            id="phone" name="phone" type="tel" required placeholder=" "
            autoComplete="tel" className={field(tone)}
          />
          <label htmlFor="phone" className={label(tone)}>{t.phone}</label>
          {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="relative">
        <input
          id="email" name="email" type="email" required placeholder=" "
          autoComplete="email" className={field(tone)}
        />
        <label htmlFor="email" className={label(tone)}>{t.email}</label>
        {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="relative">
        <label
          htmlFor="matter"
          className={`eyebrow mb-3 block ${dark ? "text-ink-300" : "text-ink-800/55"}`}
        >
          {t.matter}
        </label>
        <select id="matter" name="matter" defaultValue="" className={select(tone)}>
          <option value="">{t.matterPlaceholder}</option>
          {c.practiceAreas.map((a) => (
            <option key={a.key} value={a.name}>{a.name}</option>
          ))}
          <option value={t.criminalDefense}>{t.criminalDefense}</option>
          <option value={t.somethingElse}>{t.somethingElse}</option>
        </select>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <div className="relative">
          <label
            htmlFor="when"
            className={`eyebrow mb-3 block ${dark ? "text-ink-300" : "text-ink-800/55"}`}
          >
            {q.when}
          </label>
          <select id="when" name="when" defaultValue="" className={select(tone)}>
            <option value="">{q.whenPlaceholder}</option>
            {q.whenOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label
            htmlFor="doctor"
            className={`eyebrow mb-3 block ${dark ? "text-ink-300" : "text-ink-800/55"}`}
          >
            {q.doctor}
          </label>
          <select id="doctor" name="doctor" defaultValue="" className={select(tone)}>
            <option value="">{q.doctorPlaceholder}</option>
            {q.doctorOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message" name="message" rows={4} placeholder=" "
          className={`${field(tone)} resize-none`}
        />
        <label htmlFor="message" className={label(tone)}>{t.message}</label>
      </div>

      <AnimatePresence>
        {errors.form && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-sm text-red-500"
          >
            {errors.form}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:gap-8">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative shrink-0 self-start overflow-hidden whitespace-nowrap bg-gold-500 px-10 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950 transition-opacity disabled:opacity-60"
        >
          <span className="relative z-10">
            {status === "sending" ? t.sending : t.submit}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
        </button>
        <p className={`text-xs leading-relaxed ${dark ? "text-ink-300" : "text-ink-800/55"}`}>
          {t.footnote}
        </p>
      </div>
    </form>
  );
}
