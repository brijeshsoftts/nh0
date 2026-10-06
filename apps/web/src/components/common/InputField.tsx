import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

export function InputField({
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
  disabled,
  required,
  className,
  ...props
}: InputFieldProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>

        <Input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
          className={cn("h-10", className)}
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
