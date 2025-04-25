import { LoginDataState } from "./AuthenticationTypes";
import { ProductFormValues } from "./ProductFormTypes";
import { RegisterFormValues } from "./RegisterUserForm";

export interface ContextAuthentication{
    loginData: LoginDataState,
    setLoginData: React.Dispatch<React.SetStateAction<LoginDataState>>
    createUserAccount: (formValues: RegisterFormValues) => Promise<boolean>
    loginUser: (formValues: RegisterFormValues) => Promise<boolean>

}

export interface ProductsHookInterface{
    saveProduct: (productValues: ProductFormValues) => Promise<void>,
}

export interface AppContextInterface{
    AuthenticationHook: ContextAuthentication,
    productsHook: ProductsHookInterface
}