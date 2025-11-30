"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sun, Moon } from "phosphor-react";
import CommandPalette from "../ui/CommandPalette";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Playground", href: "/playground" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg/95 backdrop-blur-sm border-b-2 border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group relative">
              <motion.div
                className="text-2xl font-display font-bold tracking-tight"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-fg">CHETAN</span>
                <span className="text-accent">.</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-4 py-2 group"
                  >
                    <span
                      className={`font-mono text-sm uppercase tracking-wider transition-colors ${
                        isActive ? "text-accent" : "text-fg hover:text-accent"
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Command Palette Trigger */}
              <button
                onClick={() => setShowCommandPalette(true)}
                className="ml-4 px-3 py-1.5 border-2 border-border hover:border-accent text-muted hover:text-accent font-mono text-xs transition-colors flex items-center gap-2"
              >
                <span>⌘K</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 border-2 border-border hover:border-accent text-muted hover:text-accent transition-colors"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun size={18} weight="bold" />
                    ) : (
                      <Moon size={18} weight="bold" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Resume Button */}
              <Link
                href="/resume.pdf"
                target="_blank"
                className="ml-2 px-4 py-2 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
              >
                Resume
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setShowCommandPalette(true)}
                className="p-2 border-2 border-border hover:border-accent text-muted hover:text-accent transition-colors"
              >
                <span className="font-mono text-xs">⌘K</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 border-2 border-border hover:border-accent text-muted hover:text-accent transition-colors"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? (
                  <Sun size={20} weight="bold" />
                ) : (
                  <Moon size={20} weight="bold" />
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 border-2 border-fg text-fg hover:bg-fg hover:text-bg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X size={24} weight="bold" />
                ) : (
                  <List size={24} weight="bold" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-bg border-b-2 border-border overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 px-4 font-mono text-lg uppercase tracking-wider border-l-4 transition-colors ${
                          isActive
                            ? "border-accent text-accent bg-accent/10"
                            : "border-transparent text-fg hover:border-fg hover:bg-fg/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 bg-accent text-bg font-mono text-lg uppercase tracking-wider font-bold text-center"
                  >
                    Resume
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </>
  );
}
