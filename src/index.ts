import express from 'express'
import cors from 'cors'

import { userRoutes } from './routes/userRoutes.js'

import './config/firebaseConnect.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
