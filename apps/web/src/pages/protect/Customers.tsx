import { Plus } from "lucide-react";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { CreateCustomerDialog } from "@/features/customers/components/CreateCustomerDialog";
import { CustomerStat } from "@/features/customers/components/CustomerStat";
import { CustomerTable } from "@/features/customers/components/CustomerTable";

export default function CustomersPage() {
  return (
    <>
      <Header
        title="Customers"
        description="Manage customers"
        rightContent={
          <>
            <CreateCustomerDialog>
              <Button
                id="btn-add-customer"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Customer</span>
              </Button>
            </CreateCustomerDialog>
          </>
        }
      />
      <CustomerStat />
      <CustomerTable />
    </>
  );
}
