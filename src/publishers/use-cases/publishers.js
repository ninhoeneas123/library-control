import { Publisher } from '../models/publisher-model.js'
import { Book } from '../../books/models/book-model.js'

class PublishersUseCases {
  async create (data) {
    const publisher = await Publisher.create(data)
    return publisher
  }

  async findAll () {
    const publisher = await Publisher.findAll({ include: [Book] })
    return publisher
  }

  async find (id) {
    const publisher = await Publisher.findOne({ where: { id }, include: Book })
    return { publisher, books: publisher.books }
  }

  async findByName (name) {
    const publisher = await Publisher.findOne({ where: { name }, include: [Book] })
    return publisher
  }

  async findByCNPJ (cnpj) {
    const publisher = await Publisher.findOne({
      where: {
        cnpj
      },
      include: [Book]
    }
    )
    return publisher
  }

  async update (id, data) {
    const publisher = await Publisher.update(
      data,
      {
        where:
                {
                  id
                }
      }
    )
    return publisher
  }

  async remove (id) {
    const publisher = await Publisher.destroy({
      where: {
        id
      }
    })
    return publisher
  }
}
export default new PublishersUseCases()
