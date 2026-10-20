"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";
import { skillsBand } from "@/lib/data";

/* Bande de compétences infinie : accélère avec la vitesse du scroll, ralentit au survol. */
export function SkillsBand() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [5, 0, 5], { clamp: false });
  const hover = useRef(1);
  const x = useTransform(base, (v) => `${v % 50}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const speed = 50 / 34; // 50 % de piste en ~34 s
    const factor = (1 + Math.min(Math.abs(boost.get()), 5)) * hover.current;
    base.set(base.get() - (speed * factor * delta) / 1000);
  });

  return (
    <section id="skills" aria-label="Skills" className="border-y border-line bg-white/[0.012]">
      <motion.div
        initial={{ opacity: 0, x: "-8%" }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        onPointerEnter={() => (hover.current = 0.25)}
        onPointerLeave={() => (hover.current = 1)}
        className="relative flex items-center overflow-hidden py-[22px]"
      >
        <motion.div style={{ x }} className="flex w-max gap-10 will-change-transform">
          {[...skillsBand, ...skillsBand].map((s, i) => (
            <span
              key={i}
              aria-hidden={i >= skillsBand.length}
              className={`flex items-center gap-10 text-[clamp(1.6rem,3vw,2.6rem)] leading-none font-medium tracking-[-0.03em] whitespace-nowrap transition-colors duration-300 after:text-[0.5em] after:text-neon after:content-['✦'] hover:text-neon ${
                i % 2 === 0 ? "text-ink" : "text-outline hover:[-webkit-text-stroke-color:var(--color-neon)]"
              }`}
            >
              {s}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
