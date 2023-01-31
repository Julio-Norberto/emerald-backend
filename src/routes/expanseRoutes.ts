import { Router } from 'express'
import { registerExpanse } from '../use-cases/expanseController'

// Middleware
import { verifyToken } from '../helpers/verify-token'

export const expanseRoutes = Router()

expanseRoutes.post('/register/expanse', verifyToken, registerExpanse)
