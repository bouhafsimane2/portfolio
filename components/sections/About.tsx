"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, aboutRows } from "@/lib/data";

const ease = [0.2, 0.8, 0.2, 1] as const;

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="wrap">
        <SectionHeading eyebrow="05 — About" title="About *me" />

        <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.3fr]">
          <motion.div
            className="flex flex-col gap-[18px] text-ink2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              <p key="a" className="font-serif text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.12] text-ink">
                {about.lead}
              </p>,
              <p key="b">{about.text}</p>,
            ].map((el) => (
              <motion.div key={el.key} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>
                {el}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col border-t border-line2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {aboutRows.map((r) => (
              <motion.div
                key={r.n}
                data-hover
                variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
                style={{ ["--rc" as string]: r.color }}
                className="group relative isolate grid grid-cols-[32px_1fr] items-center gap-x-5 gap-y-2.5 rounded-2xl border-b border-line2 px-4 py-[22px] sm:grid-cols-[44px_minmax(0,170px)_minmax(0,1fr)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 scale-y-[.6] rounded-2xl bg-(--rc) opacity-0 transition-all duration-400 group-hover:scale-y-100 group-hover:opacity-100"
                />
                <span className="font-mono text-xs text-ink3 transition-colors duration-400 group-hover:text-bg">{r.n}</span>
                <h3 className="text-[clamp(1.3rem,1.9vw,1.7rem)] leading-none font-bold tracking-[-0.03em] text-(--rc) transition-colors duration-400 group-hover:text-bg">
                  {r.title}
                </h3>
                <div className="col-span-full flex flex-wrap gap-2 sm:col-span-1">
                  {r.chips.map((c) => (
                    <span
                      key={c}
                      className="chip transition-colors duration-400 group-hover:border-black/30 group-hover:bg-white/25 group-hover:text-bg"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
