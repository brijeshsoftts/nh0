import { Navigate } from "react-router-dom";

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
      if (user.category === "HOUSEKEEPER") {
        return <HouseKeeperRooms />;
      }
      return <Navigate to="/dashboard" replace />;
    default:
      return <Navigate to="/dashboard" replace />;
  }
}
