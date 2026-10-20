"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectArt } from "@/components/art/ProjectArt";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import type { Project } from "@/lib/data";
import { StageDiagram } from "./StageDiagram";

/* Panneau de détail d'un projet : visuel, description et diagramme interactif (pipeline / architecture / boucle). */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lock, unlock } = useSmoothScroll();
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = !!project;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const last = document.activeElement as HTMLElement | null;
    lock();
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      removeEventListener("keydown", onKey);
      unlock();
      last?.focus();
    };
  }, [open, lock, unlock, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div key="overlay" className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(5,8,14,.72)] backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            data-lenis-prevent
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative max-h-[92svh] w-full max-w-[1040px] overflow-y-auto overscroll-contain rounded-t-[28px] border border-line2 bg-bg shadow-[0_40px_120px_-20px_rgba(0,0,0,.8)] sm:rounded-[28px]"
          >
            {/* Bandeau visuel */}
            <div className="relative h-[180px] overflow-hidden border-b border-line sm:h-[220px]">
              <div className="absolute inset-0" style={{ background: project.bg }} />
              <div className="absolute inset-y-0 right-0 w-full opacity-80 sm:w-3/5">
                <ProjectArt kind={project.art} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
              <div className="absolute bottom-5 left-[clamp(18px,4vw,36px)] max-w-[60%]">
                <span className="font-mono text-[11px] tracking-[0.12em] text-neon uppercase">
                  {project.tag}
                </span>
                <h3 id="project-title" className="mt-1 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-none font-semibold tracking-[-0.04em]">
                  {project.title}
                </h3>
                <p className="mt-1 font-serif text-lg text-ink2 italic">{project.subtitle}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-line2 bg-bg/60 backdrop-blur transition-all duration-300 hover:rotate-90 hover:border-neon hover:bg-neon hover:text-bg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-6 p-[clamp(18px,4vw,36px)]">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-[60ch]">
                  {project.highlight && <p className="mb-1.5 font-mono text-xs text-neon">{project.highlight}</p>}
                  <p className="text-ink2">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-neon px-4 py-2.5 text-sm font-bold text-bg transition-shadow hover:shadow-[0_0_30px_-4px_var(--color-neon)]"
                    >
                      Live demo <ArrowUpRight size={15} />
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line2 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-white/10"
                  >
                    <GitHubIcon size={15} /> Source code
                  </a>
                </div>
              </div>
              <StageDiagram project={project} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
