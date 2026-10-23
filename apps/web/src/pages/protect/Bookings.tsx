import { Navigate } from "react-router-dom";

import { CustomerBookings } from "@/features/bookings/components/CustomerBookings";
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
      return <Navigate to="/dashboard" />;
    case "CUSTOMER":
      return <CustomerBookings />;
    default:
      return <Navigate to="/dashboard" />;
  }
}
