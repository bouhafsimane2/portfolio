"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";

/* Workflow qui s'allume étape par étape : une fois à l'arrivée à l'écran, en boucle au survol, une fois au clic/tap. */
export function useWorkflow(length: number, inView: boolean) {
  const [step, setStep] = useState(length); // length = tout est "passé"
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const play = useCallback(
    (loop: boolean) => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      stop();
      let i = 0;
      setStep(0);
      timer.current = setInterval(() => {
        i++;
        if (i > length) {
          if (!loop) {
            stop();
            setStep(length);
            return;
          }
          i = 0;
        }
        setStep(i);
      }, 520);
    },
    [length, stop],
  );

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => play(false), 700);
    return () => clearTimeout(t);
  }, [inView, play]);

  useEffect(() => stop, [stop]);

  return {
    step,
    onHover: (h: boolean) => {
      if (h) play(true);
      else {
        stop();
        setStep(length);
      }
    },
    replay: () => play(false),
  };
}

/* Étapes du workflow, colorées avec la variable CSS --ac de la carte. */
export function WorkflowSteps({ steps, step }: { steps: string[]; step: number }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-1 pt-1" aria-label={`Workflow : ${steps.join(" → ")}`}>
      {steps.map((s, i) => {
        const on = i === step;
        const past = i < step;
        return (
          <Fragment key={s}>
            <span
              className={`rounded-lg border px-[7px] py-1 font-mono text-[10.5px] whitespace-nowrap transition-all duration-300 ${
                on
                  ? "border-(--ac) bg-(--ac) text-bg shadow-[0_0_20px_-2px_var(--ac)]"
                  : past
                    ? "border-(--ac) text-ink"
                    : "border-line2 bg-white/[0.03] text-ink2"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && <span className="text-[10px] text-ink3">→</span>}
          </Fragment>
        );
      })}
    </div>
  );
}

/* Lien externe dans une carte cliquable : on stoppe la propagation pour ne pas déclencher la carte. */
export function CardLink({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      className={`relative z-[4] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
        primary ? "bg-neon text-bg hover:bg-white" : "border border-line2 hover:border-white/40 hover:bg-white/10"
      }`}
    >
      {children}
    </a>
  );
}
