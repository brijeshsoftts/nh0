import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "text-destructive-foreground bg-destructive shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Your custom card variant
        card: "border border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground",
      },
      shape: {
        default: "rounded-md",
        circle: "rounded-full",
        square: "rounded-none",
      },
      size: {
        sm: "h-8 w-8 [&_svg]:size-3.5",
        md: "h-9 w-9 [&_svg]:size-4",
        lg: "h-10 w-10 [&_svg]:size-5",
        xl: "h-12 w-12 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "card",
      shape: "circle",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconBtn = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, shape, size, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, shape, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconBtn.displayName = "IconBtn";

export { IconBtn, iconButtonVariants };
