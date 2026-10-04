import { Header } from "@/components/common/Header";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import { MOCK_STAFF_KPIS } from "@/features/staff/staff.mock";
import { Plus } from "lucide-react";

export default function StaffPage() {
  return (
    <>
      <Header
        title="Staff Management"
        description="Manage your team, roles, and staff activity."
        rightContent={
          <>
            <Button>
              <Plus className="h-4 w-4" />
              <span>Add Staff</span>
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_STAFF_KPIS.map((item) => (
          <StatCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
