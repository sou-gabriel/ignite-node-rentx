import { Router } from 'express'

import { categoryRepository } from '../repositories/CategoriesRepositories'

export const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  categoryRepository.create({ name, description })
  return response.status(201).send()
})
