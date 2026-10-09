import { NoAccess } from "@/components/common/NoAccess";
import { CustomerPayments } from "@/features/payments/components/CustomerPayments";
import { ManagementPayments } from "@/features/payments/components/ManagementPayments";
import { useAuth } from "@/hooks/useAuth";

export default function PaymentsPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
    case "STAFF":
      if (user.category !== "HOUSEKEEPER") {
        return <ManagementPayments />;
      }
      return <NoAccess />;
    case "CUSTOMER":
      return <CustomerPayments />;
    default:
      return <NoAccess />;
  }
}
