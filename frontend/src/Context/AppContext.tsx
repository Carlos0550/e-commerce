import { createContext, useContext, useMemo } from "react";
import { AppContextInterface } from "./ContextTypes/AppContextTypes";
import UseAuthentication from "./UseAuthentication";
import useProducts from "./useProducts";

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context;
};

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const AuthenticationHook = UseAuthentication()
    const { loginData } = AuthenticationHook

    const productsHook = useProducts(loginData)
    const AppContextValues = useMemo(()=> ({
        AuthenticationHook,
        productsHook
    }),[
        AuthenticationHook,
        productsHook
    ])
    
    return (
        <AppContext.Provider value={AppContextValues}>
            {children}
        </AppContext.Provider>
    )
}