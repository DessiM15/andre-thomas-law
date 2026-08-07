"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { firm, practiceAreas } from "@/lib/site";

type Tone = "light" | "dark";

const field = (tone: Tone) =>
  `peer w-full border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] outline-none transition-colors duration-300 ${
    tone === "dark"
      ? "border-ink-200/25 text-paper placeholder:text-transparent focus:border-gold-500"
      : "border-paper-edge text-ink-900 placeholder:text-transparent focus:border-gold-600"
  }`;

const label = (tone: Tone) =>
  `pointer-events-none absolute left-0 top-3 origin-left text-[0.95rem] transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.78] ${
    tone === "dark"
      ? "text-ink-300 peer-focus:text-gold-500"
      : "text-ink-800/55 peer-focus:text-gold-700"
  }`;

export default function ContactForm({ tone = "light" }: { tone?: Tone }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? { form: "Please check your details." });
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrors({ form: `Couldn't send. Please call ${firm.phone}.` });
      setStatus("error");
    }
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
        <p className="font-display text-3xl leading-snug text-gold-600">
          Message received.
        </p>
        <p className={`mt-4 leading-relaxed ${dark ? "text-ink-200" : "text-ink-800/80"}`}>
          Someone from the firm will follow up shortly. If it&apos;s urgent,
          calling{" "}
          <a href={firm.phoneHref} className="font-medium text-gold-700 underline underline-offset-4">
            {firm.phone}
          </a>{" "}
          is always faster.
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
          <label htmlFor="name" className={label(tone)}>Name *</label>
          {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="relative">
          <input
            id="phone" name="phone" type="tel" required placeholder=" "
            autoComplete="tel" className={field(tone)}
          />
          <label htmlFor="phone" className={label(tone)}>Phone *</label>
          {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="relative">
        <input
          id="email" name="email" type="email" required placeholder=" "
          autoComplete="email" className={field(tone)}
        />
        <label htmlFor="email" className={label(tone)}>Email *</label>
        {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="relative">
        <label
          htmlFor="matter"
          className={`eyebrow mb-3 block ${dark ? "text-ink-300" : "text-ink-800/55"}`}
        >
          What happened?
        </label>
        <select
          id="matter" name="matter" defaultValue=""
          className={`w-full appearance-none border-0 border-b bg-transparent px-0 py-3 text-[0.98rem] outline-none transition-colors duration-300 ${
            dark
              ? "border-ink-200/25 text-paper focus:border-gold-500 [&>option]:bg-ink-900"
              : "border-paper-edge text-ink-900 focus:border-gold-600"
          }`}
        >
          <option value="">Select a practice area (optional)</option>
          {practiceAreas.map((a) => (
            <option key={a.slug} value={a.name}>{a.name}</option>
          ))}
          <option value="Criminal Defense">Criminal Defense</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div className="relative">
        <textarea
          id="message" name="message" rows={4} placeholder=" "
          className={`${field(tone)} resize-none`}
        />
        <label htmlFor="message" className={label(tone)}>
          Tell us briefly what happened (optional)
        </label>
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
            {status === "sending" ? "Sending…" : "Send Message"}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
        </button>
        <p className={`text-xs leading-relaxed ${dark ? "text-ink-300" : "text-ink-800/55"}`}>
          Free consultation. Submitting this form does not create an
          attorney–client relationship.
        </p>
      </div>
    </form>
  );
}
