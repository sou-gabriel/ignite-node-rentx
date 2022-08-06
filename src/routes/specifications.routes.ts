import { Router } from 'express'

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

export const specificationsRouter = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRouter.post('/', (request, response) => {
  const { name, description } = request.body

  const createSpecificationService = new CreateSpecificationService(specificationsRepository)
  createSpecificationService.execute({ name, description })

  return response.status(201).send()
})
