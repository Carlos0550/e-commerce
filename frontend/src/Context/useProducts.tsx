import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProductFormValues } from './ContextTypes/ProductFormTypes'
import { getServiceUrl } from '../GlobalAPIs'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { showNotification } from '@mantine/notifications'
import { ProductImages, ProductModalInfo, Products } from './ContextTypes/ProductTypes'
import { useDisclosure } from '@mantine/hooks'


function useProducts(loginData: LoginDataState, verifyUser: () => Promise<boolean>) {
  const [products, setProducts] = useState<Products[]>([])
  const [openedProductsModal, { open: openProductsModal, close: closeProductsModal }] = useDisclosure(false);
  const [productModalInfo, setProductModalInfo] = useState<ProductModalInfo>({
    actionType: "create",
    product_id: ""
  })

  const getProducts = useCallback(async () => {
    
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


  const saveProduct = useCallback(async (productValues: ProductFormValues, imagesToDelete: string[]): Promise<boolean> => {
    const isAdmin = await verifyUser()
    const { actionType } = productModalInfo 
    if(!isAdmin){
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'No tienes permisos para realizar esta acción',
        autoClose: 5000,
        position: 'top-right',
      })

      return false
    }

    const formData = new FormData()

    const url = actionType === "edit"
    ? new URL(`${getServiceUrl("products")}edit-product`)
    : new URL(`${getServiceUrl("products")}create-product`)

    url.searchParams.append("user_id", loginData.user_id)
    actionType === "edit" && url.searchParams.append("product_id", productModalInfo.product_id)
    
    for (const [key, value] of Object.entries(productValues)) {
      if (key === "product_images") continue
      formData.append(key, value || "")
    }

    if(imagesToDelete && imagesToDelete.length > 0){
      formData.append("images_to_delete", JSON.stringify(imagesToDelete))
    }

    productValues.product_images.forEach((img) => {
      if(img.isNew){
        formData.append("product_images", img.originFileObj!, img.image_name);
      }
    });

    try {
      const response = await fetch(url, {
        method: actionType === "edit" ? "PUT" : "POST",
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
  }, [loginData, productModalInfo, getProducts])

  const getProductImages = useCallback(async(product_id: string): Promise<ProductImages[]> => {
    const url = new URL(`${getServiceUrl("products")}get-product-images`)
    url.searchParams.append("product_id", product_id)
    try {
      const response = await fetch(url)
      const responseD = await response.json()
      if (!response.ok) throw new Error(responseD.msg || "Error desconocido")
      return responseD.images
    } catch (error) {
      console.log(error)
      showNotification({
        color: 'red',
        title: 'Error',
        message: error instanceof Error ? error.message : 'Error desconocido',
        autoClose: 5000,
        position: 'top-right',
      })
      return []
    }

  },[])

  const deleteProduct = useCallback(async (product_id: string): Promise<boolean> => {
      const url = new URL(`${getServiceUrl("products")}delete-product`)
      url.searchParams.append("product_id", product_id)
      url.searchParams.append("user_id", loginData.user_id)
      try {
        const response = await fetch(url,{
          method: "DELETE"
        })
        const responseD = await response.json()
        if (!response.ok) throw new Error(responseD.msg || "Error desconocido")
        await getProducts()
        showNotification({
          color: 'green',
          title: 'Producto eliminado exitosamente',
          message: '',
          autoClose: 2500,
          position: 'top-right',
        })
        return true
      } catch (error) {
        console.log(error)
        showNotification({
          color: 'red',
          title: 'Error al eliminar el producto',
          message: error instanceof Error ? error.message : "Error desconocido",
          autoClose: 5500,
          position: 'top-right',
        })
        return false
      }
  },[loginData, getProducts])
  

  const buildPath = useCallback((prPath: string) => {
    return `${getServiceUrl("products")}${prPath}`
  }, [getProducts])

  const handleGetProductsWithRetries = async () => {
    const retries = 2
    for (let i = 0; i < retries; i++) {
      const success = await getProducts()
      if (success) return
    }
  }
  const alreadyGetted = useRef(false)
  useEffect(() => {
    if (loginData && loginData.user_id && alreadyGetted.current) return
    const timer = setTimeout(() => {
      handleGetProductsWithRetries()
      alreadyGetted.current = true
    }, 1000)

    return () => clearTimeout(timer)
  }, [loginData])


  return useMemo(() => ({
    saveProduct, getProducts, products, buildPath, getProductImages, openedProductsModal, openProductsModal, closeProductsModal,
    productModalInfo, setProductModalInfo, deleteProduct
  }), [
    saveProduct, getProducts, products, getProductImages, openedProductsModal, openProductsModal, closeProductsModal,
    productModalInfo, setProductModalInfo, deleteProduct
  ])
}

export default useProducts
