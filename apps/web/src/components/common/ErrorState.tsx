"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ErrorStateProps {
  heading?: string;
  description?: string;
  icon?: LucideIcon;
  illustration?: ReactNode;
  render?: ReactNode;
  className?: string;
}

export function ErrorState({
  heading = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  icon: Icon = AlertCircle,
  illustration,
  render,
  className,
}: ErrorStateProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <>
      <motion.section
        role="alert"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
        }}
        className={cn(
          "relative isolate flex min-h-[350px] w-full",
          "flex-col items-center justify-center",
          "overflow-hidden rounded-xl px-6 py-12 text-center",
          className
        )}
      >
        {/* Animated background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {/* Fine grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, var(--border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 48% 70% at center, black 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 48% 70% at center, black 0%, transparent 100%)",
            }}
          />

          {/* Alternating filled and empty cells */}
          <motion.div
            animate={
              shouldReduceMotion
                ? { opacity: 0.45 }
                : { opacity: [0.3, 0.55, 0.3] }
            }
            transition={{
              duration: 8,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
              conic-gradient(
                var(--muted) 25%,
                transparent 0 50%,
                var(--muted) 0 75%,
                transparent 0
              )
            `,
              backgroundSize: "68px 68px",
              maskImage:
                "radial-gradient(ellipse 48% 70% at center, black 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 48% 70% at center, black 0%, transparent 100%)",
            }}
          />

          {/* Fade grid into the page background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 85% at center, transparent 15%, var(--background) 100%)",
            }}
          />
        </div>

        {/* Icon or custom illustration */}
        <motion.div
          variants={fadeUp}
          whileHover={
            shouldReduceMotion ? undefined : { scale: 1.08, rotate: 3 }
          }
          whileTap={
            shouldReduceMotion ? undefined : { scale: 0.92, rotate: -3 }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 12,
          }}
          className="relative z-10 mb-4 cursor-pointer"
        >
          {illustration ?? (
            <div className="flex size-14 items-center justify-center rounded-xl border border-destructive/20 bg-background/90 text-destructive shadow-sm backdrop-blur-sm">
              <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />
            </div>
          )}
        </motion.div>

        {/* Heading and description */}
        {(heading || description) && (
          <motion.div variants={fadeUp} className="relative z-10 max-w-md">
            {heading && (
              <h2 className="mb-1 text-base font-semibold tracking-tight">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Custom content: buttons, links, forms, etc. */}
        {render && (
          <motion.div
            variants={fadeUp}
            className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-3"
          >
            {render}
          </motion.div>
        )}
      </motion.section>
    </>
  );
}
