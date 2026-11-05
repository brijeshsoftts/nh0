import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ImageMotionProps extends Omit<HTMLMotionProps<"div">, "children"> {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  hoverScale?: number;
  clickScale?: number;
  enableHover?: boolean;
  enableClick?: boolean;
  rounded?: string;
}

export function ImageMotion({
  src,
  alt,
  className,
  imageClassName,
  hoverScale = 1.06,
  clickScale = 0.97,
  enableHover = true,
  enableClick = true,
  rounded = "rounded-xl",
  ...props
}: ImageMotionProps) {
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const canAnimate = !shouldReduceMotion;

  return (
    <motion.div
      className={cn("group relative overflow-hidden", rounded, className)}
      initial="initial"
      whileHover={enableHover && canAnimate ? "hover" : undefined}
      whileTap={enableClick && canAnimate ? "tap" : undefined}
      animate={isActive ? "active" : "initial"}
      onClick={() => enableClick && setIsActive((prev) => !prev)}
      variants={{
        initial: { scale: 1 },
        hover: { scale: hoverScale },
        tap: { scale: clickScale },
        active: { scale: 1 },
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className={cn("h-full w-full object-cover", imageClassName)}
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.12 },
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-black/0"
        variants={{
          initial: { backgroundColor: "rgba(0,0,0,0)" },
          hover: { backgroundColor: "rgba(0,0,0,0.12)" },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export { ImageMotion as AnimatedImage };
