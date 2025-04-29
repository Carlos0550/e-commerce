import { Router, Request, Response, NextFunction } from "express";
import uploads from "../utils/SaveFilesFromRequest";
import { ProductFormValues } from "../Types/UploadFilesTypes";
import { checkIsAdmin } from "../utils/CheckIsAdmin";
import { rollbackFiles } from "../utils/RollbackFiles";
import { QueryWithUserId } from "../Types/QueryWithUserId";
import { getProducts, saveProduct } from "../controllers/Products/products.controller";

const router = Router();

router.post("/create-product", uploads.array("product_images"), async (
    req: Request<{}, {}, ProductFormValues, QueryWithUserId>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const files = req.files as Express.Multer.File[];
    const { user_id } = req.query
    if (!files || files.length === 0) {
        res.status(400).json({ msg: "No se han proporcionado archivos" });
        return;
    }

    try {
        if (!user_id) {
            throw new Error("Usuario no autorizado (falta user_id)");
        }

        const is_admin = await checkIsAdmin(user_id);
        if (!is_admin) {
            throw new Error("Usuario no autorizado (no es admin)");
        }

        const {
            product_name,
            product_description,
            product_price,
            product_stock,
        } = req.body;

        if (
            !product_name ||
            !product_description ||
            !product_price ||
            !product_stock
        ) {
            throw new Error('Verifique que los campos con "*" no esten vacíos');
        }


        next();
    } catch (error: any) {
        console.error("Error en /create-product:", error.message);
        await rollbackFiles(files.map((file) => file.filename));
        res.status(400).json({
            msg: error.message || "Error inesperado al crear el producto",
        });
    }
}, saveProduct);

router.get("/get-products", async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    next()
}, getProducts)

export default router;
