import { Specification } from '../../entities/Specification'
import { ICreateSpecificationDto, ISpecificationsRepository } from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationsRepository

  constructor () {
    this.specifications = []
  }

  public static getInstance () {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository()
    }

    return this.INSTANCE
  }

  create ({ name, description }: ICreateSpecificationDto) {
    const specification = new Specification(name, description)

    this.specifications.push(specification)
  }

  findByName (name: string): Specification | undefined {
    return this.specifications.find(specification => specification.name === name)
  }
}
