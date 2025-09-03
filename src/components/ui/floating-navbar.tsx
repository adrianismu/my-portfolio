"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Code, Mail, Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactElement;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const iconMap: { [key: string]: React.ReactElement } = {
    "Home": <Home className="w-4 h-4" />,
    "Skills": <User className="w-4 h-4" />,
    "Projects": <Code className="w-4 h-4" />,
    "Contact": <Mail className="w-4 h-4" />,
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() || 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "hidden md:flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-gray-800 rounded-full bg-black/80 backdrop-blur-md shadow-lg z-[5000] px-6 py-3 items-center justify-center space-x-6",
            className
          )}
        >
          {navItems.map((navItem, idx) => (
            <motion.button
              key={`link=${idx}`}
              onClick={() => scrollToSection(navItem.link)}
              className="relative group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">{navItem.name}</span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed top-6 right-6 z-[5000]"
      >
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-black/80 backdrop-blur-md border border-gray-800 rounded-full text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 bg-black/90 backdrop-blur-md border border-gray-800 rounded-2xl p-4 min-w-[200px]"
            >
              {navItems.map((navItem, idx) => (
                <motion.button
                  key={`mobile-link=${idx}`}
                  onClick={() => scrollToSection(navItem.link)}
                  className="w-full flex items-center space-x-3 text-gray-300 hover:text-white p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {iconMap[navItem.name] || <div className="w-4 h-4" />}
                  <span className="text-sm font-medium">{navItem.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
