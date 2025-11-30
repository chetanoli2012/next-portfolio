"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "phosphor-react";
import { projects } from "@/data/projects";
import Badge from "@/components/ui/Badge";

const categories = ["All", "Frontend", "Full Stack", "Open Source"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // In a real app, projects would have categories
  const filteredProjects = projects;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-accent" />
            <span className="font-mono text-accent uppercase tracking-widest text-sm">
              Portfolio
            </span>
          </div>
          <h1 className="font-display text-display-lg font-bold tracking-tight mb-6">
            SELECTED
            <br />
            <span className="text-outline">WORK</span>
          </h1>
          <p className="max-w-2xl text-muted font-mono text-lg">
            A collection of projects I&apos;ve worked on, ranging from
            full-stack applications to open-source contributions and
            experimental builds.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider border-2 transition-colors ${
                activeCategory === category
                  ? "bg-accent text-bg border-accent"
                  : "border-border text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={`/work/${project.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden border-2 border-border mb-6 group-hover:border-accent transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 opacity-60" />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge variant="accent">
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-accent/10 z-10 flex items-center justify-center"
                  >
                    <div className="p-4 bg-accent text-bg">
                      <ArrowUpRight size={32} weight="bold" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h2 className="font-display text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <ArrowUpRight
                      size={24}
                      className="text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                  <p className="text-muted font-mono text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="muted">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted font-mono">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
