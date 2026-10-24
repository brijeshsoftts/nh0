import { useParams } from "react-router-dom";

import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useResetPassword } from "@/features/auth/hooks/usePasswordRecovery";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const { handleSubmit, submit, register, errors, isPending } =
    useResetPassword(token!);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Reset Password
          </CardTitle>
          <CardDescription>
            Enter your new password below to update your account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(submit)}>
          <CardContent className="space-y-4 pb-4">
            <InputField
              type="password"
              label="Password"
              {...register("password")}
              error={errors?.password?.message}
            />

            <InputField
              type="password"
              label="Confirm Password"
              {...register("confirm")}
              error={errors?.confirm?.message}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="h-10 w-full" disabled={isPending}>
              {isPending ? <Spinner className="size-8" /> : "Reset Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
