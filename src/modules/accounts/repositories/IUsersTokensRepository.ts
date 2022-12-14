import { ICreateUserTokenDTO } from '../dtos/ICreateUsersTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  findByRefreshToken(token: string): Promise<UserTokens | undefined>
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens | undefined>
}
