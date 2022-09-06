import { inject, injectable } from 'tsyringe'

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
export class UploadCarImageUseCase {
  constructor (
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute ({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async (image) => {
      await this.carImagesRepository.create(car_id, image)
    })
  }
}
