"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MiniAnalytics, MiniRag } from "@/components/art/MiniDiagrams";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pfe } from "@/lib/data";
import { CaseStudy } from "./CaseStudy";

const minis = [MiniAnalytics, MiniRag];

export function Flagship() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [demo, setDemo] = useState(0);
  const [jump, setJump] = useState(false);

  // Ouverture du bloc en clip-path, pilotée par le scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.35"] });
  const inset = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 0.66}% ${v}% ${v * 0.66}% round 36px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  // Lien direct vers l'étude de cas : /#pfe
  useEffect(() => {
    const check = () => location.hash === "#pfe" && setOpen(true);
    check();
    addEventListener("hashchange", check);
    return () => removeEventListener("hashchange", check);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const openAt = (t: number, toDemo = false) => {
    setDemo(t);
    setJump(toDemo);
    setOpen(true);
  };

  return (
    <section id="flagship" className="section-pad relative">
      <div className="wrap">
        <SectionHeading eyebrow="02 — Flagship Project" title="Flagship *project" />

        <motion.div
          ref={ref}
          style={{ clipPath, scale }}
          className="relative isolate grid gap-8 overflow-hidden rounded-[36px] border border-line p-[clamp(22px,4vw,56px)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(120% 120% at 100% 0%,rgba(37,99,235,.35),transparent 50%),radial-gradient(90% 90% at 0% 100%,rgba(0,255,224,.22),transparent 55%),linear-gradient(180deg,#0e1424,#0a0f19)",
            }}
          />
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div className="flex flex-col items-start">
              <span className="rounded-full bg-neon px-3 py-[7px] font-mono text-xs font-medium tracking-[0.04em] text-bg uppercase">{pfe.tag}</span>
              <h3 className="mt-[22px] max-w-[14ch] text-[clamp(2.2rem,6vw,5.4rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
                {pfe.title} <span className="text-grad">{pfe.titleAccent}</span>
              </h3>
              <p className="mt-[18px] mb-7 max-w-[46ch] text-[clamp(1rem,1.3vw,1.12rem)] text-ink2">{pfe.pitch}</p>
              <Button onClick={() => openAt(0)}>Read the case study</Button>
            </div>

            {/* Problème → Solution → Impact */}
            <ol className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line">
              {pfe.summary.map((s, i) => (
                <motion.li
                  key={s.k}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.12 }}
                  className="grid items-baseline gap-x-4 gap-y-1 bg-[rgba(11,15,25,.72)] px-5 py-4 sm:grid-cols-[118px_1fr]"
                >
                  <span className="font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-neon uppercase">
                    0{i + 1} · {s.k}
                  </span>
                  <span className="text-[14.5px] text-ink">{s.v}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {pfe.modules.map((m, i) => {
              const Mini = minis[i];
              return (
                <motion.button
                  key={m.title}
                  type="button"
                  onClick={() => openAt(i, true)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col gap-1 rounded-[18px] border border-line2 bg-[rgba(11,15,25,.6)] px-5 py-[18px] text-left backdrop-blur-md transition-colors duration-300 hover:border-neon/50"
                >
                  <span className="font-mono text-[11px] tracking-[0.12em] text-neon uppercase">
                    {m.n} · {m.tech}
                  </span>
                  <b className="text-[17px]">{m.title}</b>
                  <small className="text-[13.5px] text-ink2">{m.oneLiner}</small>
                  <div className="mt-3.5 overflow-hidden rounded-xl border border-line bg-black/25 p-3">
                    <Mini />
                  </div>
                  <span className="mt-2 font-mono text-[10.5px] tracking-[0.1em] text-ink3 uppercase transition-colors group-hover:text-neon">
                    Try the demo →
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <CaseStudy open={open} onClose={close} demo={demo} onDemoChange={setDemo} jumpToDemo={jump} />
    </section>
  );
}
