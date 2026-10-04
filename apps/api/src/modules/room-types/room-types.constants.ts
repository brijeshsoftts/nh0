export const ROOM_TYPE_SUCCESS_MSG = {
  CREATED: 'Room type created successfully',
  UPDATED: 'Room type updated successfully',
  DELETED: 'Room type deleted successfully',
} as const;

export const ROOM_TYPE_ERROR_MSG = {
  CONFLICT_NAME: 'Room type with this name already exists',
  ROOM_NOT_FOUND: 'Room not found',
  ROOM_TYPE_NOT_FOUND: 'Room type not found',
} as const;
