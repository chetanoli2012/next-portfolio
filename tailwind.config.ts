import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        accent: "var(--accent)",
        border: "var(--border)",
        muted: "var(--muted)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(4rem, 15vw, 12rem)",
          { lineHeight: "0.9", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(3rem, 10vw, 8rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(2rem, 6vw, 4rem)",
          { lineHeight: "1", letterSpacing: "-0.01em" },
        ],
      },
      spacing: {
        "screen-padding": "clamp(1rem, 5vw, 4rem)",
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px var(--fg)",
        "brutal-sm": "2px 2px 0px 0px var(--fg)",
        "brutal-lg": "8px 8px 0px 0px var(--fg)",
        "brutal-accent": "4px 4px 0px 0px var(--accent)",
        "brutal-accent-lg": "8px 8px 0px 0px var(--accent)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        scramble: "scramble 0.5s steps(10) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        scramble: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
    },
  },
  plugins: [],
} satisfies Config;
