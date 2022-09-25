import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO'
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = []

  async create ({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find(userToken => {
      return userToken.user_id === user_id && userToken.refresh_token === refresh_token
    })

    return userToken
  }

  async deleteById (id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id)

    if (userToken) {
      this.usersTokens.splice(this.usersTokens.indexOf(userToken))
    }
  }

  async findByRefreshToken (token: string): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find(userToken => {
      return userToken.refresh_token === token
    })

    return userToken
  }
}
