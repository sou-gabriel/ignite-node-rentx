import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor (
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute (data?: IRequest) {
    const cars = await this.carsRepository.findAvailable(data?.brand, data?.category_id, data?.name)
    return cars
  }
}
