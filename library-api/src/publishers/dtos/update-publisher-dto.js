import { body } from 'express-validator'

const schema = [
  body('name').isString().optional(),
  body('cnpj').isString().optional(),
  body('tell').isString().isLength(11).optional(),
]
export { schema as updatePublisherDto }
