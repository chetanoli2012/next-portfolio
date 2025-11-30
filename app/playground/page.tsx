"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Code, Sparkle, Cube, Palette, Lightning } from "phosphor-react";
import Badge from "@/components/ui/Badge";

interface Demo {
  id: string;
  title: string;
  description: string;
  icon: typeof Code;
  tags: string[];
  component: React.ReactNode;
}

// Interactive Demo Components
function ButtonDemo() {
  const [clicked, setClicked] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setClicked((c) => c + 1)}
          className="px-6 py-3 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--accent)]"
        >
          Primary
        </button>
        <button className="px-6 py-3 bg-transparent text-fg font-mono text-sm uppercase tracking-wider font-bold border-2 border-fg hover:bg-fg hover:text-bg transition-colors">
          Secondary
        </button>
        <button className="px-6 py-3 bg-transparent text-muted font-mono text-sm uppercase tracking-wider font-bold border-2 border-border hover:border-accent hover:text-accent transition-colors">
          Ghost
        </button>
      </div>
      <p className="font-mono text-sm text-muted">
        Clicked: <span className="text-accent">{clicked}</span> times
      </p>
    </div>
  );
}

function TextScrambleDemo() {
  const [text, setText] = useState("HOVER ME");
  const chars = "!<>-_\\/[]{}—=+*^?#";

  const scramble = () => {
    let iterations = 0;
    const originalText = "HOVER ME";

    const interval = setInterval(() => {
      setText(
        originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };

  return (
    <div
      onMouseEnter={scramble}
      className="inline-block px-8 py-4 border-2 border-accent cursor-pointer"
    >
      <span className="font-display text-4xl font-bold text-accent">
        {text}
      </span>
    </div>
  );
}

function MagneticDemo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * 0.3,
      y: distanceY * 0.3,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center h-40">
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-24 h-24 bg-accent flex items-center justify-center cursor-pointer"
      >
        <Sparkle size={32} weight="fill" className="text-bg" />
      </motion.div>
    </div>
  );
}

function ProgressDemo() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between font-mono text-sm">
          <span>React</span>
          <span className="text-accent">{progress}%</span>
        </div>
        <div className="h-2 bg-border">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}

function CardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        whileHover={{ x: -4, y: -4 }}
        className="p-6 border-2 border-border hover:border-accent transition-colors cursor-pointer"
        style={{ boxShadow: "4px 4px 0 0 var(--border)" }}
      >
        <Cube size={32} className="text-accent mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">Elevated Card</h3>
        <p className="text-muted font-mono text-sm">
          Hover to see the brutalist shadow effect.
        </p>
      </motion.div>
      <div className="p-6 border-2 border-accent bg-accent/5">
        <Lightning size={32} className="text-accent mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">Accent Card</h3>
        <p className="text-muted font-mono text-sm">
          A card with accent border and background.
        </p>
      </div>
    </div>
  );
}

function ColorPaletteDemo() {
  const colors = [
    { name: "Background", var: "--bg", value: "#0a0a0a" },
    { name: "Foreground", var: "--fg", value: "#fafafa" },
    { name: "Accent", var: "--accent", value: "#CDFF00" },
    { name: "Border", var: "--border", value: "#333333" },
    { name: "Muted", var: "--muted", value: "#666666" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {colors.map((color) => (
        <div key={color.name} className="text-center">
          <div
            className="aspect-square border-2 border-border mb-2"
            style={{ backgroundColor: color.value }}
          />
          <p className="font-mono text-xs text-muted">{color.name}</p>
          <p className="font-mono text-xs text-accent">{color.value}</p>
        </div>
      ))}
    </div>
  );
}

const demos: Demo[] = [
  {
    id: "buttons",
    title: "Brutalist Buttons",
    description: "Interactive button components with hover effects and states.",
    icon: Play,
    tags: ["UI", "Interactive"],
    component: <ButtonDemo />,
  },
  {
    id: "text-scramble",
    title: "Text Scramble Effect",
    description: "Hover to see the scramble animation effect.",
    icon: Code,
    tags: ["Animation", "Text"],
    component: <TextScrambleDemo />,
  },
  {
    id: "magnetic",
    title: "Magnetic Element",
    description: "Element that follows your cursor with spring physics.",
    icon: Sparkle,
    tags: ["Animation", "Interactive"],
    component: <MagneticDemo />,
  },
  {
    id: "progress",
    title: "Animated Progress",
    description: "Smooth progress bar with adjustable value.",
    icon: Lightning,
    tags: ["UI", "Animation"],
    component: <ProgressDemo />,
  },
  {
    id: "cards",
    title: "Card Components",
    description: "Various card styles with brutalist aesthetics.",
    icon: Cube,
    tags: ["UI", "Layout"],
    component: <CardDemo />,
  },
  {
    id: "colors",
    title: "Color Palette",
    description: "The design system color tokens used throughout the site.",
    icon: Palette,
    tags: ["Design", "Tokens"],
    component: <ColorPaletteDemo />,
  },
];

export default function PlaygroundPage() {
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
              Experiments
            </span>
          </div>
          <h1 className="font-display text-display-lg font-bold tracking-tight mb-6">
            INTERACTIVE
            <br />
            <span className="text-outline">PLAYGROUND</span>
          </h1>
          <p className="max-w-2xl text-muted font-mono text-lg">
            A collection of interactive components, animations, and experiments.
            Explore the building blocks of this portfolio&apos;s design system.
          </p>
        </motion.div>

        {/* Demos Grid */}
        <div className="space-y-12">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="border-2 border-border"
            >
              {/* Demo Header */}
              <div className="p-6 border-b-2 border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <demo.icon size={24} className="text-accent mt-1" />
                  <div>
                    <h2 className="font-display text-xl font-bold">
                      {demo.title}
                    </h2>
                    <p className="text-muted font-mono text-sm">
                      {demo.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {demo.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-8 bg-bg/50">{demo.component}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-muted font-mono mb-6">
            Want to see more experiments or have ideas for new ones?
          </p>
          <a
            href="https://github.com/chetanoli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
          >
            Check out my GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
