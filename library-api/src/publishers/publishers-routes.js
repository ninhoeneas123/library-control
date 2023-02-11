import { Router } from 'express'
import PublishersController from './publishers-controller.js'
import multer from 'multer'
import validateRequestSchema from '../middlewares/validate-request-schema.js'
import { registerPublisherDto } from './dtos/register-publisher-dto.js'
import { updatePublisherDto } from './dtos/update-publisher-dto.js'

const upload = multer()
const publishersRoutes = Router()

publishersRoutes
  .post('/publishers/create', registerPublisherDto, validateRequestSchema, PublishersController.create)
  .post('/publishers/:id/create', upload.single('image'), PublishersController.addImage)
  .get('/publishers/find-all', PublishersController.findAll)
  .get('/publishers/find/:id', PublishersController.findById)
  .get('/publishers/find-by-name/', PublishersController.findByName)
  .put('/publishers/update/:id', updatePublisherDto, validateRequestSchema, PublishersController.update)
  .delete('/publishers/delete/:id', PublishersController.remove)

export default publishersRoutes
