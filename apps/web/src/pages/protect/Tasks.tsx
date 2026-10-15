import { Plus } from "lucide-react";
import { useState } from "react";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
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
              <Button
                id="btn-add-customer"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
                onClick={() => setOpen(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Task</span>
              </Button>
            }
          />
        </>
      )}
      <TasksStats />
      <TaskGrid />
    </>
  );
}
