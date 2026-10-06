import { BedDouble, Building2, ChevronRight, Sparkles } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const tabs = [
  {
    value: "rooms",
    label: "Rooms",
    description: "Manage hotel rooms",
    icon: BedDouble,
  },
  {
    value: "room-types",
    label: "Room Types",
    description: "Configure room categories",
    icon: Building2,
  },
  {
    value: "amenities",
    label: "Amenities",
    description: "Manage available amenities",
    icon: Sparkles,
  },
];

interface TabListProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TabList({ value, onValueChange }: TabListProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      {/* Changed to flex-col on mobile, grid on sm screens for responsiveness */}
      <TabsList className="flex h-auto w-full flex-col gap-2 rounded-3xl border border-border/50 bg-muted/30 p-2 backdrop-blur-md sm:grid sm:grid-cols-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = value === tab.value;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "group relative flex h-full min-w-0 items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                active
                  ? "border-foreground/20 bg-background shadow-md"
                  : "border-transparent bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                    active
                      ? "border-primary/20 bg-primary/10 text-primary shadow-sm"
                      : "border-border/50 bg-background/50 text-muted-foreground group-hover:border-border group-hover:text-foreground"
                  )}
                >
                  <Icon className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm font-semibold transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground/80">
                    {tab.description}
                  </p>
                </div>
              </div>

              <ChevronRight
                className={cn(
                  "hidden size-4 shrink-0 transition-all duration-300 sm:block",
                  active
                    ? "translate-x-0 text-foreground opacity-100"
                    : "-translate-x-2 text-muted-foreground opacity-0 group-hover:-translate-x-1 group-hover:opacity-50"
                )}
              />

              {/* Active Bottom Indicator - Centered and constrained */}
              <span
                className={cn(
                  "absolute -bottom-2 left-1/2 h-0.5 w-[80%] -translate-x-1/2 rounded-full transition-all duration-300",
                  active ? "bg-primary opacity-100" : "bg-transparent opacity-0"
                )}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
