"use client";

import { ReactNode } from "react";
import LenisProvider from "./LenisProvider";
import { ThemeProvider } from "@/context/ThemeContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
