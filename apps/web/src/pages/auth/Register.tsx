import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/app/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRegisterFacade } from "@/features/auth/hooks/useRegister";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, submit, register, errors, isPending } =
    useRegisterFacade(() => undefined);

  return (
    <div className="w-full rounded-xl border border-border/70 bg-card px-6 py-7 shadow-lg sm:px-8 sm:py-7">
      <Logo
        className="mx-auto flex-col gap-1.5 [&>div:last-child]:items-center"
        to="/"
      />
      <h1 className="mt-4 text-center font-heading text-3xl font-medium text-foreground">
        Create an Account
      </h1>
      <p className="mt-1 text-center text-sm leading-6 text-muted-foreground">
        Register to manage your stays and bookings.
      </p>

      <form
        className="mt-6 space-y-4"
        noValidate
        onSubmit={handleSubmit(submit)}
      >
        <div className="space-y-2">
          <Label htmlFor="register-full-name">
            Full name{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <div className="relative">
            <UserRound
              aria-hidden="true"
              className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-primary"
              strokeWidth={1.8}
            />
            <Input
              autoComplete="name"
              aria-describedby={
                errors.fullName ? "register-full-name-error" : undefined
              }
              aria-invalid={Boolean(errors.fullName)}
              className="h-11 rounded-md px-3 pl-10"
              disabled={isPending}
              id="register-full-name"
              placeholder="Enter your full name"
              {...register("fullName")}
            />
          </div>
          {errors.fullName?.message ? (
            <p
              className="text-sm text-destructive"
              id="register-full-name-error"
            >
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="register-email">
              Email address{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
            </Label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-primary"
                strokeWidth={1.8}
              />
              <Input
                autoComplete="email"
                aria-describedby={
                  errors.email ? "register-email-error" : undefined
                }
                aria-invalid={Boolean(errors.email)}
                className="h-11 rounded-md px-3 pl-10"
                disabled={isPending}
                id="register-email"
                placeholder="Enter your email address"
                type="email"
                {...register("email")}
              />
            </div>
            {errors.email?.message ? (
              <p className="text-sm text-destructive" id="register-email-error">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">
              Password{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
            </Label>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-primary"
                strokeWidth={1.8}
              />
              <Input
                autoComplete="new-password"
                aria-describedby={
                  errors.password
                    ? "register-password-error"
                    : "register-password-help"
                }
                aria-invalid={Boolean(errors.password)}
                className="h-11 rounded-md px-3 pr-14 pl-10"
                disabled={isPending}
                id="register-password"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 inline-flex min-w-11 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
                disabled={isPending}
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-5" />
                ) : (
                  <Eye aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
            {errors.password?.message ? (
              <p
                className="text-sm text-destructive"
                id="register-password-error"
              >
                {errors.password.message}
              </p>
            ) : (
              <p
                className="text-xs leading-5 text-muted-foreground"
                id="register-password-help"
              >
                Use 8–128 characters.
              </p>
            )}
          </div>
        </div>

        <Button
          className="h-11 w-full font-semibold"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <Spinner className="size-5" />
          ) : (
            <>
              <UserRoundPlus aria-hidden="true" className="size-4" />
              Register
            </>
          )}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="font-semibold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
