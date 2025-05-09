import pool from "../database"

import { RequestHandler } from "express"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)


export const verifyUser: RequestHandler<{},{},{},{user_id: string}> = async (req, res, next): Promise<void> => {
    const {user_id} = req.query

    if(!user_id){
        res.status(400).json({msg: "No fue posible verificar su cuenta: El servidor no recibió el ID de usuario."})
        return
    }
    
    let client;
    try {
        client = await pool.connect()
        const response = await client.query("SELECT * FROM managers WHERE manager_id = $1;", [user_id])

        if(response.rowCount === 0){
            res.status(404).json({
                msg: "No se encontro ninguna cuenta con el ID proporcionado"
            })
            return
        }

        const user = response.rows[0]
        const user_logged_at = user.logged_at 

        const hoursDiff = dayjs().diff(dayjs(user_logged_at), 'hour')

        if (hoursDiff >= 24) { 
            res.status(401).json({ message: "Sesión expirada" })
            return
        } else { 
            (req as any).user = user
            next()
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor, por favor espere unos segundos e intente nuevamente."
        })
        return;
    }finally{
        client?.release()
    }
}
