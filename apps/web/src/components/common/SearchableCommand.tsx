"use client";

import { useId, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Label } from "../ui/label";

export type Option = {
  label: string;
  value: string;
};

type SearchableCommandProps = {
  heading?: string;
  placeholder?: string;
  options: Option[];
  onInputChange?: (value: string) => void;
  onSelect: (option: Option) => void;
  selected?: Option;
  shouldFilter?: boolean;
  label?: string;
};

export function SearchableCommand({
  heading = "Suggestions",
  placeholder = "Search...",
  options,
  onInputChange,
  onSelect,
  selected,
  shouldFilter = false,
  label,
}: SearchableCommandProps) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Command
        className="h-fit max-h-44 w-full border pb-2"
        shouldFilter={shouldFilter}
      >
        <CommandInput
          id={id}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onValueChange={onInputChange ?? (() => {})}
          onClick={() => setIsFocused(true)}
          defaultValue={selected?.label}
        />

        {isFocused && (
          <CommandList className="max-h-40">
            {options.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading={heading}>
                {options.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onSelect(item);
                      setIsFocused(false);
                    }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
