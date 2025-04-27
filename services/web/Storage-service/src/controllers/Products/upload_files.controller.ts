import { RequestHandler } from "express";
import { ProductFormValues } from "../Types/UploadFilesTypes";
import { QueryWithUserId } from "../Types/QueryWithUserId";
import { getQueries } from "../QueriesHandler";
import path from "path";
import pool from "../database";

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
  console.log(product_category)
  const queriesFolder = path.join(__dirname, "./Queries")
  const { "saveProduct.sql": SPQueries } = getQueries(queriesFolder);
  let client;

  try {
    client = await pool.connect()
    const imagesPath = files.map(file => {
      return {
        name: file.originalname,
        path: `uploads/${file.originalname}`,
        type: file.mimetype,
        size: file.size
      }
    })
    
    const response = await client.query(SPQueries[0],[
      user_id,
      product_name,
      product_description,
      product_price,
      product_stock,
      product_category ? product_category : null,
      JSON.stringify(imagesPath)
    ])

    if(response.rowCount === 0){
      throw new Error("Error inesperado al guardar el producto, intente nuevamente dentro de unos segundos.")
    }

    res.status(200).json({
      msg: "Producto guardado correctamente",
    });

    return
  } catch (error) {
    console.log("Error en saveProduct", error);
    res.status(500).json({
      msg: error instanceof Error ? error.message : "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return
  }finally{
    client && client.release()
  }
};
