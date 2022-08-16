import { Specification } from '../entities/Specification'

export interface ICreateSpecificationDto {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDto): void
  findByName(name: string): Specification | undefined
}
