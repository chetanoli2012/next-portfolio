import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chetan Oli - Software Developer",
  description:
    "Portfolio of Chetan Oli, a software developer specializing in JavaScript, React, and Next.js",
};

import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} transition-colors duration-200`}>
        <ThemeProvider>
          <Navigation />
          <CustomCursor />
          <main className="min-h-screen bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
