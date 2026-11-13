import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/app/layout/PublicLayout";
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
    <div className="w-full rounded-xl border border-border/70 bg-card px-6 py-7 shadow-lg sm:px-9 sm:py-8">
      <div className="w-full">
        <Logo
          className="mx-auto flex-col gap-1.5 [&>div:last-child]:items-center"
          to="/"
        />
        <h1 className="mt-5 text-center font-heading text-3xl font-medium text-foreground">
          Welcome Back
        </h1>
        <p className="mt-1 text-center text-sm leading-6 text-muted-foreground">
          Sign in to access the hotel management system.
        </p>

        <form
          className="mt-6 space-y-4"
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
            <Label htmlFor="login-email">Email address</Label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-primary"
                strokeWidth={1.8}
              />
              <Input
                autoComplete="email"
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
                }
                aria-invalid={Boolean(errors.email)}
                className="h-11 rounded-md px-3 pl-10"
                disabled={isPending}
                defaultValue={
                  localStorage.getItem("nivaraRememberedEmail") ?? ""
                }
                id="login-email"
                placeholder="Enter your email address"
                type="email"
                {...register("email")}
              />
            </div>
            {errors.email?.message ? (
              <p className="text-sm text-destructive" id="login-email-error">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-primary"
                strokeWidth={1.8}
              />
              <Input
                autoComplete="current-password"
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
                aria-invalid={Boolean(errors.password)}
                className="h-11 rounded-md px-3 pr-14 pl-10"
                disabled={isPending}
                id="login-password"
                placeholder="Enter your password"
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
              <p className="text-sm text-destructive" id="login-password-error">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-foreground">
              <Checkbox
                checked={rememberEmail}
                onCheckedChange={(checked) =>
                  setRememberEmail(checked === true)
                }
              />
              Remember my email
            </label>
            <button
              className="min-h-10 text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
            className="h-11 w-full font-semibold"
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <Spinner className="size-5" />
            ) : (
              <>
                <LogIn aria-hidden="true" className="size-4" />
                Login
              </>
            )}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-foreground underline decoration-primary underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            to="/register"
          >
            Create account
          </Link>
        </p>
      </div>

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
    </div>
  );
}
