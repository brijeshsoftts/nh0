import { NoAccess } from "@/components/common/NoAccess";
import { ManagementBooking } from "@/features/bookings/components/ManagementBooking";
import { useAuth } from "@/hooks/useAuth";

export default function BookingsPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
    case "STAFF":
      if (user.category !== "HOUSEKEEPER") {
        return <ManagementBooking />;
      }
      return <NoAccess />;
    case "CUSTOMER":
      return <NoAccess />;
    default:
      return <NoAccess />;
  }
}
