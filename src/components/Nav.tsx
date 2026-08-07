"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { firm, nav } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

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

  const onDark = !solid;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${
          solid
            ? "border-b border-paper-edge bg-paper/90 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        {/* Scrim: keeps the reversed logo and links legible when the bar is
            transparent over a photograph, whatever that photograph does. */}
        {!solid && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/65 to-transparent" />
        )}

        <div className="container-x relative flex h-[68px] items-center justify-between md:h-20">
          {/* Mark */}
          <Link
            href="/"
            aria-label={`${firm.name} — home`}
            className="group relative block h-9 w-[9.5rem] shrink-0 md:h-11 md:w-[11.5rem]"
          >
            {/* Both variants ship; opacity cross-fades them as the bar solidifies,
                so the mark never flashes the wrong colour mid-transition. */}
            <Image
              src="/logo-light.png"
              alt={firm.name}
              fill
              priority
              sizes="200px"
              className={`object-contain object-left transition-opacity duration-500 ${
                onDark ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/logo-dark.png"
              alt=""
              aria-hidden
              fill
              sizes="200px"
              className={`object-contain object-left transition-opacity duration-500 ${
                onDark ? "opacity-0" : "opacity-100"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 md:flex">
            {nav.slice(1).map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline text-[0.8rem] font-medium tracking-wide transition-colors duration-500 ${
                    onDark
                      ? "text-paper/85 hover:text-paper"
                      : "text-ink-800/75 hover:text-ink-900"
                  } ${active ? "!text-gold-600" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={firm.phoneHref}
              className={`text-[0.8rem] font-medium tabular-nums transition-colors duration-500 ${
                onDark ? "text-paper/85 hover:text-gold-400" : "text-ink-800/75 hover:text-gold-700"
              }`}
            >
              {firm.phone}
            </a>
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-gold-500 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-950 transition-transform duration-300 hover:-translate-y-px"
            >
              <span className="relative z-10">Free Consultation</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-200 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </Link>
          </nav>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[80] flex h-10 w-10 items-center justify-center md:hidden"
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
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-[75] flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.8, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 border-b border-ink-800/60 py-4 font-display text-[2.6rem] leading-tight text-paper"
                    >
                      <span className="eyebrow text-gold-500">
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
                href="/contact"
                className="block bg-gold-500 py-4 text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-950"
              >
                Free Consultation
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
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
