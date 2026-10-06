import { useId } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { Textarea } from "../ui/textarea";

type TextareaFieldProps = {
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "className" | "disabled" | "placeholder" | "required"
>;

export function TextareaField({
  label,
  placeholder,
  error,
  disabled,
  required,
  className,
  ...props
}: TextareaFieldProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>

        <Textarea
          id={id}
          required={required}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
          className={cn("h-20 resize-none", className)}
          {...props}
        />
      </div>

      {error && (
        <span id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}
