import { showNotification } from '@mantine/notifications'
import React, { useEffect, useRef, useState } from 'react'
import { getServiceUrl } from '../../utils/GlobalAPIs'
import type { Products } from '../../Types/ProductsTypes'

function useProducts() {
    const [products, setProducts] = useState<Products[]>([])
    const [gettingProducts, setGettingProducts] = useState(false)
    const [width, setWidth] = useState(0);

    const getProducts = async () => {
        const url = new URL(`${getServiceUrl("products")}get-products`)
        try {
            setGettingProducts(true)
            const response = await fetch(url)
            const responseD = await response.json()
            if (response.status === 404) {
                setProducts([])
                return false
            }

            if (!response.ok) throw new Error(responseD.msg || "Error desconocido")
            setProducts(responseD.products)
            return true
        } catch (error) {
            if (error instanceof TypeError) return false;
            console.log(error)
            showNotification({
                color: 'red',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Error desconocido',
                autoClose: 5000,
                position: 'top-right',
            })

            return false
        } finally {
            setGettingProducts(false)
        }
    }

    const alreadyFetched = useRef(false)

    useEffect(() => {
        if (alreadyFetched.current) return;
        getProducts()
        alreadyFetched.current = true
    }, [])


    useEffect(() => {
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])
    return {
        products,
        getProducts,
        gettingProducts,
        width
    }
}

export default useProducts
