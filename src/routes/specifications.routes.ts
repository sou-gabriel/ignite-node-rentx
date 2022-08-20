import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

export const specificationsRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRouter.use(ensureAuthenticated)
specificationsRouter.post('/', createSpecificationController.handle)
