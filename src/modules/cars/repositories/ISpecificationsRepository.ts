import { Specification } from '../model/Specification'

export interface ICreateSpecificationDto {
  name: string
  description: string
}

export interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDto): void
  findByName(name: string): Specification | undefined
}
