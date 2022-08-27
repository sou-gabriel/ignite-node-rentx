import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor (
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute ({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!')
    }

    await this.specificationRepository.create({
      name,
      description
    })
  }
}
