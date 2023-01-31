import express from 'express'
import cors from 'cors'
import './config/db.js'

import { userRoutes } from './routes/userRoutes.js'
import { expanseRoutes } from './routes/expanseRoutes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)
app.use('/api', expanseRoutes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
