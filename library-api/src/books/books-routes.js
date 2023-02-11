import { Router } from 'express'
import BooksController from './books.controller.js'
import multer from 'multer'

const upload = multer()
const booksRoutes = Router()

booksRoutes
  .post('/books/create', upload.single('image'), BooksController.create)
  .get('/books', BooksController.findAll)
  .get('/books/find/:id', BooksController.findById)
  .get('/books/find-by-name/', BooksController.findByTitle)
  .put('/books/update/:id', BooksController.update)
  .put('/books/update-image/:id', upload.single('image'), BooksController.updateImage)
  .delete('/books/delete/:id', BooksController.remove)

export default booksRoutes
