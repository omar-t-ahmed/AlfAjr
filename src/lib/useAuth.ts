import { useState, useEffect } from "react";
import { authStateListener } from "./auth";
import { User } from "firebase/auth";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = authStateListener((user) => {
            setUser(user);
        });
        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);

    return { user };
};
