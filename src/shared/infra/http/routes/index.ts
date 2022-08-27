import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationsRouter } from './specifications.routes'
import { usersRoutes } from './users.routes'

export const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRouter)
router.use('/users', usersRoutes)
router.use(authenticateRoutes)
