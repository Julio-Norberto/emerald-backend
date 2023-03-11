import { Router } from 'express'
import { fetchUserExpansesById, registerExpanse, removeUserExpanse, searchOneExpanse, searchUserExpanses, updateUserExpanse } from '../use-cases/expanseController'

// Middleware
import { verifyToken } from '../helpers/verify-token'

export const expanseRoutes = Router()

expanseRoutes.post('/register/expanse', verifyToken, registerExpanse)
expanseRoutes.get('/expanses/:id', verifyToken, searchUserExpanses)
expanseRoutes.get('/expanses', verifyToken, fetchUserExpansesById)
expanseRoutes.patch('/expanses/:id', verifyToken, updateUserExpanse)
expanseRoutes.delete('/expanses/:id', verifyToken, removeUserExpanse)
expanseRoutes.get('/expanse/search/:id', verifyToken, searchOneExpanse)
