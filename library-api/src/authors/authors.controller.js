import AuthorUseCases from './use-cases/author.js'
import S3 from '../aws/s3/aws-use-cases.js'

class AuthorsController {
  async create(req, res) {
    try {
      const { name } = req.body
      const authorIsVality = await AuthorUseCases.findByName(name)
      if (authorIsVality) {
        throw new Error('Author already exists')
      }
      const author = await AuthorUseCases.create(req.body)
      return res.status(201).json(author)
    } catch (err) {
      if (err.message === 'Author already exists') {
        return res.status(409).json({ message: 'Author already exists' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async addImage(req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
      const author = await AuthorUseCases.find(id)
      console.log("aaaa",author)
      if (!author) {
        throw new Error('Author not found')
      }
       await S3.create('library-sytem', `authors/${author.id}`, req.file.buffer)
       return res.status(201).json({message: 'Image added successfully'})

    }
    catch (err) {
      if (err.message === 'Author already exists') {
        return res.status(409).json({ message: 'Author already exists' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async findAll(req, res) {
    try {
      const authors = await AuthorUseCases.findAll()
      const returnAuthors = authors.map(async (author) => {
        const authorsData = []
        const image = await S3.getFile('library-sytem', `authors/${author.dataValues.id}`)
        authorsData.push({ ...author.dataValues, image })
        return authorsData
      })
      const response = await Promise.all(returnAuthors)
      return res.status(200).json(response)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params
      const author = await AuthorUseCases.find(id)
      if (!author) {
        throw new Error('Author not found')
      }
      return res.status(200).json(author)
    } catch (err) {
      if (err.message === 'Author not found') {
        return res.status(404).json({ message: 'Author not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async findByName(req, res, next) {
    try {
      const { name } = req.body
      const author = await AuthorUseCases.findByName(name)
      console.log(author)
      if (!author) {
        throw new Error('Author not found')
      }
      return res.status(200).json(author)
    } catch (err) {
      if (err.message === 'Author not found') {
        return res.status(404).json({ message: 'Author not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params
      const body = Object.keys(req.body)
      if (body.length === 0) {
        throw new Error('Body is empty')
      }
      const author = await AuthorUseCases.update(id, req.body)
      if (author[0] === 0) {
        throw new Error('Author not found')
      }
      return res.status(200).json({ message: 'Author updated successfully' })
    } catch (err) {
      if (err.message === 'Author not found') {
        return res.status(404).json({ message: 'Author not found' })
      }
      if (err.message === 'Body is empty') {
        return res.status(400).json({ message: 'Body is empty' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async updateImage(req, res, next) {
    try {
      const { id } = req.params
      const author = await AuthorUseCases.find(id)
      if (!author) {
        throw new Error('Author not found')
      }
      await S3.create('library-sytem', `authors/${author.id}`, req.file.buffer)
      return res.status(200).json({ message: 'Author updated successfully' })
    } catch (err) {
      if (err.message === 'Author not found') {
        return res.status(404).json({ message: 'Author not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params
      const author = await AuthorUseCases.remove(id)
      if (!author) {
        throw new Error('Author not found')
      }
      return res.status(200).json({ message: 'Author deleted successfully' })
    } catch (err) {
      if (err.message === 'Author not found') {
        return res.status(404).json({ message: 'Author not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }
}
export default new AuthorsController()
