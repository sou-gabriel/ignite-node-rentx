import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'

import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor () {
    this.repository = getRepository(Rental)
  }

  findOpenRentalByCar (car_id: string): Promise<Rental | undefined> {
    return this.repository.findOne(car_id)
  }

  findOpenRentalByUser (user_id: string): Promise<Rental | undefined> {
    return this.repository.findOne(user_id)
  }

  create (data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    return this.repository.save(rental)
  }

  findById (id: string): Promise<Rental | undefined> {
    return this.repository.findOne(id)
  }
}
