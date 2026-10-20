"use client";

import { useInView } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useRef } from "react";
import { ProjectArt } from "@/components/art/ProjectArt";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { TiltCard } from "@/components/ui/TiltCard";
import { CardLink, useWorkflow, WorkflowSteps } from "@/components/ui/Workflow";
import type { Project, ProjectCategory } from "@/lib/data";

const accents: Record<ProjectCategory, string> = {
  genai: "#7FA7E8",
  vision: "#7FFFEF",
  web: "#FFA800",
  rnd: "#8FA9D6",
};

/* Carte projet au même format que l'Automation Lab : visuel, titre, description, liens et pipeline animé. */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const steps = project.stages.map((s) => s.label);
  const { step, onHover } = useWorkflow(steps.length, inView);

  return (
    <div ref={ref} className="h-full" style={{ ["--ac" as string]: accents[project.cat] }}>
      <TiltCard onClick={onOpen} onHoverChange={onHover} label={`Open details for ${project.title}`}>
        <div className="relative aspect-[400/255] overflow-hidden border-b border-line">
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]" style={{ background: project.bg }} />
          <ProjectArt kind={project.art} />
          <span className="absolute top-3.5 left-3.5 rounded-full border border-line2 bg-[rgba(11,15,25,.55)] px-2.5 py-[5px] font-mono text-[10px] tracking-[0.1em] backdrop-blur-sm">
            {project.index}
          </span>
          <span
            className={`absolute top-3.5 right-3.5 inline-flex items-center gap-2 rounded-full border px-2.5 py-[5px] font-mono text-[10px] tracking-[0.08em] uppercase backdrop-blur-sm ${
              project.demo ? "border-aqua/30 bg-aqua/[0.08] text-aqua-soft" : "border-line2 bg-[rgba(11,15,25,.55)] text-ink2"
            }`}
          >
            {project.demo && <i className="size-[7px] animate-pulse-soft rounded-full bg-current shadow-[0_0_10px_currentColor]" />}
            {project.demo ? "Live" : project.tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
          <div className="flex items-start justify-between gap-3.5">
            <h3 className="text-[1.3rem] leading-[1.15] font-extrabold tracking-[-0.02em]">
              {project.title}
              <small className="mt-1 block font-serif text-[0.78em] font-normal tracking-normal text-ink2 italic">{project.subtitle}</small>
            </h3>
            <span className="grid size-[34px] shrink-0 place-items-center rounded-full border border-line2 transition-all duration-400 group-hover:-rotate-45 group-hover:border-neon group-hover:bg-neon group-hover:text-bg">
              <ArrowRight size={15} strokeWidth={2.2} />
            </span>
          </div>
          <p className="text-[14.5px] text-ink2">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            <CardLink href={project.repo}>
              <GitHubIcon size={13} /> View code
            </CardLink>
            {project.demo && (
              <CardLink href={project.demo} primary>
                <Globe size={13} /> Live demo
              </CardLink>
            )}
          </div>
          <WorkflowSteps steps={steps} step={step} />
        </div>
      </TiltCard>
    </div>
  );
}
