"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "phosphor-react";
import { projects } from "@/data/projects";
import Badge from "../ui/Badge";

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-work"
      ref={containerRef}
      className="py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-accent uppercase tracking-widest text-sm">
              01
            </span>
            <div className="h-[2px] w-12 bg-accent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-display-md font-bold tracking-tight">
              FEATURED
              <br />
              <span className="text-outline">WORK</span>
            </h2>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              View All Projects
              <ArrowRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <motion.div
        style={{ y: imageY }}
        className={`relative aspect-[4/3] overflow-hidden border-2 border-border group ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 opacity-60" />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="accent">{String(index + 1).padStart(2, "0")}</Badge>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-accent/10 z-10 flex items-center justify-center"
        >
          <Link
            href={project.liveUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-accent text-bg"
          >
            <ArrowUpRight size={32} weight="bold" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className={`space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="space-y-4">
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            {project.title}
          </h3>
          <p className="text-muted font-mono leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-fg hover:text-accent transition-colors"
            >
              Live Demo
              <ArrowUpRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-fg hover:text-accent transition-colors"
            >
              Source Code
              <ArrowUpRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
