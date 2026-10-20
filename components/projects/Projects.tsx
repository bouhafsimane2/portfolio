"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectFilters, projects, type Project } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = projects.filter((p) => filter === "all" || p.cat === filter);
  const count = (id: string) => (id === "all" ? projects.length : projects.filter((p) => p.cat === id).length);

  const filters = (
    <motion.div
      role="tablist"
      aria-label="Filter projects"
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {projectFilters.map((f) => {
        const on = f.id === filter;
        return (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => setFilter(f.id)}
            className={`relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
              on ? "border-transparent text-bg" : "border-line2 text-ink2 hover:border-white/30 hover:text-ink"
            }`}
          >
            {on && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            {f.label}
            <sup className={`font-mono text-[10px] ${on ? "text-electric" : "text-ink3"}`}>{String(count(f.id)).padStart(2, "0")}</sup>
          </button>
        );
      })}
    </motion.div>
  );

  return (
    <section id="projects" className="section-pad relative">
      <div className="wrap">
        <SectionHeading eyebrow="03 — Data & Dev Projects" title="Recent *projects" aside={filters} />

        <motion.div layout className="mx-auto grid max-w-[1080px] gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.07 }}
              >
                <ProjectCard project={p} onOpen={() => setSelected(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
