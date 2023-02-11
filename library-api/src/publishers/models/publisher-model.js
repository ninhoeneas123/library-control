import db from '../../database/db.js'
import { DataTypes } from 'sequelize'

export const Publisher = db.define('Publishers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tell: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
