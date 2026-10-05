import { NoAccess } from "@/components/common/NoAccess";
import { ManagementRooms } from "@/features/rooms/components/ManagementRooms";
import { useAuth } from "@/hooks/useAuth";

export default function RoomsPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
      return <ManagementRooms />;
    case "STAFF":
      if (user.category === "RECEPTIONIST") {
        return <NoAccess />;
      }
      if (user.category === "HOUSEKEEPER") {
        return <NoAccess />;
      }
      return <NoAccess />;
    case "CUSTOMER":
      return <NoAccess />;
    default:
      return <NoAccess />;
  }
}
