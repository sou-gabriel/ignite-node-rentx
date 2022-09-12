import { getRepository, Repository, UpdateResult } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor () {
    this.repository = getRepository(Car)
  }

  async create ({
    id,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate (license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      license_plate
    })

    return car
  }

  async findAvailable (
    brand?: string | undefined,
    category_id?: string | undefined,
    name?: string | undefined
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where('car.available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand })
    }

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id })
    }

    if (name) {
      carsQuery.andWhere('car.name = :name', { name })
    }

    const cars = await carsQuery.getMany()
    return cars
  }

  async findById (id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id)
    return car
  }

  async updateAvailable (id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute()
    // UPDATE cars SET available = 'true' WHERE id = :id
  }
}
