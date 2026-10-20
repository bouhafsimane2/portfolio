"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CornerDownLeft, Loader2, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { classify, type CascadeResult } from "@/lib/cascade";
import { cascadeSamples, tiers, type TierId } from "@/lib/data";

type Row = { id: number; raw: string; status: "idle" | "active" | "done"; probe?: TierId; result?: CascadeResult };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const initialRows = (): Row[] => cascadeSamples.map((raw, id) => ({ id, raw, status: "idle" }));
const emptyHits = (): Record<TierId, number> => ({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

/* Démo de la cascade : les libellés descendent les niveaux T1 → T5 jusqu'à celui qui sait les classer. */
export function CascadeDemo({ autoRun = false }: { autoRun?: boolean }) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [scan, setScan] = useState<TierId | null>(null);
  const [hit, setHit] = useState<TierId | null>(null);
  const [hits, setHits] = useState(emptyHits);
  const [openTier, setOpenTier] = useState<TierId | null>(null);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [input, setInput] = useState("");
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const animateRow = useCallback(async (index: number, raw: string) => {
    const res = classify(raw);
    const fast = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setRows((r) => r.map((x, i) => (i === index ? { ...x, status: "active" } : x)));
    for (let k = 1 as TierId; k <= res.tier; k = (k + 1) as TierId) {
      if (!alive.current) return;
      setScan(k);
      setRows((r) => r.map((x, i) => (i === index ? { ...x, probe: k } : x)));
      await sleep(fast ? 0 : 260);
    }
    setScan(null);
    setHit(res.tier);
    setHits((h) => ({ ...h, [res.tier]: h[res.tier] + 1 }));
    setRows((r) => r.map((x, i) => (i === index ? { ...x, status: "done", result: res } : x)));
    await sleep(fast ? 0 : 420);
    setHit(null);
  }, []);

  const run = useCallback(async () => {
    setRunning(true);
    setHits(emptyHits());
    const fresh = initialRows();
    setRows(fresh);
    for (let i = 0; i < fresh.length; i++) {
      if (!alive.current) return;
      await animateRow(i, fresh[i].raw);
    }
    setRunning(false);
    setRan(true);
  }, [animateRow]);

  const submitCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || running) return;
    setInput("");
    setRunning(true);
    // On garde au plus 4 libellés personnalisés sous les exemples
    const n = cascadeSamples.length;
    const kept = rows.length >= n + 4 ? [...rows.slice(0, n), ...rows.slice(n + 1)] : rows;
    const index = kept.length;
    setRows([...kept, { id: Date.now(), raw, status: "idle" }]);
    await sleep(30);
    await animateRow(index, raw);
    setRunning(false);
  };

  useEffect(() => {
    if (!autoRun) return;
    const t = setTimeout(run, 1100);
    return () => clearTimeout(t);
  }, [autoRun, run]);

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
      {/* Niveaux */}
      <div className="glass flex flex-col gap-2.5 rounded-[28px] p-[clamp(16px,2.4vw,28px)]">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold tracking-[-0.01em]">
            The engineering <span className="font-serif font-normal text-ink2 italic">cascade</span>
          </h3>
          <span className="eyebrow text-[11px]!">Click a level</span>
        </div>

        {tiers.map((t, i) => {
          const isHit = hit === t.id;
          const isScan = scan === t.id;
          const isOpen = openTier === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => setOpenTier(isOpen ? null : t.id)}
              aria-expanded={isOpen}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ ["--c" as string]: t.color }}
              className={`relative grid w-full grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 rounded-2xl border px-4 py-3.5 text-left transition-[background,border-color,box-shadow] duration-300 ${
                isHit
                  ? "border-(--c) bg-white/5 shadow-[0_0_0_1px_var(--c),0_0_40px_-6px_var(--c)]"
                  : isScan
                    ? "border-white/35 bg-white/[0.04]"
                    : isOpen
                      ? "border-line2 bg-white/5"
                      : "border-line bg-white/[0.02] hover:bg-white/5"
              }`}
            >
              <span
                className={`row-span-2 grid size-11 place-items-center rounded-xl border font-mono text-[13px] transition-all duration-300 ${
                  isHit ? "border-(--c) bg-(--c) text-bg" : isScan ? "border-line2 bg-white/[0.12]" : "border-line2 bg-white/5"
                }`}
              >
                T{t.id}
              </span>
              <span className="text-[15.5px] font-bold">{t.name}</span>
              <span className="col-start-2 text-[13.5px] text-ink2">{t.desc}</span>
              <span className="col-start-3 row-span-2 row-start-1 flex flex-col items-end gap-1.5">
                <small className="font-mono text-[10px] tracking-[0.1em] text-ink3 uppercase">cost</small>
                <span className="flex gap-[3px]">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <i key={d} className={`size-[7px] rounded-[2px] ${d <= t.id ? "bg-(--c)" : "bg-white/10"}`} />
                  ))}
                </span>
                <motion.span
                  key={hits[t.id]}
                  initial={{ scale: 1.6, color: t.color }}
                  animate={{ scale: 1, color: "#9AA7BD" }}
                  className="font-mono text-xs tabular-nums"
                >
                  {hits[t.id]}
                </motion.span>
              </span>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.span
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="col-span-2 col-start-2 overflow-hidden font-mono text-[13px] text-ink2"
                  >
                    <span className="block pt-1.5">
                      {t.more} {t.example && <code className="text-aqua-soft">{t.example}</code>}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
              {i < tiers.length - 1 && <span aria-hidden className="absolute -bottom-[11px] left-[37px] h-2.5 w-0.5 bg-line2" />}
            </motion.button>
          );
        })}
      </div>

      {/* Console */}
      <div className="glass flex min-w-0 flex-col gap-3.5 rounded-[28px] bg-[linear-gradient(180deg,rgba(11,15,25,.85),rgba(11,15,25,.6))] p-[clamp(16px,2.4vw,26px)]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-navy" />
              <i className="size-2.5 rounded-full bg-neon" />
              <i className="size-2.5 rounded-full bg-aqua" />
            </span>
            <span className="font-mono text-xs text-ink3">cascade_demo.py</span>
          </div>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-2 rounded-full bg-neon px-3.5 py-2 text-[13.5px] font-bold text-bg transition-shadow hover:shadow-[0_0_30px_-4px_var(--color-neon)] disabled:cursor-progress disabled:opacity-55"
          >
            {running ? <Loader2 size={13} className="animate-spin" /> : ran ? <RotateCcw size={13} /> : <Play size={12} fill="currentColor" />}
            {running ? "Classifying…" : ran ? "Run again" : "Run the cascade"}
          </button>
        </div>

        <div className="flex min-w-0 flex-col gap-2 font-mono text-[13px]" aria-live="polite">
          <AnimatePresence initial={false}>
            {rows.map((r) => {
              const tier = r.result ? tiers[r.result.tier - 1] : undefined;
              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`grid min-w-0 gap-1 rounded-[10px] border px-3 py-2.5 transition-colors duration-300 ${
                    r.status === "active" ? "border-line2 bg-white/5" : "border-transparent bg-white/[0.025]"
                  }`}
                >
                  <span className="text-ink [overflow-wrap:anywhere]">
                    <span className="text-ink3">› </span>
                    {r.raw}
                  </span>
                  <span className="min-h-[1.4em] text-xs text-ink3">
                    {r.status === "idle" && "waiting…"}
                    {r.status === "active" && r.probe && `→ T${r.probe} ${tiers[r.probe - 1].short}…`}
                    {r.status === "done" && r.result && tier && (
                      <span style={{ color: tier.color }}>
                        <Check size={12} className="mr-1 inline -translate-y-px" />
                        T{tier.id} · {tier.short} → <b className="font-medium text-ink">{r.result.fam}</b>{" "}
                        <span className="text-ink3">({r.result.how})</span>
                      </span>
                    )}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <form onSubmit={submitCustom} className="flex items-center gap-2 rounded-xl border border-line2 bg-black/30 p-1.5 pl-3 focus-within:border-electric-soft">
          <span className="font-mono text-[13px] text-neon">›</span>
          <label htmlFor="cascade-input" className="sr-only">
            Test your own failure report
          </label>
          <input
            id="cascade-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try a report: “ac out car 2”"
            maxLength={90}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-ink3"
          />
          <button
            type="submit"
            disabled={running || !input.trim()}
            aria-label="Classify this report"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-neon hover:text-bg disabled:opacity-40 disabled:hover:bg-white/10 disabled:hover:text-ink"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>

        <p className="mt-auto font-mono text-xs text-ink3">
          // Why not a pure LLM? Each report is resolved at the cheapest level; the LLM only handles the rest. Illustrative examples,
          reduced vocabulary.
        </p>
      </div>
    </div>
  );
}
