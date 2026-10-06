import { Check, Mail, Phone, Search, UserRound } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/useDebounce";

import type { SearchCustomer } from "../customers.types";
import { useSearchCustomers } from "../hooks/useSearchCustomers";

interface SearchCustomerProps {
  value?: SearchCustomer | null;
  onChange?: (customer: SearchCustomer) => void;
}

export function SearchCustomer({ onChange, value }: SearchCustomerProps) {
  const [search, setSearch] = useState<string | undefined>();
  const query = useDebounce(search, 400);
  const { items } = useSearchCustomers(query);
  const [selected, setSelected] = useState<SearchCustomer | null>(null);

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="pl-9"
        />
      </div>

      {/* Customer List */}
      <Card className="overflow-hidden p-0">
        <ScrollArea className="max-h-72 overflow-y-auto">
          <div className="divide-y">
            {items.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No customers available.
              </div>
            ) : (
              items.map((customer) => {
                const isSelected = selected?.id === customer.id;

                return (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => {
                      setSelected(customer);
                      onChange?.(customer);
                    }}
                    className={`w-full p-3 text-left transition-colors hover:bg-muted/50 ${
                      isSelected ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <UserRound className="h-4 w-4" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate font-medium">
                            {customer.fullName}
                          </p>

                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 truncate">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </Card>

      {value && (
        <Card className="border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium">{value.fullName}</p>
                <Badge variant="secondary">Selected</Badge>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {value.email}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
