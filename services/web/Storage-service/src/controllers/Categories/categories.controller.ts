import pool from "../../database";

import { Request, Response } from "express";
import { getQueries } from "../../QueriesHandler";
import path from "path";
import { QueryWithUserId } from "../../Types/QueryWithUserId";
import { SaveCategoryBody } from "./Types/SaveCategoryTypes";
import { UpdateCategoryQuery } from "./Types/UpdateCategoryTypes";

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

export const updateCategory = async (req:Request<{},{},SaveCategoryBody,UpdateCategoryQuery>, res:Response): Promise<void> => {
    const queries = getQueries(queriesFolder);
    const { "updateCategory.sql": UCQueries } = queries;
    if(!queries || !UCQueries){
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }    

    const { category_name } = req.body
    const { user_id, category_id } = req.query
    let client;
    try {
        client = await pool.connect()
        await client.query(UCQueries[0],[
            category_name,
            user_id,
            category_id
        ]);

        res.status(200).json({
            msg: "Categoría actualizada exitosamente"
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

export const deleteCategory = async (req:Request<{},{},SaveCategoryBody,{category_id:string}>, res:Response): Promise<void> => {
    const queries = getQueries(queriesFolder);
    const { "deleteCategory.sql": DCQueries } = queries;
    if(!queries || !DCQueries){
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }

    const { category_id } = req.query    
    let client;
    try {
        client = await pool.connect()
        await client.query(DCQueries[0],[
            category_id
        ]);

        res.status(200).json({
            msg: "Categoría eliminada exitosamente"
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

export const getCategories = async (req:Request<{},{},{},QueryWithUserId>, res:Response): Promise<void> => {
    const queries = getQueries(queriesFolder);
    const { "getCategories.sql": GCQueries } = queries;
    if(!queries || !GCQueries){
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }

    let client;    
    try {
        client = await pool.connect()
        const response = await client.query(GCQueries[0])
        res.status(200).json({
            categories: response.rows
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