import sql from 'mssql'
import {config} from 'dotenv'

config()

const dbSettings = {
    user: "sa",
    password: "admin2024*",
    server: "localhost",
    database: "ProductsDB",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

//Conectar a la base de datos
export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error)
    }
}

export { sql }
