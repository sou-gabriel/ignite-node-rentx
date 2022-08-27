import { Router } from 'express'

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const specificationsRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRouter.use(ensureAuthenticated)
specificationsRouter.post('/', createSpecificationController.handle)
