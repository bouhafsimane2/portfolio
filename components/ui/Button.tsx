import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "neon" | "ghost";

const base =
  "group relative inline-flex items-center gap-3 rounded-full px-[22px] py-3.5 text-[15px] font-bold whitespace-nowrap transition-[transform,box-shadow,background] duration-300 ease-out-expo active:scale-[0.97]";

const variants: Record<Variant, string> = {
  neon: "bg-neon text-bg shadow-[0_10px_40px_-10px_rgba(255,168,0,.55)] hover:shadow-[0_0_0_6px_rgba(255,168,0,.14),0_16px_50px_-8px_rgba(255,168,0,.7)]",
  ghost: "border border-line2 bg-white/5 backdrop-blur-md hover:bg-white/10",
};

function Arrow({ variant }: { variant: Variant }) {
  return (
    <span
      className={`grid size-[30px] place-items-center rounded-full transition-transform duration-400 ease-out-expo group-hover:-rotate-45 ${
        variant === "neon" ? "bg-bg text-neon" : "bg-white/10"
      }`}
    >
      <ArrowRight size={14} strokeWidth={2.4} />
    </span>
  );
}

type Common = { variant?: Variant; arrow?: boolean; children: ReactNode; className?: string };

export function ButtonLink({ variant = "neon", arrow = true, children, className = "", ...rest }: Common & ComponentProps<"a">) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </a>
  );
}

export function Button({ variant = "neon", arrow = true, children, className = "", ...rest }: Common & ComponentProps<"button">) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </button>
  );
}
