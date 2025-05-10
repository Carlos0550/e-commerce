import { useEffect, useRef, useState } from "react"
import type { Categories } from "../../Types/CategoriesTypes"
import { getServiceUrl } from "../../utils/GlobalAPIs";
import { showNotification } from "@mantine/notifications";
function useCategories() {
  const [categories, setCategories] = useState<Categories[]>([])
  const getCategories = async () => {
    const url = new URL(`${getServiceUrl("categories")}/get-categories`);
    try {
      const response = await fetch(url)
      const responseData = await response.json()
      if (!response.ok) throw new Error(responseData.msg || "Error desconocido")
      setCategories(responseData.categories)
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
    }
  }

  const alreadyFetched = useRef(false)

  useEffect(()=>{
    if(alreadyFetched.current) return;
    getCategories()
    alreadyFetched.current = true
  },[])
  return {
    categories
  }
}

export default useCategories
