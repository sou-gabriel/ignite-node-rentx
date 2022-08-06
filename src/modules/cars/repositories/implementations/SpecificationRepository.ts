import { Specification } from '../../model/Specification'
import { ICreateSpecificationDto, ISpecificationRepository } from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[]

  constructor () {
    this.specifications = []
  }

  create ({ name, description }: ICreateSpecificationDto) {
    const specification = new Specification(name, description)

    this.specifications.push(specification)
  }

  findByName (name: string): Specification | undefined {
    return this.specifications.find(specification => specification.name === name)
  }
}
