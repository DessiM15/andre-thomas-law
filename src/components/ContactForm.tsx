"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { DEFAULT_STATE, todayISO, US_STATES } from "@/lib/incident";
import type { Lang } from "@/lib/i18n";
import { sendLead, type LeadInput } from "@/lib/lead";

type Tone = "light" | "dark";

/**
 * No `outline-none` anywhere here. The site-wide `:focus-visible` ring in
 * globals.css is the keyboard focus indicator for every field, and the
 * underline colour change on `:focus` is a second, softer cue for the mouse.
 */
const field = (tone: Tone) =>
  `peer w-full border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] transition-colors duration-300 ${
    tone === "dark"
      ? "border-ink-200/25 text-paper placeholder:text-transparent focus:border-gold-500"
      : "border-paper-edge text-ink-900 placeholder:text-transparent focus:border-gold-600"
  }`;

const select = (tone: Tone) =>
  `w-full appearance-none border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] transition-colors duration-300 ${
    tone === "dark"
      ? "border-ink-200/25 text-paper focus:border-gold-500 [&>option]:bg-ink-900"
      : "border-paper-edge text-ink-900 focus:border-gold-600"
  }`;

/**
 * The native date control, wearing the same underline as everything else.
 * `color-scheme` is the part that matters on the dark form: without it the
 * browser paints its own calendar icon near-black on a near-black field.
 */
const dateField = (tone: Tone) =>
  `w-full border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] transition-colors duration-300 ${
    tone === "dark"
      ? "border-ink-200/25 text-paper focus:border-gold-500 [color-scheme:dark]"
      : "border-paper-edge text-ink-900 focus:border-gold-600"
  }`;

const label = (tone: Tone) =>
  `pointer-events-none absolute left-0 top-3 origin-left text-[0.95rem] transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.78] ${
    tone === "dark"
      ? "text-ink-300 peer-focus:text-gold-500"
      : "text-ink-800/70 peer-focus:text-gold-800"
  }`;

/** Error text: 6.2:1 on paper, 6.9:1 on ink-950. red-500 was 3.6:1 at 12px. */
const errorText = (tone: Tone) =>
  `mt-2 text-xs ${tone === "dark" ? "text-red-300" : "text-red-700"}`;

