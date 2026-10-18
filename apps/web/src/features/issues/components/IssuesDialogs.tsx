import { CirclePlus, Send } from "lucide-react";
import { useState } from "react";

import { InputField } from "@/components/common/InputField";
import {
  SelectField,
  type SelectOption,
} from "@/components/common/SelectField";
import { TextareaField } from "@/components/common/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

import { useCreateIssue } from "../issues.crud";

const issueCategories: SelectOption[] = [
  { id: "ROOM", name: "Room" },
  { id: "BATHROOM", name: "Bathroom" },
  { id: "FOOD", name: "Food" },
  { id: "ENTERTAINMENT", name: "Entertainment" },
  { id: "CONNECTIVITY", name: "Connectivity" },
];

export function CreateCustomerIssueDialog() {
  const [open, setOpen] = useState(false);
  const { form, mutation, submit } = useCreateIssue({
    onSuccess: () => {
      form.reset();
      setOpen(false);
    },
  });
  const { register, control, handleSubmit, formState } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button">
          <CirclePlus />
          Report an issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report an issue</DialogTitle>
          <DialogDescription>
            Tell us what needs attention and our team will follow up.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <SelectField
            name="category"
            control={control}
            label="Category"
            placeholder="Choose a category"
            options={issueCategories}
            error={formState.errors.category?.message}
            disabled={mutation.isPending}
          />

          <InputField
            label="Title"
            placeholder="Briefly describe the issue"
            maxLength={150}
            error={formState.errors.title?.message}
            disabled={mutation.isPending}
            {...register("title")}
          />

          <TextareaField
            label="Details"
            placeholder="What happened, and where should we look?"
            maxLength={500}
            className="min-h-28"
            error={formState.errors.description?.message}
            disabled={mutation.isPending}
            {...register("description")}
          />

          <DialogFooter className="flex flex-row justify-end">
            <DialogClose>
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : <Send />}
              {mutation.isPending ? "Sending..." : "Send report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateIssueDialog() {}

export function ViewIssueDialog() {}
