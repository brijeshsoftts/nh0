export const USER_SUCCESS_MSG = {
  CREATED: 'User created successfully.',
  UPDATED: 'User updated successfully.',
  DELETED: 'User deleted successfully.',
} as const;

export const USER_ERROR_MSG = {
  CONFLICT_EMAIL: 'Email already in use.',
  NOT_FOUND: 'User not found.',
  FORBIDDEN: 'You can only update your own profile.',
  STAFF_PROFILE_REQUIRED: 'Staff accounts require a staff profile.',
  STAFF_PROFILE_NOT_ALLOWED: 'Only staff accounts can have a staff profile.',
  LAST_ACTIVE_ADMIN: 'The last active admin account cannot be deactivated.',
  STATUS_CHANGED: 'Account status changed before this update could be applied.',
  SELF_DELETE: 'You cannot delete your own account.',
  DELETE_LAST_ACTIVE_ADMIN: 'The last active admin account cannot be deleted.',
} as const;
