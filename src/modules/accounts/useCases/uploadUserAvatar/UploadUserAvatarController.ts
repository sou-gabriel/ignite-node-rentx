import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadUserAvatarUseCase } from './UploadUserAvatarUseCase'

export class UploadUserAvatarController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const avatarFile = request.file?.filename!

    const uploadUserAvatarUseCase = container.resolve(UploadUserAvatarUseCase)

    uploadUserAvatarUseCase.execute({ id, avatarFile })

    return response.status(200).send()
  }
}
