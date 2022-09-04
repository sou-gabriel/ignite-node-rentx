import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  constructor (private cars: Car[] = []) {}

  async create ({
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
}
