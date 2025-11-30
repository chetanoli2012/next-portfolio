"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Trophy,
  Heart,
  Code,
  ArrowUpRight,
} from "phosphor-react";
import Badge from "@/components/ui/Badge";
import { Testimonials } from "@/components/sections";

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "Remote",
    period: "2021 - Present",
    description:
      "Leading frontend architecture for enterprise applications. Mentoring junior developers and establishing coding standards.",
    achievements: [
      "Reduced page load time by 60% through optimization",
      "Led migration from legacy codebase to React",
      "Implemented design system used across 5 products",
    ],
  },
  {
    title: "Software Engineer",
    company: "StartupXYZ",
    location: "Kathmandu, Nepal",
    period: "2019 - 2021",
    description:
      "Full-stack development for a SaaS platform serving 10K+ users. Worked closely with product and design teams.",
    achievements: [
      "Built real-time collaboration features",
      "Improved test coverage from 40% to 85%",
      "Reduced deployment time by 70% with CI/CD",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    location: "Kathmandu, Nepal",
    period: "2018 - 2019",
    description:
      "Developed responsive web applications for various clients. Focused on performance and accessibility.",
    achievements: [
      "Delivered 15+ client projects on time",
      "Introduced React to the team",
      "Created reusable component library",
    ],
  },
];

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
  tools: ["Git", "Docker", "AWS", "Vercel", "Figma"],
};

const values = [
  {
    icon: Code,
    title: "Clean Code",
    description:
      "Writing maintainable, readable code that stands the test of time.",
  },
  {
    icon: Heart,
    title: "User-First",
    description: "Every decision is made with the end user experience in mind.",
  },
  {
    icon: Trophy,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[2px] w-12 bg-accent" />
                <span className="font-mono text-accent uppercase tracking-widest text-sm">
                  About Me
                </span>
              </div>
              <h1 className="font-display text-display-md font-bold tracking-tight mb-6">
                CRAFTING
                <br />
                <span className="text-outline">DIGITAL</span>
                <br />
                EXPERIENCES
              </h1>
              <div className="space-y-6 text-muted font-mono leading-relaxed">
                <p>
                  I&apos;m a Senior Software Engineer with over{" "}
                  <span className="text-accent">6 years</span> of experience
                  building exceptional web applications. Based in{" "}
                  <span className="text-fg">Kathmandu, Nepal</span>, I
                  specialize in frontend development with a focus on React and
                  Next.js.
                </p>
                <p>
                  My journey in tech started with a curiosity about how websites
                  work, which evolved into a passion for creating intuitive and
                  performant user experiences. I believe in writing clean,
                  maintainable code and staying up-to-date with the latest
                  industry trends.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge through technical writing.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 border-2 border-border">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <MapPin size={18} weight="bold" />
                    <span className="font-mono text-xs uppercase tracking-wider">
                      Location
                    </span>
                  </div>
                  <p className="font-mono text-fg">Kathmandu, Nepal</p>
                </div>
                <div className="p-4 border-2 border-border">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Briefcase size={18} weight="bold" />
                    <span className="font-mono text-xs uppercase tracking-wider">
                      Experience
                    </span>
                  </div>
                  <p className="font-mono text-fg">6+ Years</p>
                </div>
              </div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square">
                {/* Decorative elements */}
                <div className="absolute inset-0 border-2 border-accent translate-x-4 translate-y-4" />
                <div className="absolute inset-0 bg-bg border-2 border-fg">
                  {/* Placeholder for actual photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-transparent">
                    <span className="font-display text-[200px] font-bold text-accent/20">
                      C
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 border-t-2 border-border">
        <div className="max-w-[1400px] mx-auto">
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
            <h2 className="font-display text-display-md font-bold tracking-tight">
              CORE
              <br />
              <span className="text-outline">VALUES</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 border-2 border-border hover:border-accent transition-colors group"
              >
                <value.icon
                  size={48}
                  weight="bold"
                  className="text-accent mb-6"
                />
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted font-mono">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 border-t-2 border-border">
        <div className="max-w-[1400px] mx-auto">
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
            <h2 className="font-display text-display-md font-bold tracking-tight">
              SKILLS &<br />
              <span className="text-outline">EXPERTISE</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="p-8 border-2 border-border"
              >
                <h3 className="font-mono text-sm uppercase tracking-wider text-accent mb-6">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 border-t-2 border-border">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-accent uppercase tracking-widest text-sm">
                03
              </span>
              <div className="h-[2px] w-12 bg-accent" />
            </div>
            <h2 className="font-display text-display-md font-bold tracking-tight">
              WORK
              <br />
              <span className="text-outline">EXPERIENCE</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b-2 border-border"
              >
                {/* Timeline indicator */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-32">
                    <div className="w-4 h-4 bg-accent" />
                    {index < experiences.length - 1 && (
                      <div className="w-[2px] h-full bg-border absolute left-[7px] top-4" />
                    )}
                  </div>
                </div>

                {/* Period */}
                <div className="lg:col-span-3">
                  <div className="font-mono text-accent text-sm uppercase tracking-wider mb-2">
                    {exp.period}
                  </div>
                  <div className="font-mono text-muted text-sm flex items-center gap-2">
                    <MapPin size={14} weight="bold" />
                    {exp.location}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8">
                  <h3 className="font-display text-2xl font-bold mb-2">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-accent mb-4">{exp.company}</p>
                  <p className="text-muted font-mono mb-6">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted font-mono text-sm"
                      >
                        <span className="text-accent mt-1">→</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 border-t-2 border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-display-md font-bold tracking-tight mb-8">
              LET&apos;S WORK
              <br />
              <span className="text-outline">TOGETHER</span>
            </h2>
            <p className="max-w-2xl mx-auto text-muted font-mono mb-12">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@chetanoli.dev"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
              >
                Get in Touch
                <ArrowUpRight size={18} weight="bold" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-fg font-mono text-sm uppercase tracking-wider font-bold border-2 border-fg hover:bg-fg hover:text-bg transition-colors"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
