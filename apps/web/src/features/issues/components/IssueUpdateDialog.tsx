import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { useIssue } from "../issues.crud";

import { IssueUpdateForm, type IssueUpdateMode } from "./IssueUpdateForm";

type IssueUpdateDialogProps = {
  issueId: string;
  mode: IssueUpdateMode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const dialogText: Record<
  IssueUpdateMode,
  { title: string; description: string }
> = {
  edit: { title: "Edit issue", description: "Update the issue details." },
  priority: {
    title: "Set priority",
    description: "Choose the priority for this issue.",
  },
  status: {
    title: "Update status",
    description: "Choose the current issue status.",
  },
};

export function IssueUpdateDialog({
  issueId,
  mode,
  open,
  onOpenChange,
}: IssueUpdateDialogProps) {
  const { data: issue, isLoading, isError, refetch } = useIssue(issueId);
  const text = dialogText[mode];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{text.title}</DialogTitle>
          <DialogDescription>{text.description}</DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div role="status" aria-label="Loading issue" className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {isError && (
          <div role="alert" className="space-y-3">
            <p className="text-sm text-destructive">
              Issue could not be loaded.
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
          <IssueUpdateForm
            key={`${issue.id}-${mode}`}
            issue={issue}
            mode={mode}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
