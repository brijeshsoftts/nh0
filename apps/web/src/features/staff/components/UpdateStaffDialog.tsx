import { Check } from "lucide-react";
import { useEffect } from "react";

import { ErrorModal } from "@/components/common/ErrorModal";
import { InputField } from "@/components/common/InputField";
import { FullScreenLoader } from "@/components/common/Loader";
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

import { useStaffDetails } from "../hooks/useStaffDetails";
import { useUpdateStaffFacade } from "../hooks/useUpdateStaff";

const CATEGORY_OPTIONS = [
  { id: "RECEPTIONIST", name: "Receptionist" },
  { id: "HOUSEKEEPER", name: "Housekeeper" },
];

export function UpdateStaffDialog({
  open,
  onOpenChange,
  id,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}) {
  const {
    handleSubmit,
    submit,
    register,
    control,
    errors,
    isPending,
    isSuccess,
    reset,
  } = useUpdateStaffFacade(id);
  const { data: staff, isLoading, isError, refetch } = useStaffDetails(id);

  useEffect(() => {
    if (isSuccess && open) {
      reset();
      (async () => {
        onOpenChange(false);
      })();
    }
  }, [isSuccess, open, reset, onOpenChange]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] gap-0 overflow-hidden px-0 sm:max-w-2xl">
        <DialogHeader className="border-b px-5 py-4 sm:px-6">
          <DialogTitle className="text-lg">Add staff member</DialogTitle>
          <DialogDescription>
            Create the employee profile and linked staff account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4 px-5">
          <div className="max-h-[60vh] space-y-4 overflow-y-scroll">
            <section
              aria-labelledby="staff-account-heading"
              className="space-y-3"
            >
              <div>
                <h3
                  id="staff-account-heading"
                  className="text-sm font-semibold"
                >
                  Account details
                </h3>
                <p className="text-sm text-muted-foreground">
                  Staff account details
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Full name"
                  placeholder="Enter full name"
                  autoComplete="name"

                  error={errors.fullName?.message}
                  disabled={isPending}
                  {...register("fullName", { value: staff?.user.fullName })}
                />
                <InputField
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"

                  error={errors.email?.message}
                  disabled={isPending}
                  {...register("email", { value: staff?.user.email })}
                />
                <InputField
                  label="Phone"
                  type="tel"
                  placeholder="Enter phone number"
                  autoComplete="tel"

                  error={errors.phone?.message}
                  disabled={isPending}
                  {...register("phone", { value: staff?.user.phone })}
                />
                <SelectField
                  name="category"
                  label="Staff category"
                  placeholder="Select category"
                  options={CATEGORY_OPTIONS}
                  error={errors.category?.message}
                  disabled={isPending}
                  control={control}
                />
              </div>
            </section>

            <section
              aria-labelledby="staff-profile-heading"
              className="space-y-3"
            >
              <div>
                <h3
                  id="staff-profile-heading"
                  className="text-sm font-semibold"
                >
                  Employee profile
                </h3>
                <p className="text-sm text-muted-foreground">
                  Personal, qualification, and emergency contact details
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Father name"
                  placeholder="Enter father name"

                  error={errors.fatherName?.message}
                  disabled={isPending}
                  {...register("fatherName", { value: staff?.fatherName })}
                />
                <InputField
                  label="Mother name"
                  placeholder="Enter mother name"

                  error={errors.motherName?.message}
                  disabled={isPending}
                  {...register("motherName", { value: staff?.motherName })}
                />
                <InputField
                  label="ID proof number"
                  placeholder="Enter ID proof number"

                  error={errors.idProofNumber?.message}
                  disabled={isPending}
                  {...register("idProofNumber", {
                    value: staff?.idProofNumber,
                  })}
                />
                <InputField
                  label="Qualification"
                  placeholder="Enter qualification"

                  error={errors.qualification?.message}
                  disabled={isPending}
                  {...register("qualification", {
                    value: staff?.qualification,
                  })}
                />
                <InputField
                  label="Experience"
                  placeholder="e.g. 2 years"

                  error={errors.experience?.message}
                  disabled={isPending}
                  {...register("experience", { value: staff?.experience })}
                />
                <InputField
                  label="Emergency contact"
                  type="tel"
                  placeholder="Enter emergency phone"

                  error={errors.emergencyContact?.message}
                  disabled={isPending}
                  {...register("emergencyContact", {
                    value: staff?.emergencyContact,
                  })}
                />
                <div className="sm:col-span-2">
                  <TextareaField
                    label="Address"
                    placeholder="Enter home address"

                    className="min-h-24"
                    error={errors.address?.message}
                    disabled={isPending}
                    {...register("address", { value: staff?.address })}
                  />
                </div>
              </div>
            </section>
          </div>

          <DialogFooter className="border-t px-5 py-4 sm:px-6">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <Check aria-hidden="true" />
                  Update staff
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
