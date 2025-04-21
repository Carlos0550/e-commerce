import { RegisterFormValues } from "./RegisterUserForm"

export interface LoginDataState{
    user_id: string,
    user_name: string,
    user_email: string,
    last_login: string,
    isVerified: boolean
}

export interface ContextAuthentication{
    loginData: LoginDataState,
    setLoginData: React.Dispatch<React.SetStateAction<LoginDataState>>
    createUserAccount: (formValues: RegisterFormValues) => Promise<boolean>
    loginUser: (formValues: RegisterFormValues) => Promise<boolean>
}