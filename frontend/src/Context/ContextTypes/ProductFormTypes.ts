export interface ProductFormImages{
    image_name: string,
    originFileObj: File,
    image_id: string,
    isNew: boolean
}
export interface ProductFormValues{
    product_name: string,
    product_description: string,
    product_price: string,
    product_stock: string,
    product_category: string,
    product_images: ProductFormImages[],
}
