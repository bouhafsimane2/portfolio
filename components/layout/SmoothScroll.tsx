"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";

type ScrollApi = {
  scrollTo: (target: string) => void;
  lock: () => void;
  unlock: () => void;
};

const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {}, lock: () => {}, unlock: () => {} });
export const useSmoothScroll = () => useContext(ScrollContext);

/* Défilement inertiel (Lenis) + MotionConfig qui respecte "réduire les animations". */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((selector: string) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: selector === "#top" ? 0 : -20 });
    else el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const lock = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlock = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.style.overflow = "";
  }, []);

  const api = useMemo(() => ({ scrollTo, lock, unlock }), [scrollTo, lock, unlock]);

  return (
    <ScrollContext.Provider value={api}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ScrollContext.Provider>
  );
}
