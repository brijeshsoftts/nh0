import { Plus } from "lucide-react";

import { Header } from "@/components/common/Header";
import { HeaderActionButton } from "@/components/common/HeaderActionButton";
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
            <HeaderActionButton>
              <Plus />
              <span>Add Staff</span>
            </HeaderActionButton>
          </CreateStaffDialog>
        }
      />
      <StaffStats />
      <StaffTable />
    </>
  );
}
