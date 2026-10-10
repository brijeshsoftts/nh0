import {
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import { ErrorModal } from "@/components/common/ErrorModal";
import { FullScreenLoader } from "@/components/common/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

import { useStaffDetails } from "../hooks/useStaffDetails";

type ViewStaffDetailsProps = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

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
          className={`text-sm font-medium wrap-break-word ${
            mono ? "font-mono text-xs sm:text-sm" : ""
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-4 text-muted-foreground" />
      {children}
    </h3>
  );
}

export function ViewStaffDetails({
  id,
  open,
  onOpenChange,
}: ViewStaffDetailsProps) {
  const { data: staff, isLoading, isError, refetch } = useStaffDetails(id);
  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return <ErrorModal open onOpenChange={onOpenChange} onRefetch={refetch} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] p-0 sm:max-w-xl lg:max-w-2xl">
        <div className="px-5 pt-6 pb-5 sm:px-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl">Staff details</DialogTitle>

            <DialogDescription>
              View staff profile, employment information, and assigned tasks.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] space-y-4 overflow-y-scroll">
            <div className="mt-6 flex min-w-0 flex-col items-center gap-4 rounded-xl border bg-muted/20 p-5 text-center sm:flex-row sm:text-left">
              <Avatar className="size-20 shrink-0 border">
                <AvatarFallback className="text-xl font-semibold">
                  {getInitials(staff?.user.fullName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold wrap-break-word">
                  {staff?.user.fullName}
                </h3>

                <p className="mt-1 text-sm break-all text-muted-foreground">
                  {staff?.user.email}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge variant="secondary">
                    {formatLabel(String(staff?.category))}
                  </Badge>

                  <Badge
                    variant={staff?.user.isActive ? "default" : "destructive"}
                  >
                    {staff?.user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6 px-5 py-5 sm:px-6">
              {/* Personal information */}
              <section>
                <SectionTitle icon={UserRound}>
                  Personal information
                </SectionTitle>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                  <DetailItem
                    icon={Users}
                    label="Father's name"
                    value={staff?.fatherName}
                  />

                  <DetailItem
                    icon={Users}
                    label="Mother's name"
                    value={staff?.motherName}
                  />
                </div>
              </section>

              <Separator />

              {/* Contact information */}
              <section>
                <SectionTitle icon={Phone}>Contact information</SectionTitle>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                  <DetailItem
                    icon={Mail}
                    label="Email address"
                    value={staff?.user.email}
                  />

                  <DetailItem
                    icon={Phone}
                    label="Phone number"
                    value={staff?.user.phone}
                  />

                  <DetailItem
                    icon={ShieldCheck}
                    label="Emergency contact"
                    value={staff?.emergencyContact}
                  />

                  <DetailItem
                    icon={MapPin}
                    label="Address"
                    value={staff?.address}
                  />
                </div>
              </section>

              <Separator />

              {/* Employment information */}
              <section>
                <SectionTitle icon={BriefcaseBusiness}>
                  Employment information
                </SectionTitle>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                  <DetailItem
                    icon={Users}
                    label="Category"
                    value={formatLabel(String(staff?.category))}
                  />

                  <DetailItem
                    icon={GraduationCap}
                    label="Qualification"
                    value={staff?.qualification}
                  />

                  <DetailItem
                    icon={BriefcaseBusiness}
                    label="Experience"
                    value={staff?.experience}
                  />

                  <DetailItem
                    icon={FileText}
                    label="ID proof number"
                    value={staff?.idProofNumber}
                    mono
                  />
                </div>
              </section>

              <Separator />

              {/* Account information */}
              <section>
                <SectionTitle icon={ShieldCheck}>
                  Account information
                </SectionTitle>

                <div className="mt-2 grid grid-cols-1 divide-y sm:grid-cols-2 sm:gap-x-5 sm:divide-y-0">
                  <DetailItem
                    icon={ShieldCheck}
                    label="Account status"
                    value={staff?.user.isActive ? "Active" : "Inactive"}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="Staff record created"
                    value={formatDate(staff?.createdAt)}
                  />

                  <DetailItem
                    icon={Clock}
                    label="Last login"
                    value={formatDate(staff?.user.lastLoginAt)}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
