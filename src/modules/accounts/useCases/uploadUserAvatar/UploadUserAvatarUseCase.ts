import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  id: string
  avatarFile: string
}

@injectable()
export class UploadUserAvatarUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute ({ id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found!')
    }

    if (user.avatar) {
      await this.storageProvider.delete('avatar', user.avatar)
    }

    await this.storageProvider.save('avatar', avatarFile)

    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}
