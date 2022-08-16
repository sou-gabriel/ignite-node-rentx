import { Specification } from '../entities/Specification'

export interface ICreateSpecificationDto {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDto): Promise<void>
  findByName(name: string): Promise<Specification | undefined>
}
