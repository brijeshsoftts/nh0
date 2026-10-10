export const ISSUE_SUCCESS_MSG = {
  CREATED: 'Issue reported successfully.',
} as const;

export const ISSUE_ERROR_MSG = {
  CUSTOMER_ROOM_NOT_ALLOWED: 'Customers cannot select a room for an issue.',
  CURRENT_STAY_REQUIRED:
    'A current checked-in stay is required to report an issue.',
  ROOM_REQUIRED: 'A room must be selected to report an issue.',
  ROOM_NOT_FOUND: 'Room could not be found.',
  IMAGE_NOT_FOUND: 'Issue image could not be found.',
  REFERENCE_CONFLICT: 'Could not create the issue. Please try again.',
} as const;
