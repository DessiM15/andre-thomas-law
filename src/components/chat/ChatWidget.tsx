"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getBundle } from "@/lib/chat/kb";
import type { Reply } from "@/lib/chat/engine";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import type { Lang } from "@/lib/i18n";
import { beaconLead, sendLead } from "@/lib/lead";

const EASE = [0.16, 1, 0.3, 1] as const;

type Msg = {
  id: number;
  role: "bot" | "user";
  text: string;
  link?: Reply["link"];
  chips?: string[];
};

const NUDGE_KEY = "atl-chat-nudge";

/**
 * The callback-capture flow. `idle` is ordinary Q&A; everything between
 * `offered` and `sending` means the next thing the visitor types is an
 * answer to a question the widget asked, not a question for the widget.
 */
type LeadStep =
  | "idle"
  | "offered"
  | "name"
  | "phone"
  | "when"
  | "doctor"
  | "email"
  | "sending"
  | "closed";

/** Contact details come before the screening questions on purpose: if the
 *  visitor drops out halfway, a name and a number is still a lead, and an
 *  answer about treatment without one is nothing. */
const CAPTURE_STEPS: LeadStep[] = ["name", "phone", "when", "doctor", "email"];

/** How long a half-finished capture sits before it is sent anyway. */
const ABANDON_MS = 90_000;

/** Ask only after the visitor has actually engaged. Opening with "what's your
 *  number?" reads as a bot demanding payment before it will help. */
const OFFER_AFTER_TURNS = 3;

let uid = 0;

