import { Category } from '../model/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoryRepository {
  private categories: Category[]

  constructor () {
    this.categories = []
  }

  create ({ name, description }: ICreateCategoryDTO): void {
    const category = new Category(name, description)

    this.categories.push(category)
  }
}

export const categoryRepository = new CategoryRepository()
