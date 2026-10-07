import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { InputField } from "@/components/common/InputField";
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

import { useCreateCustomerFacade } from "../hooks/useCreateCustomer";

import { CustomerDocumentField } from "./CustomerDocumentField";

export function CreateCustomerDialog({
  children,
  onCreated,
}: {
  children: ReactNode;
  onCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    submit,
    register,
    control,
    errors,
    isPending,
    isSuccess,
  } = useCreateCustomerFacade();

  useEffect(() => {
    if (!isSuccess) return;
    onCreated?.();
    setOpen(false);
  }, [isSuccess, onCreated]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            New Customer
          </DialogTitle>
          <DialogDescription>
            Enter the customer details below to create a new customer.
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
              label="Phone"
              type="tel"
              placeholder="Enter phone number"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
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

            <TextareaField
              label="Address"
              placeholder="e.g. 123 Main Street, Anytown, USA"
              {...register("address")}
              disabled={isPending}
              error={errors.address?.message}
            />

            <InputField
              label="ID proof number"
              placeholder="Enter ID proof number"
              error={errors.idProofNumber?.message}
              {...register("idProofNumber")}
              disabled={isPending}
            />

            <CustomerDocumentField
              control={control}
              name="idProofImage"
              label="ID proof image"
              required
              error={errors.idProofImage?.message}
              disabled={isPending}
            />

            <CustomerDocumentField
              control={control}
              name="signatureImage"
              label="Signature image"
              required
              error={errors.signatureImage?.message}
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
                  <span>Create Customer</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
