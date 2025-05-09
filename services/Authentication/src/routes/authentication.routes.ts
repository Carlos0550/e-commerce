import { Router, Request, Response, NextFunction, RequestHandler } from "express";

import { CreateAccountBody } from "../Types/CreateAccountTypes";
import { createAccount } from "../controllers/CreateAccount/create_account.controller";
import { loginUser } from "../controllers/LoginUser/login_user.controller";
import { verifyUser } from "../utils/UserVerification/VerifyUser";
import { CustomRequest } from "../Types/VerifyUserTypes";

const router = Router();

router.post("/create-account", (req: Request<{}, {}, CreateAccountBody, {}>, res: Response, next: NextFunction): void => {
    const { user_email, user_name, user_password, user_password_confirmation } = req.body
    if (!user_email || !user_name || !user_password || !user_password_confirmation) {
        res.status(400).json({ msg: "Todos los campos son requeridos" })
        return
    }

    if (user_password_confirmation.trim() !== user_password.trim()) {
        res.status(400).json({ msg: "Las contraseñas no coinciden" })
        return
    }

    next()
}, createAccount)

router.post("/login-user", (req: Request<{}, {}, CreateAccountBody, {}>, res: Response, next: NextFunction): void => {
    const { user_email, user_password } = req.body
    if (!user_email || !user_password) {
        res.status(400).json({ msg: "Todos los campos son requeridos" })
        return
    }
    next()
}, loginUser)



const handler = (req: Request, res: Response): void => {
    const user = (req as unknown as CustomRequest).user;
    res.status(200).json({ msg: "Cuenta verificada", user });
};
router.get("/verify-user", verifyUser, handler);


export default router