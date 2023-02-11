import { Book } from '../models/book-model.js'
import { Publisher } from '../../publishers/models/publisher-model.js'
import { Author } from '../../authors/models/author-model.js'

class BookUseCases {
  async create (data) {
    const book = await Book.create(data)
    return book
  }

  async findAll () {
    const book = await Book.findAll({ include: [Publisher, Author] })
    return book
  }

  async find (id) {
    const book = await Book.findOne({
      where: {
        id
      },
      include: [Publisher, Author]
    })
    return { book: book.dataValues, publisher: book.publisher, author: book.author }
  }

  async findByTitle (title) {
    const book = await Book.findOne({
      where: {
        title
      },
      include: [Publisher, Author]
    })
    return book
  }

  async update (id, data) {
    const book = await Book.update(
      data,
      {
        where:
                {
                  id
                }
      }
    )
    return book
  }

  async remove (id) {
    const book = await Book.destroy({
      where: {
        id
      }
    })
    return book
  }

  async findByPublisher (idPublisher) {
    const book = await Book.findAll({
      where: {
        publishingId: idPublisher
      }
    })
    return book
  }
}
export default new BookUseCases()
