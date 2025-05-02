import { RequestHandler } from "express";
import { ProductFormValues } from "../../Types/UploadFilesTypes";
import { QueryWithUserId } from "../../Types/QueryWithUserId";
import { getQueries } from "../../QueriesHandler";
import path from "path";
import fs from "fs/promises"
import pool from "../../database";
import { EditProductRouteInterface } from "../../Types/UpdateProductsBody";

const queriesFolder = path.join(__dirname, "./Queries")
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

    const response = await client.query(SPQueries[0], [
      user_id,
      product_name,
      product_description,
      product_price,
      product_stock,
      product_category ? product_category : null,
      JSON.stringify(imagesPath)
    ])

    if (response.rowCount === 0) {
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
  } finally {
    client && client.release()
  }
};

export const getProducts: RequestHandler<{}, {}, {}, {}> = async (
  req,
  res
): Promise<void> => {
  const queries = getQueries(queriesFolder);
  const { "getProducts.sql": GPQueries } = queries;
  if (!queries || !GPQueries) {
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return;
  }

  let client;
  try {
    client = await pool.connect()
    const response = await client.query(GPQueries[0])
    res.status(200).json({
      products: response.rows
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
  } finally {
    client?.release()
  }
}

export const getProductImages: RequestHandler<{}, {}, {}, { product_id: string }> = async (
  req,
  res
): Promise<void> => {
  const queries = getQueries(queriesFolder);
  const { "getProducts.sql": GPQueries } = queries;
  if (!queries || !GPQueries) {
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return;
  }

  const { product_id } = req.query
  let client;
  try {
    client = await pool.connect()
    const response = await client.query(GPQueries[1], [product_id])
    if (response.rowCount === 0) {
      res.status(404).json({
        msg: "No se encontraron imagenes para el producto."
      })
      return;
    }

    const images = response.rows[0].product_images
    res.status(200).json({
      images: images
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
  } finally {
    client?.release()
  }
}

const handleDeleteOldImages = async (imagesToDelete: string): Promise<string[]> => {
  if (!imagesToDelete || imagesToDelete.length === 0) return [];

  const parsedImagesToDelete: string[] = JSON.parse(imagesToDelete);

  const imagesFolder = path.join(__dirname, "../../uploads");

  const parsedPaths: string[] = [];
  parsedImagesToDelete.forEach((imageUrl) => {
    try {
      const parsedUrl = new URL(imageUrl);
      const pathname = parsedUrl.pathname;
      const relativePathWithUploads = pathname.startsWith('/api/')
        ? pathname.replace('/api/', '')
        : pathname;

        const relativePathWithoutUploads = pathname.startsWith('/api/')
        ? pathname.replace('/api/uploads/', '')
        : pathname;

      parsedPaths.push(relativePathWithUploads);
      const absolutePath = path.join(imagesFolder, relativePathWithoutUploads);

      try {
        fs.unlink(absolutePath);
      } catch (error) {
        console.error("Error al eliminar el archivo:", absolutePath);
      }

      return relativePathWithUploads;
    } catch (err) {
      console.error("URL inválida:", imageUrl);
      return [];
    }
  });

  return parsedPaths;
};
export const EditProduct: RequestHandler<{}, {}, EditProductRouteInterface, { product_id: string }> = async (
  req,
  res,
  next
): Promise<void> => {
  const { product_id } = req.query
  const {
    product_name,
    product_description,
    product_price,
    product_stock,
    product_category,
    images_to_delete
  } = req.body
  const files = req.files as Express.Multer.File[];

  const { "editProduct.sql": EPQueries } = getQueries(queriesFolder);
  if (!EPQueries) {
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return;
  }

  let client;

  try {
    client = await pool.connect()
    await client.query("BEGIN")

    const oldImagesPaths = await handleDeleteOldImages(images_to_delete)

    if ((files && files.length === 0) && oldImagesPaths.length > 0) {
      //Cliente no subio ningun archivo pero si elimina
      console.log("Se ejecuta la Query: ", EPQueries[0])
      const result = await client.query(EPQueries[0], [
        oldImagesPaths,
        product_name,
        product_description,
        product_price,
        product_stock,
        product_category,
        product_id
      ])

      if (result.rowCount! > 0) {
        await client.query("COMMIT")
        res.status(200).json({
          msg: "Producto editado con exito"
        })
        return;
      } else {
        throw new Error("Error desconocido, no fue posible actualizar el producto, por favor espere unos segundos e intente nuevamente.")
      }
    } else if ((files && files.length > 0) && oldImagesPaths.length > 0) {
      //Cliente subio archivos y elimina
      const newImagesMetadata = files.map(file => {
        return {
          name: file.originalname,
          path: `uploads/${file.originalname}`,
          type: file.mimetype,
          size: file.size
        }
      })

      console.log("Se ejecuta la Query: ", EPQueries[1])
      const result = await client.query(EPQueries[1], [
        oldImagesPaths,
        JSON.stringify(newImagesMetadata),
        product_name,
        product_description,
        product_price,
        product_stock,
        product_category,
        product_id
      ]);

      if (result.rowCount! > 0) {
        await client.query("COMMIT")
        res.status(200).json({
          msg: "Producto editado con exito"
        })
        return;
      } else {
        throw new Error("Error desconocido, no fue posible actualizar el producto, por favor espere unos segundos e intente nuevamente.")
      }
    } else if ((files && files.length > 0) && oldImagesPaths.length === 0) {
      //Cliente subio archivos y no elimina
      const newImagesMetadata = files.map(file => {
        return {
          name: file.originalname,
          path: `uploads/${file.originalname}`,
          type: file.mimetype,
          size: file.size
        }
      })
      console.log("Se ejecuta la Query: ", EPQueries[2])
      const result = await client.query(EPQueries[2], [
        JSON.stringify(newImagesMetadata),
        product_name,
        product_description,
        product_price,
        product_stock,
        product_category,
        product_id
      ]);

      if (result.rowCount! > 0) {
        await client.query("COMMIT")
        res.status(200).json({
          msg: "Producto editado con exito"
        })
        return;
      } else {
        throw new Error("Error desconocido, no fue posible actualizar el producto, por favor espere unos segundos e intente nuevamente.")
      }
    } else {
      //Cliente no subio archivos y no elimina
      const result = await client.query(EPQueries[3], [
        product_name,
        product_description,
        product_price,
        product_stock,
        product_category,
        product_id
      ])

      if (result.rowCount! > 0) {
        await client.query("COMMIT")
        res.status(200).json({
          msg: "Producto editado con exito"
        })
        return;
      } else {
        throw new Error("Error desconocido, no fue posible actualizar el producto, por favor espere unos segundos e intente nuevamente.")
      }
    }
  } catch (error) {
    console.log("Error al actualizar el producto: ", error)
    client && await client.query("ROLLBACK")
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return;
  } finally {
    client?.release()
  }
}

const handleDeleteLocalImages = async (imagesPaths: string[]): Promise<boolean> => {
  if(imagesPaths.length === 0) return false

  try {
    for (let i = 0; i < imagesPaths.length; i++) {
      const imgPath = imagesPaths[i]
      await fs.unlink(path.join(__dirname, "../../", imgPath))
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export const deleteProduct: RequestHandler<{}, {}, {}, { product_id: string }> = async (
  req,
  res
): Promise<void> => {
  const queries = getQueries(queriesFolder);
  const { "deleteProduct.sql": DPQueries } = queries;
  if (!queries || !DPQueries) {
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return;
  }

  const { product_id } = req.query;

  if (!product_id) {
    res.status(400).json({
      msg: "El servidor no recibió el ID del producto."
    })
    return;
  }

  let client;
  try {
    client = await pool.connect()
    await client.query("BEGIN")
    const resultPaths = await client.query(DPQueries[0], [product_id])
    const imagesPaths = resultPaths.rows[0].paths
    const resultDeleteImages = await handleDeleteLocalImages(imagesPaths)

    if(resultDeleteImages) {
      const resultDeleteInDb = await client.query(DPQueries[1], [product_id])
      if (resultDeleteInDb.rowCount! > 0) {
        await client.query("COMMIT")
        res.status(200).json({
          msg: "Producto eliminado con exito"
        })
        return;
      } else {
        throw new Error("Error desconocido, no fue posible eliminar el producto, por favor espere unos segundos e intente nuevamente.")
      }
    }else{
      throw new Error("Error desconocido, no fue posible eliminar el producto, por favor espere unos segundos e intente nuevamente.")
    }
   
  } catch (error) {
    console.log("Error al eliminar el producto: ", error)
    client && await client.query("ROLLBACK")
    res.status(500).json({
      msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
    })
    return;
  } finally {
    client?.release()
  }
}