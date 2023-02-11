import { body } from 'express-validator'

const schema = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('cnpj').isString().notEmpty().withMessage('cnpj is required'),
  body('tell').isString().notEmpty().withMessage('Phone is required'),
]
export { schema as registerPublisherDto }
