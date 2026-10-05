import { Check, Sparkles } from "lucide-react";

import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
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

import { categories, icons } from "../amenities.constants";
import type { Amenity } from "../amenities.types";
import { useUpdateAmenityFacade } from "../hooks/useUpdateAmenity";

export function UpdateAmenityModal({
  children,
  amenity,
}: {
  children?: React.ReactNode;
  amenity: Amenity;
}) {
  const { handleSubmit, submit, isPending, errors, register, control } =
    useUpdateAmenityFacade(amenity.id);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] gap-6 overflow-y-auto sm:min-w-100">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground shadow-sm">
              <Sparkles className="size-5" />
            </div>

            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Update amenity
              </DialogTitle>

              <DialogDescription className="text-sm leading-5">
                Update the details of an existing amenity.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <InputField
            label="Name"
            type="text"
            placeholder="e.g. Free Wi-Fi"
            {...register("name", { value: amenity.name })}
            error={errors.name?.message}
            className="mt-1 h-10"
          />

          <SelectField
            name="icon"
            label="Icon"
            placeholder="e.g. wifi"
            control={control}
            options={icons}
            error={errors.icon?.message}
            disabled={isPending}
            defaultValue={amenity.icon}
          />

          <SelectField
            name="category"
            label="Category"
            placeholder="e.g. Room, Bathroom"
            control={control}
            options={categories}
            error={errors.category?.message}
            disabled={isPending}
            defaultValue={amenity.category}
          />

          <TextareaField
            label="Description"
            placeholder="e.g. Free Wi-Fi available in all rooms"
            {...register("description", { value: amenity.description })}
            error={errors.description?.message}
            className="mt-1 h-10"
          />

          <DialogFooter className="border-t border-border/60 bg-muted/20 px-6 py-4">
            <DialogClose>
              <Button type="button" variant="ghost" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending} className="min-w-28">
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <Check className="size-4" />
                  <span>Update amenity</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
