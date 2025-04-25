import { RequestHandler } from "express";
import { ProductFormValues } from "../Types/UploadFilesTypes";
import { QueryWithUserId } from "../Types/QueryWithUserId";
import { getQueries } from "../QueriesHandler";

export const saveProduct: RequestHandler<{}, any, ProductFormValues, QueryWithUserId> = async (
  req,
  res
) => {
  const files = req.files as Express.Multer.File[];
  const { user_id } = req.query;
  const {
    product_name,
    product_description,
    product_price,
    product_stock,
    product_category,
  } = req.body;

  const { "saveProduct.sql": SPQueries } = getQueries("./Queries");
  res.status(200).json({ msg: "Producto guardado correctamente" });
};
