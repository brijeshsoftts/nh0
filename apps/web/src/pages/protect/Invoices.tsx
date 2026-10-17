import { NoAccess } from "@/components/common/NoAccess";
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
      return <NoAccess />;
    case "CUSTOMER":
      return <CustomerInvoices />;
    default:
      return <NoAccess />;
  }
}
