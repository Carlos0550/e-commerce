export interface RegisterFormValues{
    user_name: string,
    user_email: string,
    user_password: string,
    user_password_confirmation?: string,
    register_as_admin: boolean
}