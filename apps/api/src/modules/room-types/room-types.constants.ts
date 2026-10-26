export const ROOM_TYPE_SUCCESS_MSG = {
  CREATED: 'Room type created successfully',
  UPDATED: 'Room type updated successfully',
  DELETED: 'Room type deleted successfully',
} as const;

export const ROOM_TYPE_ERROR_MSG = {
  CONFLICT_NAME: 'A room type with this name already exists.',
  ROOM_NOT_FOUND: 'Room not found',
  ROOM_TYPE_NOT_FOUND: 'Room type not found',
  IMAGE_REQUIRED: 'At least one room type image is required.',
  IMAGE_LIMIT: 'A room type can have at most 8 images.',
  INVALID_IMAGE_SELECTION: 'The selected room type images are invalid.',
} as const;
