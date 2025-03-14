"use client";

import { motion } from "framer-motion";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import AnimatedGreeting from "@/components/AnimatedGreeting";

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <section id="home" className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <AnimatedGreeting />
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Chetan Oli
          </motion.h1>
          <motion.h2
            className="text-2xl text-gray-500 dark:text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Software Developer
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-x-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full transition-colors text-white"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="border border-blue-600 hover:bg-blue-600/10 px-6 py-3 rounded-full transition-colors"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </section>
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
