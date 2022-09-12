import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentals/infra/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute ({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHours = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError('Car is unavailable!')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError('There\'s a rental in progress for user!')
    }

    const dateNow = this.dateProvider.dateNow()
    const diffInHours = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if (diffInHours < minimumHours) {
      throw new AppError('Invalid return time!')
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}