/** The order the fields appear in, so focus lands on the *first* error. */
const FIELD_ORDER = ["name", "phone", "email", "incidentDate", "city", "state", "message"] as const;

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
  const formRef = useRef<HTMLFormElement>(null);

  // The dark copy of this form sits on every inner page and the light one on
  // /contact; a page can only ever hold one, but the ids are namespaced
  // regardless so that never has to be remembered.
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const errId = (name: string) => `${uid}-${name}-error`;
  const describedBy = (name: string) => (errors[name] ? errId(name) : undefined);
  const invalid = (name: string) => (errors[name] ? true : undefined);

  // Set after mount rather than at render: the server's idea of "today" is not
  // the visitor's, and an attribute that differs between the two is a
  // hydration mismatch. The submit path re-checks the date regardless.
  const [maxDate, setMaxDate] = useState("");
  useEffect(() => setMaxDate(todayISO()), []);

  // After a failed submit, focus the first field that has an error so a
  // keyboard or screen reader user is taken straight to what needs fixing.
  useEffect(() => {
    if (status !== "error") return;
    const first = FIELD_ORDER.find((name) => errors[name]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, errors]);

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
  const groupLabel = `eyebrow mb-3 block ${dark ? "text-ink-300" : "text-ink-800/70"}`;

  const fieldErrors = FIELD_ORDER.filter((name) => errors[name]);

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        className={`border p-10 ${dark ? "border-gold-500/30 bg-ink-900" : "border-gold-200 bg-gold-100"}`}
      >
        <p className="font-display text-3xl leading-snug text-gold-600">{t.doneTitle}</p>
        <p className={`mt-4 leading-relaxed ${dark ? "text-ink-200" : "text-ink-800/80"}`}>
          {t.doneBody[0]}{" "}
          <a
            href={firm.phoneHref}
            className={`font-medium underline underline-offset-4 ${dark ? "text-gold-400" : "text-gold-800"}`}
          >
            {firm.phone}
          </a>{" "}
          {t.doneBody[1]}
        </p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-9">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      {/* Required is said in words, once, before the first field — the
          asterisks in the labels are the shorthand for it. */}
      <p className={`text-xs ${dark ? "text-ink-300" : "text-ink-800/70"}`}>{t.requiredNote}</p>

      <div className="grid gap-9 sm:grid-cols-2">
        <div className="relative">
          <input
            id={id("name")} name="name" type="text" required placeholder=" "
            autoComplete="name" className={field(tone)}
            aria-invalid={invalid("name")} aria-describedby={describedBy("name")}
          />
          <label htmlFor={id("name")} className={label(tone)}>{t.name}</label>
          {errors.name && <p id={errId("name")} className={errorText(tone)}>{errors.name}</p>}
        </div>

        <div className="relative">
          <input
            id={id("phone")} name="phone" type="tel" required placeholder=" "
            autoComplete="tel" className={field(tone)}
            aria-invalid={invalid("phone")} aria-describedby={describedBy("phone")}
          />
          <label htmlFor={id("phone")} className={label(tone)}>{t.phone}</label>
          {errors.phone && <p id={errId("phone")} className={errorText(tone)}>{errors.phone}</p>}
        </div>
      </div>

      <div className="relative">
        <input
          id={id("email")} name="email" type="email" required placeholder=" "
          autoComplete="email" className={field(tone)}
          aria-invalid={invalid("email")} aria-describedby={describedBy("email")}
        />
        <label htmlFor={id("email")} className={label(tone)}>{t.email}</label>
        {errors.email && <p id={errId("email")} className={errorText(tone)}>{errors.email}</p>}
      </div>

      <div className="relative">
        <label htmlFor={id("matter")} className={groupLabel}>
          {t.matter}
        </label>
        <select id={id("matter")} name="matter" defaultValue="" className={select(tone)}>
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
          <label htmlFor={id("incidentDate")} className={groupLabel}>
            {q.date}
          </label>
          <input
            id={id("incidentDate")}
            name="incidentDate"
            type="date"
            required
            max={maxDate || undefined}
            className={dateField(tone)}
            aria-invalid={invalid("incidentDate")}
            aria-describedby={describedBy("incidentDate")}
          />
          {errors.incidentDate && (
            <p id={errId("incidentDate")} className={errorText(tone)}>{errors.incidentDate}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor={id("doctor")} className={groupLabel}>
            {q.doctor}
          </label>
          <select id={id("doctor")} name="doctor" defaultValue="" className={select(tone)}>
            <option value="">{q.doctorPlaceholder}</option>
            {q.doctorOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Where it happened. Grouped under one heading because the city and the
          state are one answer, and a fieldset is what says so to a screen
          reader as well as to the eye. */}
      <fieldset>
        <legend className={groupLabel}>{q.where}</legend>
        <div className="grid gap-9 sm:grid-cols-2">
          <div className="relative">
            <input
              id={id("city")} name="city" type="text" required placeholder=" "
              autoComplete="address-level2" className={field(tone)}
              aria-invalid={invalid("city")} aria-describedby={describedBy("city")}
            />
            <label htmlFor={id("city")} className={label(tone)}>{q.city}</label>
            {errors.city && <p id={errId("city")} className={errorText(tone)}>{errors.city}</p>}
          </div>

          <div className="relative">
            <label htmlFor={id("state")} className="sr-only">{q.state}</label>
            <select
              id={id("state")}
              name="state"
              defaultValue={DEFAULT_STATE}
              autoComplete="address-level1"
              required
              className={select(tone)}
              aria-invalid={invalid("state")}
              aria-describedby={describedBy("state")}
            >
              <option value="">{q.statePlaceholder}</option>
              {US_STATES.map((st) => (
                <option key={st.code} value={st.code}>{st.name}</option>
              ))}
            </select>
            {errors.state && <p id={errId("state")} className={errorText(tone)}>{errors.state}</p>}
          </div>
        </div>
      </fieldset>

      <div className="relative">
        <textarea
          id={id("message")} name="message" rows={4} placeholder=" "
          className={`${field(tone)} resize-none`}
          aria-invalid={invalid("message")} aria-describedby={describedBy("message")}
        />
        <label htmlFor={id("message")} className={label(tone)}>{t.message}</label>
        {errors.message && <p id={errId("message")} className={errorText(tone)}>{errors.message}</p>}
      </div>

      {/* Announced the moment a submit fails: either the server-side message,
          or a one-line summary before focus moves to the first bad field. */}
      <AnimatePresence>
        {(errors.form || fieldErrors.length > 0) && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            role="alert"
            className={`text-sm ${dark ? "text-red-300" : "text-red-700"}`}
          >
            {errors.form ?? t.errorSummary}
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
        <p className={`text-xs leading-relaxed ${dark ? "text-ink-300" : "text-ink-800/70"}`}>
          {t.footnote}
        </p>
      </div>
    </form>
  );
}
