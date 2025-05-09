import { RequestHandler, Router } from "express";
import { GetProductDetails } from "../controllers/Products/products.controller";

const router = Router();

const GetProductDetailsRouter: RequestHandler<{},{},{},{product_id: string}> = async(
    req,
    res,
    next
): Promise<void> => {
    const { product_id } = req.query

    if(!product_id){
        res.status(400).json({
            msg: "El servidor no recibió el ID del producto."
        })
    }
    next()
}

router.get("/get-product-details", GetProductDetailsRouter, GetProductDetails)

export default router