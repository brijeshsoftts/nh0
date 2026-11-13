import { Plus } from "lucide-react";
import { Navigate } from "react-router-dom";

import { Header } from "@/components/common/Header";
import { HeaderActionButton } from "@/components/common/HeaderActionButton";
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
              <HeaderActionButton id="btn-add-customer">
                <Plus />
                <span>New Customer</span>
              </HeaderActionButton>
            </CreateCustomerDialog>
          </>
        }
      />
      <CustomerStat />
      <CustomerTable />
    </>
  );
}
