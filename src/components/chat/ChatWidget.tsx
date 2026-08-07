"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { firm } from "@/lib/site";
import { DISCLAIMER, OPENERS } from "@/lib/chat/kb";
import type { Reply } from "@/lib/chat/engine";

const EASE = [0.16, 1, 0.3, 1] as const;

type Msg = {
  id: number;
  role: "bot" | "user";
  text: string;
  link?: Reply["link"];
  chips?: string[];
};

let uid = 0;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed the conversation the first time it opens.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: uid++,
          role: "bot",
          text: `Hi — I'm the ${firm.shortName} assistant. I can tell you about the firm, our practice areas, the office, and how to get a free consultation.`,
          chips: OPENERS,
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // A single, polite nudge after the visitor has had time to look around.
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 9000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((m) => [...m, { id: uid++, role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    let reply: Reply;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      reply = await res.json();
    } catch {
      reply = {
        text: `I couldn't reach the server just then. You can always call ${firm.phone}.`,
      };
    }

    // A beat of "thinking" — instant replies read as canned.
    const delay = Math.min(400 + reply.text.length * 6, 1400);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: uid++, role: "bot", text: reply.text, link: reply.link, chips: reply.chips },
      ]);
    }, delay);
  }

  return (
    <>
      {/* ── Launcher ──────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-[85] flex items-center gap-3 md:bottom-7 md:right-7">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              initial={{ opacity: 0, x: 12, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={() => setOpen(true)}
              className="hidden max-w-[15rem] border border-paper-edge bg-paper px-4 py-3 text-left text-[0.78rem] leading-snug text-ink-800 shadow-[0_8px_30px_rgba(4,16,31,0.12)] sm:block"
            >
              Questions about your situation?{" "}
              <span className="text-gold-700">Ask here →</span>
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat assistant"}
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
            aria-label="Firm assistant"
            className="fixed inset-0 z-[86] flex flex-col bg-paper sm:inset-auto sm:bottom-24 sm:right-7 sm:h-[min(34rem,calc(100vh-9rem))] sm:w-[24rem] sm:border sm:border-paper-edge sm:shadow-[0_24px_70px_rgba(4,16,31,0.24)]"
          >
            {/* Header */}
            <div className="grain relative flex items-center justify-between bg-ink-950 px-5 py-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-light.png"
                  alt=""
                  aria-hidden
                  width={946}
                  height={484}
                  sizes="90px"
                  className="h-auto w-[4.5rem] shrink-0"
                />
                <div>
                  <p className="text-[0.82rem] font-medium leading-tight text-paper">
                    Firm Assistant
                  </p>
                  <p className="flex items-center gap-1.5 text-[0.68rem] leading-tight text-ink-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Automated · replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 text-ink-300 transition-colors hover:text-paper"
              >
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 2l14 14M16 2L2 16" />
                </svg>
              </button>
            </div>

            {/* Disclaimer strip — always visible, never dismissible */}
            <p className="border-b border-gold-200 bg-gold-100 px-5 py-2.5 text-[0.68rem] leading-relaxed text-ink-700">
              {DISCLAIMER}
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
                  placeholder="Ask about the firm…"
                  aria-label="Type your question"
                  className="flex-1 bg-transparent px-2 py-2.5 text-[0.85rem] text-ink-900 outline-none placeholder:text-ink-300"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send"
                  className="flex h-9 w-9 items-center justify-center bg-gold-500 text-ink-950 transition-opacity disabled:opacity-30"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
                  </svg>
                </button>
              </div>
              <p className="px-2 pt-1.5 text-[0.65rem] text-ink-300">
                Don&apos;t share confidential details.{" "}
                <a href={firm.phoneHref} className="text-gold-700 underline underline-offset-2">
                  Call {firm.phone}
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
