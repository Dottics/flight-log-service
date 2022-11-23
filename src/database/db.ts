import { Pool } from 'pg'

const pool = new Pool()

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