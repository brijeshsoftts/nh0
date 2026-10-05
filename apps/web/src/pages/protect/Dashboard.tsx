import { useAuth } from "@/hooks/useAuth";
import { NoAccess } from "@/components/common/NoAccess";
import { CustomerDashboard } from "@/features/dashboard/components/CustomerDashboard";
import { HousekeeperDashboard } from "@/features/dashboard/components/HousekeeperDashboard";
import { ManagementDashboard } from "@/features/dashboard/components/ManagementDashboard";
import { ReceptionistDashboard } from "@/features/dashboard/components/ReceptionistDashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
      return <ManagementDashboard />;
    case "STAFF":
      if (user.category === "RECEPTIONIST") {
        return <ReceptionistDashboard />;
      }
      if (user.category === "HOUSEKEEPER") {
        return <HousekeeperDashboard />;
      }
      return <NoAccess />;
    case "CUSTOMER":
      return <CustomerDashboard />;
    default:
      return <NoAccess />;
  }
}
