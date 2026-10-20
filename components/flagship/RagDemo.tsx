"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ragScenarios } from "@/lib/data";

function HitBar({ label, score, lex, i }: { label: string; score: number; lex?: boolean; i: number }) {
  return (
    <div className="relative h-[34px] overflow-hidden rounded-[10px] border border-line bg-white/[0.03]">
      <motion.div
        className={`absolute inset-y-0 left-0 ${
          lex
            ? "bg-[linear-gradient(90deg,rgba(0,255,224,.5),rgba(0,255,224,.12))]"
            : "bg-[linear-gradient(90deg,rgba(37,99,235,.5),rgba(37,99,235,.15))]"
        }`}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, delay: 0.08 + i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <span className="relative flex justify-between gap-2 px-2.5 font-mono text-xs leading-8">
        <span className="truncate">{label}</span>
        <span className="text-ink3 tabular-nums">.{score}</span>
      </span>
    </div>
  );
}

/* Démo RAG : choisissez une question, la recherche hybride se recalcule et la réponse s'écrit en citant ses sources. */
export function RagDemo() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");
  const s = ragScenarios[active];

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(s.answer);
      return;
    }
    setTyped("");
    let k = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        k += 2;
        setTyped(s.answer.slice(0, k));
        if (k >= s.answer.length) clearInterval(interval);
      }, 18);
    }, 700);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [s]);

  const done = typed.length >= s.answer.length;

  return (
    <div className="grid gap-4">
      {/* Choix de la question */}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Question asked to the assistant">
        {ragScenarios.map((r, i) => (
          <button
            key={r.q}
            type="button"
            role="radio"
            aria-checked={i === active}
            onClick={() => setActive(i)}
            className={`relative isolate rounded-full border px-4 py-2 text-left text-[13.5px] font-semibold transition-colors ${
              i === active ? "border-transparent text-bg" : "border-line2 text-ink2 hover:border-white/30 hover:text-ink"
            }`}
          >
            {i === active && (
              <motion.span layoutId="rag-q" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            {r.q}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <div className="glass flex min-w-0 flex-col gap-4 rounded-[28px] p-[clamp(16px,2.4vw,26px)]">
          <span className="eyebrow text-[11px]!">Hybrid search</span>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <small className="font-mono text-[11px] tracking-[0.06em] text-ink3">Dense · meaning</small>
              {s.dense.map((h, i) => (
                <HitBar key={`${active}-d-${i}`} {...h} i={i} />
              ))}
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <small className="font-mono text-[11px] tracking-[0.06em] text-ink3">BM25 · keywords</small>
              {s.bm25.map((h, i) => (
                <HitBar key={`${active}-b-${i}`} {...h} lex i={i + 3} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2.5 rounded-xl border border-dashed border-neon/40 px-3.5 py-3 font-mono text-xs text-ink2">
            <span>Score fusion (RRF)</span>
            <b className="font-medium text-neon">Top 3 → LLM</b>
          </div>
        </div>

        <div className="glass flex min-w-0 flex-col gap-4 rounded-[28px] p-[clamp(16px,2.4vw,26px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex max-w-[92%] flex-col gap-1.5 self-end rounded-2xl rounded-br-sm border border-line2 bg-white/[0.06] px-4 py-3.5"
            >
              <small className="font-mono text-[10.5px] tracking-[0.12em] text-ink3 uppercase">Technician</small>
              <p>{s.q}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex max-w-[92%] flex-col gap-1.5 rounded-2xl rounded-bl-sm border border-electric-soft/30 bg-[linear-gradient(180deg,rgba(37,99,235,.16),rgba(0,255,224,.06))] px-4 py-3.5">
            <small className="font-mono text-[10.5px] tracking-[0.12em] text-ink3 uppercase">Assistant</small>
            <p className="min-h-[4.8em]" aria-live="polite">
              {typed || (
                <span className="inline-flex gap-1 py-2" aria-label="The assistant is thinking">
                  {[0, 1, 2].map((d) => (
                    <motion.i
                      key={d}
                      className="size-1.5 rounded-full bg-electric-soft"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </span>
              )}
              {typed && !done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-electric-soft" />}
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {s.sources.map((src, i) => (
                <motion.span
                  key={`${active}-${src}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-full border border-neon/30 bg-neon/10 px-2.5 py-1 font-mono text-[11px] text-neon"
                >
                  {src}
                </motion.span>
              ))}
            </div>
          </div>
          <p className="mt-auto font-mono text-xs text-ink3">// Fictional examples: real documents remain confidential.</p>
        </div>
      </div>
    </div>
  );
}
