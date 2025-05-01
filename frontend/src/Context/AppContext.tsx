import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { AppContextInterface } from "./ContextTypes/AppContextTypes";
import UseAuthentication from "./UseAuthentication";
import useProducts from "./useProducts";
import useCategory from "./useCategory";

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
    const { loginData, verifyUser } = AuthenticationHook

    const productsHook = useProducts(loginData, verifyUser)
    const categoriesHook = useCategory(loginData, verifyUser)
    

    const { getProducts } = productsHook
    const { getCategories } = categoriesHook

    const handleGetDataWithRetries = async () => {
        const retries = 5
        for (let i = 0; i < retries; i++) {
            const result = await Promise.all([getProducts(), getCategories()])
            console.log(result)
            if (result[0] && result[1]) return
        }
    }


    const alreadyGetted = useRef(false)
    useEffect(() => {
        if ( loginData && loginData.user_id && !alreadyGetted.current) {
            alreadyGetted.current = true
            handleGetDataWithRetries()
        }
    },[loginData, verifyUser])
    const AppContextValues = useMemo(()=> ({
        AuthenticationHook,
        productsHook,
        categoriesHook
    }),[
        AuthenticationHook,
        productsHook,
        categoriesHook
    ])
    
    return (
        <AppContext.Provider value={AppContextValues}>
            {children}
        </AppContext.Provider>
    )
}