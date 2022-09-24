import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { passwordRoutes } from './password.routes'
import { rentalRoutes } from './rental.routes'
import { specificationsRouter } from './specifications.routes'
import { usersRoutes } from './users.routes'

export const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRouter)
router.use('/users', usersRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalRoutes)
router.use('/password', passwordRoutes)
router.use(authenticateRoutes)
