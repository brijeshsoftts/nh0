export const USER_SUCCESS_MSG = {
  CREATED: 'User created successfully.',
  UPDATED: 'User updated successfully.',
} as const;

export const USER_ERROR_MSG = {
  CONFLICT_EMAIL: 'Email already in use.',
  NOT_FOUND: 'User not found.',
  FORBIDDEN: 'You can only update your own profile.',
} as const;
