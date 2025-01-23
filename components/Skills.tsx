"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { useState } from "react";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "frontend" | "backend" | "tools"
  >("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>

        <div className="flex gap-4 mb-8 flex-wrap">
          {["all", "frontend", "backend", "tools"].map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(category as typeof activeCategory)
              }
              className={`px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md ${
                activeCategory === category
                  ? "bg-white/20 text-white border border-white/30 shadow-lg"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                <span className="text-sm text-white/70">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
