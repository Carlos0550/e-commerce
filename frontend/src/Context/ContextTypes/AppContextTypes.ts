import { LoginDataState } from "./AuthenticationTypes";
import { Categories } from "./CategoriesTypes";
import { ProductFormValues } from "./ProductFormTypes";
import { RegisterFormValues } from "./RegisterUserForm";

export interface ContextAuthentication{
    loginData: LoginDataState,
    setLoginData: React.Dispatch<React.SetStateAction<LoginDataState>>
    createUserAccount: (formValues: RegisterFormValues) => Promise<boolean>
    loginUser: (formValues: RegisterFormValues) => Promise<boolean>

}

export interface ProductsHookInterface{
    saveProduct: (productValues: ProductFormValues) => Promise<boolean>,
}

export interface CategoriesHookInterface{
    saveCategory: (categoryName: string) => Promise<boolean>,
    updateCategory: (categoryName: string, categoryId: string) => Promise<boolean>,
    getCategories: () => Promise<boolean>,
    deleteCategory: (categoryId: string) => Promise<boolean>,
    categories: Categories[]
    
}

export interface AppContextInterface{
    AuthenticationHook: ContextAuthentication,
    productsHook: ProductsHookInterface,
    categoriesHook: CategoriesHookInterface
}