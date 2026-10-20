"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/lib/data";

const spring = { type: "spring", stiffness: 260, damping: 28 } as const;

/* Diagramme interactif d'un projet :
   · pipeline     → étapes en ligne, un paquet de données glisse d'étape en étape
   · architecture → couches empilées, simulation d'une requête avec son journal
   · loop         → boucle d'apprentissage (RL) disposée en cercle
   Lecture automatique, mise en pause dès que l'utilisateur clique une étape. */
export function StageDiagram({ project }: { project: Project }) {
  const { stages, diagram } = project;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % stages.length), 2200);
    return () => clearInterval(t);
  }, [playing, stages.length]);

  // Rotation cumulée : le paquet tourne toujours dans le sens de la boucle
  const [spin, setSpin] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const d = (active - prev.current + stages.length) % stages.length;
    prev.current = active;
    setSpin((s) => s + d);
  }, [active, stages.length]);

  const pick = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const stage = stages[active];

  const node = (i: number, extra = "") => {
    const s = stages[i];
    const on = i === active;
    const past = diagram.kind !== "loop" && i < active;
    return (
      <button
        key={s.label}
        type="button"
        onClick={() => pick(i)}
        aria-pressed={on}
        className={`group relative isolate flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors duration-300 ${
          on ? "border-neon/70 bg-neon/[0.08]" : past ? "border-electric-soft/40 bg-white/[0.03]" : "border-line2 bg-white/[0.02] hover:border-white/30"
        } ${extra}`}
      >
        {on && (
          <motion.span
            layoutId={`packet-${project.id}`}
            transition={spring}
            className="absolute -inset-px -z-10 rounded-2xl shadow-[0_0_40px_-8px_var(--color-neon)]"
          />
        )}
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
            on ? "border-neon bg-neon text-bg" : "border-line2 bg-bg2 text-ink2 group-hover:text-ink"
          }`}
        >
          <Icon name={s.icon} size={18} />
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[10px] tracking-[0.12em] text-ink3 uppercase">{String(i + 1).padStart(2, "0")}</span>
          <span className="block truncate text-sm font-bold">{s.label}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-lg font-extrabold tracking-[-0.02em]">{diagram.title}</h4>
          <p className="text-sm text-ink2">{diagram.caption}</p>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full border border-line2 px-3.5 py-2 font-mono text-xs text-ink2 transition-colors hover:border-neon/60 hover:text-ink"
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          {playing ? "Pause" : "Autoplay"}
        </button>
      </div>

      {/* Schéma */}
      {diagram.kind === "pipeline" && (
        <div className="relative grid gap-2.5 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-0">
          {stages.map((_, i) => (
            <div key={i} className="contents lg:flex lg:flex-1 lg:items-center">
              {node(i, "lg:flex-1")}
              {i < stages.length - 1 && <Connector lit={i < active} />}
            </div>
          ))}
        </div>
      )}

      {diagram.kind === "architecture" && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="relative flex flex-col gap-2">
            {stages.map((_, i) => (
              <div key={i} className="flex flex-col">
                {node(i)}
                {i < stages.length - 1 && (
                  <span aria-hidden className="relative mx-auto h-3 w-px overflow-hidden bg-line2">
                    {i < active && <i className="absolute inset-0 bg-neon" />}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-black/35">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5">
                <i className="size-2 rounded-full bg-navy" />
                <i className="size-2 rounded-full bg-neon" />
                <i className="size-2 rounded-full bg-aqua" />
              </span>
              <span className="font-mono text-[11px] text-ink3">request.log</span>
            </div>
            <div className="flex flex-col gap-1.5 p-4 font-mono text-[12px] leading-relaxed" aria-live="polite">
              <AnimatePresence initial={false}>
                {stages.slice(0, active + 1).map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`whitespace-pre-wrap [overflow-wrap:anywhere] ${i === active ? "text-aqua-soft" : "text-ink3"}`}
                  >
                    {s.log}
                  </motion.div>
                ))}
              </AnimatePresence>
              <span className="mt-1 inline-block h-3.5 w-2 animate-pulse-soft bg-aqua-soft/70" />
            </div>
          </div>
        </div>
      )}

      {diagram.kind === "loop" && (
        <>
          {/* Cercle (≥ md) */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[460px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth=".4" strokeDasharray="1.5 1.5" className="svg-flow" />
            </svg>
            <motion.span
              aria-hidden
              className="absolute inset-0"
              animate={{ rotate: spin * (360 / stages.length) }}
              transition={spring}
            >
              <span className="absolute top-[14%] left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_20px_var(--color-neon)]" />
            </motion.span>
            <div className="absolute inset-[34%] grid place-items-center rounded-full border border-line bg-white/[0.03] text-center">
              <span className="px-2 font-mono text-[10px] tracking-[0.14em] text-ink3 uppercase">Episode</span>
            </div>
            {stages.map((_, i) => {
              const a = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <div
                  key={i}
                  className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 36 * Math.cos(a)}%`, top: `${50 + 36 * Math.sin(a)}%` }}
                >
                  {node(i, "w-full bg-bg2/90 backdrop-blur")}
                </div>
              );
            })}
          </div>
          {/* Liste (mobile) */}
          <div className="grid gap-2 md:hidden">{stages.map((_, i) => node(i))}</div>
        </>
      )}

      {/* Détail de l'étape */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-[20px] p-5"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-neon uppercase">
            Step {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
          </div>
          <h5 className="mt-1.5 text-lg font-bold">{stage.title}</h5>
          <p className="mt-1 text-[15px] text-ink2">{stage.detail}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stage.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progression */}
      <div className="flex gap-1.5" aria-hidden>
        {stages.map((_, i) => (
          <span key={i} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="absolute inset-0 origin-left rounded-full bg-neon"
              initial={false}
              animate={{ scaleX: i <= active ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function Connector({ lit }: { lit: boolean }) {
  return (
    <span aria-hidden className="relative hidden h-px w-6 shrink-0 bg-line2 lg:block">
      <motion.span
        className="absolute inset-0 origin-left bg-neon"
        initial={false}
        animate={{ scaleX: lit ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
    </span>
  );
}
