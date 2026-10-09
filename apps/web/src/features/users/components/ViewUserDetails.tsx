"use client";

import {
  CalendarDays,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import { ErrorModal } from "@/components/common/ErrorModal";
import { FullScreenLoader } from "@/components/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/format";

import { useUserDetails } from "../hooks/useUserDetails";

type ViewUserDetailsProps = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "Never";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatLabel(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 py-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p
          className={`text-sm font-medium break-words ${
            mono ? "font-mono text-xs sm:text-sm" : ""
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export function ViewUserDetails({
  id,
  open,
  onOpenChange,
}: ViewUserDetailsProps) {
  const { data: user, isLoading, isError, refetch } = useUserDetails(id || "");

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError || !user) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto p-0 sm:max-w-lg">
        {!user ? (
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>User details</DialogTitle>
              <DialogDescription>No user selected.</DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            {/* User profile header */}
            <div className="px-5 pt-6 pb-5 sm:px-6">
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl">User details</DialogTitle>

                <DialogDescription>
                  View profile and account information.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 flex min-w-0 flex-col items-center gap-4 rounded-xl border bg-muted/20 p-5 text-center sm:flex-row sm:text-left">
                <Avatar className="size-20 shrink-0 border">
                  <AvatarImage
                    src={user.avatar?.url || undefined}
                    alt={user.avatar?.altText || user.fullName}
                  />

                  <AvatarFallback className="text-xl font-semibold">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold wrap-break-word">
                    {user.fullName}
                  </h3>

                  <p className="mt-1 text-sm break-all text-muted-foreground">
                    {user.email}
                  </p>

                  <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Badge variant="secondary">
                      {formatLabel(String(user.role))}
                    </Badge>

                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* User details */}
            <div className="space-y-6 px-5 py-5 sm:px-6">
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <UserRound className="size-4 text-muted-foreground" />
                  Personal information
                </h3>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                  <DetailItem
                    icon={UserRound}
                    label="Full name"
                    value={user.fullName}
                  />

                  <DetailItem
                    icon={Phone}
                    label="Phone number"
                    value={user.phone}
                  />

                  <DetailItem
                    icon={Mail}
                    label="Email address"
                    value={user.email}
                  />

                  <DetailItem
                    icon={Users}
                    label="Category"
                    value={
                      user.category
                        ? formatLabel(String(user.category))
                        : "Not assigned"
                    }
                  />
                </div>
              </section>

              <Separator />

              {/* Account information */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="size-4 text-muted-foreground" />
                  Account information
                </h3>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                  <DetailItem
                    icon={ShieldCheck}
                    label="Role"
                    value={formatLabel(String(user.role))}
                  />

                  <DetailItem
                    icon={Users}
                    label="Account status"
                    value={user.isActive ? "Active" : "Inactive"}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="Joined on"
                    value={formatDate(user.createdAt)}
                  />

                  <DetailItem
                    icon={Clock}
                    label="Last login"
                    value={formatDate(user.lastLoginAt)}
                  />
                </div>
              </section>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
