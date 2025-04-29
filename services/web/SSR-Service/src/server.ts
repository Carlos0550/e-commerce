// src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import pool from "./database"

(async() => {
    try {
        const response = await pool.query("SELECT NOW()")
        console.log(response.rows[0].now)
    } catch (error) {
        console.log(error)
    }
})()

app.get("/", (_req: Request, res: Response) => {
  res.send("SSR Service is ON");
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});