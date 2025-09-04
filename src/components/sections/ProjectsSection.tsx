"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingCard } from "@/components/ui/glowing-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { ExternalLink, Github, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const allProjects = [
  {
    id: 1,
    title: "Insightfy",
    description: "aplikasi web dashboard analitik yang modern dan responsif untuk menganalisis berita terkini dari berbagai sumber media internasional. Aplikasi ini mengintegrasikan data real-time dari NewsAPI.org dan menyajikannya dalam bentuk visualisasi interaktif yang mudah dipahami.",
    image: "/images/projects/insightfy.png",
    demo: "#", 
    github: "https://github.com/adrianismu/insightfy",
    technologies: ["C#", "TypeScript", "Tailwind CSS"], 
    category: "Web App",
    featured: true,
  },
  {
    id: 2,
    title: "BurjoAPI",
    description: "API backend untuk aplikasi mobile kebugaran yang dibangun menggunakan ASP.NET Core 8 dengan Clean Architecture dan Swagger.",
    image: "/images/projects/burjoapi.png", 
    demo: "#",
    github: "https://github.com/adrianismu/BurjoAPI",
    technologies: ["C#", ".NET Core", "MySQL", "Swagger"], 
    category: "Web App",
    featured: true,
  },
  {
    id: 3,
    title: "StokQ - Aplikasi Manajemen Stok",
    description: "Aplikasi full-stack untuk manajemen stok barang. Bagian backend mengelola logika bisnis dan database, sementara frontend menyediakan antarmuka pengguna yang interaktif.",
    image: "/images/projects/stokq.png", 
    demo: "#",
    github: "https://github.com/adrianismu/StokQ-backend", 
    technologies: ["Go", "Flutter", "PostgreSQL"], 
    category: "Web App",
    featured: false,
  },
  {
    id: 4,
    title: "Pump Station Monitoring",
    description: "Proyek untuk memonitor status dan data dari stasiun pompa air secara real-time. Sistem ini menyediakan dashboard interaktif untuk memantau performa dan kondisi operasional stasiun pompa.",
    image: "/images/projects/pump-station.png",
    demo: "#",
    github: "https://github.com/adrianismu/pump-station",
    technologies: ["Vue.js", "Laravel", "Shadcn"], 
    category: "Dashboard",
    featured: true,
  },
  {
    id: 5,
    title: "Cloud Computing Capstone (Bangkit)",
    description: "Proyek akhir dari program Bangkit Academy, berfokus pada solusi berbasis cloud computing. Mengimplementasikan arsitektur cloud-native dengan layanan Google Cloud Platform untuk skalabilitas dan performa optimal.",
    image: "/images/projects/cloud-capstone.webp", 
    demo: "#",
    github: "https://github.com/SkyAfra/Cloud-Computing",
    technologies: ["Google Cloud", "Express.js", "TensorFlow.js"],
    category: "Web App",
    featured: true,
  },
  {
    id: 6,
    title: "Vehicle Rush Game",
    description: "Sebuah game sederhana yang dibangun menggunakan Java dengan konsep object-oriented programming. Game ini menampilkan gameplay yang menarik dengan sistem kontrol kendaraan dan mekanisme game yang responsif.",
    image: "/images/projects/vehicle-rush.png",
    demo: "#",
    github: "https://github.com/adrianismu/Vehicle-Rush",
    technologies: ["Java"], 
    category: "Desktop App",
    featured: false,
  },
];

const categories = ["All", "Featured", "Web App", "Mobile App", "Dashboard", "Website", "Desktop App"];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = allProjects.filter(project => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Featured") return project.featured;
    return project.category === selectedCategory;
  });

  // Arrow navigation
  const scrollLeftNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -450,
        behavior: 'smooth'
      });
    }
  };

  const scrollRightNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 450,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-20 bg-black overflow-hidden relative w-full min-h-screen">
      {/* Sparkles Background */}
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#8b5cf6"
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
            My Projects
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore my work across different categories and technologies
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Project Count */}
          <motion.div 
            className="flex items-center justify-center gap-2 text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">
              Showing {filteredProjects.length} projects
            </span>
          </motion.div>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="relative overflow-hidden">
          {/* Projects Horizontal Scroll */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-4"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  className="flex-shrink-0 w-[420px] h-[520px] p-2"
                  style={{ minWidth: '420px', maxWidth: '420px', height: '470px' }}
                >
                  <GlowingCard 
                    className="h-full w-full"
                    glowColor={project.featured ? "rgba(139, 92, 246, 0.5)" : "rgba(59, 130, 246, 0.3)"}
                  >
                    <div className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 h-full w-full flex flex-col">
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 z-10 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors flex-1 line-clamp-1">
                          {project.title}
                        </h3>
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full whitespace-nowrap ml-3 flex-shrink-0">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded-full border border-gray-600">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto pt-4">
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 text-xs flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={12} />
                        Demo
                      </motion.a>
                      
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors duration-300 text-xs flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={12} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Arrow Navigation */}
          <motion.div 
            className="flex justify-center items-center mt-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Left Arrow */}
            <motion.button
              onClick={scrollLeftNav}
              className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 group"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </motion.button>

            {/* Center Indicator */}
            <div className="text-gray-500 text-sm flex items-center gap-2 px-4">
              <span>Use arrows to navigate</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={scrollRightNav}
              className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 group"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
