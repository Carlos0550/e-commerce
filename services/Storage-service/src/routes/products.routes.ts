import { Router, Request, Response, NextFunction } from "express";
import uploads from "../utils/SaveFilesFromRequest";
import { ProductFormValues } from "../Types/UploadFilesTypes";
import { checkIsAdmin } from "../utils/CheckIsAdmin";
import { rollbackFiles } from "../utils/RollbackFiles";
import { QueryWithUserId } from "../Types/QueryWithUserId";
import { deleteProduct, EditProduct, getProductImages, getProducts, getProductsPaginated, saveProduct } from "../controllers/Products/products.controller";
import { RequestHandler } from "express-serve-static-core";
import { EditProductRouteInterface } from "../Types/UpdateProductsBody";
import { verifyUser } from "../utils/VerifyUser";

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
            !product_price
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

router.get("/get-products", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next()
}, getProducts)

router.get("/get-products-paginated", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next()
}, getProductsPaginated)

const validateProductIdQuery: RequestHandler<{}, {}, {}, { product_id: string }> = (
    req,
    res,
    next
) => {
    const { product_id } = req.query;

    if (!product_id) {
        res.status(400).json({
            msg: "El servidor no recibió el ID del producto.",
        });
        return;
    }

    next();
};
router.get("/get-product-images", validateProductIdQuery, getProductImages);

const EditProductRoute:RequestHandler<{},{},EditProductRouteInterface,{user_id:string, product_id:string}> = async(
    req,
    res,
    next
): Promise<void> => {
    const { product_id } = req.query

    //const files = req.files as Express.Multer.File[]; //Nuevos archivos es opcional
    //Categoria e Imagenes a eliminar tambien es opcional
    const {
        product_name,
        product_description,
        product_price,
        product_stock,
    } = req.body

    if(!product_id){
        res.status(400).json({
            msg: "El servidor no recibió el ID del producto."
        })
        return;
    }

    if(!product_name || !product_description || !product_price || !product_stock){
        res.status(400).json({
            msg: 'Verifique que los campos con "*" no esten vacíos'
        })
        return;
    }

    next()
}
router.put("/edit-product",verifyUser, uploads.array("product_images"), EditProductRoute, EditProduct)

const DeleteProductRoute:RequestHandler<{},{},{},{product_id: string, user_id: string}> = async(
    req,
    res,
    next
): Promise<void> => {
    const { product_id } = req.query

    if(!product_id){
        res.status(400).json({
            msg: "El servidor no recibió el ID del producto, espere unos segundos e intente nuevamente."
        });
        return;
    }
    next()
}

router.delete("/delete-product", verifyUser, DeleteProductRoute, deleteProduct)

export default router;
