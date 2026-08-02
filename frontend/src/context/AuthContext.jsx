import { createContext, useEffect, useState } from "react";

import {
    getToken,
    getUser,
    setToken,
    setUser,
    clearStorage,
} from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUserState] = useState(null);
    const [token, setTokenState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedToken = getToken();
        const savedUser = getUser();

        if(savedToken && savedUser){

            setTokenState(savedToken);

            setUserState(savedUser);
        }

        setLoading(false);

    }, []);

    const login = (token, user) => {

        setToken(token);

        setUser(user);


        setTokenState(token);

        setUserState(user);
    };

    const logout = () => {

        clearStorage();


        setTokenState(null);

        setUserState(null);
    };

    const value = {

        user,

        token,

        login,

        logout,

        loading,

        isAuthenticated: !!token,

    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};