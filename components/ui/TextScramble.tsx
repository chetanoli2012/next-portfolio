"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  revealDelay?: number;
  onComplete?: () => void;
}

const chars = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextScramble({
  text,
  className = "",
  revealDelay = 0,
  onComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef(0);
  const resolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      scramble(text);
    }, revealDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, revealDelay]);

  const scramble = (newText: string) => {
    const length = Math.max(displayText.length, newText.length);
    const queue: Array<{
      from: string;
      to: string;
      start: number;
      end: number;
      char?: string;
    }> = [];

    for (let i = 0; i < length; i++) {
      const from = displayText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    let frame = 0;

    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let { char } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        setIsAnimating(false);
        if (resolveRef.current) {
          resolveRef.current();
        }
        if (onComplete) {
          onComplete();
        }
      } else {
        frameRef.current = requestAnimationFrame(update);
      }

      frame++;
    };

    update();
  };

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || text}
      {isAnimating && (
        <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 animate-pulse" />
      )}
    </motion.span>
  );
}
