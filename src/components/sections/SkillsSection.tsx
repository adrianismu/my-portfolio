"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPython, 
  SiJavascript, 
  SiGit, 
  SiDocker, 
  SiMongodb, 
  SiPostgresql, 
  SiFirebase 
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SparklesCore } from "@/components/ui/sparkles";

const skills = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
];

export default function SkillsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden w-full min-h-screen flex items-center" id="skills">
      {/* Sparkles Background */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#6366f1"
        />
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Technologies and tools I work with
          </motion.p>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  viewport={{ once: true }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        className="group relative p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "rgba(17, 24, 39, 0.8)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent 
                          className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300"
                          style={{ 
                            filter: "grayscale(100%)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = "grayscale(0%)";
                            e.currentTarget.style.color = skill.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = "grayscale(100%)";
                            e.currentTarget.style.color = "";
                          }}
                        />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-gray-900 text-white border-gray-700"
                    >
                      <p className="font-medium">{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
