import { Specification } from '../infra/typeorm/entities/Specification'

export interface ICreateSpecificationDto {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDto): Promise<Specification>
  findByName(name: string): Promise<Specification | undefined>
  findByIds(ids: string[]): Promise<Specification[]>
}
