import { FloatingNav } from "@/components/ui/floating-navbar";
import { TracingBeam } from "@/components/ui/tracing-beam";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

const navItems = [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen w-full overflow-x-hidden">
      <FloatingNav navItems={navItems} />
      <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
    </main>
  );
}
