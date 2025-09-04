"use client";
import dynamic from "next/dynamic";
import { FloatingNav } from "@/components/ui/floating-navbar";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load heavy components
const TracingBeam = dynamic(() => import("@/components/ui/tracing-beam").then(mod => ({ default: mod.TracingBeam })), {
  loading: () => <div className="w-full h-20" />,
});

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <div className="w-full h-screen bg-black" />,
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <div className="w-full h-screen bg-black" />,
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="w-full h-screen bg-black" />,
});

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
      
      {/* TracingBeam untuk sections setelah hero */}
      <TracingBeam className="w-full overflow-x-hidden">
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </TracingBeam>
    </main>
  );
}
