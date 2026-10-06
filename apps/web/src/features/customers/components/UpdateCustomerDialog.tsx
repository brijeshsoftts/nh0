import { Check } from "lucide-react";

import { ErrorModal } from "@/components/common/ErrorModal";
import { InputField } from "@/components/common/InputField";
import { FullScreenLoader } from "@/components/common/Loader";
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

import { useCustomer } from "../hooks/useCustomer";
import { useUpdateCustomerFacade } from "../hooks/useUpdateCustomer";

import { CustomerDocumentField } from "./CustomerDocumentField";

type UpdateCustomerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function UpdateCustomerDialog({
  id,
  open,
  onOpenChange,
}: UpdateCustomerDialogProps) {
  const { data, isError, isLoading, refetch } = useCustomer(id);
  const { handleSubmit, submit, register, control, errors, isPending } =
    useUpdateCustomerFacade(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  if (!data) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update customer
          </DialogTitle>
          <DialogDescription>
            Update the customer information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-6">
          <div className="max-h-100 space-y-6 overflow-y-scroll">
            <InputField
              label="Full name"
              required
              placeholder="Enter full name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName", { value: data?.fullName })}
              disabled={isPending}
            />

            <InputField
              label="Phone"
              type="tel"
              required
              placeholder="Enter phone number"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone", { value: data?.phone })}
              disabled={isPending}
            />

            <InputField
              label="Email"
              type="email"
              required
              placeholder="Enter email address"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", { value: data?.email })}
              disabled={isPending}
            />

            <InputField
              label="Address"
              required
              placeholder="Enter address"
              autoComplete="street-address"
              error={errors.address?.message}
              {...register("address", { value: data?.address })}
              disabled={isPending}
            />

            <InputField
              label="ID proof number"
              required
              placeholder="Enter ID proof number"
              error={errors.idProofNumber?.message}
              {...register("idProofNumber", { value: data.idProofNumber })}
              disabled={isPending}
            />

            <CustomerDocumentField
              control={control}
              name="idProofImage"
              label="Replace ID proof image (optional)"
              error={errors.idProofImage?.message}
              disabled={isPending}
            />

            <CustomerDocumentField
              control={control}
              name="signatureImage"
              label="Replace signature image (optional)"
              error={errors.signatureImage?.message}
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
                  <span>Update Customer</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
