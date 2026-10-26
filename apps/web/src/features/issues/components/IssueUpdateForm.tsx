import { useState } from "react";

import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
import { TextareaField } from "@/components/common/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

import {
  issueCategories,
  issuePriorities,
  issueStatuses,
} from "../issue-form-options";
import { useUpdateIssue } from "../issues.crud";
import type { IssueDetails } from "../issues.types";
import type { AdminUpdateIssue } from "../schemas/issue.schema";

export type IssueUpdateMode = "edit" | "priority" | "status";

function initialValues(
  issue: IssueDetails,
  mode: IssueUpdateMode
): AdminUpdateIssue {
  if (mode === "edit") {
    return {
      title: issue.title,
      description: issue.description,
      category: issue.category,
    };
  }
  if (mode === "priority") return { priority: issue.priority };
  return { status: issue.status };
}

type IssueUpdateFormProps = {
  issue: IssueDetails;
  mode: IssueUpdateMode;
  onSuccess: () => void;
  onCancel: () => void;
};

export function IssueUpdateForm({
  issue,
  mode,
  onSuccess,
  onCancel,
}: IssueUpdateFormProps) {
  const [confirmCancellation, setConfirmCancellation] = useState(false);
  const { form, mutation, submit } = useUpdateIssue(issue.id, {
    defaultValues: initialValues(issue, mode),
    onSuccess,
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = form;
  const isPending = mutation.isPending;
  const unchanged =
    (mode === "priority" && issue.priority === form.watch("priority")) ||
    (mode === "status" && issue.status === form.watch("status"));

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          if (
            mode === "status" &&
            data.status === "CANCELLED" &&
            issue.status !== "CANCELLED"
          ) {
            setConfirmCancellation(true);
            return;
          }
          submit(data);
        })}
        className="space-y-4"
      >
        {mode === "edit" && (
          <>
            <InputField
              label="Title"
              maxLength={200}
              error={errors.title?.message}
              disabled={isPending}
              {...register("title")}
            />
            <SelectField
              name="category"
              control={control}
              label="Category"
              options={issueCategories}
              error={errors.category?.message}
              disabled={isPending}
            />
            <TextareaField
              label="Description"
              maxLength={5000}
              className="min-h-28"
              error={errors.description?.message}
              disabled={isPending}
              {...register("description")}
            />
          </>
        )}

        {mode === "priority" && (
          <SelectField
            name="priority"
            control={control}
            label="Priority"
            options={issuePriorities}
            error={errors.priority?.message}
            disabled={isPending}
          />
        )}

        {mode === "status" && (
          <SelectField
            name="status"
            control={control}
            label="Status"
            options={issueStatuses}
            error={errors.status?.message}
            disabled={isPending}
          />
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending || unchanged}>
            {isPending ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
      <Dialog
        open={confirmCancellation}
        onOpenChange={(open) => {
          if (!open && !isPending) setConfirmCancellation(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel this issue?</DialogTitle>
            <DialogDescription>
              This changes the issue status to cancelled.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmCancellation(false)}
              disabled={isPending}
            >
              Keep open
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                submit({ status: "CANCELLED" });
              }}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Cancel issue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
