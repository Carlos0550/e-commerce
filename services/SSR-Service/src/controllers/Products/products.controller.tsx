import { RequestHandler } from "express";
import { renderToString } from "react-dom/server";
import ProductDetailSSR from "./Components/ProductDetailSSR";
import pool from "../../database";
import "dotenv/config";

const domain = {
  development: "http://localhost:5001/api",
  production: "https://products-service-development.up.railway.app/api",
};

const handleBuildPath = () => {
  return process.env.NODE_ENV === "development"
    ? domain.development
    : domain.production;
};

export const GetProductDetails: RequestHandler<
  {},
  {},
  {},
  { product_id: string }
> = async (req, res) => {
  const { product_id } = req.query;
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        html: "<p>Producto no encontrado</p>",
        product: null,
      });
      return;
    }

    const product = result.rows[0];

    const html = renderToString(
      <ProductDetailSSR
        {...product}
        buildPath={(path) => `${new URL(handleBuildPath())}/${path}`}
      />
    );

    res.status(200).json({
      html,
      product,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      html: "<p>Error interno del servidor</p>",
      product: null,
    });
  } finally {
    client?.release();
  }
};
