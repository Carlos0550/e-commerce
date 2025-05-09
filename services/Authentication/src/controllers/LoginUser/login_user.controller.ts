import { Request, Response } from "express"
import { CreateAccountBody } from "../../Types/CreateAccountTypes"
import { getQueries } from "../../QueriesHandler"
import path from "path"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)
import pool from "../../database"
import { comparePassword } from "../../utils/PasswordsUtils"
export const loginUser = async(req:Request<{},{},CreateAccountBody,{}>, res:Response): Promise<void> => {
    const { user_email, user_password } = req.body
    const queriesPath = path.join(__dirname, "./Queries")
    const queries = getQueries(queriesPath)

    const { "loginUser.sql": LQueries } = queries
    if(!queries || !LQueries){
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })

        console.log("Error al obtener las consultas 'loginUser.sql'")
        return;
    }

    let client;
    try {
        client = await pool.connect()
        const {rows: [{count, allow_to_administrate}]} = await client.query(LQueries[0],[
            user_email
        ])
        if(count && parseInt(count) === 0){
            res.status(404).json({
                msg: "No se encontro ninguna cuenta con el correo proporcionado"
            })

            return;
        }
        
        const {rows} = await client.query(LQueries[1],[user_email])
        const { manager_password, ...rest } = rows[0]
        if(!await comparePassword(user_password, manager_password)){
            res.status(400).json({
                msg: "La contraseña proporcionada es incorrecta"
            })

            return;
        }else{
            if(!allow_to_administrate){
                res.status(401).json({
                    msg: "No tienes permisos para acceder a tu cuenta, espera a que un administrador te habilite."
                })
                return
            }

            const today = dayjs().format("YYYY-MM-DD HH:mm:ss")
            await client.query(LQueries[2],[today, user_email])
            res.status(200).json({
                msg: "Bienvenido nuevamente a Cinnamon",
                user: rest
            });
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }finally{
        if(client) client.release()
    }
}