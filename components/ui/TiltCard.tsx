"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onHoverChange?: (hover: boolean) => void;
  label?: string;
};

/* Carte verre avec inclinaison 3D au survol (souris), reflet qui suit le curseur et bordure néon animée. */
export function TiltCard({ children, className = "", onClick, onHoverChange, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });
  const glare = useMotionTemplate`radial-gradient(500px circle at ${mx}% ${my}%, rgba(255,255,255,.13), transparent 40%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 12);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const reset = (e: React.PointerEvent) => {
    rx.set(0);
    ry.set(0);
    if (e.pointerType === "mouse") onHoverChange?.(false);
  };

  const interactive = !!onClick;

  return (
    <div className="h-full [perspective:1400px]">
      <motion.div
        ref={ref}
        data-hover
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={label}
        onClick={onClick}
        onKeyDown={(e) => {
          if (interactive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.();
          }
        }}
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && onHoverChange?.(true)}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className={`group relative h-full rounded-[28px] will-change-transform ${interactive ? "cursor-pointer" : ""} ${className}`}
      >
        <div className="glass neon-border relative flex h-full flex-col overflow-hidden rounded-[inherit]">{children}</div>
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}
