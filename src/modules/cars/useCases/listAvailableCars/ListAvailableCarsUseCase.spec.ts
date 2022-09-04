import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 01',
      description: 'Car descritpion',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car band',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute()

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 02',
      description: 'Car descritpion',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_band_test',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_band_test'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 03',
      description: 'Car descritpion',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_band_test',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute({ name: 'Car 03' })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 03',
      description: 'Car descritpion',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_band_test',
      category_id: '12345'
    })

    const cars = await listAvailableCarsUseCase.execute({ category_id: '12345' })

    expect(cars).toEqual([car])
  })
})
