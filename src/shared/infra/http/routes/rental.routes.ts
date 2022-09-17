import { Router } from 'express'

import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController'
import { ListRentalsByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle)
