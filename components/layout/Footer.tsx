"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  EnvelopeSimple,
} from "phosphor-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/chetanoli",
    icon: GithubLogo,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/chetanoli",
    icon: LinkedinLogo,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/chetanoli",
    icon: TwitterLogo,
  },
  {
    name: "Email",
    href: "mailto:hello@chetanoli.dev",
    icon: EnvelopeSimple,
  },
];

const footerLinks = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Playground", href: "/playground" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-border bg-bg">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                CHETAN<span className="text-accent">.</span>
              </h2>
            </Link>
            <p className="mt-4 text-muted font-mono text-sm max-w-sm">
              Senior Software Engineer crafting exceptional digital experiences
              with modern web technologies.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-border hover:border-accent text-muted hover:text-accent transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  aria-label={social.name}
                >
                  <social.icon size={20} weight="bold" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-mono text-fg hover:text-accent transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-sm uppercase tracking-wider text-muted mb-4">
              Let&apos;s Connect
            </h3>
            <p className="text-fg font-mono mb-4">
              Open for opportunities and collaborations.
            </p>
            <a
              href="mailto:hello@chetanoli.dev"
              className="inline-block px-6 py-3 bg-accent text-bg font-mono text-sm uppercase tracking-wider font-bold border-2 border-accent hover:bg-transparent hover:text-accent transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-sm text-muted">
              © {currentYear} Chetan Oli. All rights reserved.
            </p>
            <div className="flex items-center gap-2 font-mono text-sm text-muted">
              <span>Built with</span>
              <span className="text-accent">Next.js</span>
              <span>&</span>
              <span className="text-accent">Framer Motion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
