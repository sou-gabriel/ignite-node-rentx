import { Router } from 'express'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController'

export const specificationsRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRouter.post('/', createSpecificationController.handle)
