import { TaskGrid } from "@/features/tasks/components/TaskGrid";
import { TasksStats } from "@/features/tasks/components/TasksStats";

export default function TasksPage() {
  return (
    <>
      <TasksStats />
      <TaskGrid />
    </>
  );
}
