import { Router } from 'express'
import { registerExpanse } from '../use-cases/expanseController'

export const expanseRoutes = Router()

expanseRoutes.post('/register/expanse', registerExpanse)
