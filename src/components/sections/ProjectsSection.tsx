"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { GlowingCard } from "@/components/ui/glowing-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { ExternalLink, Github, Filter, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [momentum, setMomentum] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const filteredProjects = allProjects.filter(project => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Featured") return project.featured;
    return project.category === selectedCategory;
  });

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Smooth scroll with momentum
  const applyMomentum = () => {
    if (!scrollContainerRef.current || Math.abs(momentum) < 0.1) {
      setMomentum(0);
      return;
    }

    scrollContainerRef.current.scrollLeft += momentum;
    setMomentum(momentum * 0.95); // Decay factor
    animationRef.current = requestAnimationFrame(applyMomentum);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setMomentum(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setDragStart({
        x: e.pageX,
        scrollLeft: scrollContainerRef.current.scrollLeft,
      });
      lastMoveTimeRef.current = Date.now();
      velocityRef.current = 0;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setMomentum(velocityRef.current * 10); // Apply momentum
      animationRef.current = requestAnimationFrame(applyMomentum);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setMomentum(velocityRef.current * 10); // Apply momentum
      animationRef.current = requestAnimationFrame(applyMomentum);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastMoveTimeRef.current;
    const x = e.pageX;
    const deltaX = x - dragStart.x;
    const newScrollLeft = dragStart.scrollLeft - deltaX;
    
    // Calculate velocity for momentum
    if (deltaTime > 0) {
      velocityRef.current = (scrollContainerRef.current.scrollLeft - newScrollLeft) / deltaTime;
    }
    
    scrollContainerRef.current.scrollLeft = newScrollLeft;
    lastMoveTimeRef.current = currentTime;
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setMomentum(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setDragStart({
        x: e.touches[0].pageX,
        scrollLeft: scrollContainerRef.current.scrollLeft,
      });
      lastMoveTimeRef.current = Date.now();
      velocityRef.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastMoveTimeRef.current;
    const x = e.touches[0].pageX;
    const deltaX = x - dragStart.x;
    const newScrollLeft = dragStart.scrollLeft - deltaX;
    
    // Calculate velocity for momentum
    if (deltaTime > 0) {
      velocityRef.current = (scrollContainerRef.current.scrollLeft - newScrollLeft) / deltaTime;
    }
    
    scrollContainerRef.current.scrollLeft = newScrollLeft;
    lastMoveTimeRef.current = currentTime;
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setMomentum(velocityRef.current * 10); // Apply momentum
      animationRef.current = requestAnimationFrame(applyMomentum);
    }
  };

  // Arrow navigation functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 360; // Width of each card + gap
      const scrollAmount = cardWidth + 16; // Card width + gap
      scrollContainerRef.current.scrollBy({ 
        left: -scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 360; // Width of each card + gap
      const scrollAmount = cardWidth + 16; // Card width + gap
      scrollContainerRef.current.scrollBy({ 
        left: scrollAmount, 
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
              className={`flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-4 will-change-scroll ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
              style={{
                scrollBehavior: isDragging ? 'auto' : 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
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
                  className="flex-shrink-0 w-[360px] h-[370px] p-2"
                  style={{ minWidth: '360px', maxWidth: '360px' }}
                >
                  <GlowingCard 
                    className="h-full w-full"
                    glowColor={project.featured ? "rgba(139, 92, 246, 0.5)" : "rgba(59, 130, 246, 0.3)"}
                  >
                    <div className="group relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 h-full w-full">
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 z-10 bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}

                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
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
                  <div className="p-4 flex flex-col justify-between" style={{ height: 'calc(100% - 160px)' }}>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors line-clamp-2 flex-1">
                          {project.title}
                        </h3>
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full whitespace-nowrap ml-2 flex-shrink-0">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
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
                    <div className="flex gap-2 mt-auto">
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 text-sm flex-1 justify-center"
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
                        className="flex items-center gap-1 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors duration-300 text-sm flex-1 justify-center"
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
              onClick={scrollLeft}
              className="p-3 rounded-full bg-gray-900/50 border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 group"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </motion.button>

            {/* Center Indicator */}
            <div className="text-gray-500 text-sm flex items-center gap-2 px-4">
              <span>Drag to scroll or use arrows</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              onClick={scrollRight}
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
