import React, {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {CONSTANTS} from "../common/Constant.jsx";

const defaultAuthState = {
    isAuthenticated: false,
    authorities: null,
    email: "",
    username: "",
    fullName: "",
};

const decodeToken = (token) => {
    const result = structuredClone(defaultAuthState);
    if (!token) return result;

    try {
        const decoded = jwtDecode(token);
        const isValid = !decoded.exp || decoded.exp > Date.now() / 1000;

        if (isValid) {
            const realmRoles = decoded.realm_access?.roles || [];
            const clientRoles = Object.values(decoded.resource_access || {})
                .flatMap((r) => r.roles || []);

            Object.assign(result, {
                isAuthenticated: true,
                authorities: [...realmRoles, ...clientRoles],
                email: decoded.email || decoded.preferred_username || "",
                username: decoded.preferred_username || "",
                fullName: decoded.name || "",
            });
        } else {
            localStorage.clear();
        }
    } catch (e) {
        console.error("Invalid token", e);
        localStorage.clear();
    }
    return result;
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState(() => {
        try {
            const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
            return decodeToken(token);
        } catch (e) {
            console.error("Error initializing auth state:", e);
            localStorage.clear();
            return defaultAuthState;
        }
    });

    const login = (accessToken, refreshToken) => {
        localStorage.setItem(CONSTANTS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
        setAuthState(decodeToken(accessToken));
    };

    const logout = () => {
        localStorage.clear();
        setAuthState(defaultAuthState);
        window.location.replace("/login");
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const {exp} = jwtDecode(token);
            return exp < Date.now() / 1000;
        } catch (e) {
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{...authState, login, logout, isTokenExpired}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};