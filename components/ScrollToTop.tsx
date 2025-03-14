"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero");
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300 && !isHeroInView());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsVisible(window.scrollY > 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroSection) observer.observe(heroSection);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);

  const isHeroInView = () => {
    const hero = document.getElementById("hero");
    if (!hero) return false;
    const rect = hero.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-4 bg-blue-600 rounded-full shadow-lg z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="w-6 h-6 text-white" />
    </motion.button>
  );
}
