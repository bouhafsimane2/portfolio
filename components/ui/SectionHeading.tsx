"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  eyebrow: string;
  /** Mots du titre ; un mot préfixé par "*" s'affiche en serif italique orange. */
  title: string;
  aside?: ReactNode;
};

/* En-tête de section : eyebrow, titre révélé mot par mot, légère dérive horizontale au scroll. */
export function SectionHeading({ eyebrow, title, aside }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const words = title.split(" ");

  return (
    <div className="mb-[clamp(40px,6vw,72px)] grid items-end gap-x-10 gap-y-6 md:grid-cols-[1fr_auto]">
      <div>
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.8 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          ref={ref}
          style={{ x }}
          className="mt-[18px] text-[clamp(2.8rem,7.4vw,6.6rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
        >
          {words.map((w, i) => {
            const accent = w.startsWith("*");
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className={`inline-block ${accent ? "font-serif font-normal tracking-[-0.01em] text-neon italic" : ""}`}
                  initial={{ y: "110%", rotate: 4 }}
                  whileInView={{ y: "0%", rotate: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                >
                  {accent ? w.slice(1) : w}
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            );
          })}
        </motion.h2>
      </div>
      {aside}
    </div>
  );
}
