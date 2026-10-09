export const STAFF_SUCCESS_MSG = {
  CREATED: 'Staff member created successfully.',
  UPDATED: 'Staff member updated successfully.',
  STATUS_UPDATED: 'Staff member status updated successfully.',
  DELETED: 'Staff member deleted successfully.',
  DEACTIVATED: 'Staff member has task history and was deactivated.',
} as const;

export const STAFF_ERROR_MSG = {
  NOT_FOUND: 'Staff member not found.',
  EMAIL_CONFLICT: 'Email already in use.',
  LAST_ACTIVE_ADMIN: 'The last active admin account cannot be deactivated.',
  STATUS_CHANGED: 'Staff status changed before this update could be applied.',
} as const;
