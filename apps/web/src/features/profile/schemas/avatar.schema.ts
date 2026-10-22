import { z } from "zod";

export const ALLOWED_AVATAR_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
] as const;

export const ALLOWED_AVATAR_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
] as const;

export const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function isAllowedAvatarType(file: File): boolean {
  if (
    file.type &&
    (ALLOWED_AVATAR_MIME_TYPES as readonly string[]).includes(file.type)
  ) {
    return true;
  }
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (
    extension &&
    (ALLOWED_AVATAR_EXTENSIONS as readonly string[]).includes(extension)
  ) {
    return true;
  }
  return false;
}

export function validateAvatarFile(file: unknown): {
  valid: boolean;
  error?: string;
} {
  if (!(file instanceof File)) {
    return { valid: false, error: "Please select a valid image file." };
  }

  if (file.size === 0) {
    return { valid: false, error: "The selected image file is empty." };
  }

  if (!isAllowedAvatarType(file)) {
    return {
      valid: false,
      error: "Only JPG, PNG, and WebP images are allowed.",
    };
  }

  if (file.size > MAX_AVATAR_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Image must be 5 MB or smaller (selected file is ${sizeMb} MB).`,
    };
  }

  return { valid: true };
}

export const AvatarFileSchema = z
  .instanceof(File, { message: "Please select an image file." })
  .refine((file) => file.size > 0, {
    message: "The selected image file is empty.",
  })
  .refine(isAllowedAvatarType, {
    message: "Only JPG, PNG, and WebP images are allowed.",
  })
  .refine((file) => file.size <= MAX_AVATAR_SIZE_BYTES, {
    message: "Image must be 5 MB or smaller.",
  });

export type AvatarFileInput = z.infer<typeof AvatarFileSchema>;

