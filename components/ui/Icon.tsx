import {
  Bot, Brain, ChartColumn, Cloud, Database, Eye, FileSpreadsheet, Gauge, Image, Layers, Mail, MessageSquare,
  Monitor, Palette, RotateCcw, ScanFace, ScanText, Scissors, Search, Server, ShieldCheck, Sparkles, Target,
  Workflow, Zap, type LucideProps,
} from "lucide-react";

/* Table nom → icône Lucide, pour référencer les icônes depuis lib/data.ts. */
const icons = {
  Bot, Brain, ChartColumn, Cloud, Database, Eye, FileSpreadsheet, Gauge, Image, Layers, Mail, MessageSquare,
  Monitor, Palette, RotateCcw, ScanFace, ScanText, Scissors, Search, Server, ShieldCheck, Sparkles, Target,
  Workflow, Zap,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = icons[name as keyof typeof icons] ?? Sparkles;
  return <C {...props} />;
}
