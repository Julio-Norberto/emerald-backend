import express from 'express'
import cors from 'cors'
import './config/db.js'

import { userRoutes } from './routes/userRoutes.js'
import { expanseRoutes } from './routes/expanseRoutes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/', userRoutes)
app.use('/', expanseRoutes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
