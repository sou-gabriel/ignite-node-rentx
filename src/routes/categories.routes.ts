import { Router } from 'express'

import { categoryRepository } from '../repositories/CategoriesRepositories'

export const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const categoryAlreadyExists = categoryRepository.findByName(name)

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: 'Category already exists!' })
  }

  categoryRepository.create({ name, description })
  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const allCategories = categoryRepository.findAll()
  return response.json(allCategories)
})
