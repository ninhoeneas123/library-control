import db from '../../database/db.js'
import { DataTypes } from 'sequelize'
import { Author } from '../../authors/models/author-model.js'
import { Publisher } from '../../publishers/models/publisher-model.js'

export const Book = db.define('Books', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  }

})

Book.belongsTo(Author, {
  constraint: true,
  foreignKey: 'idAuthor'
})

Book.belongsTo(Publisher, {
  constraint: true,
  foreignKey: 'idPublisher'
})

Author.hasMany(Book, {
  foreignKey: 'idAuthor'
})

Publisher.hasMany(Book, {
  foreignKey: 'idPublisher'
})
