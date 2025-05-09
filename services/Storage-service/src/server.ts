// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import pool from "./database"
import path from "path";

import ProductsRouter from "./routes/products.routes";
import categoriesRouter from "./routes/categories.routes"

(async() => {
    try {
        const response = await pool.query("SELECT NOW()")
        console.log(response.rows[0].now)
    } catch (error) {
        console.log(error)
    }
})()

app.get("/", (_req: Request, res: Response) => {
  res.send("SERVER ON");
});

app.use("/api", ProductsRouter)
app.use("/api/categories", categoriesRouter)
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});