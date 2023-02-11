import express from 'express'
import authorRoutes from './authors/authors-routes.js'
import booksRoutes from './books/books-routes.js'
import publishersRoutes from './publishers/publishers-routes.js'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(
  express.json(),
  authorRoutes,
  booksRoutes,
  publishersRoutes
)

export default app
