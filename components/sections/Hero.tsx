"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Clock } from "phosphor-react";
import Link from "next/link";
import TextScramble from "../ui/TextScramble";
import MagneticElement from "../ui/MagneticElement";

const roles = [
  "Senior Software Engineer",
  "Frontend Architect",
  "React Specialist",
  "UI/UX Developer",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setIsLoaded(true);

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kathmandu",
          hour12: true,
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Cycle through roles
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(roleInterval);
    };
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById("featured-work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Noise Texture */}
      <div className="absolute inset-0 noise" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20"
      >
        {/* Top Bar - Location & Time */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between mb-12 font-mono text-sm text-muted"
        >
          <div className="flex items-center gap-2">
            <MapPin size={16} weight="bold" />
            <span>Kathmandu, Nepal</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} weight="bold" />
            <span>{currentTime} NPT</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="h-[2px] w-12 bg-accent" />
            <span className="font-mono text-accent uppercase tracking-widest">
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 60 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-display-xl font-bold tracking-tight"
          >
            <span className="block">CHETAN</span>
            <span className="block text-outline">OLI</span>
          </motion.h1>

          {/* Role with Scramble Effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-12 flex items-center"
          >
            <span className="font-mono text-xl md:text-2xl text-muted">
              {"// "}
            </span>
            <TextScramble
              key={currentRole}
              text={roles[currentRole]}
              className="font-mono text-xl md:text-2xl text-accent"
              revealDelay={100}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl text-lg md:text-xl text-muted font-mono leading-relaxed"
          >
            Building exceptional digital experiences with{" "}
            <span className="text-fg">6+ years</span> of frontend expertise.
            Specializing in <span className="text-accent">React</span>,{" "}
            <span className="text-accent">Next.js</span>, and{" "}
            <span className="text-accent">TypeScript</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <MagneticElement strength={0.2}>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
              >
                View My Work
              </Link>
            </MagneticElement>

            <MagneticElement strength={0.2}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-fg font-mono text-sm uppercase tracking-wider font-bold border-2 border-fg hover:bg-fg hover:text-bg transition-colors"
              >
                About Me
              </Link>
            </MagneticElement>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 60 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t-2 border-border"
        >
          {[
            { value: "6+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "20+", label: "Happy Clients" },
            { value: "∞", label: "Lines of Code" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="font-mono text-sm text-muted uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors cursor-pointer"
      >
        <span className="font-mono text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={24} weight="bold" />
        </motion.div>
      </motion.button>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 right-0 w-[40vw] h-[40vw] border-2 border-accent -translate-y-1/2 translate-x-1/2 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-accent -translate-x-1/2 translate-y-1/2 pointer-events-none"
      />
    </section>
  );
}
