import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="w-full max-w-md">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        Welcome to Nivara
      </p>
      <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        Create your account
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Join Nivara and make your next stay easier.
      </p>

      <form
        className="mt-8 space-y-5"
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
          <Input
            autoComplete="name"
            aria-describedby={
              errors.fullName ? "register-full-name-error" : undefined
            }
            aria-invalid={Boolean(errors.fullName)}
            className="h-12 rounded-md px-3"
            disabled={isPending}
            id="register-full-name"
            placeholder="Your full name"
            {...register("fullName")}
          />
          {errors.fullName?.message ? (
            <p
              className="text-sm text-destructive"
              id="register-full-name-error"
            >
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">
            Email address{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <Input
            autoComplete="email"
            aria-describedby={errors.email ? "register-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            className="h-12 rounded-md px-3"
            disabled={isPending}
            id="register-email"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="text-sm text-destructive" id="register-email-error">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="register-password">
              Password{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
            </Label>
            <span className="text-xs text-muted-foreground">
              8–128 characters
            </span>
          </div>
          <div className="relative">
            <Input
              autoComplete="new-password"
              aria-describedby={
                errors.password
                  ? "register-password-error"
                  : "register-password-help"
              }
              aria-invalid={Boolean(errors.password)}
              className="h-12 rounded-md px-3 pr-14"
              disabled={isPending}
              id="register-password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 inline-flex min-w-12 items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
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
              Use between 8 and 128 characters.
            </p>
          )}
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          Your information is kept secure.
        </p>

        <Button
          className="h-12 w-full font-semibold"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <Spinner className="size-5" /> : "Create Account"}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="font-semibold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
