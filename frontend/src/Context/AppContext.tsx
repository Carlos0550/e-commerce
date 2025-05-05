import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContextInterface } from "./ContextTypes/AppContextTypes";
import UseAuthentication from "./UseAuthentication";
import useProducts from "./useProducts";
import useCategory from "./useCategory";
import useAdministrators from "./useAdministrators";
import useCart from "./useCart";
import { showNotification } from "@mantine/notifications";

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
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])
    const { loginData, verifyUser } = AuthenticationHook

    const productsHook = useProducts(loginData, verifyUser)
    const categoriesHook = useCategory(loginData, verifyUser)
    const administratorHook = useAdministrators(loginData, verifyUser)
    const cartHook = useCart(
        loginData, productsHook.products, productsHook.buildPath
    )

    const { getProducts } = productsHook
    const { getCategories } = categoriesHook

    const handleGetDataWithRetries = async () => {
        let haveError = false
        const retries = 5
        for (let i = 0; i < retries; i++) {
            const result = await Promise.all([getProducts(), getCategories()])
            if (result[0] && result[1]) return
            haveError = true
        }

        if(haveError){
            showNotification({
                color: 'red',
                title: 'Error al obtener algún recurso',
                message: 'Al parecer hubo un error al obtener algunos recursos, inténtalo de nuevo recargando la página.',
                autoClose: 5000,
                position: 'top-right',
            })
        }
    }


    const alreadyGetted = useRef(false)
    useEffect(() => {
        if (!alreadyGetted.current) {
            alreadyGetted.current = true
            handleGetDataWithRetries()
        }
    },[loginData, verifyUser])
    const AppContextValues = useMemo(()=> ({
        AuthenticationHook,
        productsHook,
        categoriesHook,
        administratorHook,
        cartHook,
        width
    }),[
        AuthenticationHook,
        productsHook,
        categoriesHook,
        administratorHook,
        cartHook
    ])
    
    return (
        <AppContext.Provider value={AppContextValues}>
            {children}
        </AppContext.Provider>
    )
}