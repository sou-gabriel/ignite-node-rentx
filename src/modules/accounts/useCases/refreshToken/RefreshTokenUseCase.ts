import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor (
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute (token: string): Promise<ITokenResponse> {
    const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth
    const { sub: user_id, email } = verify(token, secret_refresh_token) as IPayload

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError('Refresh token does not exists!')
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token
    })

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      token: newToken,
      refresh_token
    }
  }
}
