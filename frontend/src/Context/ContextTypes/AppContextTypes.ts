import { LoginDataState } from "./AuthenticationTypes";
import { RegisterFormValues } from "./RegisterUserForm";

export interface ContextAuthentication{
    loginData: LoginDataState,
    setLoginData: React.Dispatch<React.SetStateAction<LoginDataState>>
    createUserAccount: (formValues: RegisterFormValues) => Promise<boolean>
}

export interface AppContextInterface{
    AuthenticationHook: ContextAuthentication
}