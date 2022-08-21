import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  id: string
  avatarFile: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute ({ id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found!')
    }

    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}
