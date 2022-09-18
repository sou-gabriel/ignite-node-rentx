import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { AppError } from '@shared/errors/AppError'

import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokens'

interface IPayload {
  sub: string
}

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization

  const userTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    request.user = {
      id: user_id
    }
    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
