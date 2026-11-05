import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  transitionKey?: string;
  duration?: number;
  animateOnMount?: boolean;
  className?: string;
}

export function PageTransition({
  children,
  transitionKey,
  duration = 0.34,
  animateOnMount = true,
  className,
}: PageTransitionProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const key = transitionKey ?? location.pathname;

  return (
    <AnimatePresence
      initial={animateOnMount && !shouldReduceMotion}
      mode="wait"
    >
      <motion.div
        key={key}
        animate={{ opacity: 1, y: 0 }}
        className={cn("w-full min-w-0", className)}
        exit={
          shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
        }
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        transition={{
          duration: shouldReduceMotion ? 0 : duration,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.3,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerContainer({ children, className }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      animate="visible"
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? undefined : staggerItemVariants}
      transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
    >
      {children}
    </motion.div>
  );
}
