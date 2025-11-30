"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GithubLogo, Globe } from "phosphor-react";
import { projects } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);

  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to Work
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-display text-display-md font-bold tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="max-w-3xl text-muted font-mono text-lg mb-8">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
              >
                <Globe size={18} weight="bold" />
                Live Demo
                <ArrowUpRight size={16} weight="bold" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-fg font-mono text-sm uppercase tracking-wider font-bold border-2 border-fg hover:bg-fg hover:text-bg transition-colors"
              >
                <GithubLogo size={18} weight="bold" />
                View Code
                <ArrowUpRight size={16} weight="bold" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video overflow-hidden border-2 border-border mb-16"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-4">
                <span className="text-accent font-mono text-sm">01</span>
                Overview
              </h2>
              <p className="text-muted font-mono leading-relaxed">
                {project.description} This project showcases modern web
                development practices including responsive design, performance
                optimization, and accessibility considerations. The architecture
                was designed with scalability in mind, allowing for easy feature
                additions and maintenance.
              </p>
            </div>

            {/* Problem & Solution */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-4">
                <span className="text-accent font-mono text-sm">02</span>
                Problem & Solution
              </h2>
              <div className="space-y-4">
                <div className="p-6 border-2 border-border">
                  <h3 className="font-mono text-accent uppercase tracking-wider text-sm mb-2">
                    The Challenge
                  </h3>
                  <p className="text-muted font-mono">
                    Building a scalable and performant application that handles
                    complex user interactions while maintaining a seamless user
                    experience across all devices.
                  </p>
                </div>
                <div className="p-6 border-2 border-accent bg-accent/5">
                  <h3 className="font-mono text-accent uppercase tracking-wider text-sm mb-2">
                    The Solution
                  </h3>
                  <p className="text-fg font-mono">
                    Implemented a modular architecture with optimized rendering
                    patterns, lazy loading, and efficient state management to
                    ensure smooth performance even with large datasets.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Highlights */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-4">
                <span className="text-accent font-mono text-sm">03</span>
                Technical Highlights
              </h2>
              <ul className="space-y-3">
                {[
                  "Server-side rendering for improved SEO and initial load performance",
                  "Optimistic UI updates for instant user feedback",
                  "Comprehensive test coverage with unit and integration tests",
                  "CI/CD pipeline with automated deployments",
                  "Responsive design with mobile-first approach",
                ].map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted font-mono"
                  >
                    <span className="text-accent mt-1">→</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Technologies */}
            <div className="p-6 border-2 border-border">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Role */}
            <div className="p-6 border-2 border-border">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-4">
                My Role
              </h3>
              <p className="font-mono text-fg">Lead Frontend Developer</p>
              <p className="font-mono text-sm text-muted mt-2">
                Architecture, UI Development, Performance Optimization
              </p>
            </div>

            {/* Timeline */}
            <div className="p-6 border-2 border-border">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-4">
                Timeline
              </h3>
              <p className="font-mono text-fg">3 months</p>
              <p className="font-mono text-sm text-muted mt-2">Q1 2024</p>
            </div>

            {/* Team Size */}
            <div className="p-6 border-2 border-border">
              <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-4">
                Team Size
              </h3>
              <p className="font-mono text-fg">5 members</p>
              <p className="font-mono text-sm text-muted mt-2">
                2 Frontend, 2 Backend, 1 Designer
              </p>
            </div>
          </motion.div>
        </div>

        {/* Next Project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t-2 border-border pt-12"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm uppercase tracking-wider text-muted">
              Next Project
            </span>
            <Link
              href="/work"
              className="font-mono text-sm uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              View All
            </Link>
          </div>
          {projects.find((p) => p.id !== project.id) && (
            <Link
              href={`/work/${projects
                .find((p) => p.id !== project.id)!
                .title.toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="group block mt-6"
            >
              <h3 className="font-display text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                {projects.find((p) => p.id !== project.id)!.title}
                <ArrowUpRight
                  size={32}
                  className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </h3>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
