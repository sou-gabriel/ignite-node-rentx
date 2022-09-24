import { Repository, getRepository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO'

import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import { UserTokens } from '../entities/UserTokens'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository!: Repository<UserTokens>

  constructor () {
    this.repository = getRepository(UserTokens)
  }

  create (data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data)
    return this.repository.save(userToken)
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserTokens | undefined> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token
    })
    return usersTokens
  }

  async deleteById (id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByRefreshToken (token: string): Promise<UserTokens | undefined> {
    return await this.repository.findOne({
      where: {
        refresh_token: token
      }
    })
  }
}
