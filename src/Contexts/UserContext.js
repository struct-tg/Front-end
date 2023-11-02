import React from "react";
import { createContext, useState } from "react";
import { realizaLogin, getUserName } from "../Services/Requests/Users";

export const AutenticacaoContext = createContext();

export function AutenticacaoProvider({ children }) {
    const [tokenJWT, setTokenJWT] = useState(null);
    const [username, setUserName] = useState(null);

    const login = async (credenciais) => {
        try {
            const hashToken = await realizaLogin(credenciais);
            const user = await getUserName(hashToken);
            if (hashToken && user) {
                setTokenJWT(hashToken);
                setUserName(user);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erro no login:", JSON.stringify(error));
            return false;
        }
    }

    const logout = () => {
        setTokenJWT(null);
    };

    return (
        <AutenticacaoContext.Provider value={{ tokenJWT, username, login, logout }}>
            {children}
        </AutenticacaoContext.Provider>
    );
}