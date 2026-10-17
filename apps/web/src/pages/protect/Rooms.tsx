import { NoAccess } from "@/components/common/NoAccess";
import { CustomerRooms } from "@/features/rooms/components/CustomerRooms";
import { HouseKeeperRooms } from "@/features/rooms/components/HouseKeeperRooms";
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
        return <HouseKeeperRooms />;
      }
      return <NoAccess />;
    case "CUSTOMER":
      return <CustomerRooms />;
    default:
      return <NoAccess />;
  }
}
