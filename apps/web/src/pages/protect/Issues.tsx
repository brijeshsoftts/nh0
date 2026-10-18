import { NoAccess } from "@/components/common/NoAccess";
import { CustomerIssues } from "@/features/issues/components/CustomerIssues";
import { ManagementIssue } from "@/features/issues/components/ManagementIssue";
import { useAuth } from "@/hooks/useAuth";

export default function IssuesPage() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
    case "MANAGER":
      return <ManagementIssue />;
    case "CUSTOMER":
      return <CustomerIssues />;
    default:
      return <NoAccess />;
  }
}
