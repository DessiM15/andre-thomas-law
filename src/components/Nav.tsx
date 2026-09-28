"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LangSwitch from "@/components/LangSwitch";
import NewTab from "@/components/NewTab";
import { content } from "@/lib/content";
import { firm } from "@/lib/firm";
import { path, type Lang } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Nav({ lang }: { lang: Lang }) {
  const c = content(lang);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const items = c.nav.map((item) => ({ ...item, href: path(item.key, lang) }));
  const home = path("home", lang);
  const contact = path("contact", lang);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // Only retract once well past the fold, and never mid-menu.
    setHidden(y > prev && y > 420 && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * The open menu is a modal: Escape closes it, Tab cycles through the
   * header and the overlay only (the page underneath is scroll-locked and
   * should be focus-locked too), and closing hands focus back to the button
   * that opened it.
   */
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false;
        toggleRef.current?.focus();
      }
      return;
    }
    wasOpen.current = true;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const scope = [headerRef.current, overlayRef.current].filter(Boolean) as HTMLElement[];
      const nodes = scope.flatMap((el) =>
        Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (n) => n.offsetParent !== null || n === document.activeElement
        )
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !active || !nodes.includes(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = !solid;

  return (
    <>
      <motion.header
        ref={headerRef}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${
          solid
            ? "border-b border-paper-edge bg-paper/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        {/* Scrim: keeps the reversed logo and links legible when the bar is
            transparent over a photograph, whatever that photograph does.
            Near-solid navy through the whole height of the bar, feathering
            out below it, so the links sit on ≥85% ink-950 and clear 4.5:1
            against even a white pixel underneath. */}
        {!solid && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[7.5rem] bg-gradient-to-b from-ink-950/95 via-ink-950/90 via-70% to-transparent md:h-[12rem]" />
        )}

        {/* Tall at the top so the wordmark is actually readable, condensing
            on scroll so it doesn't eat the viewport for the rest of the page. */}
        <div
          className={`container-x relative flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            solid ? "h-20 md:h-28" : "h-[6.5rem] md:h-[9.5rem]"
          }`}
        >
          {/* Mark */}
          <Link
            href={home}
            aria-label={`${firm.name} — ${c.ui.homeAria}`}
            className={`group relative block aspect-[1675/722] shrink-0 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              solid
                ? "w-[8rem] md:w-[9.5rem] lg:w-[8.25rem] xl:w-[10.5rem] 2xl:w-[11rem]"
                : "w-[10.5rem] md:w-[13rem] lg:w-[10rem] xl:w-[13rem] 2xl:w-[15.5rem]"
            }`}
          >
            {/* Both variants ship; opacity cross-fades them as the bar solidifies,
                so the mark never flashes the wrong colour mid-transition. */}
            <Image
              src="/logo-light.png"
              alt={c.ui.logoAlt}
              fill
              priority
              sizes="(max-width: 768px) 176px, 248px"
              className={`object-contain object-left transition-opacity duration-500 ${
                onDark ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/logo-dark.png"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 176px, 248px"
              className={`object-contain object-left transition-opacity duration-500 ${
                onDark ? "opacity-0" : "opacity-100"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <nav
            aria-label={c.ui.navAria}
            className="hidden items-center gap-3 lg:flex xl:gap-6 2xl:gap-8"
          >
            {items.slice(1).map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline whitespace-nowrap text-[0.8rem] font-medium tracking-wide transition-colors duration-500 ${
                    onDark
                      ? "text-paper hover:text-gold-400"
                      : "text-ink-800/75 hover:text-ink-900"
                  } ${active ? (onDark ? "!text-gold-500" : "!text-gold-800") : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={firm.phoneHref}
              className={`whitespace-nowrap text-[0.8rem] font-medium tabular-nums transition-colors duration-500 ${
                onDark ? "text-paper hover:text-gold-400" : "text-ink-800/75 hover:text-gold-800"
              }`}
            >
              {firm.phone}
            </a>

            {/* Language pill — small, permanent, on every page. */}
            <LangSwitch
              lang={lang}
              label={c.ui.switchLangLabel}
              ariaLabel={c.ui.switchLangAria}
              className={`link-underline shrink-0 whitespace-nowrap text-[0.8rem] font-medium tracking-wide transition-colors duration-500 ${
                onDark ? "text-gold-500 hover:text-gold-400" : "text-gold-800 hover:text-gold-700"
              }`}
            />

            <Link
              href={contact}
              className="group relative shrink-0 overflow-hidden whitespace-nowrap bg-gold-500 px-3.5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-950 transition-transform duration-300 hover:-translate-y-px xl:px-5"
            >
              <span className="relative z-10">{c.ui.freeConsultation}</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </Link>
          </nav>

          {/* Mobile: the language pill sits outside the menu, so a Spanish
              speaker never has to open an English menu to find it. */}
          <div className="flex items-center gap-1 lg:hidden">
            <LangSwitch
              lang={lang}
              label={c.ui.switchLangLabel}
              ariaLabel={c.ui.switchLangAria}
              className={`relative z-[80] shrink-0 whitespace-nowrap px-1 text-[0.8rem] font-medium tracking-wide transition-colors ${
                open || onDark ? "text-gold-500" : "text-gold-800"
              }`}
            />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? c.ui.closeMenu : c.ui.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-[80] flex h-10 w-10 items-center justify-center"
            >
              <span className="relative block h-3 w-6">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`absolute left-0 top-0 h-px w-6 ${
                    open || onDark ? "bg-paper" : "bg-ink-900"
                  }`}
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`absolute bottom-0 left-0 h-px w-6 ${
                    open || onDark ? "bg-paper" : "bg-ink-900"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-[75] flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label={c.ui.navAria} className="flex flex-col">
              {items.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.8, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex items-baseline gap-4 border-b border-ink-800/60 py-4 font-display text-[2.6rem] leading-tight text-paper"
                    >
                      <span aria-hidden className="eyebrow text-gold-500">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="space-y-5"
            >
              <Link
                href={contact}
                className="block bg-gold-500 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
              >
                {c.ui.freeConsultation}
              </Link>
              <div className="flex items-center justify-between">
                <a href={firm.phoneHref} className="font-display text-2xl text-paper">
                  {firm.phone}
                </a>
                <a
                  href={firm.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow text-ink-300"
                >
                  {c.ui.instagram}
                  <NewTab lang={lang} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
