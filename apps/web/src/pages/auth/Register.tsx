import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PublicBrand } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRegisterFacade } from "@/features/auth/hooks/useRegister";
import { HERO_IMAGE } from "@/features/public/public.mock";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, submit, register, errors, isPending } =
    useRegisterFacade(() => undefined);

  return (
    <main className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
      <section
        aria-label="Nivara Hotels"
        className="relative isolate flex min-h-52 items-end overflow-hidden bg-muted px-6 py-6 text-background sm:min-h-64 sm:px-10 lg:min-h-svh lg:px-14 lg:py-12"
      >
        <img
          alt="A Nivara hotel interior"
          className="absolute inset-0 -z-20 size-full object-cover"
          fetchPriority="high"
          src={HERO_IMAGE}
        />
        <div className="absolute inset-0 -z-10 bg-foreground/55" />
        <div className="flex w-full items-end justify-between gap-4 lg:flex-col lg:items-start lg:justify-end lg:gap-8">
          <PublicBrand className="text-background lg:hidden" inverted />
          <div className="max-w-xl">
            <p className="hidden text-xs font-semibold tracking-[0.16em] text-background/85 uppercase lg:block">
              Nivara Hotels
            </p>
            <h1 className="font-heading text-2xl leading-tight font-medium text-background sm:text-3xl lg:mt-3 lg:text-5xl">
              Your next stay begins here.
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-6 text-background/85 sm:text-base lg:mt-4">
              Create your account and enjoy a simpler way to plan and manage
              your stays.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-w-0 items-center justify-center px-5 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div className="w-full max-w-md">
          <PublicBrand className="mb-9 hidden lg:inline-flex" />
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
                aria-describedby={
                  errors.email ? "register-email-error" : undefined
                }
                aria-invalid={Boolean(errors.email)}
                className="h-12 rounded-md px-3"
                disabled={isPending}
                id="register-email"
                placeholder="you@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email?.message ? (
                <p
                  className="text-sm text-destructive"
                  id="register-email-error"
                >
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
      </section>
    </main>
  );
}
