import React from "react";
import { createContext, useState } from "react";
import { realizaLogin } from "../Services/Requisicoes/Users";

export const AutenticacaoContext = createContext();

export function AutenticacaoProvider({ children }) {
    const [tokenJWT, setTokenJWT] = useState(null);

    const login = async (credenciais) => {
        try {
            const hashToken = await realizaLogin(credenciais);
            console.log('O tokenJWT do usuario: ', hashToken);

            if (hashToken) {
                setTokenJWT(hashToken);
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
        <AutenticacaoContext.Provider value={{ tokenJWT, login, logout }}>
            {children}
        </AutenticacaoContext.Provider>
    );
}