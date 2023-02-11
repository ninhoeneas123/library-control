import { body } from 'express-validator'

const schema = [
  body('name').isString().optional(),
  body('nationality').isString().optional(),
  body('image').notEmpty().optional()
]
export { schema as updateAuthorDto }
