import { Plus } from "lucide-react";
import { Navigate } from "react-router-dom";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { CreateCustomerDialog } from "@/features/customers/components/CreateCustomerDialog";
import { CustomerStat } from "@/features/customers/components/CustomerStat";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { useAuth } from "@/hooks/useAuth";

export default function CustomersPage() {
  const { user } = useAuth();

  if (
    user?.role === "CUSTOMER" ||
    (user?.role === "STAFF" && user.category !== "RECEPTIONIST")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

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
                className="h-10 gap-1.5 rounded-none px-4 text-xs font-medium"
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
