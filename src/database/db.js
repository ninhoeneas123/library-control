import Sequelize from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize(
  {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  }
)
export default db