import { Check } from "lucide-react";
import { useEffect, useState } from "react";

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

import { useCreateStaffFacade } from "../hooks/useCreateStaff";

const CATEGORY_OPTIONS = [
  { id: "RECEPTIONIST", name: "Receptionist" },
  { id: "HOUSEKEEPER", name: "Housekeeper" },
];

export function CreateStaffDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleSubmit,
    submit,
    register,
    control,
    errors,
    isPending,
    isSuccess,
    reset,
  } = useCreateStaffFacade();

  useEffect(() => {
    if (isSuccess && isOpen) {
      reset();
      (async () => {
        setIsOpen(false);
      })();
    }
  }, [isSuccess, isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>

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
                  Sign-in and contact information
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Full name"
                  placeholder="Enter full name"
                  autoComplete="name"

                  error={errors.fullName?.message}
                  disabled={isPending}
                  {...register("fullName")}
                />
                <InputField
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"

                  error={errors.email?.message}
                  disabled={isPending}
                  {...register("email")}
                />
                <InputField
                  label="Phone"
                  type="tel"
                  placeholder="Enter phone number"
                  autoComplete="tel"

                  error={errors.phone?.message}
                  disabled={isPending}
                  {...register("phone")}
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
                  {...register("fatherName")}
                />
                <InputField
                  label="Mother name"
                  placeholder="Enter mother name"

                  error={errors.motherName?.message}
                  disabled={isPending}
                  {...register("motherName")}
                />
                <InputField
                  label="ID proof number"
                  placeholder="Enter ID proof number"

                  error={errors.idProofNumber?.message}
                  disabled={isPending}
                  {...register("idProofNumber")}
                />
                <InputField
                  label="Qualification"
                  placeholder="Enter qualification"

                  error={errors.qualification?.message}
                  disabled={isPending}
                  {...register("qualification")}
                />
                <InputField
                  label="Experience"
                  placeholder="e.g. 2 years"

                  error={errors.experience?.message}
                  disabled={isPending}
                  {...register("experience")}
                />
                <InputField
                  label="Emergency contact"
                  type="tel"
                  placeholder="Enter emergency phone"

                  error={errors.emergencyContact?.message}
                  disabled={isPending}
                  {...register("emergencyContact")}
                />
                <div className="sm:col-span-2">
                  <TextareaField
                    label="Address"
                    placeholder="Enter home address"

                    className="min-h-24"
                    error={errors.address?.message}
                    disabled={isPending}
                    {...register("address")}
                  />
                </div>
              </div>
            </section>
          </div>

          <DialogFooter className="border-t px-5 py-4 sm:px-6">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  <Check aria-hidden="true" />
                  Create staff
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