export default function ChatWidget({ lang }: { lang: Lang }) {
  const c = content(lang);
  const chat = c.ui.chat;
  const bundle = getBundle(lang);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const nudged = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Refs rather than state: `send` reads these from inside async callbacks,
  // where a state value captured at render time would be a turn stale.
  const step = useRef<LeadStep>("idle");
  const lead = useRef({ name: "", phone: "", email: "", when: "", doctor: "" });
  const turns = useRef(0);
  /** Set the moment anything is sent, so a partial can never double up. */
  const sent = useRef(false);
  const abandonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Seed the conversation the first time it opens.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: uid++,
          role: "bot",
          text: chat.greeting,
          chips: bundle.openers,
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [open, messages.length, chat.greeting, bundle.openers]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  /**
   * A single, polite nudge — but never over the hero's own call to action.
   * The bubble sits bottom-right, which is exactly where the "Call" button
   * lands on a short viewport, and a widget that covers the phone number
   * costs more calls than it wins. So it waits until the visitor has
   * scrolled past the first screen, then leaves on its own.
   */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {
      return;
    }

    let hideTimer: ReturnType<typeof setTimeout>;
    const pastFold = () => window.scrollY > window.innerHeight * 0.9;

    const show = () => {
      if (nudged.current || !pastFold()) return;
      nudged.current = true;
      window.removeEventListener("scroll", show);
      setNudge(true);
      // Spend the session's one nudge here, not on dismissal — otherwise it
      // retreats politely and then reappears on every subsequent page.
      try {
        sessionStorage.setItem(NUDGE_KEY, "1");
      } catch {
        /* nothing to remember it with */
      }
      hideTimer = setTimeout(() => setNudge(false), 12000);
    };

    const armed = setTimeout(() => {
      show();
      if (!nudged.current) window.addEventListener("scroll", show, { passive: true });
    }, 6000);

    return () => {
      clearTimeout(armed);
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", show);
    };
  }, []);

  /** Once waved off, stay waved off for the rest of the session. */
  const dismissNudge = () => {
    setNudge(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      /* nothing to remember it with */
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * Closing the tab mid-capture should not throw the lead away. `pagehide`
   * rather than `beforeunload`: it fires on mobile Safari's back-forward
   * cache path, which `beforeunload` does not, and that is most of this
   * audience.
   */
  useEffect(() => {
    const flush = () => sendPartial();
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
    return () => {
      window.removeEventListener("pagehide", flush);
      if (abandonTimer.current) clearTimeout(abandonTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const botSay = (text: string, chips?: string[]) =>
    setMessages((m) => [...m, { id: uid++, role: "bot", text, chips }]);

  /**
   * Send what we have when someone walks away mid-capture.
   *
   * Uses sendBeacon because a normal fetch is cancelled the moment the tab
   * goes; a beacon is handed to the browser to deliver on its own. Requires
   * a name and a number — anything less is not a lead, and mailing the firm
   * a fragment they cannot act on just trains them to ignore the inbox.
   */
  const sendPartial = () => {
    if (sent.current) return;
    if (!lead.current.name || !lead.current.phone) return;
    if (!CAPTURE_STEPS.includes(step.current)) return;
    sent.current = true;

    beaconLead(
      { ...lead.current, source: "chat", matter: "Chat enquiry", partial: true },
      lang
    );
  };

  /** Restart the abandonment clock after every answer they give. */
  const touch = () => {
    if (abandonTimer.current) clearTimeout(abandonTimer.current);
    abandonTimer.current = setTimeout(sendPartial, ABANDON_MS);
  };

  /** Deliver the captured lead through the same endpoint the web form uses,
   *  so there is one pipeline, one validation path, and one inbox format. */
  async function submitLead() {
    step.current = "sending";
    sent.current = true;
    if (abandonTimer.current) clearTimeout(abandonTimer.current);
    botSay(chat.lead.sending);
    const result = await sendLead(
      { ...lead.current, source: "chat", matter: "Chat enquiry" },
      lang
    );
    botSay(result.ok ? chat.lead.done : chat.lead.failed);
    step.current = "closed";
  }

  /** One turn of the capture flow. Returns false if the visitor said
   *  something that isn't an answer, so the caller can treat it as a
   *  question instead — nobody should get trapped in a form. */
  function handleLeadReply(text: string): boolean {
    const L = chat.lead;
    const Q = c.ui.qualify;
    /** Screening answers arrive as labels from a chip; store the stable key. */
    const keyFor = (opts: { key: string; label: string }[], v: string) =>
      opts.find((o) => o.label === v)?.key ?? "";

    switch (step.current) {
      case "offered":
        if (text === L.offerYes) {
          step.current = "name";
          touch();
          botSay(L.askName);
          return true;
        }
        if (text === L.offerNo) {
          step.current = "closed";
          botSay(L.declined);
          return true;
        }
        // They ignored the offer and asked something else. Drop it and answer.
        step.current = "idle";
        return false;

      case "name":
        if (text.length < 2) {
          botSay(L.badName);
          return true;
        }
        lead.current.name = text;
        step.current = "phone";
        touch();
        botSay(L.askPhone);
        return true;

      case "phone":
        if (text.replace(/\D/g, "").length < 10) {
          botSay(L.badPhone);
          return true;
        }
        lead.current.phone = text;
        step.current = "when";
        touch();
        botSay(
          L.askWhen,
          Q.whenOptions.map((o) => o.label)
        );
        return true;

      case "when":
        lead.current.when = keyFor(Q.whenOptions, text);
        step.current = "doctor";
        touch();
        botSay(
          L.askDoctor,
          Q.doctorOptions.map((o) => o.label)
        );
        return true;

      case "doctor":
        lead.current.doctor = keyFor(Q.doctorOptions, text);
        step.current = "email";
        touch();
        botSay(L.askEmail, [L.skip]);
        return true;

      case "email":
        if (text === L.skip) {
          lead.current.email = "";
          void submitLead();
          return true;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) {
          botSay(L.badEmail);
          return true;
        }
        lead.current.email = text;
        void submitLead();
        return true;

      default:
        return false;
    }
  }

  /** Ordinary question and answer, against the knowledge base. */
  async function ask(trimmed: string) {
    setTyping(true);

    let reply: Reply;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, lang }),
      });
      reply = await res.json();
    } catch {
      reply = { text: `${chat.unreachable} ${firm.phone}.` };
    }

    turns.current += 1;

    // Three moments are worth offering at, in descending order of strength:
    //
    //   hot     — they described being hurt, or asked to be represented.
    //             Waiting three turns on someone who opened with "I got hit
    //             and need an attorney" is leaving the lead on the floor.
    //   advice  — they asked something only an attorney can answer, and the
    //             bot has just said it cannot. The most honest moment to
    //             offer a person instead.
    //   turns   — no strong signal, but they're clearly engaged.
    const hot = reply.intent === "hot";
    const offer =
      step.current === "idle" &&
      (hot || reply.guarded === "advice" || turns.current >= OFFER_AFTER_TURNS);

    // A beat of "thinking" — instant replies read as canned.
    const delay = Math.min(400 + reply.text.length * 6, 1400);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: uid++, role: "bot", text: reply.text, link: reply.link, chips: reply.chips },
      ]);
      if (offer) {
        // Hot intent skips the "shall I?" entirely. Someone who just said
        // they were hurt and want an attorney has already answered it, and
        // making them confirm is a step to drop out on. A visitor who only
        // asked a question still gets the choice.
        if (hot) {
          step.current = "name";
          setTimeout(() => {
            touch();
            botSay(chat.lead.hotOpener);
          }, 650);
        } else {
          step.current = "offered";
          setTimeout(
            () => botSay(chat.lead.offer, [chat.lead.offerYes, chat.lead.offerNo]),
            650
          );
        }
      }
    }, delay);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing || step.current === "sending") return;

    setMessages((m) => [...m, { id: uid++, role: "user", text: trimmed }]);
    setInput("");

    if (step.current !== "idle" && step.current !== "closed") {
      if (handleLeadReply(trimmed)) return;
    }

    void ask(trimmed);
  }

  return (
    <>
      {/* ── Launcher ──────────────────────────────────────────── */}
      <div className="fixed bottom-[calc(1.25rem+var(--atl-banner-h,0px))] right-5 z-[85] flex items-center gap-3 transition-[bottom] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:bottom-[calc(1.75rem+var(--atl-banner-h,0px))] md:right-7">
        <AnimatePresence>
          {nudge && !open && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative hidden max-w-[15rem] border border-paper-edge bg-paper shadow-[0_8px_30px_rgba(4,16,31,0.12)] sm:block"
            >
              <button
                onClick={() => {
                  dismissNudge();
                  setOpen(true);
                }}
                className="block px-4 py-3 pr-8 text-left text-[0.78rem] leading-snug text-ink-800"
              >
                {chat.nudge}{" "}
                <span className="text-gold-700">{chat.nudgeCta}</span>
              </button>
              <button
                onClick={dismissNudge}
                aria-label={chat.nudgeDismiss}
                className="absolute right-1.5 top-1.5 p-1 text-ink-300 transition-colors hover:text-ink-800"
              >
                <svg width="9" height="9" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M2 2l14 14M16 2L2 16" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? chat.close : chat.open}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-[0_10px_34px_rgba(4,16,31,0.28)] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-25 [animation-duration:3s]" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                width="18" height="18" viewBox="0 0 18 18" fill="none"
                stroke="currentColor" strokeWidth="1.6"
              >
                <path d="M2 2l14 14M16 2L2 16" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-4.6A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            role="dialog"
            aria-label={chat.dialogAria}
            className="fixed inset-0 z-[86] flex flex-col bg-paper sm:inset-auto sm:bottom-[calc(6rem+var(--atl-banner-h,0px))] sm:right-7 sm:h-[min(34rem,calc(100vh-9rem-var(--atl-banner-h,0px)))] sm:w-[24rem] sm:border sm:border-paper-edge sm:shadow-[0_24px_70px_rgba(4,16,31,0.24)]"
          >
            {/* Header */}
            <div className="grain relative flex items-center justify-between bg-ink-950 px-5 py-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-light.png"
                  alt=""
                  aria-hidden
                  width={1699}
                  height={870}
                  sizes="104px"
                  className="h-auto w-[6.5rem] shrink-0"
                />
                <div>
                  <p className="text-[0.82rem] font-medium leading-tight text-paper">
                    {chat.title}
                  </p>
                  <p className="flex items-center gap-1.5 text-[0.68rem] leading-tight text-ink-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {chat.status}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={chat.close}
                className="p-1.5 text-ink-300 transition-colors hover:text-paper"
              >
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 2l14 14M16 2L2 16" />
                </svg>
              </button>
            </div>

            {/* Disclaimer strip — always visible, never dismissible */}
            <p className="border-b border-gold-200 bg-gold-100 px-5 py-2.5 text-[0.68rem] leading-relaxed text-ink-700">
              {bundle.disclaimer}
            </p>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m) => (
                <div key={m.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={m.role === "user" ? "flex justify-end" : ""}
                  >
                    <div
                      className={`max-w-[88%] px-4 py-3 text-[0.85rem] leading-relaxed ${
                        m.role === "user"
                          ? "bg-ink-900 text-paper"
                          : "border border-paper-edge bg-white text-ink-800"
                      }`}
                    >
                      {m.text}
                      {m.link && (
                        m.link.href.startsWith("http") ? (
                          <a
                            href={m.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block font-medium text-gold-700 underline underline-offset-4"
                          >
                            {m.link.label} ↗
                          </a>
                        ) : (
                          <Link
                            href={m.link.href}
                            onClick={() => setOpen(false)}
                            className="mt-3 block font-medium text-gold-700 underline underline-offset-4"
                          >
                            {m.link.label} →
                          </Link>
                        )
                      )}
                    </div>
                  </motion.div>

                  {m.chips && m.chips.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          onClick={() => send(c)}
                          className="border border-ink-200 px-3 py-1.5 text-[0.72rem] text-ink-700 transition-colors hover:border-gold-500 hover:bg-gold-100"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-1.5 border border-paper-edge bg-white px-4 py-4 w-fit">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-ink-300"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-paper-edge bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder={chat.placeholder}
                  aria-label={chat.inputAria}
                  className="flex-1 bg-transparent px-2 py-2.5 text-[0.85rem] text-ink-900 outline-none placeholder:text-ink-300"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label={chat.sendAria}
                  className="flex h-9 w-9 items-center justify-center bg-gold-500 text-ink-950 transition-opacity disabled:opacity-30"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
                  </svg>
                </button>
              </div>
              <p className="px-2 pt-1.5 text-[0.65rem] text-ink-300">
                {chat.confidential}{" "}
                <a href={firm.phoneHref} className="text-gold-700 underline underline-offset-2">
                  {c.ui.callPhone} {firm.phone}
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
