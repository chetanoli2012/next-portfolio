"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, CaretLeft, CaretRight } from "phosphor-react";

const testimonials = [
  {
    id: 1,
    content:
      "Chetan is an exceptional frontend engineer. His attention to detail and ability to translate complex designs into pixel-perfect implementations is remarkable. He consistently delivers high-quality work ahead of schedule.",
    author: "Sarah Chen",
    role: "Engineering Manager",
    company: "TechCorp Inc.",
  },
  {
    id: 2,
    content:
      "Working with Chetan was a game-changer for our project. His deep understanding of React and modern web technologies helped us build a scalable and performant application. Highly recommended!",
    author: "Michael Rodriguez",
    role: "CTO",
    company: "StartupXYZ",
  },
  {
    id: 3,
    content:
      "Chetan brings both technical excellence and great communication skills to the table. He proactively identifies potential issues and suggests improvements. A true asset to any development team.",
    author: "Emily Watson",
    role: "Product Manager",
    company: "Digital Solutions Ltd.",
  },
  {
    id: 4,
    content:
      "I've worked with many developers, but Chetan stands out for his problem-solving abilities and clean code practices. He mentored junior developers on our team and elevated everyone's skills.",
    author: "David Kim",
    role: "Senior Developer",
    company: "Innovation Labs",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

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
              03
            </span>
            <div className="h-[2px] w-12 bg-accent" />
          </div>
          <h2 className="font-display text-display-md font-bold tracking-tight">
            WHAT PEOPLE
            <br />
            <span className="text-outline">SAY</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute -top-8 -left-4 md:left-0"
          >
            <Quotes size={80} weight="fill" className="text-accent/20" />
          </motion.div>

          {/* Testimonial Content */}
          <div className="relative overflow-hidden min-h-[300px] md:min-h-[250px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <div className="max-w-4xl mx-auto">
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-display leading-relaxed mb-8">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent flex items-center justify-center font-display font-bold text-bg text-xl">
                      {testimonials[currentIndex].author[0]}
                    </div>
                    <div>
                      <div className="font-mono text-fg font-bold">
                        {testimonials[currentIndex].author}
                      </div>
                      <div className="font-mono text-sm text-muted">
                        {testimonials[currentIndex].role} at{" "}
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 border-2 transition-colors ${
                    index === currentIndex
                      ? "bg-accent border-accent"
                      : "border-border hover:border-accent"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                className="p-3 border-2 border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <CaretLeft size={24} weight="bold" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="p-3 border-2 border-border hover:border-accent hover:text-accent transition-colors"
                aria-label="Next testimonial"
              >
                <CaretRight size={24} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
