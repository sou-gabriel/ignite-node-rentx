import { UpdateResult } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  constructor (private cars: Car[] = []) {}

  async create ({
    id,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate (license_plate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async findAvailable (brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    return this.cars
      .filter(car => car.available || (brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name))
  }

  async findById (id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id)
  }

  async updateAvailable (id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id)
    this.cars[findIndex].available = available
  }
}
