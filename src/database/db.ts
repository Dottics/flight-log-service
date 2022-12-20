import { Pool } from 'pg'

const pool = new Pool({
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
    host: process.env.PGHOST ?? 'localhost',
})

//const checkConnection = async () => {
//    await pool.query('SELECT NOW()')
//    return
//}

//const setupPool = () => {
//    return new Pool()
//}


const query = (text: string, params: string[]) => pool.query(text, params)

export {
    pool,
    query,
}