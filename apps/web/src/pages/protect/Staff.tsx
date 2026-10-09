import { Plus } from "lucide-react";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { CreateStaffDialog } from "@/features/staff/components/CreateStaffDialog";
import { StaffStats } from "@/features/staff/components/StaffStats";
import { StaffTable } from "@/features/staff/components/StaffTable";

export default function StaffPage() {
  return (
    <>
      <Header
        title="Staff Management"
        description="Manage your team, roles, and staff activity."
        rightContent={
          <CreateStaffDialog>
            <Button>
              <Plus className="h-4 w-4" />
              <span>Add Staff</span>
            </Button>
          </CreateStaffDialog>
        }
      />
      <StaffStats />
      <StaffTable />
    </>
  );
}
