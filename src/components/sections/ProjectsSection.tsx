"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { ExternalLink, Github, Filter } from "lucide-react";
import Image from "next/image";

const allProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce platform with full features, integrated payment gateway, and powerful admin dashboard.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com",
    github: "https://github.com/johndoe/ecommerce",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    category: "Web App",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Task management app with real-time collaboration, drag & drop interface, and push notifications.",
    image: "/api/placeholder/600/400", 
    demo: "https://example.com",
    github: "https://github.com/johndoe/taskapp",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web App",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Weather dashboard with interactive data visualization, 7-day forecast, and multiple weather APIs integration.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com", 
    github: "https://github.com/johndoe/weather",
    technologies: ["Vue.js", "D3.js", "Express", "Redis"],
    category: "Dashboard",
    featured: true,
  },
  {
    id: 4,
    title: "Social Media App",
    description: "Social media app with real-time chat, story sharing, and intelligent feed algorithm.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com",
    github: "https://github.com/johndoe/social",
    technologies: ["React Native", "Firebase", "GraphQL", "AWS"],
    category: "Mobile App",
    featured: true,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Modern portfolio website with dark theme, smooth animations, and responsive design.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com",
    github: "https://github.com/johndoe/portfolio",
    technologies: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    category: "Website",
    featured: false,
  },
  {
    id: 6,
    title: "Crypto Tracker",
    description: "Cryptocurrency tracking application with real-time prices, charts, and portfolio management.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com",
    github: "https://github.com/johndoe/crypto",
    technologies: ["React", "Chart.js", "CoinGecko API", "Redux"],
    category: "Web App",
    featured: false,
  },
  {
    id: 7,
    title: "Restaurant POS",
    description: "Point of sale system for restaurants with order management, inventory tracking, and analytics.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com",
    github: "https://github.com/johndoe/pos",
    technologies: ["React", "Node.js", "PostgreSQL", "Electron"],
    category: "Desktop App",
    featured: false,
  },
  {
    id: 8,
    title: "Fitness Tracker",
    description: "Mobile fitness application with workout tracking, nutrition logging, and progress analytics.",
    image: "/api/placeholder/600/400",
    demo: "https://example.com",
    github: "https://github.com/johndoe/fitness",
    technologies: ["React Native", "SQLite", "HealthKit", "Firebase"],
    category: "Mobile App",
    featured: false,
  },
];

const categories = ["All", "Featured", "Web App", "Mobile App", "Dashboard", "Website", "Desktop App"];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  const filteredProjects = allProjects.filter(project => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Featured") return project.featured;
    return project.category === selectedCategory;
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.pageX - scrollContainerRef.current.offsetLeft,
        scrollLeft: scrollContainerRef.current.scrollLeft,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].pageX - scrollContainerRef.current.offsetLeft,
        scrollLeft: scrollContainerRef.current.scrollLeft,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2;
    scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="projects" className="py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
        <div className="relative">
          {/* Projects Horizontal Scroll */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              ref={scrollContainerRef}
              className={`flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-4 ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
                  className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 flex-shrink-0 w-[400px] h-[500px]"
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Evervault Effect Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <EvervaultCard text={project.title} className="h-full" />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
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

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 text-sm flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={14} />
                        Demo
                      </motion.a>
                      
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors duration-300 text-sm flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={14} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Scroll Indicator */}
          <motion.div 
            className="flex justify-center mt-8 gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-500 text-sm flex items-center gap-2">
              <span>Drag to scroll or use mouse wheel</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
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
