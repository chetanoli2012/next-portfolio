"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = [
  { text: "Hello", language: "English" },
  { text: "नमस्ते", language: "Nepali" },
  { text: "Bonjour", language: "French" },
  { text: "こんにちは", language: "Japanese" },
  { text: "Hola", language: "Spanish" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
];

export default function AnimatedGreeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[40px] mb-4 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full text-center"
        >
          <span className="text-2xl text-blue-400">
            {greetings[index].text}{" "}
            <span className="text-gray-400 text-sm">
              ({greetings[index].language})
            </span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
