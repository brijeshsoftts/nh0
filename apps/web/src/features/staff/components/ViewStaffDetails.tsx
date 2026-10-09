import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Hash,
  House,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";

import { ErrorModal } from "@/components/common/ErrorModal";
import { FullScreenLoader } from "@/components/common/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/format";

import { useStaffDetails } from "../hooks/useStaffDetails";
import type { StaffTask } from "../staff.types";

type ViewStaffDetailsProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTaskStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
    case "done":
      return "default" as const;

    case "in_progress":
    case "inprogress":
    case "processing":
      return "secondary" as const;

    case "cancelled":
    case "canceled":
    case "failed":
      return "destructive" as const;

    default:
      return "outline" as const;
  }
}

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 py-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p
          className={`text-sm font-medium wrap-break-word ${
            mono ? "font-mono text-xs sm:text-sm" : ""
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-4 text-muted-foreground" />
      {children}
    </h3>
  );
}

function TaskCard({ task }: { task: StaffTask }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Wrench className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold wrap-break-word">
              {formatLabel(String(task.taskType))}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Task ID: <span className="font-mono">{task.id}</span>
            </p>
          </div>
        </div>

        <Badge
          variant={getTaskStatusVariant(String(task.status))}
          className="shrink-0"
        >
          {formatLabel(String(task.status))}
        </Badge>
      </div>

      <Separator className="my-3" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <House className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Room</p>
            <p className="mt-1 text-sm font-medium wrap-break-word">
              {task.room.roomNumber}
              {task.room.name ? ` · ${task.room.name}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Scheduled date</p>
            <p className="mt-1 text-sm font-medium">
              {formatDate(task.scheduledDate)}
            </p>
          </div>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs text-muted-foreground">Room ID</p>
          <p className="mt-1 font-mono text-xs break-all">{task.room.id}</p>
        </div>
      </div>
    </div>
  );
}

export function ViewStaffDetails({
  id,
  open,
  onOpenChange,
}: ViewStaffDetailsProps) {
  const { data: staff, isLoading, isError, refetch } = useStaffDetails(id);
  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] p-0 sm:max-w-xl lg:max-w-2xl">
        <div className="px-5 pt-6 pb-5 sm:px-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl">Staff details</DialogTitle>

            <DialogDescription>
              View staff profile, employment information, and assigned tasks.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="mt-6 flex min-w-0 flex-col items-center gap-4 rounded-xl border bg-muted/20 p-5 text-center sm:flex-row sm:text-left">
              <Avatar className="size-20 shrink-0 border">
                <AvatarFallback className="text-xl font-semibold">
                  {getInitials(staff.user.fullName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold wrap-break-word">
                  {staff.user.fullName}
                </h3>

                <p className="mt-1 text-sm break-all text-muted-foreground">
                  {staff.user.email}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="secondary">
                    {formatLabel(String(staff.category))}
                  </Badge>

                  <Badge
                    variant={staff.user.isActive ? "default" : "destructive"}
                  >
                    {staff.user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Staff ID: <span className="font-mono">{staff.staffId}</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6 px-5 py-5 sm:px-6">
            {/* Personal information */}
            <section>
              <SectionTitle icon={UserRound}>Personal information</SectionTitle>

              <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                <DetailItem
                  icon={UserRound}
                  label="Full name"
                  value={staff.user.fullName}
                />

                <DetailItem
                  icon={Hash}
                  label="Staff ID"
                  value={staff.staffId}
                  mono
                />

                <DetailItem
                  icon={Users}
                  label="Father's name"
                  value={staff.fatherName}
                />

                <DetailItem
                  icon={Users}
                  label="Mother's name"
                  value={staff.motherName}
                />
              </div>
            </section>

            <Separator />

            {/* Contact information */}
            <section>
              <SectionTitle icon={Phone}>Contact information</SectionTitle>

              <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                <DetailItem
                  icon={Mail}
                  label="Email address"
                  value={staff.user.email}
                />

                <DetailItem
                  icon={Phone}
                  label="Phone number"
                  value={staff.user.phone}
                />

                <DetailItem
                  icon={ShieldCheck}
                  label="Emergency contact"
                  value={staff.emergencyContact}
                />

                <DetailItem
                  icon={MapPin}
                  label="Address"
                  value={staff.address}
                />
              </div>
            </section>

            <Separator />

            {/* Employment information */}
            <section>
              <SectionTitle icon={BriefcaseBusiness}>
                Employment information
              </SectionTitle>

              <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                <DetailItem
                  icon={Users}
                  label="Category"
                  value={formatLabel(String(staff.category))}
                />

                <DetailItem
                  icon={GraduationCap}
                  label="Qualification"
                  value={staff.qualification}
                />

                <DetailItem
                  icon={BriefcaseBusiness}
                  label="Experience"
                  value={staff.experience}
                />

                <DetailItem
                  icon={FileText}
                  label="ID proof number"
                  value={staff.idProofNumber}
                  mono
                />
              </div>
            </section>

            <Separator />

            {/* Account information */}
            <section>
              <SectionTitle icon={ShieldCheck}>
                Account information
              </SectionTitle>

              <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                <DetailItem
                  icon={ShieldCheck}
                  label="Account status"
                  value={staff.user.isActive ? "Active" : "Inactive"}
                />

                <DetailItem
                  icon={CalendarDays}
                  label="Staff record created"
                  value={formatDate(staff.createdAt)}
                />

                <DetailItem
                  icon={Clock}
                  label="Last login"
                  value={formatDate(staff.user.lastLoginAt)}
                />

                <DetailItem
                  icon={Hash}
                  label="User ID"
                  value={staff.user.id}
                  mono
                />
              </div>
            </section>

            <Separator />

            {/* Assigned tasks */}
            <section>
              <div className="flex items-center justify-between gap-3">
                <SectionTitle icon={Wrench}>Assigned tasks</SectionTitle>

                <Badge variant="secondary">
                  {staff.assignedTasks.length}{" "}
                  {staff.assignedTasks.length === 1 ? "task" : "tasks"}
                </Badge>
              </div>

              {staff.assignedTasks.length === 0 ? (
                <div className="mt-3 rounded-xl border border-dashed p-6 text-center">
                  <CheckCircle2 className="mx-auto size-8 text-muted-foreground" />

                  <p className="mt-3 text-sm font-medium">No tasks assigned</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Assigned tasks will appear here.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">
                        Total tasks
                      </p>
                      <p className="mt-1 text-xl font-semibold">
                        {staff.assignedTasks.length}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-3">
                    {staff.assignedTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </>
              )}
            </section>

            <Separator />

            {/* Record metadata */}
            <section className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Staff record ID</p>

              <p className="mt-1 font-mono text-xs break-all">{staff.id}</p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
