import { useEffect, useId, useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomerDocumentField<T extends FieldValues>({
  control,
  name,
  label,
  error,
  disabled,
  required = false,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedFile =
          typeof File !== "undefined" && field.value instanceof File
            ? (field.value as File)
            : undefined;

        return (
          <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
              id={id}
              name={field.name}
              ref={field.ref}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              required={required}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              onBlur={field.onBlur}
              onChange={(event) =>
                field.onChange(event.currentTarget.files?.[0] ?? undefined)
              }
            />
            <p className="text-xs text-muted-foreground">
              JPG or PNG, up to 5 MB.
            </p>
            {error ? (
              <p id={errorId} role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            {selectedFile ? <ImagePreview file={selectedFile} /> : null}
          </div>
        );
      }}
    />
  );
}

function ImagePreview({ file }: { file: File }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!previewUrl) return null;

  return (
    <figure className="flex items-center gap-3 rounded-lg border bg-muted/30 p-2.5">
      <img
        src={previewUrl}
        alt={`Preview of ${file.name}`}
        className="size-16 rounded-md border object-cover"
      />
      <figcaption className="min-w-0">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </figcaption>
    </figure>
  );
}
