import { AxiosError } from "axios";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  X,
} from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useLoginFacade } from "@/features/auth/hooks/useLogin";
import {
  useForgotPassword,
  useResetPassword,
} from "@/features/auth/hooks/usePasswordRecovery";
import { useRegisterFacade } from "@/features/auth/hooks/useRegister";

type AuthDialogsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: "login" | "reset";
  resetToken?: string | null;
};

function safeLoginError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return "The email or password does not match. Please try again.";
    }

    if (error.response?.status === 403) {
      return "This account is not active. Please contact the administrator.";
    }
  }

  return "We could not sign you in. Please check your connection and try again.";
}

function safeRegistrationError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response?.status === 409) {
      return "An account with this email already exists. Please sign in instead.";
    }

    if (error.response?.status === 400) {
      return "Please check your details and try again.";
    }
  }

  return "We could not create your account. Please check your connection and try again.";
}

export function AuthDialogs({
  open,
  onOpenChange,
  initialView = "login",
  resetToken,
}: AuthDialogsProps) {
  const id = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<"login" | "register" | "forgot" | "reset">(
    initialView
  );
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [resetFormError, setResetFormError] = useState("");
  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();
  const {
    handleSubmit,
    submit,
    register,
    errors,
    isPending,
    error,
    getValues,
    reset,
    resetMutation,
  } = useLoginFacade();
  const {
    handleSubmit: handleRegisterSubmit,
    submit: submitRegistration,
    register: registerField,
    errors: registrationErrors,
    isPending: isRegisterPending,
    error: registrationError,
    getValues: getRegistrationValues,
    reset: resetRegistration,
    resetMutation: resetRegistrationMutation,
  } = useRegisterFacade((email) => {
    reset({ email, password: "" });
    setShowPassword(false);
    setView("login");
  });

  const isSubmitting =
    isPending ||
    isRegisterPending ||
    forgotPasswordMutation.isPending ||
    resetPasswordMutation.isPending;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isSubmitting) return;
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setShowPassword(false);
      setView(initialView === "reset" ? "reset" : "login");
      setResetPassword("");
      setConfirmResetPassword("");
      setRecoveryMessage("");
      setResetFormError("");
      resetRegistration();
      reset({ email: getValues("email"), password: "" });
      resetMutation();
      resetRegistrationMutation();
      forgotPasswordMutation.reset();
      resetPasswordMutation.reset();
    }
  };

  const openLogin = () => {
    setShowPassword(false);
    reset({ email: getRegistrationValues("email"), password: "" });
    resetRegistration({
      fullName: getRegistrationValues("fullName"),
      email: getRegistrationValues("email"),
      password: "",
    });
    resetMutation();
    resetRegistrationMutation();
    setView("login");
  };

  const openRegistration = () => {
    setShowPassword(false);
    resetRegistration({
      fullName: getRegistrationValues("fullName"),
      email: getValues("email"),
      password: "",
    });
    reset({ email: getValues("email"), password: "" });
    resetMutation();
    resetRegistrationMutation();
    setView("register");
  };

  const openForgotPassword = () => {
    setRecoveryEmail(getValues("email"));
    setRecoveryMessage("");
    forgotPasswordMutation.reset();
    setShowPassword(false);
    setView("forgot");
  };

  const returnToLogin = () => {
    setShowPassword(false);
    setResetPassword("");
    setConfirmResetPassword("");
    setResetFormError("");
    resetPasswordMutation.reset();
    setView("login");
  };

  const handleForgotPasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setRecoveryMessage("");

    try {
      const response = await forgotPasswordMutation.mutateAsync({
        email: recoveryEmail.trim(),
      });
      setRecoveryMessage(response.message);
    } catch {
      // The shared mutation handler displays the safe request error.
    }
  };

  const handleResetPasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setResetFormError("");

    if (!resetToken) {
      setResetFormError("This password reset link is missing its token.");
      return;
    }

    if (resetPassword !== confirmResetPassword) {
      setResetFormError("Passwords do not match.");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token: resetToken,
        password: resetPassword,
      });
      setResetPassword("");
      setConfirmResetPassword("");
      setView("login");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setResetFormError(
          "This password reset link is invalid or expired. Request a new one and try again."
        );
      } else {
        setResetFormError(
          "We could not reset your password. Please try again."
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto rounded-none border border-border/80 bg-background p-0 text-foreground shadow-2xl sm:w-full sm:rounded-none"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
          className="relative px-6 pt-8 pb-7 sm:px-8 sm:pt-9"
        >
          <DialogClose
            render={
              <Button
                variant="ghost"
                size="icon"
                disabled={isSubmitting}
                aria-label="Close authentication dialog"
                className="absolute top-4 right-4 rounded-none text-muted-foreground hover:text-foreground"
              />
            }
          >
            <X className="size-4" aria-hidden="true" />
          </DialogClose>

          <DialogHeader className="mb-7 space-y-3 pr-8">
            <p className="text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
              Nivara Hotels
            </p>
            <div className="space-y-2">
              <DialogTitle className="font-heading text-3xl leading-tight font-normal tracking-[-0.03em] sm:text-[34px]">
                {view === "login"
                  ? "Welcome back."
                  : view === "register"
                    ? "Create an account."
                    : view === "forgot"
                      ? "Reset your password."
                      : "Choose a new password."}
              </DialogTitle>
              <DialogDescription className="max-w-sm text-sm leading-6 text-muted-foreground">
                {view === "login"
                  ? "Sign in to continue to your Nivara account."
                  : view === "register"
                    ? "Set up a customer account to manage your Nivara stays."
                    : view === "forgot"
                      ? "Enter your account email to request a password reset link."
                      : "Enter and confirm your new password to continue."}
              </DialogDescription>
            </div>
          </DialogHeader>

          {view === "login" ? (
            <>
              <form
                noValidate
                onSubmit={handleSubmit(submit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor={`${id}-email`}
                    className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                  >
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <Input
                      id={`${id}-email`}
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      autoFocus
                      disabled={isPending}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? `${id}-email-error` : undefined
                      }
                      className="h-12 rounded-none border-input bg-card pl-10 text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                      {...register("email")}
                    />
                  </div>
                  {errors.email ? (
                    <p
                      id={`${id}-email-error`}
                      className="text-xs text-destructive"
                    >
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label
                      htmlFor={`${id}-password`}
                      className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                    >
                      Password
                    </Label>
                    <Button
                      type="button"
                      variant={"link"}
                      disabled={isSubmitting}
                      onClick={openForgotPassword}
                      className={"my-0 h-fit py-0"}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <LockKeyhole
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <Input
                      id={`${id}-password`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isPending}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={
                        errors.password ? `${id}-password-error` : undefined
                      }
                      className="h-12 rounded-none border-input bg-card pr-12 pl-10 text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-none text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {errors.password ? (
                    <p
                      id={`${id}-password-error`}
                      className="text-xs text-destructive"
                    >
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                {error ? (
                  <p
                    role="alert"
                    className="text-sm leading-5 text-destructive"
                  >
                    {safeLoginError(error)}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-12 w-full justify-center gap-2 rounded-none text-xs font-medium tracking-[0.12em] uppercase sm:text-sm"
                >
                  {isPending ? (
                    <>
                      <Spinner className="size-4" />
                      Signing in
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-6 border-t border-border pt-5 text-center text-xs leading-5 text-muted-foreground">
                New to Nivara?{" "}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={openRegistration}
                  className="font-medium text-foreground underline decoration-gold/70 underline-offset-4 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Create a customer account
                </button>
              </p>
            </>
          ) : view === "register" ? (
            <form
              noValidate
              onSubmit={handleRegisterSubmit(submitRegistration)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-register-name`}
                  className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                >
                  Full name
                </Label>
                <Input
                  id={`${id}-register-name`}
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(registrationErrors.fullName)}
                  aria-describedby={
                    registrationErrors.fullName
                      ? `${id}-register-name-error`
                      : undefined
                  }
                  className="h-12 rounded-none border-input bg-card text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                  {...registerField("fullName")}
                />
                {registrationErrors.fullName ? (
                  <p
                    id={`${id}-register-name-error`}
                    className="text-xs text-destructive"
                  >
                    {registrationErrors.fullName.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-register-email`}
                  className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                >
                  Email address
                </Label>
                <Input
                  id={`${id}-register-email`}
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(registrationErrors.email)}
                  aria-describedby={
                    registrationErrors.email
                      ? `${id}-register-email-error`
                      : undefined
                  }
                  className="h-12 rounded-none border-input bg-card text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                  {...registerField("email")}
                />
                {registrationErrors.email ? (
                  <p
                    id={`${id}-register-email-error`}
                    className="text-xs text-destructive"
                  >
                    {registrationErrors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-register-password`}
                  className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id={`${id}-register-password`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(registrationErrors.password)}
                    aria-describedby={
                      registrationErrors.password
                        ? `${id}-register-password-error`
                        : undefined
                    }
                    className="h-12 rounded-none border-input bg-card pr-12 text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                    {...registerField("password")}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-none text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {registrationErrors.password ? (
                  <p
                    id={`${id}-register-password-error`}
                    className="text-xs text-destructive"
                  >
                    {registrationErrors.password.message}
                  </p>
                ) : null}
              </div>

              {registrationError ? (
                <p role="alert" className="text-sm leading-5 text-destructive">
                  {safeRegistrationError(registrationError)}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={isRegisterPending}
                className="h-12 w-full justify-center gap-2 rounded-none text-xs font-medium tracking-[0.12em] uppercase sm:text-sm"
              >
                {isRegisterPending ? (
                  <>
                    <Spinner className="size-4" />
                    Creating account
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={openLogin}
                className="mx-auto inline-flex min-h-11 items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Return to sign in
              </button>
            </form>
          ) : view === "forgot" ? (
            <form className="space-y-5" onSubmit={handleForgotPasswordSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-recovery-email`}
                  className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                >
                  Email address
                </Label>
                <Input
                  id={`${id}-recovery-email`}
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={recoveryEmail}
                  onChange={(event) => setRecoveryEmail(event.target.value)}
                  disabled={forgotPasswordMutation.isPending}
                  className="h-12 rounded-none border-input bg-card text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                  required
                  aria-describedby={
                    recoveryMessage ? `${id}-recovery-status` : undefined
                  }
                />
              </div>
              {recoveryMessage ? (
                <p
                  id={`${id}-recovery-status`}
                  role="status"
                  className="border-l-2 border-gold pl-4 text-xs leading-5 text-muted-foreground"
                >
                  {recoveryMessage}
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="h-12 w-full justify-center gap-2 rounded-none text-xs font-medium tracking-[0.12em] uppercase sm:text-sm"
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Spinner className="size-4" />
                    Sending request
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
              <button
                type="button"
                onClick={returnToLogin}
                className="mx-auto inline-flex min-h-11 items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Return to sign in
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleResetPasswordSubmit}>
              {!resetToken ? (
                <p role="alert" className="text-sm leading-6 text-destructive">
                  This password reset link is missing its token. Please request
                  a new link.
                </p>
              ) : null}
              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-new-password`}
                  className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                >
                  New password
                </Label>
                <Input
                  id={`${id}-new-password`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a new password"
                  autoComplete="new-password"
                  value={resetPassword}
                  onChange={(event) => setResetPassword(event.target.value)}
                  disabled={resetPasswordMutation.isPending || !resetToken}
                  className="h-12 rounded-none border-input bg-card text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-confirm-password`}
                  className="text-xs font-medium tracking-[0.12em] text-foreground uppercase"
                >
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id={`${id}-confirm-password`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                    value={confirmResetPassword}
                    onChange={(event) =>
                      setConfirmResetPassword(event.target.value)
                    }
                    disabled={resetPasswordMutation.isPending || !resetToken}
                    className="h-12 rounded-none border-input bg-card pr-12 text-sm focus-visible:ring-2 focus-visible:ring-ring/20"
                    minLength={8}
                    maxLength={128}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Hide passwords" : "Show passwords"
                    }
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-none text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {confirmResetPassword &&
                resetPassword !== confirmResetPassword ? (
                  <p role="alert" className="text-xs text-destructive">
                    Passwords do not match.
                  </p>
                ) : null}
              </div>
              {resetFormError ? (
                <p role="alert" className="text-sm leading-5 text-destructive">
                  {resetFormError}
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={resetPasswordMutation.isPending || !resetToken}
                className="h-12 w-full justify-center gap-2 rounded-none text-xs font-medium tracking-[0.12em] uppercase sm:text-sm"
              >
                {resetPasswordMutation.isPending ? (
                  <>
                    <Spinner className="size-4" />
                    Updating password
                  </>
                ) : (
                  <>
                    Save new password
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
              <button
                type="button"
                onClick={returnToLogin}
                className="mx-auto inline-flex min-h-11 items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Return to sign in
              </button>
            </form>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
