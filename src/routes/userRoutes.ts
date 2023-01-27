import { Router } from 'express'
import { loginUser, registerUser } from '../use-cases/userController'

export const userRoutes = Router()

userRoutes.get('/', (req, res) => {
  res.status(200).json({ message: "Sucesso!" })
})

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
