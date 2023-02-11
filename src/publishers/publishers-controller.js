import PublishersUseCases from '../publishers/use-cases/publishers.js'
import S3 from '../aws/s3/aws-use-cases.js'

class PublishersController {
  async create(req, res) {
    try {
      const { cnpj } = req.body
      const publisherIsVality = await PublishersUseCases.findByCNPJ(cnpj)
      if (publisherIsVality) {
        throw new Error('Publisher already exists')
      }
      const publisher = await PublishersUseCases.create(req.body)
      return res.status(201).json(publisher)
    } catch (err) {
      if (err.message === 'Publisher already exists') {
        return res.status(409).json({ message: 'Publisher already exists' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async addImage(req, res, next) {
    try {
      const { id } = req.params
      const publisher = await PublishersUseCases.find(id)
      if (!publisher) {
        throw new Error('Publisher not found')
      }
      await S3.create('library-sytem', `publishers/${publisher.id}`, req.file.buffer)
      return res.status(201).json({ message: 'Image added successfully' })
    } catch (err) {
      if (err.message === 'Publisher not found') {
        return res.status(409).json({ message: 'Publisher already exists' })
      }
      return res.status(500).json({ message: err.message })
    }
  }


  async findAll(req, res) {
    try {
      const publishers = await PublishersUseCases.findAll()
      const returnPublishers = publishers.map(async (publisher) => {
        const publishersData = []
        const image = await S3.getFile('library-sytem', `books/${publisher.dataValues.id}`)
        publishersData.push({ ...publisher.dataValues, image })
        return publishersData
      })
      const response = await Promise.all(returnPublishers)
      return res.status(200).json({ countPublishers: response.length, response })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: err.message })
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params
      const publisher = await PublishersUseCases.find(id)
      if (!publisher) {
        throw new Error('Publisher not found')
      }
      return res.status(200).json(publisher)
    } catch (err) {
      if (err.message === 'Publisher not found') {
        return res.status(404).json({ message: 'Publisher not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async findByName(req, res) {
    try {
      const { name } = req.body
      const publisher = await PublishersUseCases.findByName(name)
      if (!publisher) {
        throw new Error('Publisher not found')
      }
      return res.status(200).json(publisher)
    } catch (err) {
      if (err.message === 'Publisher not found') {
        return res.status(404).json({ message: 'Publisher not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const body = Object.keys(req.body)
      if (body.length === 0) {
        throw new Error('Body is empty')
      }
      const publisher = await PublishersUseCases.update(id, req.body)
      if (publisher[0] === 0) {
        throw new Error('Publisher not found')
      }
      return res.status(200).json({ message: 'Publisher updated successfully' })
    } catch (err) {
      if (err.message === 'Publisher not found') {
        return res.status(404).json({ message: 'Publisher not found' })
      }
      if (err.message === 'Body is empty') {
        return res.status(400).json({ message: 'Body is empty' })
      }

      return res.status(500).json({ message: err.message })
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params
      const publisher = await PublishersUseCases.remove(id)
      if (!publisher) {
        throw new Error('Publisher not found')
      }
      return res.status(200).json({ message: 'Publisher deleted successfully' })
    } catch (err) {
      if (err.message === 'Publisher not found') {
        return res.status(404).json({ message: 'Publisher not found' })
      }
      return res.status(500).json({ message: err.message })
    }
  }
}
export default new PublishersController()
