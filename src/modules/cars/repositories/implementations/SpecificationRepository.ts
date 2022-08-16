import { getRepository, Repository } from 'typeorm'

import { Specification } from '../../entities/Specification'
import { ICreateSpecificationDto, ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor () {
    this.repository = getRepository(Specification)
  }

  async create ({ name, description }: ICreateSpecificationDto): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)
  }

  async findByName (name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name })
    return specification
  }
}
