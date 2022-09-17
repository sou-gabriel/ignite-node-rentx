import { ICreateUserTokenDTO } from '../dtos/ICreateUsersTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>
}
