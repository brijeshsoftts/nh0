export declare const AUTH_SUCCESS_MSG: {
    readonly REGISTER: "Account created successfully.";
    readonly LOGIN: "Login successful. You have been securely authenticated and can now access your account.";
    readonly LOGOUT: "Logout successful.";
    readonly REFRESH_TOKEN: "Token refreshed successfully";
};
export declare const AUTH_ERROR_MSG: {
    readonly CONFLICT_EMAIL: "Email already registered, Try different email.";
    readonly INVALID_CREDENTIALS: "Invalid email or password.";
    readonly ACCOUNT_NOT_ACTIVE: "Your account has been deactivated. Please contact the administrator for assistance.";
    readonly NOT_FOUND: "You are not logged in.";
    readonly SESSION_EXPIRED: "Session expired. Please login again.";
    readonly INVALID_REFRESH_TOKEN: "Invalid or expired refresh token.";
};
