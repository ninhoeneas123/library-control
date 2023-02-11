import { Router } from 'express'
import AuthorsController from './authors.controller.js'
import multer from 'multer'
import { createAuthorDto } from './dtos/crate-author-dto.js'
import validateRequestSchema from '../middlewares/validate-request-schema.js'

const upload = multer()
const authorRoutes = Router()

authorRoutes
  .post('/author/create', createAuthorDto, validateRequestSchema, AuthorsController.create)
  .post('/author/:id/add-image', upload.single('image'), AuthorsController.addImage)
  .get('/author', AuthorsController.findAll)
  .get('/author/find/:id', AuthorsController.findById)
  .get('/author/find-by-name/', AuthorsController.findByName)
  .put('/author/update/:id', AuthorsController.update)
  .delete('/author/delete/:id', AuthorsController.remove)

export default authorRoutes
