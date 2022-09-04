import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import { ICreateSpecificationDto, ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  constructor (private specifications: Specification[] = []) {}

  async create ({ name, description }: ICreateSpecificationDto): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description
    })

    this.specifications.push(specification)
    return specification
  }

  async findByName (name: string): Promise<Specification | undefined> {
    return this.specifications.find(specification => specification.name === name)
  }

  async findByIds (ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification: Specification) => {
      return ids.includes(specification.id)
    })

    return specifications
  }
}
