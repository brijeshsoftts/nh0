import {
  AlertCircle,
  Camera,
  Check,
  ImageIcon,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  useRemoveAvatar,
  useUpdateAvatar,
} from "@/features/profile/profile.crud";
import {
  ALLOWED_AVATAR_MIME_TYPES,
  validateAvatarFile,
} from "@/features/profile/schemas/avatar.schema";

type UpdateAvatarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatarUrl?: string | null;
  userName: string;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function UpdateAvatarDialog({
  open,
  onOpenChange,
  currentAvatarUrl,
  userName,
}: UpdateAvatarDialogProps) {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const updateAvatarMutation = useUpdateAvatar();
  const removeAvatarMutation = useRemoveAvatar();

  const isPending =
    updateAvatarMutation.isPending || removeAvatarMutation.isPending;

  // Manage object URL lifecycle
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      setImageDimensions(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Measure dimensions
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  // Reset local state when dialog closes
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSelectedFile(null);
      setValidationError(null);
      setIsDragging(false);
      setConfirmRemove(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    onOpenChange(nextOpen);
  };

  const handleFile = (file: File | undefined | null) => {
    if (!file) return;

    setValidationError(null);
    setConfirmRemove(false);

    const validation = validateAvatarFile(file);
    if (!validation.valid) {
      setValidationError(validation.error ?? "Invalid image file selected.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleSave = () => {
    if (!selectedFile) return;

    updateAvatarMutation.mutate(selectedFile, {
      onSuccess: () => {
        handleOpenChange(false);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile image. Please try again.";
        setValidationError(
          typeof message === "string" ? message : "Failed to update profile image."
        );
      },
    });
  };

  const handleRemove = () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      return;
    }

    removeAvatarMutation.mutate(undefined, {
      onSuccess: () => {
        handleOpenChange(false);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to remove profile image. Please try again.";
        setValidationError(
          typeof message === "string" ? message : "Failed to remove profile image."
        );
      },
    });
  };

  const handleClearSelected = () => {
    setSelectedFile(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const initials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md rounded-none border border-border bg-card p-6 shadow-xl sm:max-w-lg">
        <DialogHeader className="gap-1 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Camera className="size-4 text-gold" aria-hidden="true" />
            <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
              Update profile photo
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Choose a clear, professional portrait for your hotel staff badge.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Avatar Preview Display */}
          <div className="flex items-center gap-4 rounded-none border border-border bg-secondary/30 p-4">
            <div className="relative shrink-0">
              <Avatar
                size="lg"
                className={`size-20 border ring-2 transition-all duration-200 sm:size-22 ${
                  previewUrl
                    ? "border-gold ring-gold/40"
                    : "border-border ring-background"
                }`}
              >
                {previewUrl ? (
                  <AvatarImage
                    src={previewUrl}
                    alt="New profile preview"
                    className="object-cover"
                  />
                ) : currentAvatarUrl ? (
                  <AvatarImage
                    src={currentAvatarUrl}
                    alt={`${userName} profile`}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="text-xl font-medium tracking-wider">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {previewUrl && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-none bg-gold text-[10px] font-bold text-gold-foreground ring-2 ring-background">
                  <Check className="size-3" aria-hidden="true" />
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {previewUrl ? "New selection" : "Current photo"}
                </span>
                {previewUrl && (
                  <span className="rounded-none border border-gold/40 bg-accent/40 px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                    Unsaved
                  </span>
                )}
              </div>

              {selectedFile ? (
                <div className="space-y-0.5">
                  <p className="truncate text-sm font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                    {imageDimensions
                      ? ` · ${imageDimensions.width}×${imageDimensions.height}px`
                      : ""}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {currentAvatarUrl
                    ? "Your portrait is active across all hotel operations."
                    : "No photo has been uploaded yet. Initial badge is shown."}
                </p>
              )}

              {selectedFile && !isPending && (
                <button
                  type="button"
                  onClick={handleClearSelected}
                  className="mt-1 inline-flex items-center gap-1 text-xs text-destructive hover:underline focus-visible:outline-none"
                >
                  <X className="size-3" aria-hidden="true" />
                  Discard selection
                </button>
              )}
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-none border-l-2 border-destructive bg-destructive/10 p-3 text-xs text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-semibold">Unable to use image</p>
                <p className="mt-0.5">{validationError}</p>
              </div>
              <button
                type="button"
                onClick={() => setValidationError(null)}
                className="text-destructive/80 hover:text-destructive"
                aria-label="Dismiss error"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group relative flex flex-col items-center justify-center rounded-none border-2 border-dashed p-6 text-center transition-colors ${
              isDragging
                ? "border-gold bg-accent/20"
                : "border-border bg-card hover:border-foreground/40 hover:bg-muted/30"
            }`}
          >
            <input
              id={fileInputId}
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_AVATAR_MIME_TYPES.join(",")}
              onChange={handleInputChange}
              disabled={isPending}
              className="sr-only"
            />

            <div className="flex size-11 items-center justify-center rounded-none border border-border bg-secondary text-foreground">
              {isDragging ? (
                <UploadCloud className="size-5 text-gold animate-bounce" />
              ) : (
                <ImageIcon className="size-5 text-muted-foreground group-hover:text-foreground" />
              )}
            </div>

            <div className="mt-3 space-y-1">
              <label
                htmlFor={fileInputId}
                className="cursor-pointer text-xs font-semibold text-foreground underline-offset-4 hover:underline focus-within:outline-none"
              >
                Click to browse
                <span className="font-normal text-muted-foreground">
                  {" "}
                  or drag and drop
                </span>
              </label>
              <p className="text-[11px] text-muted-foreground">
                JPG, PNG, or WebP up to 5 MB
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            {currentAvatarUrl && !selectedFile && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isPending}
                onClick={handleRemove}
                className="rounded-none text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                {removeAvatarMutation.isPending ? (
                  <Spinner className="size-3.5" />
                ) : (
                  <Trash2 className="size-3.5" aria-hidden="true" />
                )}
                {confirmRemove ? "Confirm remove?" : "Remove photo"}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-none"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              className="rounded-none"
              disabled={!selectedFile || isPending}
              onClick={handleSave}
            >
              {updateAvatarMutation.isPending ? (
                <>
                  <Spinner className="size-3.5" />
                  Saving photo...
                </>
              ) : (
                <>
                  <Check className="size-3.5" aria-hidden="true" />
                  Save photo
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

