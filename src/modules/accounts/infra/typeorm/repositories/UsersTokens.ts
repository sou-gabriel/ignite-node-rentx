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
}
