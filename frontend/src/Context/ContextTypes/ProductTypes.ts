export interface ProductImages {
    name: string,
    path: string,
    size: number,
    type: string
}
export interface Products {
    product_id: string
    product_name: string,
    product_description: string,
    product_price: string,
    product_stock: string,
    product_category: string,
    pr_category_name: string
    product_images: ProductImages,
}

export interface ProductModalInfo {
    actionType: "create" | "edit",
    product_id: string
}

export interface ProductDetails{
    product_id: string
    product_name: string,
    product_description: string,
    product_price: string,
    product_stock: string,
    product_category: string,
    product_images: ProductImages[],
}