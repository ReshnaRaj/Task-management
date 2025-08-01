export const Messages = {
    FAILED: "Failed to process the request",
    SERVER_ERROR: "Internel server error",
    USER_EXIST: "A user with this email already exists.",
    NO_ACCESS: "Unauthorized Access",
    NAME_REQUIRED: "Name is required",
    EMAIL_REQUIRED: "Email is required",
    PASSWORD_REQUIRED: "Password is required",
    TOKEN_REQUIRED: "Access denied. No token provided.",
    INVALID_ID: "User id is required",
    INVALID_TOKEN: "Invalid authentication token.",
    INVALID_NAME: "Please enter a valid name (A - Z)",
    INVALID_EMAIL: "Please enter a valid email",
    INVALID_URL: "Please provide a valid URL.",
    LOGIN_SUCCESS: "Login successful",
    SIGNUP_SUCCESS: "Signup successful",
    USER_NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid email or password",
    ALL_FEILDs_REQUIRED: "All feilds are required",
    DAILY_LIMIT_REACHED: "You have reached your daily URL limit.",
    URL_EXPIRED: "expired or not found",
    NOT_AUTHORIZED: "You are not authorized to perform this action",
};

export const VALIDATION = {
    NAME_MIN: 'Name must be at least 5 characters long',
    NAME_MAX: 'Name cannot exceed 50 characters',
    EMAIL_INVALID: 'Invalid email address',
    PASSWORD_MIN: 'Password must be at least 8 characters long',
    PASSWORD_UPPERCASE: 'Password must contain at least one uppercase letter',
    PASSWORD_LOWERCASE: 'Password must contain at least one lowercase letter',
    PASSWORD_NUMBER: 'Password must contain at least one number',
    PASSWORD_SPECIAL: 'Password must contain at least one special character',
    CONFIRM_PASSWORD_MISMATCH: 'Passwords do not match',
};