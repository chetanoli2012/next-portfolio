import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chetan Oli - Software Developer",
  description:
    "Portfolio of Chetan Oli, a software developer specializing in JavaScript, React, and Next.js",
};

import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Confetti from "@/components/Confetti";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} font-mono transition-colors duration-200`}
      >
        <ThemeProvider>
          <Navigation />
          <CustomCursor />
          <Confetti />
          <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
            {children}
          </main>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
