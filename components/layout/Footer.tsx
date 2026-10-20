import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";

const link =
  "inline-flex items-center gap-2 rounded-full border border-line2 px-3.5 py-2 font-sans text-[13.5px] font-semibold text-ink transition-colors hover:border-neon hover:bg-neon hover:text-bg";

export function Footer() {
  return (
    <footer className="border-t border-line pt-[30px] pb-[calc(30px+env(safe-area-inset-bottom,0px))]">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ink3">
        <span>© {new Date().getFullYear()} {profile.name} · AI, Full-Stack &amp; Design</span>
        <div className="flex flex-wrap gap-2">
          <a className={link} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon /> {profile.linkedinName}
          </a>
          <a className={link} href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon /> GitHub
          </a>
          <span className="inline-flex items-center gap-2 px-1 py-2 font-sans text-[13.5px] font-semibold text-ink">
            <Mail size={15} /> {profile.email}
          </span>
        </div>
      </div>
    </footer>
  );
}
