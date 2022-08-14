import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

export class ListCategoriesUseCase {
  constructor (private categoriesRepository: ICategoriesRepository) {}

  execute (): Category[] | undefined {
    return this.categoriesRepository.findAll()
  }
}
