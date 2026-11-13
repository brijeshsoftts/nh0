import { Plus } from "lucide-react";
import { useState } from "react";

import { Header } from "@/components/common/Header";
import { HeaderActionButton } from "@/components/common/HeaderActionButton";
import { TaskDialog } from "@/features/tasks/components/TaskDialog";
import { TaskGrid } from "@/features/tasks/components/TaskGrid";
import { TasksStats } from "@/features/tasks/components/TasksStats";
import { useAuth } from "@/hooks/useAuth";

export default function TasksPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
        <>
          <TaskDialog mode="create" onOpenChange={setOpen} open={open} />
          <Header
            title="Tasks"
            description="Manage your tasks and track your progress."
            rightContent={
              <HeaderActionButton
                id="btn-add-customer"
                onClick={() => setOpen(true)}
              >
                <Plus />
                <span>New Task</span>
              </HeaderActionButton>
            }
          />
        </>
      )}
      <TasksStats />
      <TaskGrid />
    </>
  );
}
