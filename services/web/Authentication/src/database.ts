import { Pool } from "pg"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "e-commerce",
    password: "35218889",
    port: 5432,
})

export default pool