import { Author } from '../models/author-model.js'
import { Book } from '../../books/models/book-model.js'

class AuthorUseCases {
  async create (data) {
    const author = await Author.create(data)
    return author
  }

  async findAll () {
    const author = await Author.findAll({ include: [Book] })
    return author
  }

  async find (id) {
    const author = await Author.findOne({ where: { id }, include: [Book] })
    return author
  }

  async findByName (name) {
    const author = await Author.findOne({
      where: {
        name
      },
      include: [Book]
    })
    return author
  }

  async update (id, data) {
    const author = await Author.update(
      data,
      {
        where:
                {
                  id
                }
      }
    )
    return author
  }

  async remove (id) {
    const author = await Author.destroy({
      where: {
        id
      }
    })
    return author
  }
}
export default new AuthorUseCases()
