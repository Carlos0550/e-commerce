import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProductFormValues } from './ContextTypes/ProductFormTypes'
import { getServiceUrl } from '../GlobalAPIs'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { showNotification } from '@mantine/notifications'
import { Products } from './ContextTypes/ProductTypes'

function useProducts(loginData: LoginDataState, verifyUser: () => Promise<boolean>) {
  const [products, setProducts] = useState<Products[]>([])

  const getProducts = useCallback(async () => {
    if(!loginData.user_id){
      setProducts([])
      return false
    }
    const url = new URL(`${getServiceUrl("products")}get-products`)
    try {
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
      console.log(error)
      showNotification({
        color: 'red',
        title: 'Error',
        message: error instanceof Error ? error.message : 'Error desconocido',
        autoClose: 5000,
        position: 'top-right',
      })

      return false
    }

  }, [loginData])


  const saveProduct = useCallback(async (productValues: ProductFormValues): Promise<boolean> => {
    const formData = new FormData()
    const url = new URL(`${getServiceUrl("products")}create-product`)
    url.searchParams.append("user_id", loginData.user_id)

    for (const [key, value] of Object.entries(productValues)) {
      if (key === "product_images") continue
      formData.append(key, value || "")
    }

    productValues.product_images.forEach((img) => {
      formData.append("product_images", img.originFileObj, img.image_name);
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.msg || "Error desconocido")
      }
      await getProducts()
      showNotification({
        color: 'green',
        title: 'Producto creado exitosamente',
        message: '',
        autoClose: 2500,
        position: 'top-right',
      })

      return true
    } catch (error) {
      console.log(error)
      showNotification({
        color: 'red',
        title: 'Error al crear el producto',
        message: error instanceof Error ? error.message : "Error desconocido",
        autoClose: 5500,
        position: 'top-right',
      })
      return false
    }
  }, [loginData])

  const buildPath = useCallback((prPath: string) => {
    return `${getServiceUrl("products")}${prPath}`
  }, [getProducts])


  const alreadyGetted = useRef(false)
  useEffect(() => {
    if (loginData && loginData.user_id && alreadyGetted.current) return
    const timer = setTimeout(() => {
      getProducts()
      alreadyGetted.current = true
    }, 100)

    return () => clearTimeout(timer)
  }, [loginData])

  return useMemo(() => ({
    saveProduct, getProducts, products, buildPath
  }), [
    saveProduct, getProducts, products
  ])
}

export default useProducts
