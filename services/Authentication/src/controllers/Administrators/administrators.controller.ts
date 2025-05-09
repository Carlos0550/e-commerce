import pool from "../../database";
import path from "path";
import { getQueries } from "../../QueriesHandler";
import { RequestHandler } from "express";

const queriesFolder = path.join(__dirname, "./Queries");

export const getAdministrators: RequestHandler<{},{},{},{}> = async (req, res) => {
    const queries = getQueries(queriesFolder);
    const { "getAdministrators.sql": GAQueries } = queries;
    if (!queries || !GAQueries) {
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }

    let client;
    try {
        client = await pool.connect();
        const response = await client.query(GAQueries[0]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
    }
}