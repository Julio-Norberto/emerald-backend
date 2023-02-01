import { Router } from 'express'
import { registerExpanse, searchUserExpanses } from '../use-cases/expanseController'

// Middleware
import { verifyToken } from '../helpers/verify-token'

export const expanseRoutes = Router()

expanseRoutes.post('/register/expanse', verifyToken, registerExpanse)
expanseRoutes.get('/expanses/:id', verifyToken, searchUserExpanses)
