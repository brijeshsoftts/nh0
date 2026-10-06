import { AlertCircle, type LucideIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefetch: () => void;
  message?: string;
  title?: string;
  buttonText?: string;
  icon?: LucideIcon;
}

export function ErrorModal({
  open,
  onRefetch,
  onOpenChange,
  message = "Something went wrong. Please try again.",
  title = "Something went wrong",
  buttonText = "Try Again",
  icon: Icon = AlertCircle,
}: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <Icon className="mb-2 size-12 text-destructive" />

          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <Button onClick={onRefetch} className="w-full">
          <RefreshCw className="mr-2 size-4" />
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
