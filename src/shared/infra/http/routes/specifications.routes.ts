import { Router } from 'express'

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const specificationsRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRouter.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle)
