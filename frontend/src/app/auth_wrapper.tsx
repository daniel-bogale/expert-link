import React, { createContext, useContext, useEffect, useState } from "react";
import { setTokenCookie, getRedirectUrl, clearRedirectCookie, clearAuthData } from "@/lib/auth-utils";

interface User {
    email: string;
    username?: string;
    id?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
    clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to validate and clean localStorage data
const validateAndCleanStorage = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Check for invalid token
    if (token === "undefined" || token === "null" || token === "") {
        localStorage.removeItem("token");
    }

    // Check for invalid user data
    if (user === "undefined" || user === "null" || user === "") {
        localStorage.removeItem("user");
        return;
    }

    // Try to parse user data
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            if (!parsedUser || typeof parsedUser !== "object") {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async (): Promise<boolean> => {
        try {
            // Clean up any corrupted data first
            validateAndCleanStorage();

            const token = localStorage.getItem("token");
            if (!token || token === "undefined" || token === "null") {
                setIsLoading(false);
                return false;
            }

            // You can add an API call here to verify the token with your backend
            // For now, we'll just check if the token exists
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && typeof parsedUser === "object") {
                        setUser(parsedUser);
                        setIsLoading(false);
                        return true;
                    }
                } catch (parseError) {
                    console.error("Failed to parse user data:", parseError);
                    // Clear invalid data
                    clearAuthData();
                }
            }

            setIsLoading(false);
            return false;
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsLoading(false);
            return false;
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (user: User, token: string) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // Set token in cookie for middleware access
        setTokenCookie(token);

        // Handle redirect after successful login
        const redirectUrl = getRedirectUrl();
        if (redirectUrl) {
            clearRedirectCookie();
            window.location.href = redirectUrl;
        }
    };

    const logout = () => {
        setUser(null);
        clearAuthData();
    };

    const handleClearAuthData = () => {
        setUser(null);
        clearAuthData();
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            login,
            logout,
            checkAuth,
            clearAuthData: handleClearAuthData
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}