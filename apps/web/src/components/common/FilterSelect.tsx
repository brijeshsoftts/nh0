import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type ChangeFilterValue = {
  key: string;
  value: string | null;
};

type FilterSelectProps = {
  filterKey: string;
  label: string;
  options: SelectOption[];
  initialValue?: string | null;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onValueChange: (arg: ChangeFilterValue) => void;
};

const ALL_VALUE = "";

export function FilterSelect({
  filterKey,
  label,
  options,
  initialValue = null,
  placeholder,
  disabled = false,
  className,
  onValueChange,
}: FilterSelectProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue ?? ALL_VALUE);

  useEffect(() => {
    (async () => setSelectedValue(initialValue ?? ALL_VALUE))();
  }, [initialValue]);

  return (
    <Select
      value={selectedValue}
      onValueChange={(value) => {
        setSelectedValue(value ?? "");

        onValueChange({
          key: filterKey,
          value: value === ALL_VALUE ? null : value,
        });
      }}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder ?? `All ${label}`} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_VALUE}>All {label}</SelectItem>

        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
