import pool from "../../database";

import { Request, Response } from "express";
import { getQueries } from "../../QueriesHandler";
import path from "path";
import { QueryWithUserId } from "../../Types/QueryWithUserId";
import { SaveCategoryBody } from "./Types/SaveCategoryTypes";

const queriesFolder = path.join(__dirname, "./Queries");

export const saveCategory = async (req:Request<{},{},SaveCategoryBody,QueryWithUserId>, res:Response): Promise<void> => {
    const queries = getQueries(queriesFolder);
    const { "saveCategory.sql": SCQueries } = queries;
    if(!queries || !SCQueries){
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }

    const { category_name } = req.body
    const { user_id } = req.query
    let client;
    try {
        client = await pool.connect()
        await client.query(SCQueries[0],[
            category_name,
            user_id
        ]);

        res.status(200).json({
            msg: "Categoría creada exitosamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
    }finally{
        client?.release()
    }
}