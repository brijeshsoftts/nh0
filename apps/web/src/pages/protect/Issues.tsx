import { NoAccess } from "@/components/common/NoAccess";
import { ManagementIssue } from "@/features/issues/components/ManagementIssue";
import { useAuth } from "@/hooks/useAuth";

export default function IssuesPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
      return <ManagementIssue />;
    case "CUSTOMER":
      return <NoAccess />;
    default:
      return <NoAccess />;
  }
}
