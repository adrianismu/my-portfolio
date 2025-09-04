"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { MagicButton } from "@/components/ui/magic-button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const words = [
    {
      text: "Backend",
      className: "text-white dark:text-white",
    },
    {
      text: "&",
      className: "text-white dark:text-white",
    },
    {
      text: "Software",
      className: "text-white dark:text-white",
    },
    {
      text: "Engineer",
      className: "text-blue-400 dark:text-blue-400",
    },
  ];

  const handleScroll = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Wavy Background */}
      <WavyBackground 
        className="absolute inset-0"
        backgroundFill="black"
        colors={["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"]}
        waveWidth={50}
        blur={10}
        speed="fast"
        waveOpacity={0.5}
      />
      
      {/* Sparkles Effect - Reduced particles for performance */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#3b82f6"
        />
      </div>

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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
          Hi, I&apos;m Adrian Ismu Arifianto
        </h1>
        
        <div className="mb-8 text-white">
          <TypewriterEffect words={words} className="text-white" />
        </div>

        {/* <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl">
          Saya adalah Software Engineer yang berfokus pada pengembangan backend dengan teknologi modern. 
          Mari berkolaborasi untuk membangun sistem yang scalable dan robust.
        </p> */}

        <MagicButton
          title="View My Projects"
          icon={<ChevronDown size={20} />}
          position="right"
          handleClick={handleScroll}
        />
      </div>
    </section>
  );
}
