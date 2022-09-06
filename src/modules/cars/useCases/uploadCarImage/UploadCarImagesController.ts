import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImageUseCase } from './UploadCarImagesUseCase'

export class UploadCarImagesController {
  async handle (request: Request, response: Response) {
    const { id } = request.params
    const images = request.files as Express.Multer.File[]

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

    const fileNames = images?.map(({ filename }) => filename)

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name: fileNames
    })

    return response.status(201).send()
  }
}
