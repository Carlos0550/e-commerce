export interface AuthenticatedUser {
    user_id: string;
}

export interface CustomRequest extends Request {
    user: AuthenticatedUser;
}