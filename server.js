import app from './src/app.js'
import * as dotenv from 'dotenv'
import db from './src/database/db.js'

dotenv.config()
const port = 3002

app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`)
    await db.sync()
  } catch (err) {
    console.log(err)
  }
})
