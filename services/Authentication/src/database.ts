import { Pool } from "pg"
import "dotenv/config"
console.log("ENTORNO CONFIGURADO EN: ", process.env.NODE_ENV)
const pool = process.env.NODE_ENV === "development"
    ? new Pool({
        user: "postgres",
        host: "localhost",
        database: "e-commerce",
        password: "35218889",
        port: 5432,
    })
    : new Pool({
        connectionString: process.env.RAILWAY_PG_CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    })

export default pool