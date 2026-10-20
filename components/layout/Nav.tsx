"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
import { useSmoothScroll } from "./SmoothScroll";

export function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Section active : celle qui traverse le milieu de l'écran
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const hero = document.getElementById("hero");
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-[clamp(12px,3vw,28px)] pt-[calc(env(safe-area-inset-top,0px)+14px)]"
    >
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-[1240px] items-center justify-between gap-5 rounded-full border border-line bg-[rgba(12,17,28,.55)] py-2.5 pr-2.5 pl-[22px] backdrop-blur-xl backdrop-saturate-150"
      >
        <a
          href="#top"
          onClick={go("#top")}
          className="text-[19px] font-extrabold tracking-[-0.03em] whitespace-nowrap text-steel transition-colors hover:text-ink"
        >
          {profile.name}
        </a>

        {/* Desktop */}
        <ul className="hidden gap-1 lg:flex">
          {navLinks.map((l, i) => {
            const on = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(`#${l.id}`)}
                  aria-current={on ? "true" : undefined}
                  className={`relative isolate block rounded-full px-3.5 py-2 text-sm transition-colors ${on ? "text-ink" : "text-ink2 hover:text-ink"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`mr-1.5 font-mono text-[11px] ${on ? "text-neon" : "text-ink3"}`}>
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid size-[42px] place-items-center rounded-full bg-white/[0.06] lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "m"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-x-0 top-[calc(100%+8px)] flex flex-col rounded-3xl border border-line bg-[rgba(12,17,28,.94)] p-2.5 backdrop-blur-xl lg:hidden"
            >
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(`#${l.id}`)}
                    className={`block rounded-2xl px-4 py-3.5 text-base ${active === l.id ? "bg-white/[0.06] text-ink" : "text-ink2"}`}
                  >
                    <span className={`mr-2 font-mono text-[11px] ${active === l.id ? "text-neon" : "text-ink3"}`}>
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
