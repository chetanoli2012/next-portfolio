"use client";

import { motion } from "framer-motion";
import { GithubLogo, Star, GitFork, ArrowUpRight } from "phosphor-react";
import ContributionGraph from "../ui/ContributionGraph";

// Mock data - in production, this would come from the GitHub API
const mockRepos = [
  {
    name: "next-portfolio",
    description: "Personal portfolio built with Next.js and Framer Motion",
    stars: 128,
    forks: 34,
    language: "TypeScript",
    url: "https://github.com/chetanoli/next-portfolio",
  },
  {
    name: "react-hooks-collection",
    description: "A collection of useful React hooks for everyday use",
    stars: 256,
    forks: 45,
    language: "TypeScript",
    url: "https://github.com/chetanoli/react-hooks-collection",
  },
  {
    name: "tailwind-components",
    description: "Beautiful UI components built with Tailwind CSS",
    stars: 189,
    forks: 28,
    language: "CSS",
    url: "https://github.com/chetanoli/tailwind-components",
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  CSS: "bg-purple-500",
  HTML: "bg-orange-500",
  Python: "bg-green-500",
};

export default function GitHubActivity() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 border-t-2 border-border">
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
              02
            </span>
            <div className="h-[2px] w-12 bg-accent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-display-md font-bold tracking-tight">
              OPEN
              <br />
              <span className="text-outline">SOURCE</span>
            </h2>
            <a
              href="https://github.com/chetanoli"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted hover:text-accent transition-colors"
            >
              <GithubLogo size={20} weight="bold" />
              @chetanoli
              <ArrowUpRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 p-6 border-2 border-border"
        >
          <ContributionGraph />
        </motion.div>

        {/* Pinned Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-6">
            Pinned Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRepos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group p-6 border-2 border-border hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-mono text-fg group-hover:text-accent transition-colors">
                    {repo.name}
                  </h4>
                  <ArrowUpRight
                    size={16}
                    className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <p className="text-sm text-muted font-mono mb-4 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 ${
                        languageColors[repo.language] || "bg-gray-500"
                      }`}
                    />
                    <span className="text-xs text-muted font-mono">
                      {repo.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-muted">
                      <Star size={14} weight="bold" />
                      <span className="text-xs font-mono">{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted">
                      <GitFork size={14} weight="bold" />
                      <span className="text-xs font-mono">{repo.forks}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Repositories", value: "45+" },
            { label: "Stars Earned", value: "500+" },
            { label: "Contributions", value: "2,500+" },
            { label: "Pull Requests", value: "150+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 border-2 border-border text-center"
            >
              <div className="font-display text-3xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
