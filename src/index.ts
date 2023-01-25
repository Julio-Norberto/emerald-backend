import express from 'express'
import cors from 'cors'
import './config/firebaseConnect.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
