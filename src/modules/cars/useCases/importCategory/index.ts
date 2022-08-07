import { ImportCategoryController } from './ImportCategoryController'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

const importCategoryUseCase = new ImportCategoryUseCase()

export const importCategoryController = new ImportCategoryController(importCategoryUseCase)
