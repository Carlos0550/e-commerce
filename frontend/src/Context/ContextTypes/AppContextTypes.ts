import { Administrator } from "./AdministratorsTypes";
import { LoginDataState } from "./AuthenticationTypes";
import { Cart } from "./CartTypes";
import { Categories } from "./CategoriesTypes";
import { ProductFormValues } from "./ProductFormTypes";
import { ProductImages, ProductModalInfo, Products } from "./ProductTypes";
import { RegisterFormValues } from "./RegisterUserForm";

export interface ContextAuthentication{
    loginData: LoginDataState,
    setLoginData: React.Dispatch<React.SetStateAction<LoginDataState>>
    createUserAccount: (formValues: RegisterFormValues) => Promise<boolean>
    loginUser: (formValues: RegisterFormValues) => Promise<boolean>
    closeSession: () => void,
    verifyUser: () => Promise<boolean>
}

export interface ProductsHookInterface{
    saveProduct: (productValues: ProductFormValues, imagesToDelete: string[]) => Promise<boolean>,
    getProducts: () => Promise<boolean>, 
    products: Products[],
    buildPath: (url: string) => string,
    getProductImages: (product_id: string) => Promise<ProductImages[]>,
    openedProductsModal: boolean, 
    openProductsModal: () => void, 
    closeProductsModal: () => void,
    productModalInfo: ProductModalInfo, 
    setProductModalInfo: React.Dispatch<React.SetStateAction<ProductModalInfo>>,
    deleteProduct: (product_id: string) => Promise<boolean>,
    gettingProducts: boolean,
    getProductDetails: (product_id: string) => Promise<string | false>
}

export interface CategoriesHookInterface{
    saveCategory: (categoryName: string) => Promise<boolean>,
    updateCategory: (categoryName: string, categoryId: string) => Promise<boolean>,
    getCategories: () => Promise<boolean>,
    deleteCategory: (categoryId: string) => Promise<boolean>,
    categories: Categories[],
    openedModalCategory: boolean, 
    closeModalCategory: () => void, 
    openModalCategory: () => void,
    categoryID: string,
    setCategoryID: React.Dispatch<React.SetStateAction<string>>,
    handleCloseModalCategory: () => void, 
    handleEditCategory: (category_id: string) => void   
}

export interface AdministratorHookInterface{
    administrators: Administrator[],
}

export interface CartHookInterface{
    cart: Cart[],
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>
    showCart: boolean, 
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
    addProductToCart: (product_id: string) => boolean
    handleGoToWhatsapp: (product_id: string) => void,
    removeProductFromCart: (product_id: string) => void,
    setOneProductQuantity: (product_id: string) => void,
    removeOneProductQuantity: (product_id: string) => void,
    totalCart: number
}

export interface AppContextInterface{
    AuthenticationHook: ContextAuthentication,
    productsHook: ProductsHookInterface,
    categoriesHook: CategoriesHookInterface,
    administratorHook: AdministratorHookInterface,
    cartHook: CartHookInterface,
    width: number
}