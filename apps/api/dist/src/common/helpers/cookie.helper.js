"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = setCookies;
exports.clearCookies = clearCookies;
const config_1 = require("../../config");
const constants_1 = require("../constants");
const isProd = config_1.env.NODE_ENV == 'production';
const baseConfig = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
};
function setCookies(response, accessToken, refreshToken) {
    response.cookie(constants_1.COOKIE_NAME.ACCESS_TOKEN, accessToken, {
        ...baseConfig,
        maxAge: constants_1.COOKIE_EXPIRATION.ACCESS_TOKEN,
    });
    response.cookie(constants_1.COOKIE_NAME.REFRESH_TOKEN, refreshToken, {
        ...baseConfig,
        maxAge: constants_1.COOKIE_EXPIRATION.REFRESH_TOKEN,
    });
}
function clearCookies(response) {
    response.clearCookie(constants_1.COOKIE_NAME.ACCESS_TOKEN, {
        ...baseConfig,
    });
    response.clearCookie(constants_1.COOKIE_NAME.REFRESH_TOKEN, {
        ...baseConfig,
    });
}
//# sourceMappingURL=cookie.helper.js.map