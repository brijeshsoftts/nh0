import { Spinner } from "@/components/ui/spinner";

interface FullScreenLoaderProps {
  message?: string;
}

export function FullScreenLoader({
  message = "Loading...",
}: FullScreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10" />

        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
