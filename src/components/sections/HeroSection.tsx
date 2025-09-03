"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { MagicButton } from "@/components/ui/magic-button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const words = [
    {
      text: "Full-Stack",
    },
    {
      text: "Developer",
    },
    {
      text: "&",
    },
    {
      text: "UI",
    },
    {
      text: "Enthusiast",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const handleScroll = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center">
      {/* Spotlight Background */}
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="purple"
      />
      <Spotlight
        className="left-80 top-28 h-[80vh] w-[50vw]"
        fill="blue"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Halo, Saya John Doe
        </h1>
        
        <div className="mb-8">
          <TypewriterEffect words={words} />
        </div>

        <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl">
          Saya menciptakan pengalaman digital yang menakjubkan dengan teknologi modern. 
          Mari berkolaborasi untuk mewujudkan ide Anda menjadi kenyataan.
        </p>

        <MagicButton
          title="Lihat Proyek Saya"
          icon={<ChevronDown size={20} />}
          position="right"
          handleClick={handleScroll}
        />
      </div>
    </section>
  );
}
