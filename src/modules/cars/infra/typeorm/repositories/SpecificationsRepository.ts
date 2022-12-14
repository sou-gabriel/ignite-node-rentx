import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDto, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

import { Specification } from '../entities/Specification'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor () {
    this.repository = getRepository(Specification)
  }

  async create ({ name, description }: ICreateSpecificationDto): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })

    return await this.repository.save(specification)
  }

  async findByName (name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name })
    return specification
  }

  async findByIds (ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)
    return specifications
  }
}
