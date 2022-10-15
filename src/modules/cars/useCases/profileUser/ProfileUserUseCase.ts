import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { UserMap } from '@modules/accounts/mapper/UserMap'

import { IUserResponseDTO } from '../../../accounts/dtos/IUserResponseDTO'
import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository'

@injectable()
export class ProfileUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute (id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id) as User
    return UserMap.toDTO(user)
  }
}
