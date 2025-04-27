import { Request, Response, NextFunction, Router } from "express";
import { QueryWithUserId } from "../Types/QueryWithUserId";
import { SaveCategoryBody } from "../controllers/Categories/Types/SaveCategoryTypes";

import { saveCategory } from "../controllers/Categories/categories.controller";
const router = Router();

router.post("/create-category", async(
    req: Request<{}, {}, SaveCategoryBody, QueryWithUserId>,
    res: Response,
    next:NextFunction
): Promise<void> => {
    const { user_id } = req.query
    const { category_name }  = req.body
    console.log(user_id, category_name)
    if(!user_id || !category_name){
        res.status(400).json({
            msg: "Todos los campos son requeridos"
        })
        return
    }

    next()
}, saveCategory)

export default router