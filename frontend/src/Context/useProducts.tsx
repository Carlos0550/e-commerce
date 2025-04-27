import { useCallback, useMemo } from 'react'
import { ProductFormValues } from './ContextTypes/ProductFormTypes'
import { getServiceUrl } from '../GlobalAPIs'
import { LoginDataState } from './ContextTypes/AuthenticationTypes'
import { showNotification } from '@mantine/notifications'

function useProducts(loginData: LoginDataState) {
  const saveProduct = useCallback(async(productValues: ProductFormValues): Promise<boolean> => {
    const formData = new FormData()
    const url = new URL(`${getServiceUrl("products")}create-product`)
    url.searchParams.append("user_id", loginData.user_id)

    for (const [key, value] of Object.entries(productValues)) {
      if(key === "product_images") continue
      formData.append(key, value || "")
    }

    productValues.product_images.forEach((img) => {
      formData.append("product_images", img.originFileObj, img.image_name);
    });
      
    try {
      const response = await fetch(url,{
        method: "POST",
        body: formData
      })

      const responseData = await response.json()
      if(!response.ok){
        throw new Error(responseData.msg || "Error desconocido")
      }

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
  },[loginData])

  return useMemo(() => ({
    saveProduct
  }),[
    saveProduct
  ])
}

export default useProducts
