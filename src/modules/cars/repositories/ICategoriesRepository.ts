import { Category } from '../entities/Category'

export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>
  findAll(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}
