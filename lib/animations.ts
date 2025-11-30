import { Variants } from "framer-motion";

// Easing functions
export const easings = {
  outExpo: [0.16, 1, 0.3, 1],
  inExpo: [0.7, 0, 0.84, 0],
  outQuart: [0.25, 1, 0.5, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
};

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easings.inExpo,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade up animation
export const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.outExpo,
    },
  },
};

// Fade in animation
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.outExpo,
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.outExpo,
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.outExpo,
    },
  },
};

// Scale up animation
export const scaleUp: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.outExpo,
    },
  },
};

// Text reveal character by character
export const textRevealContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

export const textRevealChar: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.outExpo,
    },
  },
};

// Line reveal animation (for text with overflow hidden parent)
export const lineReveal: Variants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.outExpo,
    },
  },
};

// Hover animations for brutalist buttons
export const brutalHover = {
  rest: {
    x: 0,
    y: 0,
    boxShadow: "4px 4px 0px 0px var(--fg)",
  },
  hover: {
    x: -2,
    y: -2,
    boxShadow: "6px 6px 0px 0px var(--fg)",
    transition: {
      duration: 0.2,
      ease: easings.outExpo,
    },
  },
  tap: {
    x: 2,
    y: 2,
    boxShadow: "2px 2px 0px 0px var(--fg)",
    transition: {
      duration: 0.1,
    },
  },
};

export const brutalHoverAccent = {
  rest: {
    x: 0,
    y: 0,
    boxShadow: "4px 4px 0px 0px var(--accent)",
  },
  hover: {
    x: -2,
    y: -2,
    boxShadow: "6px 6px 0px 0px var(--accent)",
    transition: {
      duration: 0.2,
      ease: easings.outExpo,
    },
  },
  tap: {
    x: 2,
    y: 2,
    boxShadow: "2px 2px 0px 0px var(--accent)",
    transition: {
      duration: 0.1,
    },
  },
};

// Magnetic effect helper
export const magneticEffect = (
  x: number,
  y: number,
  strength: number = 0.3
) => ({
  x: x * strength,
  y: y * strength,
  transition: {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
});

// Scroll-triggered animation variants
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.outExpo,
    },
  },
};

// Parallax effect values
export const parallaxValues = {
  slow: { y: [0, -50] },
  medium: { y: [0, -100] },
  fast: { y: [0, -150] },
};

// Text scramble characters
export const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";

// Function to generate scramble animation
export function generateScrambleText(
  originalText: string,
  progress: number
): string {
  const chars = scrambleChars;
  let result = "";
  const revealedLength = Math.floor(originalText.length * progress);

  for (let i = 0; i < originalText.length; i++) {
    if (i < revealedLength) {
      result += originalText[i];
    } else if (originalText[i] === " ") {
      result += " ";
    } else {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return result;
}
