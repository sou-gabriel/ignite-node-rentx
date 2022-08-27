import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category name',
      description: 'Category description'
    }

    await createCategoryUseCase.execute(category)

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with name exists', () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category description test'
      }

      await createCategoryUseCase.execute(category)
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
