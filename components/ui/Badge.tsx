"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-fg text-bg border-fg",
  accent: "bg-accent text-bg border-accent",
  outline: "bg-transparent text-fg border-fg",
  muted: "bg-border text-muted border-border",
};

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1",
        "font-mono text-xs uppercase tracking-wider",
        "border-2",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
