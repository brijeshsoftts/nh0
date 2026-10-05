import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  ...props
}: InputFieldProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      <div className="space-y-0.5">
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
