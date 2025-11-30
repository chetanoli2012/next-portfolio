import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

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

// Using Space Grotesk as display font (brutalist-friendly)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Chetan Oli | Senior Software Engineer",
    template: "%s | Chetan Oli",
  },
  description:
    "Senior Software Engineer with 6+ years of frontend-heavy experience. Specializing in React, Next.js, TypeScript, and building exceptional user experiences.",
  keywords: [
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
  ],
  authors: [{ name: "Chetan Oli" }],
  creator: "Chetan Oli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chetanoli.dev",
    siteName: "Chetan Oli",
    title: "Chetan Oli | Senior Software Engineer",
    description:
      "Senior Software Engineer with 6+ years of frontend-heavy experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chetan Oli | Senior Software Engineer",
    description:
      "Senior Software Engineer with 6+ years of frontend-heavy experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Navigation />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
