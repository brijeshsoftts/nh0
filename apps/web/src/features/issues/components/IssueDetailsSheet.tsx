import { formatDate } from "date-fns";
import { CalendarDays, MapPin, UserRound } from "lucide-react";

import {
  IssuePriorityBadge,
  IssueStatusBadge,
} from "@/components/common/EnumBadges";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import { useIssue } from "../issues.crud";

type IssueDetailsSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueId: string;
};

function formatIssueDate(value: string | null) {
  if (!value) return "Not recorded";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : formatDate(date, "dd MMM yyyy, h:mm a");
}

export function IssueDetailsSheet({
  open,
  onOpenChange,
  issueId,
}: IssueDetailsSheetProps) {
  const { data: issue, isLoading, isError, refetch } = useIssue(issueId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b px-5 py-4 sm:px-6">
          <SheetTitle>{issue?.reference ?? "Issue details"}</SheetTitle>
          <SheetDescription>
            {issue?.title ?? "View the reported issue and current status."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          {isLoading && (
            <div
              role="status"
              aria-label="Loading issue details"
              className="space-y-3"
            >
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}

          {isError && (
            <div role="alert" className="space-y-3">
              <p className="text-sm text-destructive">
                Issue details could not be loaded.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => void refetch()}
              >
                Try again
              </Button>
            </div>
          )}

          {!isLoading && !isError && !issue && (
            <p role="status" className="text-sm text-muted-foreground">
              Issue not found.
            </p>
          )}

          {issue && !isLoading && !isError && (
            <>
              <div className="flex flex-wrap gap-2">
                <IssueStatusBadge value={issue.status} />
                <IssuePriorityBadge value={issue.priority} />
                <span className="rounded-sm border px-2 py-1 text-xs">
                  {issue.category.replaceAll("_", " ")}
                </span>
              </div>

              <section aria-label="Issue description" className="space-y-2">
                <h3 className="text-sm font-semibold">Description</h3>
                <p className="rounded-md border bg-muted/20 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                  {issue.description || "No description provided."}
                </p>
              </section>

              {issue.image && (
                <a
                  href={issue.image.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-md border p-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <img
                    src={issue.image.url}
                    alt={issue.image.altText ?? "Issue attachment"}
                    className="max-h-64 w-full rounded-sm object-contain"
                  />
                </a>
              )}

              <Separator />

              <section
                aria-label="Issue location and reporter"
                className="space-y-3"
              >
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="size-4 text-muted-foreground" />
                  Location and reporter
                </h3>
                <Detail label="Room" value={`Room ${issue.room.roomNumber}`} />
                <Detail label="Floor" value={String(issue.room.floor)} />
                <Detail label="Reported by" value={issue.reporter.fullName} />
                <Detail
                  label="Assigned to"
                  value={issue.assignee?.fullName ?? "Unassigned"}
                />
              </section>

              <Separator />

              <section aria-label="Issue timeline" className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  Timeline
                </h3>
                <Detail
                  label="Reported"
                  value={formatIssueDate(issue.reportedAt)}
                />
                <Detail
                  label="Started"
                  value={formatIssueDate(issue.startedAt)}
                />
                <Detail
                  label="Completed"
                  value={formatIssueDate(issue.completedAt)}
                />
                <Detail
                  label="Resolved"
                  value={formatIssueDate(issue.resolvedAt)}
                />
                <Detail
                  label="Last updated"
                  value={formatIssueDate(issue.updatedAt)}
                />
              </section>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-2 last:border-0">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {label === "Reported by" && (
          <UserRound aria-hidden="true" className="size-4" />
        )}
        {label}
      </span>
      <span className="text-right text-sm font-medium break-all">{value}</span>
    </div>
  );
}
