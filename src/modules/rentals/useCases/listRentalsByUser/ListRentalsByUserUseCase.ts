import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentals/infra/entities/Rental'

import { IRentalsRepository } from '../../repositories/IRentalsRepository'

@injectable()
export class ListRentalsByUserUseCase {
  constructor (
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute (user_id: string): Promise<Rental[] | undefined> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id)
    return rentalsByUser
  }
}
