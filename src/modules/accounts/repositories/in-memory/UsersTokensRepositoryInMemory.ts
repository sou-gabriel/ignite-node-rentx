import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO'
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = []

  async create (data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, data)

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string) {
    const userToken = this.usersTokens.find(userToken =>
      userToken.user_id === user_id && userToken.refresh_token === refresh_token)

    return userToken
  }

  async deleteById (id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex((userToken) => userToken.id === id)
    this.usersTokens.splice(userTokenIndex)
  }

  async findByRefreshToken (token: string): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find((userToken) => userToken.refresh_token === token)
    return userToken
  }
}
