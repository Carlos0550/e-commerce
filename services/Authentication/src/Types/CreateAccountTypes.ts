export interface CreateAccountBody{
    user_name: string,
    user_email: string,
    user_password: string,
    register_as_admin: boolean,
    user_password_confirmation: string
}