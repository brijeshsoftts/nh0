import { NoAccess } from "@/components/common/NoAccess";
import { ManagementInvoices } from "@/features/invoices/components/ManagementInvoices";
import { CustomerPayments } from "@/features/payments/components/CustomerPayments";
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
      return <CustomerPayments />;
    default:
      return <NoAccess />;
  }
}
