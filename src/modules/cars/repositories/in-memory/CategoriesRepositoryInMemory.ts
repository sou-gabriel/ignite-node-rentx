import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  constructor (private categories: Category[] = []) {}

  async findByName (name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }

  async findAll (): Promise<Category[]> {
    const categories = this.categories
    return categories
  }

  async create ({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)
  }
}
