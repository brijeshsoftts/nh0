import { Check } from "lucide-react";
import { useEffect } from "react";

import { InputField } from "@/components/common/InputField";
import { SelectField } from "@/components/common/SelectField";
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

import { useUpdateUserFacade } from "../hooks/useUpdateUser";
import type { User } from "../users.types";

type UpdateUserDialogProps = {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UpdateUserDialog({
  user,
  open,
  onOpenChange,
}: UpdateUserDialogProps) {
  const {
    handleSubmit,
    submit,
    register,
    control,
    errors,
    isPending,
    isSuccess,
  } = useUpdateUserFacade(user.id);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update user
          </DialogTitle>
          <DialogDescription>
            Update the selected user details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <div className="max-h-[60vh] space-y-4 overflow-y-scroll">
            <InputField
              label="Full name"
              placeholder="Enter full name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName", { value: user.fullName })}
              disabled={isPending}
            />

            <InputField
              label="Email"
              type="email"
              placeholder="Enter email address"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", { value: user.email })}
              disabled={isPending}
            />

            <InputField
              label="Phone"
              type="tel"
              placeholder="Enter phone number"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone", { value: user.phone })}
              disabled={isPending}
            />

            <SelectField
              name="role"
              label="Role"
              control={control}
              options={[
                { id: "MANAGER", name: "Manager" },
                { id: "STAFF", name: "Staff" },
              ]}
              error={errors.role?.message}
              disabled={isPending}
            />
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="min-w-28">
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <Check className="size-4" />
                  <span>Update User</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
