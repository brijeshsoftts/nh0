export const COOKIE_NAME = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const COOKIE_EXPIRATION = {
  ACCESS_TOKEN: 60 * 60 * 1000,
  REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000,
};

export const ROLES_KEY = 'roles';

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_FILES = 5;
