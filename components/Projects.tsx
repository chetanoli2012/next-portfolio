"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useState } from "react";
import { ArrowSquareOut, GithubLogo } from "phosphor-react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-50/5 to-gray-900/10 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border border-gray-100/10 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-semibold mb-3 text-white/90">
                    {project.title}
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      y: hoveredProject === project.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-white/80 mb-4 line-clamp-3"
                  >
                    {project.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-full text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-blue-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowSquareOut size={20} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white/90 hover:text-blue-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <GithubLogo size={20} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
