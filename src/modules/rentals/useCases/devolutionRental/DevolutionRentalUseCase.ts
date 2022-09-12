import { inject } from 'tsyringe'

import { Rental } from '@modules/rentals/infra/entities/Rental'

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  id: string;
  user_id: string;
}

export class DevolutionRentalUseCase {
  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute ({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(id)
    const minimumDaily = 1

    if (!rental) {
      throw new AppError('Rental does not exists!')
    }

    if (!car) {
      throw new AppError('Car not found!')
    }

    // Verificar o tempo de aluguel
    const currentDate = this.dateProvider.dateNow()
    let daily = this.dateProvider.compareInDays(rental.start_date, currentDate)

    if (daily <= 0) {
      daily = minimumDaily
    }

    // Calculo de atraso
    const delayInDays = this.dateProvider.compareInDays(
      currentDate,
      rental.expected_return_date
    )

    let total = 0

    if (delayInDays > 0) {
      const calculateFine = delayInDays * car.fine_amount
      total = calculateFine
    }

    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
