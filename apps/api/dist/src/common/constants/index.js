"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_FILES = exports.MAX_FILE_SIZE = exports.ALLOWED_MIME_TYPES = exports.ROLES_KEY = exports.COOKIE_EXPIRATION = exports.COOKIE_NAME = void 0;
exports.COOKIE_NAME = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
};
exports.COOKIE_EXPIRATION = {
    ACCESS_TOKEN: 60 * 60 * 1000,
    REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000,
};
exports.ROLES_KEY = 'roles';
exports.ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
exports.MAX_FILE_SIZE = 5 * 1024 * 1024;
exports.MAX_FILES = 5;
//# sourceMappingURL=index.js.map