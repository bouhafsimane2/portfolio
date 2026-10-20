"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ children, i, className = "" }: { children: React.ReactNode; i: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease, delay: 0.1 + i * 0.12 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex h-svh min-h-[560px] flex-col justify-center overflow-hidden pt-[calc(90px+env(safe-area-inset-top,0px))] pb-[calc(70px+env(safe-area-inset-bottom,0px))]"
    >
      <HeroScene />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-b from-transparent to-bg" />

      <motion.div style={{ y, opacity }} className="wrap">
        <h1 className="text-[clamp(2.1rem,min(10.5vw,6.2vh),3.4rem)] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-[clamp(2.3rem,min(6.6vw,8.6vh),6.2rem)]">
          <Line i={0}>From AI Models</Line>
          <Line i={1}>to Full-Stack Code,</Line>
          <Line i={2} className="mt-[0.06em] font-serif text-[0.8em] leading-none font-normal tracking-[-0.02em] italic">
            <span className="text-ink2">elevated by</span> <span className="text-neon">Avant-Garde Design.</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.45 }}
          className="mt-[clamp(14px,2.6vh,28px)] max-w-[46ch] text-[clamp(1rem,1.3vw,1.12rem)] text-ink2"
        >
          I turn raw data and real-world problems into solutions: reliable models, then clear, enjoyable web products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.55 }}
          className="mt-[clamp(16px,3vh,30px)] flex flex-wrap gap-3"
        >
          <ButtonLink href="#flagship" onClick={go("#flagship")}>
            See the flagship project
          </ButtonLink>
          <ButtonLink href="#about" onClick={go("#about")} variant="ghost" arrow={false}>
            About me
          </ButtonLink>
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="absolute right-[clamp(16px,4vw,40px)] bottom-10 hidden flex-col items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-ink3 [writing-mode:vertical-rl] md:flex"
      >
        SCROLL
        <motion.span
          className="block h-[60px] w-px origin-top bg-gradient-to-b from-ink3 to-transparent"
          animate={{ scaleY: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
