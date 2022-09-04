import { Router } from 'express'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const carsRoutes = Router()
const listAvailableCarsController = new ListAvailableCarsController()

const createCarController = new CreateCarController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', listAvailableCarsController.handle)
