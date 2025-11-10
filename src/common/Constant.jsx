export const CONSTANTS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER_PROFILE: "user_profile",
    WHITE_LIST_URL: ["/auth/login"],
    SUCCESS: "success",
    ERROR: "error",
};

export const HTTP_METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
};

export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    USER: "ROLE_USER",
    OPERATOR: "ROLE_OPERATOR",
};

export const MESSAGE_TYPES = {
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
};

export const DATE_FORMAT = "DD/MM/YYYY";
export const DATETIME_SIMPLE_FORMAT = "DD/MM/YYYY HH:mm";
export const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const PAGE_SIZE_OPTIONS = [10,20,30,50];

export const CLIENT_ID_KEYCLOAK = import.meta.env.VITE_CLIENT_ID_KEYCLOAK;
export const CLIENT_SECRET_KEYCLOAK = import.meta.env.VITE_CLIENT_SECRET_KEYCLOAK;