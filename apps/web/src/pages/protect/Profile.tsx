import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  MapPin,
  Phone,
  Save,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";

import { Header } from "@/components/common/Header";
import { InputField } from "@/components/common/InputField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  useChangePassword,
  useProfileDetails,
  useUpdateProfile,
} from "@/features/profile/profile.crud";
import {
  type UpdateProfile,
  UpdateProfileSchema,
} from "@/features/profile/schemas/profileUpdate.schema";

type PasswordFieldProps = {
  id: string;
  label: string;
  autoComplete: string;
  error?: string;
  registration: UseFormRegisterReturn;
  visible: boolean;
  disabled: boolean;
  onToggleVisibility: () => void;
};

function PasswordField({
  id,
  label,
  autoComplete,
  error,
  registration,
  visible,
  disabled,
  onToggleVisibility,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-10 rounded-none pr-10"
          disabled={disabled}
          {...registration}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 rounded-none"
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          title={visible ? "Hide password" : "Show password"}
          disabled={disabled}
          onClick={onToggleVisibility}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function ProfilePage() {
  const profileQuery = useProfileDetails();
  const updateProfile = useUpdateProfile();
  const password = useChangePassword();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const profileForm = useForm<UpdateProfile>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { fullName: "", email: "", phone: "" },
  });
  const { reset, register, handleSubmit, formState } = profileForm;

  useEffect(() => {
    const user = profileQuery.data;
    if (!user) return;

    reset({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
  }, [profileQuery.data, reset]);

  if (profileQuery.isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-muted-foreground">
        <Spinner />
        <span>Loading your profile</span>
      </div>
    );
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <section className="space-y-4">
        <Header
          eyebrow="Account"
          title="Your profile"
          description="Manage your personal details and account security."
        />
        <div className="flex flex-col items-start gap-3 rounded-none border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Your profile could not be loaded.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="rounded-none"
            onClick={() => void profileQuery.refetch()}
          >
            Try again
          </Button>
        </div>
      </section>
    );
  }

  const user = profileQuery.data;
  const initials = user.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const details = [
    {
      label: "Category",
      value: user.category ? formatLabel(user.category) : null,
    },
    { label: "ID proof number", value: user.idProofNumber },
    { label: "Experience", value: user.experience },
    { label: "Qualification", value: user.qualification },
    { label: "Emergency contact", value: user.emergencyContact },
    { label: "Address", value: user.address },
  ].filter((detail) => detail.value);
  const documents = [
    { label: "ID proof", image: user.idProofImage },
    { label: "Signature", image: user.signatureImage },
  ].filter((document) => document.image);

  return (
    <>
      <section
        aria-label="Profile summary"
        className="flex flex-col gap-4 rounded-none border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 items-center gap-4">
          <Avatar
            size="lg"
            className="size-16 ring-2 ring-background sm:size-18"
          >
            {user.avatar?.url ? (
              <AvatarImage
                src={user.avatar.url}
                alt={`${user.fullName} profile`}
              />
            ) : null}
            <AvatarFallback className="text-lg font-semibold">
              {initials || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-1">
            <h2 className="truncate text-lg font-semibold text-foreground">
              {user.fullName}
            </h2>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline">{formatLabel(user.role)}</Badge>
              <Badge variant={user.isActive ? "secondary" : "destructive"}>
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          <span>Member since {formatDate(user.createdAt)}</span>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <Card className="rounded-none">
          <CardHeader className="rounded-none">
            <div className="flex items-center gap-2">
              <UserRound
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <CardTitle>Personal details</CardTitle>
            </div>
            <CardDescription>
              Update the contact information on your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-5"
              onSubmit={handleSubmit((data) => updateProfile.mutate(data))}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Full name"
                  autoComplete="name"
                  required
                  error={formState.errors.fullName?.message}
                  disabled={updateProfile.isPending}
                  {...register("fullName")}
                />
                <InputField
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  required
                  error={formState.errors.phone?.message}
                  disabled={updateProfile.isPending}
                  {...register("phone")}
                />
              </div>
              <InputField
                label="Email address"
                type="email"
                autoComplete="email"
                required
                error={formState.errors.email?.message}
                disabled={updateProfile.isPending}
                {...register("email")}
              />
              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none"
                  disabled={!formState.isDirty || updateProfile.isPending}
                  onClick={() => reset(user)}
                >
                  Discard changes
                </Button>
                <Button
                  type="submit"
                  className="rounded-none"
                  disabled={!formState.isDirty || updateProfile.isPending}
                >
                  {updateProfile.isPending ? (
                    <Spinner />
                  ) : (
                    <Save aria-hidden="true" />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-none">
          <CardHeader className="rounded-none">
            <div className="flex items-center gap-2">
              <KeyRound
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <CardTitle>Password</CardTitle>
            </div>
            <CardDescription>
              Verify your current password before choosing a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={password.handleSubmit((data) => password.submit(data))}
            >
              <PasswordField
                id="oldPassword"
                label="Current password"
                autoComplete="current-password"
                error={password.errors.oldPassword?.message}
                registration={password.register("oldPassword")}
                visible={oldPasswordVisible}
                disabled={password.isPending}
                onToggleVisibility={() =>
                  setOldPasswordVisible((visible) => !visible)
                }
              />
              <PasswordField
                id="newPassword"
                label="New password"
                autoComplete="new-password"
                error={password.errors.newPassword?.message}
                registration={password.register("newPassword")}
                visible={newPasswordVisible}
                disabled={password.isPending}
                onToggleVisibility={() =>
                  setNewPasswordVisible((visible) => !visible)
                }
              />
              <p className="text-xs leading-5 text-muted-foreground">
                Use at least 8 characters. Your current password is never shown.
              </p>
              <div className="flex justify-end border-t border-border pt-4">
                <Button
                  type="submit"
                  className="rounded-none"
                  disabled={password.isPending}
                >
                  {password.isPending ? (
                    <Spinner />
                  ) : (
                    <KeyRound aria-hidden="true" />
                  )}
                  Update password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none">
        <CardHeader className="rounded-none">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <CardTitle>Additional information</CardTitle>
          </div>
          <CardDescription>
            Role-specific details associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {details.length || documents.length ? (
            <div className="space-y-5">
              {details.length ? (
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {details.map(({ label, value }) => (
                    <div key={label} className="min-w-0 space-y-1">
                      <dt className="text-xs font-medium text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="flex items-start gap-2 text-sm text-foreground">
                        {label === "Address" ? (
                          <MapPin
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        ) : label === "Emergency contact" ? (
                          <Phone
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span className="wrap-break-word">{value}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {details.length && documents.length ? <Separator /> : null}
              {documents.length ? (
                <div className="flex flex-wrap gap-3">
                  {documents.map(({ label, image }) => (
                    <a
                      key={label}
                      href={image?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 items-center gap-2 rounded-none border border-border px-3 text-sm text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <FileText
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {image?.altText || `View ${label.toLowerCase()}`}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No additional role-specific information is available.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
