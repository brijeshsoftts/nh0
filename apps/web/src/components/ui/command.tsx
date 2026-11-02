import * as React from "react";

import { cn } from "@/lib/utils";

export const Command = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { shouldFilter?: boolean }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md border bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = "Command";

export const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    onValueChange?: (value: string) => void;
  }
>(({ className, onValueChange, onChange, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    onChange={(event) => {
      onChange?.(event);
      onValueChange?.(event.currentTarget.value);
    }}
    {...props}
  />
));
CommandInput.displayName = "CommandInput";

export const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("overflow-y-auto p-1", className)} {...props} />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-3 text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1 p-1", className)} {...props}>
    {heading ? (
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        {heading}
      </div>
    ) : null}
    {children}
  </div>
));
CommandGroup.displayName = "CommandGroup";

export const CommandItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onSelect?: () => void;
  }
>(({ className, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    role="option"
    className={cn(
      "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    onClick={onSelect ?? props.onClick}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";
