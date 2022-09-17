import { Router } from 'express'

import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle)
