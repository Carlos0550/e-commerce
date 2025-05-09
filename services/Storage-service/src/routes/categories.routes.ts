import { Request, Response, NextFunction, Router } from "express";
import { QueryWithUserId } from "../Types/QueryWithUserId";
import { SaveCategoryBody } from "../controllers/Categories/Types/SaveCategoryTypes";

import { saveCategory, getCategories, updateCategory, deleteCategory } from "../controllers/Categories/categories.controller";
import { UpdateCategoryQuery } from "../controllers/Categories/Types/UpdateCategoryTypes";
const router = Router();

router.post("/create-category", async(
    req: Request<{}, {}, SaveCategoryBody, QueryWithUserId>,
    res: Response,
    next:NextFunction
): Promise<void> => {
    const { user_id } = req.query
    const { category_name }  = req.body
    if(!user_id || !category_name){
        res.status(400).json({
            msg: "Todos los campos son requeridos"
        })
        return
    }

    next()
}, saveCategory)

router.put("/update-category", async(
    req: Request<{}, {}, SaveCategoryBody, UpdateCategoryQuery>,
    res: Response,
    next:NextFunction
): Promise<void> => {
    const { user_id, category_id } = req.query
    const { category_name }  = req.body
    if(!user_id || !category_name || !category_id){
        res.status(400).json({
            msg: "Todos los campos son requeridos"
        })
        return
    }

    next()
}, updateCategory)

router.get("/get-categories", async(
    req: Request<{}, {}, SaveCategoryBody, QueryWithUserId>,
    res: Response,
    next:NextFunction
): Promise<void> => {
    next()
}, getCategories)

router.delete("/delete-category", async(
    req: Request<{}, {}, SaveCategoryBody, {category_id:string}>,
    res: Response,
    next:NextFunction
): Promise<void> => {
    const { category_id } = req.query
    if(!category_id){
        res.status(400).json({
            msg: "Todos los campos son requeridos"
        })
        return
    }

    next()
}, deleteCategory)


export default router