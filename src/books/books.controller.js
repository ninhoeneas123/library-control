import BookUseCases from './use-cases/books.js'
import S3 from '../aws/s3/aws-use-cases.js'

class BookController {
  async create(req, res) {
    try {
      const { title } = req.body
      const bookIsVality = await BookUseCases.findByTitle(title)
      if (bookIsVality) {
        throw new Error('Book already exists')
      }
      const book = await BookUseCases.create(req.body)
      return res.status(201).json(book)
    } catch (err) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", err.message)
      if (err.message === 'Book already exists') {
        return res.status(409).json({ message: 'Book already exists' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async findAll(req, res) {
    try {
      const book = await BookUseCases.findAll()
      const returnBooks = book.map(async (book) => {
        const books = []
        const image = await S3.getFile('library-sytem', `books/${book.dataValues.id}`)
        books.push({ ...book.dataValues, image })
        return books
      })
      const response = await Promise.all(returnBooks)
      return res.status(200).json({ countBook: response.length, response })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: err.message })
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params
      const bookData = await BookUseCases.find(id)

      const image = await S3.getFile('library-sytem', `books/${bookData.id}`)
      const book = { ...bookData.book }
      book.image = image
      return res.status(200).json(book)
    } catch (err) {
      if (err.message === "Cannot read properties of null (reading 'dataValues')") {
        return res.status(404).json({ message: 'Book not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async findByTitle(req, res, next) {
    try {
      const { title } = req.body
      const bookData = await BookUseCases.findByTitle(title)
      if (!bookData) {
        throw new Error('Book not found')
      }
      const book = { ...bookData.book }
      const image = await S3.getFile('library-sytem', `books/${bookData.id}`)
      book.image = image
      return res.status(200).json(book)
    } catch (err) {
      if (err.message === 'Book not found') {
        return res.status(404).json({ message: 'Book not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }
   upa = "aasa"

  async update(req, res, next) {
    try {
      const { id } = req.params
      const book = await BookUseCases.find(id)
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJJJJJJ", book)
      if (book[0] === 0) {
        throw new Error('Book not found')
      }
      await BookUseCases.update(id, req.body)

      return res.status(200).json({ message: 'Book updated successfully' })
    } catch (err) {
      if (err.message === 'Book not found') {
        return res.status(404).json({ message: 'Book not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async updateImage(req, res, next) {
    try {
      const id = req.params.id
      const book = await BookUseCases.find(id)
      if (!book) {
        throw new Error('Book not found')
      }
      return res.status(200).json({ message: 'Book updated successfully' })
    } catch (err) {
      if (err.message === 'Book not found') {
        return res.status(404).json({ message: 'Book not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params
      const book = await BookUseCases.remove(id)
      if (!book) {
        throw new Error('book not found')
      }
      return res.status(200).json({ message: 'book deleted successfully' })
    } catch (err) {
      if (err.message === 'book not found') {
        return res.status(404).json({ message: 'book not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }
}
export default new BookController()
