export const CUSTOMER_SUCCESS_MSG = {
  CREATED: 'Customer created successfully.',
  UPDATED: 'Customer updated successfully.',
  DELETED: 'Customer deactivated successfully.',
} as const;

export const CUSTOMER_ERROR_MSG = {
  CONFLICT_EMAIL: 'A customer with this email already exists.',
  DOCUMENTS_REQUIRED: 'ID proof and signature are required.',
  NOT_FOUND: 'Customer not found.',
  PROFILE_NOT_FOUND: 'Customer profile not found.',
} as const;
