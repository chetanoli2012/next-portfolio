"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps>;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg border-2 border-accent hover:bg-transparent hover:text-accent",
  secondary:
    "bg-fg text-bg border-2 border-fg hover:bg-transparent hover:text-fg",
  outline:
    "bg-transparent text-fg border-2 border-fg hover:bg-fg hover:text-bg",
  ghost: "bg-transparent text-fg border-2 border-transparent hover:border-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      href,
      external,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2",
      "font-mono uppercase tracking-wider font-bold",
      "transition-colors duration-200",
      "brutal-hover",
      variants[variant],
      sizes[size],
      className
    );

    const motionProps = {
      whileHover: { x: -2, y: -2 },
      whileTap: { x: 2, y: 2 },
      transition: { duration: 0.1 },
    };

    if (href) {
      if (external) {
        return (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseStyles}
            {...motionProps}
          >
            {children}
          </motion.a>
        );
      }
      return (
        <Link href={href} className={baseStyles}>
          <motion.span
            className="inline-flex items-center gap-2"
            {...motionProps}
          >
            {children}
          </motion.span>
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
