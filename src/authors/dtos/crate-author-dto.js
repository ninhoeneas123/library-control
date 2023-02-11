import { body } from 'express-validator'

const schema = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('nationality').isString().notEmpty().withMessage('nationality is required'),
]
export { schema as createAuthorDto }
