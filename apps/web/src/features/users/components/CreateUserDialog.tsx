import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { InputField } from "@/components/common/InputField";
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

import { useCreateUserFacade } from "../hooks/useCreateUser";

export function CreateUserDialog({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending } =
    useCreateUserFacade();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            New User
          </DialogTitle>
          <DialogDescription>
            Create a new internal user account. The default password is
            Admin@1234.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="max-h-[60vh] space-y-4 overflow-y-scroll">
            <InputField
              label="Full name"
              placeholder="Enter full name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName")}
              disabled={isPending}
            />

            <InputField
              label="Email"
              type="email"
              placeholder="Enter email address"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
              disabled={isPending}
            />

            <InputField
              label="Phone"
              type="tel"
              placeholder="Enter phone number"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
              disabled={isPending}
            />
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="min-w-28">
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <Check className="size-4" />
                  <span>Create User</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
