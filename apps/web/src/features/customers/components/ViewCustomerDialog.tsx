import { formatDate } from "date-fns";
import { Mail, Phone, UserRound } from "lucide-react";
import { useState } from "react";

import { StatusBadge } from "@/components/common/EnumBadges";
import { ErrorModal } from "@/components/common/ErrorModal";
import { FullScreenLoader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { CustomerDetails } from "../customers.types";
import { useCustomer } from "../hooks/useCustomer";

import { UpdateCustomerDialog } from "./UpdateCustomerDialog";

type ViewCustomerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function ViewCustomerDialog({
  open,
  onOpenChange,
  id,
}: ViewCustomerDialogProps) {
  const { data, isLoading, isError, refetch } = useCustomer(id);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  if (!data) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  const customer: CustomerDetails = data;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-160">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 pr-6">
              <div className="space-y-1">
                <DialogTitle className="text-lg font-semibold tracking-tight">
                  {customer.fullName}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone aria-hidden="true" className="size-3.5" />
                    {customer.phone}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Mail aria-hidden="true" className="size-3.5" />
                    {customer.email}
                  </span>
                </DialogDescription>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUpdateModal(true)}
              >
                Edit
              </Button>
            </div>
          </DialogHeader>

          <Separator />

          <Tabs defaultValue="profile" className="w-full flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent
              value="profile"
              className="max-h-100 space-y-5 overflow-y-scroll py-6"
            >
              <div className="flex items-center gap-4">
                {customer.profile?.url ? (
                  <img
                    src={customer.profile.url}
                    alt={customer.profile.altText ?? customer.fullName}
                    className="size-16 rounded-full border object-cover"
                  />
                ) : (
                  <span className="grid size-16 place-items-center rounded-full border bg-muted text-muted-foreground">
                    <UserRound aria-hidden="true" className="size-7" />
                  </span>
                )}
                <div className="space-y-2">
                  <p className="font-medium">{customer.fullName}</p>
                  <StatusBadge value={customer.isActive} />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="text-sm">
                    {customer.address || "Not provided"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    ID proof number
                  </p>
                  <p className="text-sm">
                    {customer.idProofNumber || "Not provided"}
                  </p>
                </div>
              </div>

              <Separator />

              <section aria-label="Customer documents" className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium">Customer documents</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Uploaded ID proof and signature images.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CustomerDocument label="ID proof" image={customer.idProof} />
                  <CustomerDocument
                    label="Signature"
                    image={customer.signature}
                  />
                </div>
              </section>

              <Separator />

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Created
                </p>
                <p className="text-sm">
                  {formatCustomerDate(customer.createdAt, "dd MMM yyyy")}
                </p>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <CustomerDate label="Updated" value={customer.updatedAt} />
                <CustomerDate label="Last login" value={customer.lastLoginAt} />
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
                No booking details available.
              </div>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
                No payment details available.
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <UpdateCustomerDialog
        open={isUpdateModal}
        onOpenChange={setIsUpdateModal}
        id={customer.id}
      />
    </>
  );
}

function CustomerDocument({
  label,
  image,
}: {
  label: string;
  image: CustomerDetails["idProof"];
}) {
  return (
    <figure className="overflow-hidden rounded-xl border bg-muted/20">
      <figcaption className="border-b px-3 py-2 text-sm font-medium">
        {label}
      </figcaption>
      {image?.url ? (
        <a
          href={image.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${label.toLowerCase()} image in a new tab`}
          className="block p-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img
            src={image.url}
            alt={image.altText ?? `${label} for customer`}
            loading="lazy"
            className="max-h-64 min-h-36 w-full rounded-lg object-contain"
          />
        </a>
      ) : (
        <div className="grid min-h-36 place-items-center p-4 text-sm text-muted-foreground">
          No image uploaded
        </div>
      )}
    </figure>
  );
}

function CustomerDate({
  label,
  value,
}: {
  label: string;
  value?: Date | string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">
        {formatCustomerDate(value, "dd MMM yyyy, h:mm a")}
      </p>
    </div>
  );
}

function formatCustomerDate(value: Date | string | undefined, pattern: string) {
  if (!value) return "Not available";

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : formatDate(date, pattern);
}
