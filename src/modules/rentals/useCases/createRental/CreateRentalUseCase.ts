import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Rental } from '@modules/rentals/infra/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  constructor (
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider
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

    return rental
  }
}
