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
  { id: "PLUMBING", name: "Plumbing" },
  { id: "ELECTRICAL", name: "Electrical" },
  { id: "HVAC", name: "HVAC" },
  { id: "FURNITURE", name: "Furniture" },
  { id: "APPLIANCE", name: "Appliance" },
  { id: "INTERNET", name: "Internet" },
  { id: "BATHROOM", name: "Bathroom" },
  { id: "DOOR_LOCK", name: "Door Lock" },
  { id: "LIGHTING", name: "Lighting" },
  { id: "OTHER", name: "Other" },
];

const issuePriorities: SelectOption[] = [
  { id: "LOW", name: "Low" },
  { id: "MEDIUM", name: "Medium" },
  { id: "HIGH", name: "High" },
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
          <SelectField
            name="priority"
            control={control}
            label="Priority"
            placeholder="Select a priority"
            options={issuePriorities}
            error={formState.errors.priority?.message}
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
