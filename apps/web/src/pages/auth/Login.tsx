import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PublicBrand } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useLoginFacade } from "@/features/auth/hooks/useLogin";
import { useForgotPassword } from "@/features/auth/hooks/usePasswordRecovery";
import { HERO_IMAGE } from "@/features/public/public.mock";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(() =>
    Boolean(localStorage.getItem("nivaraRememberedEmail"))
  );
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const { handleSubmit, submit, register, errors, isPending } =
    useLoginFacade();
  const recovery = useForgotPassword();

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
              Welcome back to Nivara.
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-6 text-background/85 sm:text-base lg:mt-4">
              Your next memorable stay is just a few moments away.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-w-0 items-center justify-center px-5 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div className="w-full max-w-md">
          <PublicBrand className="mb-9 hidden lg:inline-flex" />
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            Nivara Hotels
          </p>
          <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Welcome back
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign in to continue to your account.
          </p>

          <form
            className="mt-8 space-y-5"
            noValidate
            onSubmit={handleSubmit((data) => {
              if (rememberEmail) {
                localStorage.setItem("nivaraRememberedEmail", data.email);
              } else {
                localStorage.removeItem("nivaraRememberedEmail");
              }
              submit(data);
            })}
          >
            <div className="space-y-2">
              <Label htmlFor="login-email">
                Email address{" "}
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </Label>
              <Input
                autoComplete="email"
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
                }
                aria-invalid={Boolean(errors.email)}
                className="h-12 rounded-md px-3"
                disabled={isPending}
                defaultValue={
                  localStorage.getItem("nivaraRememberedEmail") ?? ""
                }
                id="login-email"
                placeholder="you@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email?.message ? (
                <p className="text-sm text-destructive" id="login-email-error">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">
                Password{" "}
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </Label>
              <div className="relative">
                <Input
                  autoComplete="current-password"
                  aria-describedby={
                    errors.password ? "login-password-error" : undefined
                  }
                  aria-invalid={Boolean(errors.password)}
                  className="h-12 rounded-md px-3 pr-14"
                  disabled={isPending}
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 inline-flex min-w-12 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
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
                  id="login-password-error"
                >
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex min-h-11 items-center gap-3 text-sm text-foreground">
                <Checkbox
                  checked={rememberEmail}
                  onCheckedChange={(checked) =>
                    setRememberEmail(checked === true)
                  }
                />
                Remember my email
              </label>
              <button
                className="min-h-11 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                onClick={() => {
                  setRecoveryEmail("");
                  setForgotPasswordOpen(true);
                }}
                type="button"
              >
                Forgot password?
              </button>
            </div>

            <Button
              className="h-12 w-full font-semibold"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Spinner className="size-5" /> : "Sign In"}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              className="font-semibold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              to="/register"
            >
              Create account
            </Link>
          </p>
        </div>
      </section>

      <Dialog onOpenChange={setForgotPasswordOpen} open={forgotPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-medium">
              Reset your password
            </DialogTitle>
            <DialogDescription>
              Enter your email address and we’ll send a password reset link if
              an account is associated with it.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              recovery.mutate(
                { email: recoveryEmail },
                { onSuccess: () => setForgotPasswordOpen(false) }
              );
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="recovery-email">Email address</Label>
              <Input
                autoComplete="email"
                className="h-11"
                id="recovery-email"
                onChange={(event) => setRecoveryEmail(event.target.value)}
                required
                type="email"
                value={recoveryEmail}
              />
            </div>
            <DialogFooter>
              <Button
                className="h-11 w-full"
                disabled={recovery.isPending}
                type="submit"
              >
                {recovery.isPending ? (
                  <Spinner className="size-5" />
                ) : (
                  "Send reset link"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
