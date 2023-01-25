import { Router } from 'express'

export const userRoutes = Router()

userRoutes.get('/', (req, res) => {
  res.status(200).json({ message: "Sucesso!" })
})
