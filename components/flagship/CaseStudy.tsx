"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, BookOpen, Check, Lock, Wrench, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import { pfe } from "@/lib/data";
import { CascadeDemo } from "./CascadeDemo";
import { RagDemo } from "./RagDemo";

type Props = { open: boolean; onClose: () => void; demo: number; onDemoChange: (t: number) => void; jumpToDemo?: boolean };

const ease = [0.2, 0.8, 0.2, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, ease },
} as const;

const demos = [
  { t: "Classify a failure", d: "Module 1" },
  { t: "Ask a question", d: "Module 2" },
];

/* Étude de cas du PFE, racontée simplement : Contexte → Problème → Solution → Résultats → Démo. */
export function CaseStudy({ open, onClose, demo, onDemoChange, jumpToDemo }: Props) {
  const { lock, unlock } = useSmoothScroll();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const last = document.activeElement as HTMLElement | null;
    lock();
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    try {
      history.replaceState(null, "", "#pfe");
    } catch {}
    return () => {
      clearTimeout(t);
      removeEventListener("keydown", onKey);
      unlock();
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch {}
      last?.focus();
    };
  }, [open, lock, unlock, onClose]);

  // Ouverture depuis un module : on descend directement à la démo
  useEffect(() => {
    if (!open || !jumpToDemo) return;
    const t = setTimeout(() => document.getElementById("pfe-4")?.scrollIntoView({ behavior: "smooth", block: "start" }), 650);
    return () => clearTimeout(t);
  }, [open, jumpToDemo]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="pfe"
          id="pfe-scroller"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pfe-title"
          data-lenis-prevent
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
          className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-bg"
        >
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 80% 0%,rgba(37,99,235,.22),transparent 70%),radial-gradient(50% 50% at 0% 100%,rgba(0,255,224,.14),transparent 70%)",
            }}
          />

          {/* Barre */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-[rgba(11,15,25,.8)] px-[clamp(16px,4vw,40px)] pt-[calc(env(safe-area-inset-top,0px)+14px)] pb-3.5 backdrop-blur-lg">
            <span className="font-mono text-xs tracking-[0.1em] text-ink2 uppercase">
              Flagship project <i className="mx-1.5 text-ink3 not-italic">/</i> Case study
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close the case study"
              className="grid size-11 place-items-center rounded-full border border-line2 bg-white/5 transition-all duration-300 hover:rotate-90 hover:border-neon hover:bg-neon hover:text-bg"
            >
              <X size={18} />
            </button>
          </div>

          <div className="wrap relative pt-8 pb-[calc(80px+env(safe-area-inset-bottom,0px))]">
            {/* ───────────── En-tête */}
            <motion.header
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
              className="relative isolate overflow-hidden rounded-[36px] border border-line p-[clamp(22px,4vw,56px)]"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(120% 120% at 100% 0%,rgba(37,99,235,.35),transparent 50%),radial-gradient(90% 90% at 0% 100%,rgba(0,255,224,.22),transparent 55%),linear-gradient(180deg,#0e1424,#0a0f19)",
                }}
              />
              <span className="rounded-full bg-neon px-3 py-[7px] font-mono text-xs font-medium tracking-[0.04em] text-bg uppercase">{pfe.tag}</span>
              <h2 id="pfe-title" className="mt-[22px] max-w-[14ch] text-[clamp(2.2rem,6vw,5.2rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
                {pfe.title} <span className="text-grad">{pfe.titleAccent}</span>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-ink2">{pfe.pitch}</p>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {pfe.meta.map((m) => (
                  <div key={m.k} className="min-w-0 bg-[rgba(11,15,25,.75)] px-[18px] py-4">
                    <dt className="font-mono text-[10.5px] tracking-[0.14em] text-ink3 uppercase">{m.k}</dt>
                    <dd className="mt-1.5 text-sm leading-snug font-semibold">{m.v}</dd>
                  </div>
                ))}
              </dl>

              <nav aria-label="Contents" className="mt-6 flex flex-wrap gap-2">
                {["Problem", "Solution", "Results", "Demo"].map((s, i) => (
                  <a
                    key={s}
                    href={`#pfe-${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`pfe-${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="rounded-full border border-line2 bg-black/20 px-3.5 py-1.5 font-mono text-xs text-ink2 transition-colors hover:border-neon/60 hover:text-ink"
                  >
                    0{i + 1} · {s}
                  </a>
                ))}
              </nav>
            </motion.header>

            {/* ───────────── 01 Problème */}
            <Section id="pfe-1" n="01" title="The problem" lede="Two everyday obstacles for maintenance teams.">
              <div className="grid gap-4 md:grid-cols-2">
                {pfe.problems.map((p, i) => (
                  <motion.article key={p.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="glass flex flex-col gap-4 rounded-[24px] p-[clamp(20px,2.6vw,30px)]">
                    <span className="grid size-11 place-items-center rounded-xl bg-neon/[0.12] text-neon">
                      {i === 0 ? <Wrench size={20} /> : <BookOpen size={20} />}
                    </span>
                    <h4 className="text-xl font-bold tracking-[-0.01em]">{p.title}</h4>
                    <p className="text-[15px] text-ink2">{p.text}</p>
                    <div className="mt-auto rounded-2xl border border-dashed border-line2 bg-black/25 p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.examples.map((e) => (
                          <span key={e} className="rounded-lg border border-navy/50 bg-navy/15 px-2.5 py-1 font-mono text-xs text-pale">
                            {e}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-ink3 uppercase">↳ {p.note}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </Section>

            {/* ───────────── 02 Solution */}
            <Section id="pfe-2" n="02" title="The solution" lede="Two complementary tools, designed to be simple to use.">
              <div className="grid gap-4">
                {pfe.modules.map((m, i) => (
                  <motion.article
                    key={m.title}
                    {...reveal}
                    className="glass grid gap-6 rounded-[24px] p-[clamp(20px,2.6vw,32px)] lg:grid-cols-[1.25fr_1fr] lg:gap-10"
                  >
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.12em] text-neon uppercase">
                        {m.n} · {m.tech}
                      </span>
                      <h4 className="mt-1.5 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-extrabold tracking-[-0.025em]">{m.title}</h4>
                      <p className="mt-2 max-w-[52ch] text-ink2">{m.oneLiner}</p>

                      <ol className="mt-6 grid gap-3 sm:grid-cols-3">
                        {m.steps.map((s, k) => (
                          <li key={s.t} className="relative rounded-2xl border border-line bg-white/[0.025] p-4">
                            <span className="grid size-8 place-items-center rounded-lg bg-white/[0.06] font-mono text-xs text-ink">{k + 1}</span>
                            <b className="mt-3 block text-[15px]">{s.t}</b>
                            <p className="mt-1 text-[13px] leading-snug text-ink2">{s.d}</p>
                            {k < m.steps.length - 1 && (
                              <ArrowRight aria-hidden size={14} className="absolute top-1/2 -right-[11px] hidden -translate-y-1/2 text-ink3 sm:block" />
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Exemple avant / après */}
                    <div className="flex flex-col justify-center gap-2 rounded-[20px] border border-line bg-black/30 p-5">
                      <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink3 uppercase">{i === 0 ? "Technician's report" : "Technician's question"}</span>
                      <p className="rounded-xl border border-line2 bg-white/[0.04] px-4 py-3 font-mono text-sm text-ink">{m.before}</p>
                      <ArrowDown aria-hidden size={18} className="mx-auto my-1 text-neon" />
                      <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink3 uppercase">{i === 0 ? "Failure family" : "Assistant's answer"}</span>
                      <p className="flex items-start gap-2 rounded-xl border border-aqua/30 bg-aqua/[0.06] px-4 py-3 text-[15px] font-semibold">
                        <Check size={16} className="mt-0.5 shrink-0 text-aqua-soft" />
                        {m.after}
                      </p>
                      <p className="font-mono text-[11px] text-ink3">{m.afterNote}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </Section>

            {/* ───────────── 03 Résultats */}
            <Section id="pfe-3" n="03" title="The results" lede="What the project delivers in practice.">
              <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {pfe.results.map((r, i) => (
                  <motion.div key={r.l} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="bg-[rgba(11,15,25,.85)] p-6">
                    <p className="text-[clamp(2rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums">
                      {r.v}
                      {r.u && <span className="ml-1.5 text-base font-bold tracking-normal text-neon">{r.u}</span>}
                    </p>
                    <p className="mt-3 text-sm text-ink2">{r.l}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {pfe.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            {/* ───────────── 04 Démo */}
            <Section id="pfe-4" n="04" title="Try it yourself" lede="Two interactive demos, with fictional examples.">
              <div role="tablist" aria-label="Demos" className="grid grid-cols-2 gap-2 rounded-[22px] border border-line bg-white/[0.03] p-1.5">
                {demos.map((t, i) => {
                  const on = demo === i;
                  return (
                    <button
                      key={t.t}
                      type="button"
                      role="tab"
                      id={`demo-tab-${i}`}
                      aria-selected={on}
                      aria-controls={`demo-panel-${i}`}
                      onClick={() => onDemoChange(i)}
                      className="group relative isolate flex flex-col items-start gap-0.5 rounded-2xl px-[clamp(12px,2vw,20px)] py-3.5 text-left"
                    >
                      {on && <motion.span layoutId="pfe-demo" className="absolute inset-0 -z-10 rounded-2xl bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                      <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${on ? "text-electric" : "text-ink3"}`}>{t.d}</span>
                      <span className={`text-[clamp(14px,1.6vw,18px)] font-extrabold transition-colors ${on ? "text-bg" : "text-ink2 group-hover:text-ink"}`}>{t.t}</span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={demo}
                  id={`demo-panel-${demo}`}
                  role="tabpanel"
                  aria-labelledby={`demo-tab-${demo}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                  className="mt-4"
                >
                  {demo === 0 ? <CascadeDemo /> : <RagDemo />}
                </motion.div>
              </AnimatePresence>
            </Section>

            {/* Pied */}
            <div className="mt-10">
              <div className="stripes-neon flex items-center gap-4 rounded-[18px] border border-dashed border-neon/35 px-5 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-neon/[0.12] text-neon">
                  <Lock size={18} />
                </span>
                <p className="text-sm text-ink2">
                  <b className="font-semibold text-neon">Industrial confidentiality:</b> real data and interfaces remain protected. Examples and diagrams are illustrative.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Section({ id, n, title, lede, children }: { id: string; n: string; title: string; lede: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-[clamp(48px,7vw,88px)]">
      <motion.div {...reveal} className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-2">
        <h3 className="flex items-baseline gap-3 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none font-semibold tracking-[-0.04em]">
          <span className="font-mono text-sm font-normal tracking-normal text-neon">{n}</span>
          {title}
        </h3>
        <p className="max-w-[44ch] text-ink2">{lede}</p>
      </motion.div>
      {children}
    </section>
  );
}
