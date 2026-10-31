import { Navigate } from "react-router-dom";

import { CustomerInvoices } from "@/features/invoices/components/CustomerInvoices";
import { ManagementInvoices } from "@/features/invoices/components/ManagementInvoices";
import { useAuth } from "@/hooks/useAuth";

export default function InvoicesPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
    case "STAFF":
      if (user.category !== "HOUSEKEEPER") {
        return <ManagementInvoices />;
      }
      return <Navigate to="/dashboard" replace />;
    case "CUSTOMER":
      return <CustomerInvoices />;
    default:
      return <Navigate to="/dashboard" replace />;
  }
}
