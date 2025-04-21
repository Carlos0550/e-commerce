import { Router, Request, Response, NextFunction } from "express";

import * as AuthenticationController from "../controllers/CreateAccount/create_account.controller"
import { CreateAccountBody } from "../Types/CreateAccountTypes";

const router = Router();

router.post("/create-account", (req:Request<{},{},CreateAccountBody,{}>, res:Response, next: NextFunction): void => {
    const { user_email, user_name, user_password, user_password_confirmation} = req.body
    if(!user_email || !user_name || !user_password || !user_password_confirmation){
        res.status(400).json({msg: "Todos los campos son requeridos"})
        return
    }

    if(user_password_confirmation.trim() !== user_password.trim()){
        res.status(400).json({msg: "Las contraseñas no coinciden"})
        return
    }

    next()
}, AuthenticationController.createAccount)

export default router