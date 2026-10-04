export const AMENITIES_SUCCESS_MSG = {
  CREATED: 'Amenity created successfully.',
  UPDATED: 'Amenity updated successfully.',
  DELETED: 'Amenity deleted successfully.',
} as const;

export const AMENITIES_ERROR_MSG = {
  NAME_ALREADY_EXISTS: 'An amenity with this name already exists.',
  NOT_FOUND: 'Amenity not found.',
} as const;
