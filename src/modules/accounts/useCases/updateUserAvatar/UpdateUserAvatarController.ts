import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

export class UpdateUserAvatarController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const avatarFile = request.file?.filename!

    // Receber arquivo
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    updateUserAvatarUseCase.execute({ id, avatarFile })

    return response.status(200).send()
  }
}
