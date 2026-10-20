import { Ambient } from "@/components/layout/Ambient";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Hero } from "@/components/hero/Hero";
import { SkillsBand } from "@/components/sections/SkillsBand";
import { Flagship } from "@/components/flagship/Flagship";
import { Projects } from "@/components/projects/Projects";
import { Automation } from "@/components/automation/Automation";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <SmoothScroll>
      <Ambient />
      <ScrollProgress />
      <Nav />
      <main id="top">
        <Hero />
        <SkillsBand />
        <Flagship />
        <Projects />
        <Automation />
        <About />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
