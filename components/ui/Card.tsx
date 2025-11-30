"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "outlined" | "accent" | "elevated";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  href?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-bg border-2 border-border",
  outlined: "bg-transparent border-2 border-fg",
  accent: "bg-bg border-2 border-accent",
  elevated: "bg-bg border-2 border-fg shadow-brutal",
};

export default function Card({
  variant = "default",
  children,
  className,
  hoverable = false,
  href,
  ...props
}: CardProps) {
  const baseStyles = cn(
    "p-6",
    variantStyles[variant],
    hoverable && "brutal-hover cursor-pointer",
    className
  );

  const content = (
    <motion.div
      className={baseStyles}
      whileHover={hoverable ? { x: -4, y: -4 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

// Card Header Component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

// Card Title Component
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  children,
  className,
  as: Tag = "h3",
}: CardTitleProps) {
  return (
    <Tag
      className={cn("font-display text-xl font-bold tracking-tight", className)}
    >
      {children}
    </Tag>
  );
}

// Card Description Component
interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-muted font-mono text-sm mt-2", className)}>
      {children}
    </p>
  );
}

// Card Content Component
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

// Card Footer Component
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t-2 border-border", className)}>
      {children}
    </div>
  );
}
