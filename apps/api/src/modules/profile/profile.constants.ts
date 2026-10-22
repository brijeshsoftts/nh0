export const PROFILE_SUCCESS_MSG = {
  UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  AVATAR_UPDATED: 'Profile image updated successfully.',
  AVATAR_REMOVED: 'Profile image removed successfully.',
} as const;

export const PROFILE_ERROR_MSG = {
  NOT_FOUND: 'Profile not found.',
  CONFLICT_EMAIL: 'Email already in use.',
  INVALID_PASSWORD: 'Current password is incorrect.',
  IMAGE_REQUIRED: 'An image file is required.',
} as const;
