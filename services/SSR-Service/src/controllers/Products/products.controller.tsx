import { RequestHandler } from "express";
import { renderToString } from "react-dom/server";
import ProductDetailSSR from "./Components/ProductDetailSSR"
import pool from "../../database";
import "dotenv/config"
const domain = {
  development: "http://localhost:5001/api",
  production: "https://products-service-development.up.railway.app/api"
}

const handleBuildPath = () => {
  return process.env.NODE_ENV === "development"
  ? domain.development
  : domain.production
}
export const GetProductDetails: RequestHandler<{}, {}, {}, { product_id: string }> = async (req, res) => {
  const { product_id } = req.query;
  let client;

  try {
    client = await pool.connect();
    const result = await client.query("SELECT * FROM products WHERE product_id = $1", [product_id]);

    if (result.rowCount === 0) {
      res.status(404).send("<p>Producto no encontrado</p>");
      return;
    }

    const product = result.rows[0];

    const html = renderToString(
      <ProductDetailSSR
        {...product}
        buildPath={(path) => `${new URL(handleBuildPath())}/${path}`}
      />
    );

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send("<p>Error interno del servidor</p>");
  } finally {
    client?.release();
  }
};
