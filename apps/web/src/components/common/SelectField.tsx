import { useId } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatString } from "@/lib/format";
import { cn } from "@/lib/utils";

export type SelectOption = {
  id: string;
  name: string;
};

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
};

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select an option",
  options,
  error,
  disabled,
  className,
  defaultValue = "",
}: SelectFieldProps<T>) {
  const id = useId();

  return (
    <div className="space-y-1">
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
              defaultValue={defaultValue}
            >
              <SelectTrigger
                id={id}
                className="h-10! w-full"
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
              >
                <SelectValue placeholder={placeholder} className={"h-10!"} />
              </SelectTrigger>

              <SelectContent className={cn("h-10", className)}>
                {options.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {formatString(option.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
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
