"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { AutomationArt } from "@/components/art/AutomationArt";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { CardLink, useWorkflow, WorkflowSteps } from "@/components/ui/Workflow";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { automations, type Automation as AutomationItem } from "@/lib/data";

type Auto = AutomationItem;

function AutoCard({ a, index, onOpen }: { a: Auto; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { step, onHover } = useWorkflow(a.steps.length, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.1 }}
      style={{ ["--ac" as string]: a.accent }}
    >
      <TiltCard onClick={onOpen} onHoverChange={onHover} label={`Open details for ${a.title}`}>
        <div className="relative aspect-[400/255] overflow-hidden border-b border-line">
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]" style={{ background: a.bg }} />
          <AutomationArt kind={a.autoArt} />
          <span className="absolute top-3.5 left-3.5 rounded-full border border-line2 bg-[rgba(11,15,25,.55)] px-2.5 py-[5px] font-mono text-[10px] tracking-[0.1em] backdrop-blur-sm">
            {a.num}
          </span>
          <span
            className={`absolute top-3.5 right-3.5 inline-flex items-center gap-2 rounded-full border px-2.5 py-[5px] font-mono text-[10px] tracking-[0.08em] uppercase ${
              a.repo ? "border-aqua/30 bg-aqua/[0.08] text-aqua-soft" : "border-neon/30 bg-neon/[0.08] text-neon"
            }`}
          >
            <i className="size-[7px] animate-pulse-soft rounded-full bg-current shadow-[0_0_10px_currentColor]" />
            {a.status}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-5 pb-[22px]">
          <div className="flex items-start justify-between gap-3.5">
            <h3 className="text-[1.3rem] leading-[1.15] font-extrabold tracking-[-0.02em]">{a.title}</h3>
            <span className="grid size-[34px] shrink-0 place-items-center rounded-full border border-line2 transition-all duration-400 group-hover:-rotate-45 group-hover:border-neon group-hover:bg-neon group-hover:text-bg">
              <ArrowRight size={15} strokeWidth={2.2} />
            </span>
          </div>
          <p className="text-[14.5px] text-ink2">{a.desc}</p>
          {a.repo && (
            <div>
              <CardLink href={a.repo}>
                <GitHubIcon size={13} /> View code
              </CardLink>
            </div>
          )}
          <WorkflowSteps steps={a.steps} step={step} />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Automation() {
  const [selected, setSelected] = useState<AutomationItem | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="automation" className="section-pad relative">
      <div className="wrap">
        <SectionHeading
          eyebrow="04 — AI Automation"
          title="Automation *Lab"
        />
        <div className="mx-auto grid max-w-[880px] gap-4 md:grid-cols-2">
          {automations.map((a, i) => (
            <AutoCard key={a.id} a={a} index={i} onOpen={() => setSelected(a)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
