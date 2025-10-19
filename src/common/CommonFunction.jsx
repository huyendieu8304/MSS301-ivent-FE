import {CONSTANTS} from "./Constant.jsx";

export const checkRole = (authorities, role) => {
    return Array.isArray(authorities) && authorities.includes(role);
};

export const getUserDataInLocalStorage = () => {
    const data = localStorage.getItem(CONSTANTS.USER_PROFILE);
    if (!data) {
        return null;
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        return null;
    }
};

export const hasCommonRole = (authorities, allowedRoles) => {
    if (!Array.isArray(authorities) || !Array.isArray(allowedRoles)) return false;
    return allowedRoles.some(role => authorities.includes(role));
};