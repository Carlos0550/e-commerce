import { LoginDataState } from "./AuthenticationTypes";
import { Categories } from "./CategoriesTypes";
import { ProductFormValues } from "./ProductFormTypes";
import { Products } from "./ProductTypes";
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
    saveProduct: (productValues: ProductFormValues) => Promise<boolean>,
    getProducts: () => Promise<boolean>, 
    products: Products[],
    buildPath: (url: string) => string
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

export interface AppContextInterface{
    AuthenticationHook: ContextAuthentication,
    productsHook: ProductsHookInterface,
    categoriesHook: CategoriesHookInterface
}