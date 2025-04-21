import path from "path";
import pool from "../../database"
import { getQueries } from "../../QueriesHandler";
import { CreateAccountBody } from "../../Types/CreateAccountTypes";
import { Request, Response } from "express";
import { hashPassword } from "../../utils/PasswordsUtils";

export const createAccount = async(req:Request<{},{},CreateAccountBody,{}>, res:Response): Promise<void> => {
    let client;
    const QueriesPath = path.join(__dirname, "./Queries")

    const {
        user_email,
        user_name,
        user_password,
        register_as_admin
    } = req.body

    const { "createAccount.sql": CRQueries } = getQueries(QueriesPath);
    if(!CRQueries){
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })

        console.log("Error al obtener las consultas 'createAccount.sql'")
        return;
    }
    try {
        client = await pool.connect()
        if(register_as_admin){
            const { rows: [{ count }] } = await client.query(CRQueries[0],[
                user_email
            ])

            if(count && count > 0){
                res.status(400).json({
                    msg: "Ya existe una cuenta con el correo proporcionado"
                })
                return
            }   

            const hashedPassword = await hashPassword(user_password)
            const response = await client.query(CRQueries[1],[
                user_name,
                user_email,
                hashedPassword
            ])

            if(response?.rowCount && response.rowCount > 0){
                res.status(200).json({
                    msg: "Cuenta creada exitosamente, Bienvenido" + user_name
                })
                return
            }else{
                res.status(400).json({
                    msg: "Ocurrio un error inesperado al crear la cuenta, por favor intente de nuevo"
                })

                return;
            }
        }else{
            res.status(400).json({
                msg: "Funcionalidad en desarrollo"
            })
            return
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })

        return
    }finally{
        if(client) client.release()
    }
}