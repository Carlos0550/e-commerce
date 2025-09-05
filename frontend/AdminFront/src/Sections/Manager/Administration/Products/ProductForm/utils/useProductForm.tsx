import { useEffect, useState } from "react"
import { ProductFormValues } from "../../../../../../Context/ContextTypes/ProductFormTypes"
import { v4 as uuid } from "uuid"
import { showNotification } from "@mantine/notifications";
import { useAppContext } from "../../../../../../Context/AppContext";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
function useProductForm() {
  const {
    productsHook: {
      saveProduct,
      productModalInfo:{
        actionType,
        product_id
      },
      getProductImages,
      products,
      buildPath,
      setProductModalInfo,
      closeProductsModal
    }
  } = useAppContext()
  const [productForm, setProductForm] = useState<ProductFormValues>({
    product_name: "",
    product_category: "",
    product_description: "",
    product_images: [],
    product_price: "",
    product_stock: "",
  })
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

  const editor = useEditor({
    extensions: [StarterKit],
    content: productForm.product_description,
  });

  const removeImage = (image_id: string, path?: string) => {
    setProductForm((prev) => ({
      ...prev,
      product_images: prev.product_images.filter(img => img.image_id !== image_id)
    }));

    if(actionType === "edit"){
      setImagesToDelete(prev => [...prev, path!])
    }
  };
  const handleUploadImages = (files: File[]) => {
    if (productForm.product_images.length + files.length > 6) {
      showNotification({
        color: "red",
        title: "Error",
        message: "No puedes subir mas de 5 imagenes",
        position: "top-right",
        autoClose: 2500
      })
      return
    }
    if (productForm.product_images.length === 6) {
      showNotification({
        color: "red",
        title: "Error",
        message: "No puedes subir mas de 5 imagenes",
        position: "top-right",
        autoClose: 2500
      })
      return
    }

    const date = new Date().toISOString().split("T")[0];
    const newImages = files.map((file) => {
      const renamedFile = new File([file], `${date}-${uuid().slice(0, 8)}.${file.type.split("/")[1]}`, {
        type: file.type,
        lastModified: file.lastModified,
      });

      return {
        image_name: `${date}-${uuid().slice(0, 8)}.${file.type.split("/")[1]}`,
        originFileObj: renamedFile,
        image_id: uuid(),
        isNew: true,
      };
    });

    setProductForm((prev) => ({
      ...prev,
      product_images: [...prev.product_images, ...newImages],
    }));
  };


  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const traducciones = {
    "product_name": "Nombre del producto",
    "product_category": "Categoria",
    "product_description": "Descripcion",
    "product_images": "Imagenes",
    "product_price": "Precio",
    "product_stock": "Stock"
  }

  const validateForm = () => {
    const {
      product_images,
      product_name,
      product_price,
      product_stock,
      product_description
    } = productForm

    for (const key in productForm) {
      if (key === "product_images" || key === "product_category") continue
      if (productForm[key as keyof ProductFormValues] === "") {
        showNotification({
          color: "red",
          title: "Error",
          message: `El campo "${traducciones[key as keyof ProductFormValues]}" es obligatorio`,
          position: "top-right",
          autoClose: 2500
        })
        return false
      }
    }

    if (product_images.length === 0) {
      showNotification({
        color: "red",
        title: "Error",
        message: "Debes subir al menos una imagen",
        position: "top-right",
        autoClose: 2500
      })
      return false
    }

    if (product_name.length < 6) {
      showNotification({
        color: "red",
        title: "Error",
        message: "El nombre debe tener al menos 6 caracteres",
        position: "top-right",
        autoClose: 2500
      });
      return false
    }

    if (parseFloat(product_price) <= 0) {
      showNotification({
        color: "red",
        title: "Error",
        message: "El precio debe ser mayor a 0",
        position: "top-right",
        autoClose: 2500
      });
      return false
    }
    return true
  }

  const handleClearFields = (): void => {
    setProductForm({
      product_name: "",
      product_description: "",
      product_price: "",
      product_stock: "",
      product_category: "",
      product_images: []
    })
    editor?.commands.clearContent();
    setProductModalInfo({actionType: "create", product_id: ""})
    closeProductsModal()
    setImagesToDelete([])
    return;
  }

  const [savingProduct, setSavingProduct] = useState(false)
  const onFinish = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (validateForm()) {
      setSavingProduct(true)
      const result = await saveProduct(productForm, imagesToDelete)
      setTimeout(() => setSavingProduct(false), 1000)
      if (result) handleClearFields()
    }
  }

  const [fetchingImages, setFetchingImages] = useState(false)
  const handleEditProduct = async () => {
    setFetchingImages(true)
    const images = await getProductImages(product_id)
    setFetchingImages(false)
    const productImagesCast = images.map((i) => ({
      image_id: uuid(),
      image_name: `${i.name}.${i.type.split("/")[1]}`,
      image_url: buildPath(i.path),
      isNew: false,
    }));

    const productData = products.find((p) => p.product_id === product_id) 
    if (productData) {
      setProductForm({
        product_name: productData.product_name,
        product_description: productData.product_description,
        product_price: productData.product_price,
        product_stock: productData.product_stock,
        product_category: productData.product_category,
        product_images: productImagesCast
      })
      editor?.commands.setContent(productData.product_description)
    }
  }

  useEffect(()=>{
    if(actionType === "edit" && product_id){
      handleEditProduct()
    }
      
  },[product_id, actionType])

  return {
    handleUploadImages,
    productForm,
    handleChangeValues,
    removeImage,
    onFinish,
    savingProduct,
    editor,
    fetchingImages
  }
}

export default useProductForm
